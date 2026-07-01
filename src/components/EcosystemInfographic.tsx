'use client';

import { Settings, Users, ArrowRightLeft, Radio, Blocks, Tent } from 'lucide-react';

export default function EcosystemInfographic() {
  return (
    <div style={{ backgroundColor: '#0A0A0A', borderRadius: '24px', padding: '3rem 2rem', border: '1px solid #333', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Grille de fond animée (subtile) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.5, zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'white', margin: '0 0 0.5rem 0' }}>L'Écosystème EventFlow</h3>
        <p style={{ color: '#A1A1AA', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>Comprenez l'architecture de notre solution pour faire le meilleur choix.</p>
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
        
        {/* LE SOCLE INDISSOCIABLE (Modules 1 & 2) */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid #333', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '800px', backdropFilter: 'blur(10px)', position: 'relative' }}>
          
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#333', color: 'white', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid #444', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Blocks size={14} color="#eb8e24" /> Le Socle Indissociable
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
            
            {/* Module 1 : Builder */}
            <div style={{ backgroundColor: 'rgba(235, 142, 36, 0.1)', border: '1px solid rgba(235, 142, 36, 0.3)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', transition: 'transform 0.3s' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#eb8e24', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', boxShadow: '0 4px 15px rgba(235, 142, 36, 0.4)' }}>
                <Settings size={24} color="white" />
              </div>
              <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Module 1 : Event Builder</h4>
              <p style={{ color: '#A1A1AA', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>Création de l'événement, Billetterie, Page publique, Ventes.</p>
            </div>

            {/* Lien / Synchronisation */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
              <ArrowRightLeft size={24} style={{ animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#A1A1AA' }}>Synchro Temps Réel</span>
            </div>

            {/* Module 2 : CRM */}
            <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', transition: 'transform 0.3s' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#3B82F6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}>
                <Users size={24} color="white" />
              </div>
              <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Module 2 : CRM & Data</h4>
              <p style={{ color: '#A1A1AA', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>Base de données centralisée, Emailing, Campagnes SMS, Analytics.</p>
            </div>

          </div>
          
          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#A1A1AA' }}>
            Inclus dans le forfait <strong>Pay-As-You-Go</strong>
          </div>
        </div>

        {/* Ligne de connexion verticale (Data Flow) */}
        <div style={{ height: '40px', width: '2px', backgroundColor: '#333', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: '-1px', width: '4px', height: '15px', backgroundColor: '#10B981', borderRadius: '2px', animation: 'slideDown 2s infinite linear' }} />
          <style>{`
            @keyframes slideDown {
              0% { top: 0; opacity: 1; }
              100% { top: 40px; opacity: 0; }
            }
          `}</style>
        </div>

        {/* L'EXTENSION (Module 3) */}
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px dashed #10B981', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '600px', textAlign: 'center', position: 'relative' }}>
          
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#10B981', color: 'white', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}>
            <Radio size={14} /> Extension Sur-Site
          </div>

          <div style={{ width: '56px', height: '56px', backgroundColor: 'rgba(16, 185, 129, 0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
            <Tent size={28} color="#10B981" />
          </div>

          <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 900, margin: '0 0 0.5rem 0' }}>Module 3 : Terrain Pro</h4>
          <p style={{ color: '#A1A1AA', fontSize: '0.9rem', margin: '0 0 1rem 0', lineHeight: 1.6 }}>
            Déployez la logistique le jour J. Tâches en temps réel, alertes stocks (bar), Hospitality (Vols/Loges) et application mobile hors-ligne.
          </p>
          
          <div style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 800 }}>
            Débloqué avec les forfaits <strong>Abonnement</strong> ou <strong>Lifetime</strong>
          </div>

        </div>

      </div>
    </div>
  );
}
