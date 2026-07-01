import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const getGoogleSheetsClient = async () => {
  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    if (!clientEmail || !privateKey) return null;

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticketId, amount, items } = body;

    if (!ticketId || typeof amount !== 'number' || !items) {
      return NextResponse.json({ success: false, error: 'Données manquantes ou invalides.' }, { status: 400 });
    }

    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!sheets || !spreadsheetId) {
      return NextResponse.json({ success: false, error: 'Configuration Sheets manquante.' }, { status: 500 });
    }

    // 1. Lire le solde actuel dans l'onglet EventFlow
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'EventFlow!A:K',
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Base de données vide.' });
    }

    let rowIndex = -1;
    let ticketRow = null;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === ticketId) {
        rowIndex = i;
        ticketRow = rows[i];
        break;
      }
    }

    if (!ticketRow) {
      return NextResponse.json({ success: false, error: 'Billet introuvable.' });
    }

    const currentBalanceStr = ticketRow[10] || '0';
    const currentBalance = parseFloat(currentBalanceStr);

    // 2. Vérifier si le solde est suffisant
    if (currentBalance < amount) {
      return NextResponse.json({ 
        success: false, 
        error: `Solde Insuffisant ! Il manque ${(amount - currentBalance).toFixed(2)}€.` 
      });
    }

    // 3. Soustraire le montant
    const newBalance = currentBalance - amount;

    // 4. Mettre à jour l'onglet EventFlow (Colonne K = 11ème colonne, index 10)
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `EventFlow!K${rowIndex + 1}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[newBalance.toString()]]
      }
    });

    // 5. Tracer la transaction dans l'onglet Transactions
    const timestamp = new Date().toISOString();
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Transactions!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [ticketId, amount.toString(), items, timestamp]
        ]
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Transaction validée.',
      remainingCredit: newBalance
    });

  } catch (error) {
    console.error('Cashless API Error:', error);
    return NextResponse.json({ success: false, error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
