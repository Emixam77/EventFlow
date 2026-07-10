import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticketId, room } = body;

    if (!ticketId) {
      return NextResponse.json({ success: false, error: 'ID Billet manquant.' }, { status: 400 });
    }

    // 1. Chercher le billet dans Supabase
    const { data: attendee, error } = await supabase
      .from('attendees')
      .select('*')
      .eq('ticket_id', ticketId)
      .single();

    if (error || !attendee) {
      return NextResponse.json({ success: false, error: 'Billet introuvable.' });
    }

    // 2. Vérifier si déjà scanné
    if (attendee.status === 'scanned') {
      return NextResponse.json({ success: false, error: `Billet DÉJÀ SCANNÉ ! L'intervenant est déjà sur site.` });
    }

    // 3. Mettre à jour le statut
    await supabase
      .from('attendees')
      .update({ status: 'scanned' })
      .eq('ticket_id', ticketId);

    // 4. Préparer le message personnalisé
    let customMessage = `Bienvenue ${attendee.name} (${attendee.role || 'Visiteur'}).`;
    if (attendee.plate_number) {
      customMessage += ` Véhicule autorisé: ${attendee.plate_number}.`;
    }

    return NextResponse.json({ 
      success: true, 
      message: customMessage,
      attendee: attendee
    });

  } catch (error) {
    console.error('Scan API Error:', error);
    return NextResponse.json({ success: false, error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
