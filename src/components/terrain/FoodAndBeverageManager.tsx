'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { AlertTriangle, TrendingDown, CheckCircle2, Beer, Droplet, CupSoda } from 'lucide-react';

const mockInventory = [
  { name: 'Fûts Bière', stock: 8, seuil: 15, max: 100, icon: Beer },
  { name: 'Gobelets', stock: 25, seuil: 30, max: 100, icon: CupSoda },
  { name: 'Bouteilles Eau', stock: 80, seuil: 20, max: 100, icon: Droplet },
  { name: 'Softs', stock: 45, seuil: 20, max: 100, icon: CupSoda },
];

export default function FoodAndBeverageManager() {
  
  const getStatusColor = (stock: number) => {
    if (stock < 10) return '#EF4444'; // Rouge
    if (stock < 30) return '#F59E0B'; // Orange
    return '#10B981'; // Vert
  };

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      
      {/* HEADER & ALERTES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#FEF2F2', padding: '1.5rem', borderRadius: '16px', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', gap: '1rem', animation: 'pulse 2s infinite' }}>
          <AlertTriangle size={32} color="#EF4444" />
          <div>
            <h4 style={{ margin: 0, color: '#991B1B', fontSize: '0.9rem', fontWeight: 800 }}>Rupture Imminente</h4>
            <p style={{ margin: 0, color: '#DC2626', fontSize: '1.2rem', fontWeight: 900 }}>Fûts de Bière (8%)</p>
          </div>
        </div>
        
        <div style={{ backgroundColor: '#FEF3C7', padding: '1.5rem', borderRadius: '16px', border: '1px solid #FDE68A', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <TrendingDown size={32} color="#F59E0B" />
          <div>
            <h4 style={{ margin: 0, color: '#92400E', fontSize: '0.9rem', fontWeight: 800 }}>À réapprovisionner</h4>
            <p style={{ margin: 0, color: '#D97706', fontSize: '1.2rem', fontWeight: 900 }}>Gobelets (25%)</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#ECFDF5', padding: '1.5rem', borderRadius: '16px', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <CheckCircle2 size={32} color="#10B981" />
          <div>
            <h4 style={{ margin: 0, color: '#065F46', fontSize: '0.9rem', fontWeight: 800 }}>Stock Sécurisé</h4>
            <p style={{ margin: 0, color: '#059669', fontSize: '1.2rem', fontWeight: 900 }}>Eau &amp; Softs (&gt;40%)</p>
          </div>
        </div>
      </div>

      {/* GRAPHIQUE DES STOCKS */}
      <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#1A1A1A' }}>Niveaux de Stocks (Temps Réel)</h3>
        <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 2rem 0' }}>La jauge indique le pourcentage restant. Surveillez les éléments sous la ligne critique.</p>
        
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockInventory}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontWeight: 700, fill: '#666' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontWeight: 700, fill: '#666' }} domain={[0, 100]} />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontWeight: 800 }}
              />
              <ReferenceLine y={20} stroke="#EF4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Seuil Critique (20%)', fill: '#EF4444', fontWeight: 800, fontSize: 12 }} />
              
              <Bar dataKey="stock" radius={[8, 8, 0, 0]} maxBarSize={60}>
                {mockInventory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getStatusColor(entry.stock)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
