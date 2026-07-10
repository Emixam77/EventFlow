import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { eventId, role, name, email, plateNumber, arrivalTime, technicalNeeds } = data;

    if (!email || !name || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ticketId = `PASS-${role.substring(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Insertion Supabase. Nécessite que ces colonnes soient ajoutées à la table attendees.
    const { data: attendee, error: dbError } = await supabase
      .from('attendees')
      .insert([
        {
          event_id: eventId || 'default_event',
          name,
          email,
          ticket_type: `Pass Logistique (${role})`,
          ticket_id: ticketId,
          status: 'valide',
          purchase_date: new Date().toISOString(),
          // Nouveaux champs spécifiques au MVP Régisseur
          role,
          plate_number: plateNumber || null,
          arrival_time: arrivalTime || null,
          technical_needs: technicalNeeds || null
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.warn("⚠️ Erreur Supabase :", dbError);
    }

    // Envoi de l'email via Resend
    let emailSent = false;
    if (resend) {
      const { error: emailError } = await resend.emails.send({
        from: 'Logistique EventFlow <billetterie@eventflow.com>', 
        replyTo: 'logistique@votrefestival.com',
        to: email,
        subject: \`Votre Pass Logistique - \${name}\`,
        html: \`
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E5E7EB; border-radius: 12px;">
            <div style="background-color: #111827; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;">
              <h2 style="margin: 0; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 1px;">Accès Autorisé</h2>
            </div>
            
            <div style="padding: 20px;">
              <p>Bonjour <strong>\${name}</strong>,</p>
              <p>Votre accréditation logistique est confirmée. Veuillez présenter ce QR Code à la sécurité lors de votre arrivée sur site.</p>
              
              <div style="background-color: #F9FAFB; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; border: 1px dashed #D1D5DB;">
                <p style="font-size: 1.2rem; font-weight: bold; margin: 0; color: #111827;">PASS \${role.toUpperCase()}</p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=\${ticketId}" alt="QR Code" style="margin-top: 15px; border-radius: 8px;" />
                <p style="color: #6B7280; font-family: monospace; font-size: 1rem; margin-top: 10px;">\${ticketId}</p>
              </div>
              
              <div style="background-color: #EFF6FF; padding: 15px; border-radius: 8px; font-size: 0.9rem; color: #1E40AF;">
                <ul style="margin: 0; padding-left: 20px;">
                  \${plateNumber ? \`<li><strong>Véhicule déclaré :</strong> \${plateNumber}</li>\` : ''}
                  \${arrivalTime ? \`<li><strong>Heure d'arrivée prévue :</strong> \${arrivalTime}</li>\` : ''}
                </ul>
              </div>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #9CA3AF; font-size: 0.8rem;">
              Système Régisseur Zen propulsé par EventFlow
            </div>
          </div>
        \`,
      });
      
      if (emailError) {
        console.error("❌ Erreur Resend :", emailError);
      } else {
        emailSent = true;
      }
    }

    return NextResponse.json({ 
      success: true, 
      ticketId, 
      emailSent
    });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
