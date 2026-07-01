'use client';

import { Users, UserCheck, Coffee, ShieldAlert, ChevronRight, User } from 'lucide-react';

const mockTeams = [
  {
    id: 'log',
    name: 'Logistique & Sécurité',
    coordinateur: 'Julien M.',
    benevolesTotal: 12,
    surSite: 10,
    enPause: 2,
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE'
  },
  {
    id: 'bar',
    name: 'Bar & Restauration',
    coordinateur: 'Sophie D.',
    benevolesTotal: 24,
    surSite: 20,
    enPause: 4,
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A'
  },
  {
    id: 'acc',
    name: 'Accueil & Billetterie',
    coordinateur: 'Marc T.',
    benevolesTotal: 8,
    surSite: 8,
    enPause: 0,
    color: '#10B981',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0'
  }
];

export default function EquipeManager() {
  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      
      {/* BANDEAU DEMO */}
      <div style={{ backgroundColor: '#1A1A1A', color: 'white', padding: '1rem 1.5rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🎮</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Mode Démonstration Actif</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#A1A1AA' }}>Vous naviguez sur des données pré-générées pour simuler l'expérience en temps réel.</p>
          </div>
        </div>
        <div style={{ padding: '0.4rem 0.8rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, color: '#eb8e24' }}>
          Import CSV désactivé
        </div>
      </div>

      {/* ORGANIGRAMME VISUEL */}
      <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '3rem 2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* NIVEAU 1 : DIRECTEUR */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem', position: 'relative' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '4px solid #eb8e24', boxShadow: '0 10px 25px rgba(235, 142, 36, 0.3)', zIndex: 10 }}>
            <User size={32} />
          </div>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#1A1A1A' }}>Sarah Connors</h3>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#eb8e24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Directrice de Production</div>
          </div>
          
          {/* Ligne connectrice verticale */}
          <div style={{ position: 'absolute', top: '100%', left: '50%', width: '2px', height: '3rem', backgroundColor: '#E5E7EB', transform: 'translateX(-50%)', zIndex: 0 }} />
        </div>

        {/* Ligne connectrice horizontale (au dessus des pôles) */}
        <div style={{ width: '66%', height: '2px', backgroundColor: '#E5E7EB', marginBottom: '-2px', zIndex: 0 }} />

        {/* NIVEAU 2 : COORDINATEURS & BÉNÉVOLES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', width: '100%' }}>
          
          {mockTeams.map((team, idx) => (
            <div key={team.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              {/* Petites lignes verticales */}
              <div style={{ width: '2px', height: '2rem', backgroundColor: '#E5E7EB', zIndex: 0 }} />
              
              {/* Carte du Pôle */}
              <div style={{ width: '100%', backgroundColor: team.bgColor, border: `1px solid ${team.borderColor}`, borderRadius: '20px', padding: '1.5rem', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', transition: 'transform 0.2s cursor', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                
                {/* Header Pôle */}
                <div style={{ borderBottom: `1px solid ${team.borderColor}`, paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1A1A1A' }}>{team.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    <ShieldAlert size={14} color={team.color} /> Resp. : <strong style={{ color: '#1A1A1A' }}>{team.coordinateur}</strong>
                  </div>
                </div>

                {/* Stats Bénévoles */}
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={14} /> {team.benevolesTotal} Bénévoles
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#059669', fontWeight: 600 }}>
                        <UserCheck size={16} /> Sur Site
                      </div>
                      <div style={{ fontWeight: 800, color: '#065F46' }}>{team.surSite}</div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#D97706', fontWeight: 600 }}>
                        <Coffee size={16} /> En Pause
                      </div>
                      <div style={{ fontWeight: 800, color: '#92400E' }}>{team.enPause}</div>
                    </div>
                  </div>
                </div>

                {/* Bouton Détails (Fictif) */}
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: `1px solid ${team.borderColor}`, textAlign: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: team.color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    Voir le pointage <ChevronRight size={14} />
                  </span>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
