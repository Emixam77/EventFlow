import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import QRCode from 'qrcode';
import crypto from 'crypto';

const getGoogleSheetsClient = async () => {
  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    if (!clientEmail || !privateKey) {
      console.warn("⚠️ Identifiants Google Sheets manquants.");
      return null;
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    // @ts-ignore
    return google.sheets({ version: 'v4', auth: client });
  } catch (error) {
    console.error("Erreur d'initialisation Google Sheets", error);
    return null;
  }
};

const sendBrevoEmail = async (toEmail: string, toName: string, ticketId: string, qrCodeBase64: string, eventName: string, passType: string, initialCredit: number) => {
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) {
    console.warn(`⚠️ Clé API Brevo manquante. Email simulé pour ${toEmail}`);
    return true;
  }

  const base64Data = qrCodeBase64.replace(/^data:image\/png;base64,/, "");
  
  let passName = "Pass Basic";
  if (passType === 'medium') passName = "Pass Medium";
  if (passType === 'vip') passName = "Pass VIP";

  const payload = {
    sender: { name: "EventFlow Billetterie", email: process.env.BREVO_SENDER_EMAIL || "maxime@mapvitrine.com" },
    to: [{ email: toEmail, name: toName }],
    subject: `Votre ${passName} pour ${eventName}`,
    htmlContent: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #5465FF;">Bonjour ${toName},</h2>
        <p>Votre inscription pour l'événement <strong>${eventName}</strong> est confirmée !</p>
        <p>Vous avez obtenu un <strong>${passName}</strong>.</p>
        ${initialCredit > 0 ? `<p style="background-color: #D1FAE5; color: #065F46; padding: 10px; border-radius: 8px;">💳 Votre QR Code est chargé avec <strong>${initialCredit}€</strong> de crédit bar !</p>` : ''}
        <p>Voici votre QR Code d'accès (également en pièce jointe). Il vous servira de moyen de paiement au bar et de ticket d'entrée.</p>
        <img src="cid:qrcode" alt="QR Code" width="250" />
        <p style="margin-top: 30px; font-size: 0.9em; color: #888;">Merci d'utiliser EventFlow.</p>
      </div>
    `,
    attachment: [
      {
        content: base64Data,
        name: `Billet-${ticketId}.png`,
        contentId: "qrcode"
      }
    ]
  };

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': brevoApiKey,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erreur Brevo:", errorData);
    throw new Error("Erreur lors de l'envoi de l'email");
  }

  return true;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, eventSlug, passType, initialCredit = 0 } = body;

    if (!name || !email || !phone || !passType) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    let allowedRooms = "Salle 1";
    if (passType === 'medium') allowedRooms = "Salle 1, Salle 2";
    if (passType === 'vip') allowedRooms = "Salle 1, Salle 2, Salle 3";

    const ticketId = `TKT-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const eventName = eventSlug === 'mon-super-festival' ? 'Mon Super Festival' : 'Événement EventFlow';
    
    const qrContent = ticketId; 
    const qrCodeBase64 = await QRCode.toDataURL(qrContent, { errorCorrectionLevel: 'H', width: 300 });

    try {
      await sendBrevoEmail(email, name, ticketId, qrCodeBase64, eventName, passType, initialCredit);
    } catch (e) {
      console.error("Échec de l'envoi d'email", e);
    }

    const sheets = await getGoogleSheetsClient();
    if (sheets && process.env.GOOGLE_SHEET_ID) {
      const timestamp = new Date().toISOString();
      
      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'EventFlow!A:L', // Jusqu'à la colonne L pour le téléphone
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [
              // Colonnes A à L
              [ticketId, name, email, eventName, passType, 'Payé', timestamp, 'Non', allowedRooms, '', initialCredit.toString(), phone]
            ]
          }
        });
        
        // Si rechargement initial > 0, on trace cette transaction initiale
        if (initialCredit > 0) {
          await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Transactions!A:D',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              values: [
                [ticketId, initialCredit.toString(), 'Rechargement Initial', timestamp]
              ]
            }
          });
        }
      } catch (sheetError) {
        console.error("Erreur écriture Google Sheets:", sheetError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      ticketId, 
      message: 'Inscription validée et email envoyé !' 
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
