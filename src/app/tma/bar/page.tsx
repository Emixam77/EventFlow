'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useTMAStore } from '@/lib/offline-store';

interface Stock {
  id: string;
  article_nom: string;
  stock_actuel: number;
  seuil_alerte_critique: number;
  zone_emplacement: string;
}

export default function TMABar() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [scanning, setScanning] = useState(false);
  const [lastSale, setLastSale] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { telegramUserId, isOnline, addToQueue } = useTMAStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const load = async () => {
      const { data: user } = await supabase
        .from('utilisateurs_terrain')
        .select('event_id')
        .eq('id_telegram', telegramUserId ?? 0)
        .single();

      if (user?.event_id) {
        const { data } = await supabase
          .from('bar_stocks')
          .select('*')
          .eq('event_id', user.event_id)
          .order('zone_emplacement');
        setStocks(data ?? []);
      }
      setLoading(false);
    };

    // Écoute réseau
    const handleOnline = () => useTMAStore.getState().setOnline(true);
    const handleOffline = () => useTMAStore.getState().setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (telegramUserId) load(); else setLoading(false);


    // Realtime Supabase pour updates du stock en live
    const channel = supabase
      .channel('bar_stocks_updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'bar_stocks' }, (payload) => {
        setStocks((prev) => prev.map((s) => s.id === payload.new.id ? { ...s, ...payload.new } : s));
      })
      .subscribe();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      supabase.removeChannel(channel);
    };
  }, [telegramUserId]);

  const handleManualSale = async (stock: Stock, qty: number = 1) => {
    const newStock = stock.stock_actuel - qty;
    // Mise à jour optimiste
    setStocks((prev) => prev.map((s) => s.id === stock.id ? { ...s, stock_actuel: newStock } : s));
    setLastSale(`✓ ${stock.article_nom} — Vendu x${qty}`);
    setTimeout(() => setLastSale(null), 2500);

    if (isOnline) {
      await supabase.from('bar_stocks').update({ stock_actuel: newStock, updated_at: new Date().toISOString() }).eq('id', stock.id);
    } else {
      addToQueue({ type: 'bar_sale', payload: { stockId: stock.id, qty } });
    }
  };

  const getStockColor = (stock: Stock) => {
    const ratio = stock.stock_actuel / (stock.seuil_alerte_critique * 2);
    if (stock.stock_actuel <= 0) return { bar: '#555', bg: '#111', text: '#666', status: '⚠ ÉPUISÉ' };
    if (stock.stock_actuel <= stock.seuil_alerte_critique) return { bar: '#EF4444', bg: '#1A0000', text: '#EF4444', status: '🚨 CRITIQUE' };
    if (ratio < 0.6) return { bar: '#F97316', bg: '#1A0D00', text: '#F97316', status: '⚠ BAS' };
    return { bar: '#10B981', bg: '#001A0A', text: '#10B981', status: '✓ OK' };
  };

  return (
    <div style={{ padding: '1rem', background: '#0A0A0A', minHeight: '100dvh' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pôle</div>
        <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>🍺 Bar & Stocks</div>
      </div>

      {/* Toast de confirmation */}
      {lastSale && (
        <div style={{
          position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)',
          background: '#10B981', color: '#000', padding: '0.8rem 1.5rem',
          borderRadius: '30px', fontWeight: 800, fontSize: '0.9rem', zIndex: 999,
          animation: 'slideIn 0.3s ease', boxShadow: '0 8px 24px rgba(16,185,129,0.4)'
        }}>
          {lastSale}
        </div>
      )}

      {/* Grille des stocks */}
      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', paddingTop: '3rem' }}>Chargement des stocks...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {stocks.map((stock) => {
            const colors = getStockColor(stock);
            const pct = Math.min(100, Math.round((stock.stock_actuel / Math.max(stock.seuil_alerte_critique * 2, 1)) * 100));
            return (
              <div key={stock.id} style={{
                background: colors.bg, border: `1px solid ${colors.bar}33`,
                borderRadius: '16px', padding: '1rem', animation: 'slideIn 0.3s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem' }}>{stock.article_nom}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>📍 {stock.zone_emplacement}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: colors.text }}>{stock.stock_actuel}</div>
                    <div style={{ fontSize: '0.6rem', color: colors.text, fontWeight: 700 }}>{colors.status}</div>
                  </div>
                </div>

                {/* Barre de progression */}
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginBottom: '0.8rem', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: colors.bar, borderRadius: '3px', transition: 'width 0.5s ease' }} />
                </div>

                {/* Boutons vente rapide */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 5, 10].map((qty) => (
                    <button key={qty} onClick={() => handleManualSale(stock, qty)}
                      disabled={stock.stock_actuel <= 0}
                      style={{
                        flex: 1, padding: '0.7rem', borderRadius: '10px', border: 'none',
                        background: stock.stock_actuel <= 0 ? '#222' : 'rgba(255,255,255,0.08)',
                        color: stock.stock_actuel <= 0 ? '#444' : '#fff',
                        fontWeight: 700, fontSize: '0.85rem', cursor: stock.stock_actuel <= 0 ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s'
                      }}>
                      -{qty}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Statut offline */}
      {!isOnline && (
        <div style={{
          position: 'fixed', bottom: '1rem', left: '1rem', right: '1rem',
          background: '#F97316', borderRadius: '12px', padding: '0.8rem 1rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          fontWeight: 700, fontSize: '0.85rem', color: '#000'
        }}>
          ⚡ Mode hors-ligne — Les ventes seront synchronisées au retour du réseau
        </div>
      )}
    </div>
  );
}
