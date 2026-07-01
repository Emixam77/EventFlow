'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useTMAStore } from '@/lib/offline-store';

export default function TMAEntry() {
  const router = useRouter();
  const setTelegramUserId = useTMAStore((s) => s.setTelegramUserId);
  const [status, setStatus] = useState('Connexion au système terrain...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      // 1. Récupérer l'ID Telegram
      let telegramId: number | null = null;

      if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
        const twa = (window as any).Telegram.WebApp;
        telegramId = twa.initDataUnsafe?.user?.id ?? null;
      }

      // POUR LE TEST: Forcer l'ID pour correspondre aux données de démo Supabase
      telegramId = 7475268288;
      setStatus('Mode test (ID Organisateur forcé)...');

      if (!telegramId) {
        setError('Ouvrez cette application depuis Telegram.');
        return;
      }

      setTelegramUserId(telegramId);

      // 2. Vérifier le rôle dans la base de données
      setStatus('Vérification de votre rôle...');
      const { data: user, error: dbError } = await supabase
        .from('utilisateurs_terrain')
        .select('*, poles_activites(nom)')
        .eq('id_telegram', telegramId)
        .maybeSingle();

      if (dbError || !user) {
        setError('Accès non autorisé. Contactez l\'organisateur pour être ajouté à l\'équipe.');
        return;
      }

      // 3. Routage par rôle
      setStatus('Accès autorisé ! Chargement...');
      if (user.role === 'organisateur') {
        router.replace('/tma/dashboard');
      } else {
        const pole = user.poles_activites?.nom?.toLowerCase() ?? '';
        if (pole.includes('bar')) {
          router.replace('/tma/bar');
        } else if (pole.includes('hospitality') || pole.includes('artist')) {
          router.replace('/tma/hospitality');
        } else {
          router.replace('/tma/benevole');
        }
      }
    };

    init();
  }, [router, setTelegramUserId]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100dvh', padding: '2rem', textAlign: 'center', gap: '1.5rem'
    }}>
      {error ? (
        <>
          <div style={{ fontSize: '3rem' }}>🔒</div>
          <p style={{ color: '#EF4444', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.5 }}>{error}</p>
        </>
      ) : (
        <>
          <div style={{
            width: '56px', height: '56px', border: '3px solid rgba(255,255,255,0.1)',
            borderTopColor: '#10B981', borderRadius: '50%', animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>{status}</p>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10B981' }}>EventFlow</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.2rem' }}>Gestion Terrain v1.0</div>
          </div>
        </>
      )}
    </div>
  );
}
