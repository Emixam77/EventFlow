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
    const { ticketId, room } = body;

    if (!ticketId || !room) {
      return NextResponse.json({ success: false, error: 'ID Billet ou Salle manquants.' }, { status: 400 });
    }

    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!sheets || !spreadsheetId) {
      return NextResponse.json({ success: false, error: 'Configuration Sheets manquante.' }, { status: 500 });
    }

    // 1. Lire les données de l'onglet EventFlow
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'EventFlow!A:J',
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Base de données vide.' });
    }

    // 2. Chercher le billet
    // A=ID, B=Nom, C=Email, D=Event, E=PassType, F=Status, G=Time, H=CheckIn, I=AllowedRooms, J=ScanHistory
    const headerRow = rows[0];
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

    const allowedRoomsStr = ticketRow[8] || ''; // Colonne I
    const scanHistoryStr = ticketRow[9] || '';  // Colonne J

    // 3. Vérifier l'accès à la salle
    const allowedRooms = allowedRoomsStr.split(',').map((r: string) => r.trim());
    if (!allowedRooms.includes(room)) {
      return NextResponse.json({ success: false, error: `Ce billet ne donne pas accès à la ${room}.` });
    }

    // 4. Vérifier l'historique des scans (Anti-fraude)
    const scanHistory = scanHistoryStr ? scanHistoryStr.split(',') : [];
    const alreadyScanned = scanHistory.some((scan: string) => scan.includes(room));

    if (alreadyScanned) {
      return NextResponse.json({ success: false, error: `Billet DÉJÀ SCANNÉ pour la ${room} !` });
    }

    // 5. Mettre à jour l'historique
    const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const newScanEntry = `${room} (${now})`;
    scanHistory.push(newScanEntry);
    
    // Si c'était le premier scan, on met aussi Check-In à Oui
    const isFirstScan = scanHistory.length === 1;

    // Mise à jour de la ligne (On met à jour la colonne H: CheckIn, J: ScanHistory)
    // Range pour mettre à jour H et J sur la ligne rowIndex (attention, l'API Sheets est en base 1, donc rowIndex + 1)
    
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `EventFlow!H${rowIndex + 1}:J${rowIndex + 1}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            isFirstScan ? 'Oui' : ticketRow[7], // H: Check-In
            ticketRow[8],                       // I: AllowedRooms (inchangé)
            scanHistory.join(', ')              // J: ScanHistory
          ]
        ]
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: `Bon pour la ${room}. Bienvenue ${ticketRow[1]} !` 
    });

  } catch (error) {
    console.error('Scan API Error:', error);
    return NextResponse.json({ success: false, error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
