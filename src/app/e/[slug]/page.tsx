'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EventTemplate, { EventConfig } from '@/components/EventTemplate';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';

const DEFAULT_CONFIG: EventConfig = {
  eventName: 'Événement EventFlow',
  eventDate: 'Date à confirmer',
  location: 'Lieu à confirmer',
  primaryColor: '#6366F1',
  logoText: 'EF',
  heroImage: '/bg-festival.png',
  pricing: [],
  sections: [{ id: 'sec-benefits', type: 'benefits', title: 'Vivez une expérience inoubliable' }],
  fomo: { enabled: false, endDate: '', message: '' },
};

export default function PublicEventPage() {
  const params = useParams();
  const slug = params.slug as string;

  const router = useRouter();
  const [config, setConfig] = useState<EventConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('config, organizer_id')
        .eq('slug', slug)
        .maybeSingle();

      if (error || !data) {
        // Fallback de démo si aucun événement ne correspond au slug
        setNotFound(true);
        setConfig(DEFAULT_CONFIG);
      } else {
        setConfig(data.config as EventConfig);
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user.id === data.organizer_id) {
          setIsOwner(true);
        }
      }
      setLoading(false);
    };

    loadEvent();
  }, [slug]);

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100dvh', flexDirection: 'column', gap: '1rem',
        background: '#0A0A0A', color: 'rgba(255,255,255,0.5)'
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#6366F1',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <span style={{ fontSize: '0.9rem' }}>Chargement de l'événement...</span>
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100dvh', flexDirection: 'column', gap: '1rem',
        background: '#0A0A0A', color: '#FFF', textAlign: 'center', padding: '2rem'
      }}>
        <div style={{ fontSize: '3rem' }}>🎫</div>
        <h1 style={{ fontWeight: 900, fontSize: '1.5rem' }}>Événement introuvable</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '400px' }}>
          L'événement <strong>"{slug}"</strong> n'existe pas ou n'est plus disponible.
        </p>
        <a href="/" style={{ marginTop: '1rem', color: '#6366F1', textDecoration: 'none', fontWeight: 700 }}>
          ← Retour à l'accueil
        </a>
      </div>
    );
  }

  return (
    <>
      {isOwner && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#0A0A0A', color: 'white', padding: '0.8rem 2rem', zIndex: 9999, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <span style={{ display: 'inline-flex', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 8px #10B981' }}></span>
            Votre événement est en ligne
          </div>
          <button onClick={() => router.push('/dashboard/events/builder')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#333', color: 'white', border: '1px solid #444', padding: '0.4rem 1rem', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 700, transition: 'all 0.2s' }}>
            <ArrowLeft size={14} /> Retour à l'éditeur
          </button>
        </div>
      )}
      <div style={{ marginTop: isOwner ? '50px' : '0' }}>
        <EventTemplate config={config!} slug={slug} />
      </div>
    </>
  );
}
