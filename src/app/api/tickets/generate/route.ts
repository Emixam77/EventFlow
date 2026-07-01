import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialisation conditionnelle
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; // Idéalement SERVICE_ROLE_KEY côté serveur
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { event_id, email, name, ticket_type, custom_message } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    // 1. Générer un ID unique pour le billet (QR Code payload)
    const ticketId = `TICKET-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // 2. Insérer dans la base de données Supabase (Table attendees)
    const { data: attendee, error: dbError } = await supabase
      .from('attendees')
      .insert([
        {
          event_id: event_id || 'default_event',
          name,
          email,
          ticket_type: ticket_type || 'Pass Standard',
          ticket_id: ticketId,
          status: 'valide',
          purchase_date: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.warn("⚠️ Erreur Supabase (la table n'existe peut-être pas encore) :", dbError);
      // On continue quand même pour le Tir à Blanc (Simulation)
    }

    // 3. Envoyer l'email avec Resend
    let emailSent = false;
    if (resend) {
      const { data, error: emailError } = await resend.emails.send({
        from: 'Billetterie EventFlow <billetterie@eventflow.com>', // Nécessite un domaine vérifié chez Resend
        replyTo: 'orga@votrefestival.com',
        to: email,
        subject: 'Vos billets pour l\'événement',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E5E7EB; border-radius: 12px;">
            <h1 style="color: #1A1A1A;">Voici vos billets !</h1>
            <p>Bonjour ${name},</p>
            <p>${custom_message || 'Merci pour votre commande. Préparez vos billets pour le jour J !'}</p>
            
            <div style="background-color: #F9FAFB; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <p style="font-size: 1.2rem; font-weight: bold; margin: 0;">${ticket_type || 'Pass Standard'}</p>
              <p style="color: #666; font-family: monospace; font-size: 1.5rem; letter-spacing: 2px;">${ticketId}</p>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketId}" alt="QR Code" style="margin-top: 10px;" />
            </div>
            
            <p style="color: #666; font-size: 0.9rem;">À très vite sur l'événement.</p>
          </div>
        `,
      });
      
      if (emailError) {
        console.error("❌ Erreur Resend :", emailError);
      } else {
        emailSent = true;
      }
    } else {
      console.log("ℹ️ Simulation d'email (Clé Resend non configurée) :", { to: email, ticketId });
    }

    return NextResponse.json({ 
      success: true, 
      ticketId, 
      emailSent,
      attendee: attendee || { name, email, ticket_id: ticketId, status: 'valide' }
    });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
