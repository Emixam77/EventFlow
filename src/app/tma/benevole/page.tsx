'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useTMAStore } from '@/lib/offline-store';

type Statut = 'A faire' | 'En cours' | 'Bloqué' | 'Terminé';

const CRITICITE_CONFIG = {
  rouge: { bg: '#1A0000', border: '#EF4444', badge: '#EF4444', label: '🔴 CRITIQUE' },
  orange: { bg: '#1A0D00', border: '#F97316', badge: '#F97316', label: '🟠 URGENT' },
  vert: { bg: '#001A0A', border: '#10B981', badge: '#10B981', label: '🟢 OK' },
  gris: { bg: '#111', border: '#333', badge: '#555', label: '✅ Terminé' },
};

function getCriticite(task: any): keyof typeof CRITICITE_CONFIG {
  if (task.statut === 'Terminé') return 'gris';
  if (task.est_critique || task.statut === 'Bloqué') return 'rouge';
  if (task.date_limite) {
    const minsLeft = (new Date(task.date_limite).getTime() - Date.now()) / 60000;
    if (minsLeft < 30) return 'rouge';
    if (minsLeft < 90) return 'orange';
  }
  return 'vert';
}

export default function TMABenevole() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const { telegramUserId, updateTaskStatus, isOnline } = useTMAStore();

  useEffect(() => {
    const load = async () => {
      const id = telegramUserId;
      if (!id) {
        setLoading(false);
        return;
      }

      const { data: user } = await supabase
        .from('utilisateurs_terrain')
        .select('nom')
        .eq('id_telegram', id)
        .single();
      if (user) setUserName(user.nom);

      const { data } = await supabase
        .from('taches')
        .select('*')
        .eq('assigne_a', id)
        .neq('statut', 'Terminé')
        .order('est_critique', { ascending: false })
        .order('date_limite', { ascending: true });

      setTasks(data ?? []);
      setLoading(false);
    };

    // Écoute réseau
    const handleOnline = () => useTMAStore.getState().setOnline(true);
    const handleOffline = () => useTMAStore.getState().setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    load();
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [telegramUserId]);

  const handleStatusChange = (taskId: string, statut: Statut) => {
    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, statut } : t).filter(t => t.statut !== 'Terminé'));
    updateTaskStatus(taskId, statut);
  };

  const critiques = tasks.filter(t => getCriticite(t) === 'rouge');
  const urgentes = tasks.filter(t => getCriticite(t) === 'orange');
  const normales = tasks.filter(t => getCriticite(t) === 'vert');

  return (
    <div style={{ padding: '1rem', minHeight: '100dvh', background: '#0A0A0A' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', animation: 'slideIn 0.4s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Mon Dashboard</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff' }}>{userName || 'Équipe'}</div>
          </div>
          <div style={{
            padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700,
            background: isOnline ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
            color: isOnline ? '#10B981' : '#EF4444',
            border: `1px solid ${isOnline ? '#10B981' : '#EF4444'}`
          }}>
            {isOnline ? '● En ligne' : '○ Hors ligne'}
          </div>
        </div>

        {/* Compteurs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          {[
            { label: 'Critiques', count: critiques.length, color: '#EF4444' },
            { label: 'Urgentes', count: urgentes.length, color: '#F97316' },
            { label: 'En cours', count: normales.length, color: '#10B981' },
          ].map(({ label, count, color }) => (
            <div key={label} style={{
              flex: 1, background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: '12px', padding: '0.8rem', textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color }}>{count}</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.1rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tâches */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.3)' }}>Chargement...</div>
      ) : tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem' }}>🎉</div>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '1rem' }}>Toutes vos tâches sont terminées !</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {[...critiques, ...urgentes, ...normales].map((task) => {
            const crit = getCriticite(task);
            const cfg = CRITICITE_CONFIG[crit];
            const minsLeft = task.date_limite ? Math.round((new Date(task.date_limite).getTime() - Date.now()) / 60000) : null;

            return (
              <div key={task.id} style={{
                background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: '16px',
                padding: '1rem', animation: 'slideIn 0.3s ease',
                boxShadow: crit === 'rouge' ? `0 0 20px rgba(239,68,68,0.2)` : 'none'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: cfg.badge, background: `${cfg.badge}22`, padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                    {cfg.label}
                  </span>
                  {minsLeft !== null && (
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
                      {minsLeft > 0 ? `⏰ ${minsLeft}min` : `🚨 Expiré`}
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '0.3rem' }}>{task.titre}</h3>
                {task.description && (
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.8rem', lineHeight: 1.4 }}>{task.description}</p>
                )}

                {/* Actions rapides */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {(['En cours', 'Bloqué', 'Terminé'] as Statut[]).filter(s => s !== task.statut).map((statut) => (
                    <button key={statut} onClick={() => handleStatusChange(task.id, statut)} style={{
                      flex: '1 1 auto', padding: '0.6rem 0.5rem', borderRadius: '10px', border: 'none',
                      fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer',
                      background: statut === 'Terminé' ? '#10B981' : statut === 'Bloqué' ? '#EF4444' : 'rgba(255,255,255,0.1)',
                      color: statut === 'Terminé' ? '#000' : '#fff',
                    }}>
                      {statut === 'En cours' ? '▶ Démarrer' : statut === 'Bloqué' ? '🚫 Bloquer' : '✓ Terminé'}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
