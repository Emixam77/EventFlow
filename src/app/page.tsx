'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/AuthModal';

export default function Home() {
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#FFFFFF', color: '#0A0A0A', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .hero-title span { color: #E00000; }
        .btn-red {
          background: #E00000;
          color: #FFF;
          border: none;
          padding: 1rem 2.2rem;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: all 0.2s;
          text-transform: uppercase;
        }
        .btn-red:hover { background: #B00000; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(224,0,0,0.3); }
        .btn-outline {
          background: transparent;
          color: #0A0A0A;
          border: 2px solid #0A0A0A;
          padding: 1rem 2rem;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.2s;
        }
        .btn-outline:hover { background: #0A0A0A; color: #FFF; }

        .table-row:nth-child(even) { background: #F9F9F9; }
        
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; padding: 2rem 5% !important; gap: 4rem !important; }
          .red-line { display: none !important; }
          .hero-col-left { align-items: center !important; text-align: center !important; padding-right: 0 !important; padding-bottom: 0 !important; }
          .hero-btn-container { position: relative !important; bottom: auto !important; right: auto !important; justify-content: center !important; margin-top: 2rem !important; }
          .hero-image-col { min-height: 50vh !important; }
          .hero-title { font-size: clamp(3rem, 12vw, 5rem) !important; }
          .comparison-table { font-size: 0.75rem !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 15%', borderBottom: '1px solid #E5E5E5', position: 'sticky', top: 0, background: '#FFF', zIndex: 100 }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
          Event<span style={{ color: '#E00000' }}>Flow</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={() => { setIsLogin(true); setIsAuthModalOpen(true); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', color: '#555' }}>
            Connexion
          </button>
          <button className="btn-red" onClick={() => { setIsLogin(false); setIsAuthModalOpen(true); }}
            style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>
            Commencer →
          </button>
        </div>
      </nav>

      {/* ══ SECTION 1 : HERO ══ */}
      <section style={{ minHeight: '80vh', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', padding: '4rem 15%', position: 'relative', overflow: 'hidden' }} className="hero-grid">
        
        {/* Bande rouge verticale déco (Centrée) */}
        <div className="red-line" style={{ position: 'absolute', left: '50%', top: 0, width: '6px', height: '100%', background: '#E00000', zIndex: 1, transform: 'translateX(-50%)' }} />

        {/* Colonne gauche - Texte (Aligné à droite en desktop, centré en mobile) */}
        <div className="hero-col-left" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', textAlign: 'right', animation: 'slideInLeft 0.8s ease forwards', paddingRight: '2rem' }}>
          
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#FFF0F0', color: '#E00000', padding: '0.3rem 0.8rem', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', width: 'fit-content' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E00000', animation: 'pulse 1.5s infinite' }} />
            Billetterie événementielle — Prix fixe
          </div>

          {/* Titre principal */}
          <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 4rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            LANCEZ<br />
            VOTRE<br />
            <span>ÉVÉNEMENT.</span><br />
            GARDEZ<br />
            <span>100%</span>
          </h1>

          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.6, maxWidth: '380px' }}>
            Billetterie sans commission, cashless intégré et gestion d'équipe le jour J. 
            <strong style={{ color: '#0A0A0A' }}> Prix fixe. Sans engagement.</strong> Opérationnel en 2 minutes.
          </p>

          <div className="hero-btn-container" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', position: 'absolute', bottom: '2rem', right: '2rem' }}>
            <button className="btn-red" onClick={() => router.push('/dashboard/events/builder')} style={{ padding: '0.8rem 1.5rem', fontSize: '0.8rem' }}>
              Essayer gratuitement →
            </button>
          </div>
        </div>

        {/* Colonne droite - Image */}
        <div className="hero-image-col" style={{ position: 'relative', background: '#FFF', animation: 'slideInRight 0.8s ease forwards', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Texte 3D en arrière-plan */}
          <div style={{ position: 'absolute', right: '-1rem', top: '55%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 0 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 'clamp(2.5rem, 4vw, 5.5rem)', fontWeight: 900, color: '#E00000', lineHeight: 0.85, letterSpacing: '-0.03em' }}>0%</div>
              <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800, marginTop: '0.2rem' }}>Commission</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 'clamp(2.5rem, 4vw, 5.5rem)', fontWeight: 900, color: '#E00000', lineHeight: 0.85, letterSpacing: '-0.03em' }}>2m</div>
              <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800, marginTop: '0.2rem' }}>Chrono</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 'clamp(2.5rem, 4vw, 5.5rem)', fontWeight: 900, color: '#E00000', lineHeight: 0.85, letterSpacing: '-0.03em' }}>J+0</div>
              <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800, marginTop: '0.2rem' }}>Vos fonds</div>
            </div>
          </div>
          
          {/* L'image avec mix-blend-mode multiply laisse transparaître le texte sur le blanc, mais le cache avec la robe noire ! */}
          <img
            src="/hero-dancer-2.jpg"
            alt="Organisez votre événement avec EventFlow"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'contrast(1.15) brightness(1.1) grayscale(100%)', position: 'relative', zIndex: 2, mixBlendMode: 'multiply' }}
          />
          {/* Overlay tag flottant */}
          <div style={{ position: 'absolute', bottom: '2rem', left: '1.5rem', background: '#E00000', color: '#FFF', padding: '0.6rem 1rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Votre événement. Vos règles.
          </div>
        </div>
      </section>

      {/* ══ SECTION 2 : COMPARAISON ══ */}
      <section style={{ padding: '6rem 15%', background: '#0A0A0A', color: '#FFF' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <div style={{ color: '#E00000', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.8rem' }}>— La différence</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1 }}>
                Pas seulement<br /><span style={{ color: '#E00000' }}>sans commission.</span>
              </h2>
            </div>
            <p style={{ color: '#888', maxWidth: '320px', lineHeight: 1.6, fontSize: '0.95rem', paddingBottom: '0.5rem' }}>
              Un outil qui brille de loin dans chaque catégorie — et pas seulement sur le prix.
            </p>
          </div>

          {/* Table */}
          <div style={{ borderRadius: '2px', overflow: 'hidden', border: '1px solid #1E1E1E' }}>
            {/* Header */}
            <div className="comparison-table" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: '#141414', padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555' }}>
              <span>Critère</span>
              <span style={{ color: '#888' }}>Vous avant</span>
              <span style={{ color: '#888' }}>Marché actuel</span>
              <span style={{ color: '#E00000' }}>EventFlow</span>
            </div>

            {[
              { label: 'Commission par billet', avant: 'Plateformes tierces', marche: '4–7% + frais fixes', ef: '0%', highlight: true },
              { label: 'Virement des recettes', avant: 'Délai 30+ jours', marche: 'Paiement différé', ef: 'Immédiat (Stripe direct)', highlight: false },
              { label: 'Landing page dédiée', avant: 'Réseaux sociaux', marche: 'Template basique', ef: 'Sur-mesure en 5 min', highlight: true },
              { label: 'Gestion équipe Jour J', avant: 'WhatsApp + Excel', marche: 'Non inclus', ef: 'Mini-App Telegram IA', highlight: false },
              { label: 'Cashless / QR Code', avant: 'Prestataire externe', marche: 'Option payante (hardware)', ef: 'Intégré, sans matériel', highlight: true },
              { label: 'Mise en place', avant: 'Des semaines', marche: 'Appel commercial requis', ef: '2 minutes chrono', highlight: false },
            ].map((row, i) => (
              <div key={i} className="table-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '1.1rem 1.5rem', borderTop: '1px solid #1E1E1E', alignItems: 'center', background: row.highlight ? '#1A1A1A' : '#0F0F0F', fontSize: '0.88rem' }}>
                <span style={{ fontWeight: 700, color: '#F0F0F0' }}>{row.label}</span>
                <span style={{ color: '#A3A3A3' }}>{row.avant}</span>
                <span style={{ color: '#D4D4D4' }}>{row.marche}</span>
                <span style={{ color: '#E00000', fontWeight: 800 }}>✓ {row.ef}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 : LES 3 PILIERS ══ */}
      <section style={{ padding: '6rem 15%', background: '#FFF' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ color: '#E00000', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.8rem' }}>— Ce que vous obtenez</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.1 }}>
              Un système complet.<br />Pas une liste de fonctionnalités.
            </h2>
          </div>

          <div className="pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: '#E5E5E5' }}>
            {[
              {
                icon: '🎫',
                number: '01',
                title: 'Billetterie Privée',
                subtitle: 'Votre marque. Votre compte Stripe.',
                desc: `Créez une landing page d'événement sur-mesure en 5 minutes. Vos billets sont vendus directement sur votre compte Stripe — vos fonds sont disponibles immédiatement, sans aucun intermédiaire.`,
                tag: 'Zéro commission',
              },
              {
                icon: '💳',
                number: '02',
                title: 'Cashless Intégré',
                subtitle: 'QR Code rechargeable. Sans hardware.',
                desc: `Chaque billet intègre un QR Code de paiement cashless. Votre équipe valide les entrées et traite les paiements au bar depuis n'importe quel smartphone — aucun terminal supplémentaire.`,
                tag: 'Sans matériel',
              },
              {
                icon: '📱',
                number: '03',
                title: 'Gestion Terrain IA',
                subtitle: 'Mini-App Telegram. Le Jour J.',
                desc: `Votre équipe reçoit ses tâches sur Telegram. Un agent IA surveille les retards artistes, les ruptures de stock et les alertes logistiques. Vous pilotez en temps réel depuis votre téléphone.`,
                tag: 'Exclusif EventFlow',
              },
            ].map((pillar, i) => (
              <div key={i} style={{ background: '#FFF', padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '2.5rem' }}>{pillar.icon}</span>
                  <span style={{ fontSize: '4rem', fontWeight: 900, color: '#F0F0F0', lineHeight: 1 }}>{pillar.number}</span>
                </div>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.3rem' }}>{pillar.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#E00000', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{pillar.subtitle}</div>
                </div>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, flex: 1 }}>{pillar.desc}</p>
                <div style={{ background: '#0A0A0A', color: '#FFF', padding: '0.4rem 0.8rem', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', width: 'fit-content' }}>
                  {pillar.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 : CTA FINAL ══ */}
      <section style={{ padding: '6rem 15%', background: '#E00000', color: '#FFF', position: 'relative', overflow: 'hidden' }}>
        {/* Déco typographique */}
        <div style={{ position: 'absolute', right: '-2rem', top: '50%', transform: 'translateY(-50%)', fontSize: '18rem', fontWeight: 900, color: 'rgba(255,255,255,0.05)', lineHeight: 1, userSelect: 'none' }}>100%</div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Prêt pour votre<br />prochain événement ?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, marginBottom: '3rem', lineHeight: 1.6 }}>
            Créez votre billetterie maintenant. Aucune carte de crédit requise.<br />
            <strong>Si vous n'êtes pas convaincu — on vous rembourse.</strong>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => router.push('/dashboard/events/builder')}
              style={{ background: '#FFF', color: '#E00000', border: 'none', padding: '1.1rem 2.5rem', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.2s' }}
              onMouseOver={e => { (e.target as HTMLElement).style.background = '#0A0A0A'; (e.target as HTMLElement).style.color = '#FFF'; }}
              onMouseOut={e => { (e.target as HTMLElement).style.background = '#FFF'; (e.target as HTMLElement).style.color = '#E00000'; }}
            >
              Créer ma billetterie → 
            </button>
            <button
              onClick={() => { setIsLogin(true); setIsAuthModalOpen(true); }}
              style={{ background: 'transparent', color: '#FFF', border: '2px solid rgba(255,255,255,0.5)', padding: '1.1rem 2.5rem', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.2s' }}
            >
              Déjà client
            </button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ padding: '2rem 15%', background: '#0A0A0A', color: '#555', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
        <span style={{ fontWeight: 900, color: '#FFF', fontSize: '1rem' }}>Event<span style={{ color: '#E00000' }}>Flow</span></span>
        <span>© {new Date().getFullYear()} — Tous droits réservés</span>
        <span>Prix fixe · Zéro commission · Vos règles</span>
      </footer>

      {/* ══ MODAL AUTH ══ */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultIsLogin={isLogin} 
        onSuccess={() => router.push('/dashboard/events/builder')} 
      />
    </div>
  );
}
