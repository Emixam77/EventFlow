'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { AlertCircle, CheckCircle2, Clock, Activity, ArrowRight, UserCheck } from 'lucide-react';

const mockKPIs = {
  total: 60,
  terminees: 45,
  enCours: 12,
  bloquantes: 3
};

const pieData = [
  { name: 'Terminées', value: mockKPIs.terminees, color: '#10B981' },
  { name: 'En cours', value: mockKPIs.enCours, color: '#F59E0B' },
  { name: 'Bloquantes', value: mockKPIs.bloquantes, color: '#EF4444' }
];

const mockDominos = [
  {
    id: 'd1',
    title: 'Livraison Fûts de bière',
    coordinateur: 'Julien (Logistique)',
    status: 'en_cours',
    impact: 'Bloque l\'ouverture du Bar 1',
    time: '14h00'
  },
  {
    id: 'd2',
    title: 'Ouverture Bar 1',
    coordinateur: 'Sophie (Bar)',
    status: 'bloque',
    dependance: 'd1',
    impact: 'Perte de chiffre d\'affaires potentielle',
    time: '15h00'
  },
  {
    id: 'd3',
    title: 'Installation Scanners VIP',
    coordinateur: 'Marc (Accueil)',
    status: 'bloque',
    dependance: null,
    impact: 'File d\'attente VIP',
    time: '15h30'
  },
  {
    id: 'd4',
    title: 'Brief Bénévoles',
    coordinateur: 'Léa (RH)',
    status: 'termine',
    dependance: null,
    impact: 'Prêt au déploiement',
    time: '13h00'
  }
];

export default function TachesManager({ userRole }: { userRole: string }) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'bloque' | 'en_cours'>('all');

  const filteredDominos = mockDominos.filter(d => activeFilter === 'all' || d.status === activeFilter);

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      
      {/* LIGNE TOP : JAUGE ET KPIS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '3rem' }}>
        
        {/* WIDGET : PROGRESSION GLOBALE (Jauge/Donut) */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1rem 0', color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} /> Progression Globale
          </h3>
          
          <div style={{ width: '100%', height: '200px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 700 }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Pourcentage au centre du Donut */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1A1A', lineHeight: 1 }}>{Math.round((mockKPIs.terminees / mockKPIs.total) * 100)}%</div>
              <div style={{ fontSize: '0.7rem', color: '#666', fontWeight: 700, textTransform: 'uppercase' }}>Prêt</div>
            </div>
          </div>
        </div>

        {/* WIDGET : KPIs RAPIDES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div style={{ backgroundColor: '#ECFDF5', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid #A7F3D0' }}>
            <CheckCircle2 size={32} color="#10B981" style={{ marginBottom: '1rem' }} />
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#065F46', lineHeight: 1 }}>{mockKPIs.terminees}</div>
            <div style={{ fontSize: '0.9rem', color: '#059669', fontWeight: 700, marginTop: '0.5rem' }}>Tâches Terminées</div>
          </div>
          
          <div style={{ backgroundColor: '#FEF3C7', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid #FDE68A' }}>
            <Clock size={32} color="#F59E0B" style={{ marginBottom: '1rem' }} />
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#92400E', lineHeight: 1 }}>{mockKPIs.enCours}</div>
            <div style={{ fontSize: '0.9rem', color: '#D97706', fontWeight: 700, marginTop: '0.5rem' }}>En Cours</div>
          </div>

          <div style={{ backgroundColor: '#FEF2F2', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid #FECACA', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: '#EF4444' }} />
            <AlertCircle size={32} color="#EF4444" style={{ marginBottom: '1rem', animation: 'pulse 2s infinite' }} />
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#991B1B', lineHeight: 1 }}>{mockKPIs.bloquantes}</div>
            <div style={{ fontSize: '0.9rem', color: '#DC2626', fontWeight: 700, marginTop: '0.5rem' }}>Alertes Bloquantes</div>
          </div>
        </div>
      </div>

      {/* LIGNE BOTTOM : SYSTÈME DE DOMINOS (DÉPENDANCES) */}
      <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#1A1A1A' }}>Chaîne de Dépendances (Dominos)</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Visualisez les points de blocage entre les coordinateurs et les bénévoles.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setActiveFilter('all')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: activeFilter === 'all' ? 'none' : '1px solid #E5E7EB', backgroundColor: activeFilter === 'all' ? '#1A1A1A' : 'white', color: activeFilter === 'all' ? 'white' : '#666', fontWeight: 700, cursor: 'pointer' }}>Tout</button>
            <button onClick={() => setActiveFilter('bloque')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: activeFilter === 'bloque' ? 'none' : '1px solid #FECACA', backgroundColor: activeFilter === 'bloque' ? '#FEF2F2' : 'white', color: activeFilter === 'bloque' ? '#EF4444' : '#EF4444', fontWeight: 700, cursor: 'pointer' }}>Bloqué</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredDominos.map((domino, idx) => (
            <div key={domino.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              
              {/* Le "Domino" Card */}
              <div style={{ flex: 1, backgroundColor: domino.status === 'bloque' ? '#FEF2F2' : domino.status === 'en_cours' ? '#FEF3C7' : '#ECFDF5', border: `1px solid ${domino.status === 'bloque' ? '#FECACA' : domino.status === 'en_cours' ? '#FDE68A' : '#A7F3D0'}`, borderRadius: '16px', padding: '1.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.8rem', fontWeight: 800, color: domino.status === 'bloque' ? '#EF4444' : domino.status === 'en_cours' ? '#F59E0B' : '#10B981', backgroundColor: 'white', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                  {domino.time}
                </div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#1A1A1A' }}>{domino.title}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#666', fontSize: '0.85rem', fontWeight: 600 }}>
                    <UserCheck size={14} /> Coordinateur : {domino.coordinateur}
                  </div>
                  {domino.status === 'bloque' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#DC2626', fontSize: '0.85rem', fontWeight: 700 }}>
                      <AlertCircle size={14} /> Impact : {domino.impact}
                    </div>
                  )}
                </div>
              </div>

              {/* Flèche de dépendance (Sauf pour le dernier) */}
              {idx < filteredDominos.length - 1 && domino.status !== 'termine' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#D1D5DB' }}>
                  <ArrowRight size={24} />
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, marginTop: '0.2rem' }}>Bloque</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
