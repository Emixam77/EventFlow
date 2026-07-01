'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Calendar, Users, Euro, Plus, Settings, BarChart, Tent, Copy, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function GlobalDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fausses données pour la démonstration
  const mockEvents = [
    {
      id: 'evt_1',
      name: 'Festival Latino Summer',
      date: '24 Juillet 2026',
      status: 'online',
      ticketsSold: 4840,
      revenue: 124500,
      slug: 'festival-latino'
    },
    {
      id: 'evt_2',
      name: 'Soirée Networking Pro',
      date: '12 Septembre 2026',
      status: 'draft',
      ticketsSold: 0,
      revenue: 0,
      slug: 'networking-pro'
    }
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || { email: 'demo@eventflow.com' }); // Mock user pour la démo
    });
  }, []);

  const handleCopyLink = (slug: string, id: string) => {
    navigator.clipboard.writeText(`https://eventflow.com/e/${slug}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ backgroundColor: '#E5E7EB', minHeight: '100vh', padding: '2rem 0' }}>
      <div style={{ padding: '0 2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1A1A', margin: '0 0 0.5rem 0' }}>Mes Événements</h1>
          <p style={{ color: '#666', margin: 0 }}>Gérez vos billetteries, votre CRM et vos équipes.</p>
        </div>
        
        <Link href="/dashboard/events/builder" style={{ textDecoration: 'none' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#10B981', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <Plus size={18} /> Nouvel Événement
          </button>
        </Link>
      </div>

      {/* GRID ÉVÉNEMENTS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        
        {mockEvents.map((event) => (
          <div key={event.id} style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #D1D5DB', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
            
            {/* EN-TÊTE CARTE */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.8rem', backgroundColor: event.status === 'online' ? '#ECFDF5' : '#F3F4F6', color: event.status === 'online' ? '#059669' : '#4B5563' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: event.status === 'online' ? '#10B981' : '#9CA3AF' }} />
                  {event.status === 'online' ? 'En ligne' : 'Brouillon'}
                </div>
                <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.3rem', fontWeight: 800, color: '#1A1A1A' }}>{event.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6B7280', fontSize: '0.85rem' }}>
                  <Calendar size={14} /> {event.date}
                </div>
              </div>
            </div>

            {/* STATISTIQUES */}
            <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#F9FAFB' }}>
              <div>
                <p style={{ margin: '0 0 0.3rem 0', color: '#6B7280', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Users size={14} /> Billets Vendus</p>
                <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#1A1A1A' }}>{event.ticketsSold.toLocaleString('fr-FR')}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 0.3rem 0', color: '#6B7280', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Euro size={14} /> Revenus</p>
                <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#10B981' }}>{event.revenue.toLocaleString('fr-FR')} €</p>
              </div>
            </div>

            {/* ACTIONS RAPIDES */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto' }}>
              
              {/* LIEN DE PARTAGE */}
              {event.status === 'online' && (
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <button 
                    onClick={() => handleCopyLink(event.slug, event.id)}
                    style={{ flex: 1, padding: '0.8rem', backgroundColor: copiedId === event.id ? '#ECFDF5' : 'white', border: `1px solid ${copiedId === event.id ? '#10B981' : '#E5E7EB'}`, borderRadius: '8px', color: copiedId === event.id ? '#10B981' : '#4B5563', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                  >
                    {copiedId === event.id ? <><CheckCircle2 size={16} /> Copié !</> : <><Copy size={16} /> Copier le lien</>}
                  </button>
                  <a href={`/e/${event.slug}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem', border: '1px solid #E5E7EB', borderRadius: '8px', color: '#4B5563', textDecoration: 'none', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}

              {/* BOUTONS MODULES */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link href="/dashboard/events/builder" style={{ flex: 1, textDecoration: 'none' }}>
                  <button style={{ width: '100%', padding: '0.8rem', backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', color: '#1A1A1A', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>
                    <Settings size={14} /> Éditer (Mod. 1)
                  </button>
                </Link>
                <Link href="/dashboard/events/crm" style={{ flex: 1, textDecoration: 'none' }}>
                  <button style={{ width: '100%', padding: '0.8rem', backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', color: '#D97706', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    <BarChart size={14} /> CRM (Mod. 2)
                  </button>
                </Link>
              </div>
              
              <Link href="/dashboard/events/terrain" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', padding: '0.8rem', backgroundColor: '#EEF2FF', border: '1px solid #E0E7FF', borderRadius: '8px', color: '#4338CA', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  <Tent size={14} /> Terrain Pro (Mod. 3)
                </button>
              </Link>
            </div>

          </div>
        ))}

      </div>
    </div>
    </div>
  );
}
