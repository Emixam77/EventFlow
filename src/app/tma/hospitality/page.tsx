'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useTMAStore } from '@/lib/offline-store';

interface Artist {
  id: string;
  nom_artiste: string;
  heure_show: string;
  heure_balances: string;
  statut_logistique: string;
  vol_reference?: string;
  shuttles_chauffeurs: Array<{
    id: string;
    lieu_depart: string;
    lieu_arrivee: string;
    heure_depart_prevue: string;
    statut_course: string;
  }>;
}

interface AIReport {
  alerte: string;
  impact: string;
  balances_maintenues: boolean;
  plan_a: { titre: string; description: string; heure_arrivee_estimee: string };
  plan_b: { titre: string; description: string; heure_arrivee_estimee: string };
}

const STATUT_COLORS: Record<string, string> = {
  'En vol': '#3B82F6',
  'Arrivé': '#10B981',
  'En navette': '#F97316',
  'Loges': '#8B5CF6',
};

export default function TMAHospitality() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [aiReport, setAiReport] = useState<AIReport | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [retardMinutes, setRetardMinutes] = useState(30);
  const { telegramUserId } = useTMAStore();

  useEffect(() => {
    const load = async () => {
      const { data: user } = await supabase
        .from('utilisateurs_terrain')
        .select('event_id')
        .eq('id_telegram', telegramUserId ?? 0)
        .single();

      if (user?.event_id) {
        const { data } = await supabase
          .from('artistes_flux')
          .select('*, shuttles_chauffeurs(*)')
          .eq('event_id', user.event_id)
          .order('heure_show');
        setArtists(data ?? []);
      }
      setLoading(false);
    };

    if (telegramUserId) load(); else setLoading(false);
  }, [telegramUserId]);

  const updateArtistStatus = async (artistId: string, statut: string) => {
    setArtists((prev) => prev.map((a) => a.id === artistId ? { ...a, statut_logistique: statut } : a));
    await supabase.from('artistes_flux').update({ statut_logistique: statut }).eq('id', artistId);
  };

  const runAIAgent = async () => {
    if (!selectedArtist) return;
    setAiLoading(true);
    setAiReport(null);

    try {
      const res = await fetch('/api/tma/ai-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artiste: {
            nom: selectedArtist.nom_artiste,
            heure_show: selectedArtist.heure_show,
            heure_balances: selectedArtist.heure_balances,
          },
          retard_minutes: retardMinutes,
          vol_reference: selectedArtist.vol_reference ?? 'N/A',
        }),
      });

      const report = await res.json();
      setAiReport(report);
    } catch (e) {
      setAiReport({
        alerte: "Connexion à l'agent IA impossible.",
        impact: "Vérifiez votre connexion réseau.",
        balances_maintenues: false,
        plan_a: { titre: 'N/A', description: 'Hors ligne', heure_arrivee_estimee: '--:--' },
        plan_b: { titre: 'N/A', description: 'Hors ligne', heure_arrivee_estimee: '--:--' },
      });
    } finally {
      setAiLoading(false);
    }
  };

  const formatTime = (iso: string) =>
    iso ? new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '--:--';

  return (
    <div style={{ padding: '1rem', background: '#0A0A0A', minHeight: '100dvh' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pôle</div>
        <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>🎤 Hospitality</div>
      </div>

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', paddingTop: '3rem' }}>Chargement du line-up...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {artists.map((artist) => {
            const color = STATUT_COLORS[artist.statut_logistique] ?? '#666';
            return (
              <div key={artist.id} style={{
                background: `${color}11`, border: `1px solid ${color}44`,
                borderRadius: '16px', padding: '1rem', animation: 'slideIn 0.3s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>{artist.nom_artiste}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.2rem' }}>
                      🎸 Balances : {formatTime(artist.heure_balances)} · 🎤 Show : {formatTime(artist.heure_show)}
                    </div>
                    {artist.vol_reference && (
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.1rem' }}>✈ {artist.vol_reference}</div>
                    )}
                  </div>
                  <span style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 700, background: `${color}22`, color }}>
                    {artist.statut_logistique}
                  </span>
                </div>

                {/* Mise à jour statut */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                  {['En vol', 'Arrivé', 'En navette', 'Loges'].filter(s => s !== artist.statut_logistique).map((statut) => (
                    <button key={statut} onClick={() => updateArtistStatus(artist.id, statut)} style={{
                      padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none',
                      background: 'rgba(255,255,255,0.08)', color: '#fff',
                      fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer'
                    }}>
                      {statut}
                    </button>
                  ))}
                </div>

                {/* Agent IA */}
                <button onClick={() => { setSelectedArtist(artist); setAiReport(null); }} style={{
                  width: '100%', padding: '0.7rem', borderRadius: '10px',
                  background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.4)',
                  color: '#A78BFA', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer'
                }}>
                  🤖 Simuler un retard (Agent IA)
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Agent IA */}
      {selectedArtist && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)',
          display: 'flex', alignItems: 'flex-end', zIndex: 999
        }} onClick={() => { setSelectedArtist(null); setAiReport(null); }}>
          <div style={{
            width: '100%', background: '#111', borderRadius: '24px 24px 0 0',
            padding: '1.5rem', maxHeight: '85dvh', overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.3rem' }}>🤖 Agent Hospitality IA</div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
              Artiste : <strong style={{ color: '#A78BFA' }}>{selectedArtist.nom_artiste}</strong>
            </div>

            <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>
              Retard estimé : <strong style={{ color: '#F97316' }}>{retardMinutes} minutes</strong>
            </label>
            <input type="range" min={5} max={180} step={5} value={retardMinutes}
              onChange={(e) => setRetardMinutes(Number(e.target.value))}
              style={{ width: '100%', marginBottom: '1rem', accentColor: '#F97316' }} />

            <button onClick={runAIAgent} disabled={aiLoading} style={{
              width: '100%', padding: '1rem', borderRadius: '12px', border: 'none',
              background: aiLoading ? '#333' : 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
              color: '#fff', fontWeight: 800, fontSize: '0.95rem', cursor: aiLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
            }}>
              {aiLoading ? (
                <>
                  <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite', display: 'inline-block' }} />
                  L'agent analyse la situation...
                </>
              ) : '⚡ Analyser l\'impact'}
            </button>

            {/* Rapport IA */}
            {aiReport && (
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'slideIn 0.4s ease' }}>
                <div style={{ background: '#1A0000', border: '1px solid #EF4444', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#EF4444', fontWeight: 700, marginBottom: '0.3rem' }}>🚨 ALERTE</div>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{aiReport.alerte}</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: '0.3rem' }}>📊 IMPACT</div>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{aiReport.impact}</p>
                  <div style={{ marginTop: '0.5rem', padding: '0.4rem 0.8rem', borderRadius: '8px', display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, background: aiReport.balances_maintenues ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: aiReport.balances_maintenues ? '#10B981' : '#EF4444' }}>
                    Balances : {aiReport.balances_maintenues ? '✓ Maintenues' : '✗ Compromises'}
                  </div>
                </div>

                {[aiReport.plan_a, aiReport.plan_b].map((plan, i) => (
                  <div key={i} style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '12px', padding: '1rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#A78BFA', fontWeight: 700, marginBottom: '0.3rem' }}>
                      Plan {i === 0 ? 'A' : 'B'} — Arrivée estimée : {plan.heure_arrivee_estimee}
                    </div>
                    <div style={{ fontWeight: 800, marginBottom: '0.3rem' }}>{plan.titre}</div>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{plan.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
