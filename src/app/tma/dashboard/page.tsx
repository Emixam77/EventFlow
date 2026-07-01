'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useTMAStore } from '@/lib/offline-store';

interface Pole {
  id: string;
  nom: string;
  taches: Array<{ statut: string; est_critique: boolean }>;
}

interface StockAlert {
  article_nom: string;
  stock_actuel: number;
  seuil_alerte_critique: number;
  zone_emplacement: string;
}

export default function TMADashboard() {
  const [poles, setPoles] = useState<Pole[]>([]);
  const [stockAlerts, setStockAlerts] = useState<StockAlert[]>([]);
  const [critiqueTasks, setCritiqueTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { telegramUserId } = useTMAStore();

  useEffect(() => {
    const load = async () => {
      const { data: user } = await supabase
        .from('utilisateurs_terrain')
        .select('event_id')
        .eq('id_telegram', telegramUserId ?? 0)
        .single();

      // Pour la démo, on charge tout sans filtrer par event_id
      const [polesRes, stockRes, critRes] = await Promise.all([
        supabase.from('poles_activites').select('*, taches(statut, est_critique)'),
        supabase.from('bar_stocks').select('*'),
        supabase.from('taches').select('*, poles_activites(nom)').eq('est_critique', true).neq('statut', 'Terminé').order('date_limite'),
      ]);

      // Filtrer les stocks critiques côté client
      const allStocks = (stockRes.data ?? []) as StockAlert[];
      setStockAlerts(allStocks.filter(s => s.stock_actuel <= s.seuil_alerte_critique));
      setPoles(polesRes.data as Pole[] ?? []);
      setCritiqueTasks(critRes.data ?? []);
      setLoading(false);
    };

    if (telegramUserId) load();

    // Realtime
    const channel = supabase.channel('dashboard_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'taches' }, () => load())
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'bar_stocks' }, () => load())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [telegramUserId]);

  const getPoleStats = (pole: Pole) => {
    const total = pole.taches?.length ?? 0;
    const done = pole.taches?.filter(t => t.statut === 'Terminé').length ?? 0;
    const critiques = pole.taches?.filter(t => t.est_critique && t.statut !== 'Terminé').length ?? 0;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { total, done, critiques, pct };
  };

  const POLE_ICONS: Record<string, string> = {
    'bar': '🍺', 'technique': '🎛', 'tech': '🎛', 'logistique': '🚚',
    'hospitality': '🎤', 'sécurité': '🛡', 'scène': '🎸', 'régie': '📋'
  };

  const getPoleIcon = (nom: string) => {
    const key = Object.keys(POLE_ICONS).find(k => nom.toLowerCase().includes(k));
    return key ? POLE_ICONS[key] : '⚡';
  };

  return (
    <div style={{ padding: '1rem', background: '#0A0A0A', minHeight: '100dvh' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vue Globale</div>
        <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>📋 Dashboard Organisateur</div>
      </div>

      {/* Alertes critiques */}
      {(stockAlerts.length > 0 || critiqueTasks.length > 0) && (
        <div style={{ background: '#1A0000', border: '1px solid #EF4444', borderRadius: '16px', padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#EF4444', marginBottom: '0.8rem' }}>🚨 ALERTES EN COURS</div>
          {stockAlerts.map((s, i) => (
            <div key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.3rem' }}>
              🍺 Rupture imminente : <strong>{s.article_nom}</strong> (Zone {s.zone_emplacement}) — stock : {s.stock_actuel}
            </div>
          ))}
          {critiqueTasks.slice(0, 3).map((t, i) => (
            <div key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.3rem' }}>
              🔴 {t.poles_activites?.nom} : <strong>{t.titre}</strong>
            </div>
          ))}
        </div>
      )}

      {/* Pôles */}
      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', paddingTop: '3rem' }}>Synchronisation...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {poles.map((pole) => {
            const { total, done, critiques, pct } = getPoleStats(pole);
            const isAlert = critiques > 0;
            return (
              <div key={pole.id} style={{
                background: isAlert ? '#1A0000' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isAlert ? '#EF444488' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '16px', padding: '1rem', animation: 'slideIn 0.3s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{getPoleIcon(pole.nom)}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{pole.nom}</div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{done}/{total} tâches</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: pct === 100 ? '#10B981' : isAlert ? '#EF4444' : '#F97316' }}>{pct}%</div>
                    {critiques > 0 && <div style={{ fontSize: '0.65rem', color: '#EF4444', fontWeight: 700 }}>{critiques} CRITIQUE{critiques > 1 ? 'S' : ''}</div>}
                  </div>
                </div>

                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, borderRadius: '3px', transition: 'width 0.5s ease', background: pct === 100 ? '#10B981' : isAlert ? '#EF4444' : '#F97316' }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
