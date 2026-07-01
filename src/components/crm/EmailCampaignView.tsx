'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Mail, Send, Eye, MousePointerClick, AlertTriangle, LayoutTemplate, FileText } from 'lucide-react';

const mockEmailStats = [
  { name: 'Lun', ouvertures: 2400, clics: 1200 },
  { name: 'Mar', ouvertures: 1398, clics: 800 },
  { name: 'Mer', ouvertures: 9800, clics: 4500 },
  { name: 'Jeu', ouvertures: 3908, clics: 1800 },
  { name: 'Ven', ouvertures: 4800, clics: 2200 },
];

export default function EmailCampaignView() {
  const [subject, setSubject] = useState('Vos billets & Le plan du festival 🗺️');

  return (
    <div>
      {/* HEADER EMAIL */}
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #E5E7EB', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FDF2F8', color: '#DB2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mail size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1A1A1A' }}>Emailing Pro</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>Délivrabilité optimisée (SendGrid Engine)</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1A1A1A' }}>4 840</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Abonnés Actifs</div>
          </div>
          <div style={{ width: '1px', backgroundColor: '#E5E7EB' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10B981' }}>99.2%</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Réputation IP</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* COLONNE GAUCHE : ÉDITEUR D'EMAIL */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 1.5rem 0', color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} /> Créer une newsletter
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.5rem' }}>Sujet de l'email</label>
            <input 
              type="text" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', outline: 'none', fontSize: '0.95rem', fontWeight: 600, color: '#1A1A1A' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.5rem' }}>
              Contenu
              <button style={{ background: 'none', border: 'none', color: '#8B5CF6', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <LayoutTemplate size={14} /> Utiliser un modèle
              </button>
            </label>
            <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
              {/* Fake Toolbar */}
              <div style={{ backgroundColor: '#F3F4F6', padding: '0.5rem 1rem', borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '0.5rem' }}>
                <div style={{ fontWeight: 800, color: '#4B5563', cursor: 'pointer' }}>B</div>
                <div style={{ fontStyle: 'italic', color: '#4B5563', cursor: 'pointer' }}>I</div>
                <div style={{ textDecoration: 'underline', color: '#4B5563', cursor: 'pointer' }}>U</div>
                <div style={{ width: '1px', backgroundColor: '#D1D5DB', margin: '0 0.5rem' }} />
                <div style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '2px' }}>🔗 Lien</div>
              </div>
              <textarea 
                defaultValue="Bonjour {{prenom}},&#13;&#10;&#13;&#10;Le festival approche à grands pas ! Voici en pièce jointe votre QR Code d'accès (à ne surtout pas partager).&#13;&#10;&#13;&#10;Vous trouverez également ci-dessous le plan officiel du site pour retrouver facilement vos scènes préférées.&#13;&#10;&#13;&#10;L'équipe EventFlow."
                style={{ width: '100%', height: '180px', padding: '1rem', border: 'none', outline: 'none', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'none', lineHeight: 1.6 }}
              />
            </div>
          </div>

          <button style={{ width: '100%', padding: '1rem', backgroundColor: '#DB2777', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'opacity 0.2s', boxShadow: '0 4px 15px rgba(219, 39, 119, 0.3)' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <Send size={18} /> Programmer l'envoi
          </button>
        </div>

        {/* COLONNE DROITE : STATISTIQUES RECHARTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* KPI RAPIDES */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '1.5rem', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <Eye size={24} color="#8B5CF6" />
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1A1A', lineHeight: 1 }}>68.4%</div>
              <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 700 }}>Taux d'ouverture moyen</div>
            </div>
            
            <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '1.5rem', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <MousePointerClick size={24} color="#3B82F6" />
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1A1A', lineHeight: 1 }}>24.1%</div>
              <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 700 }}>Taux de clics (CTR)</div>
            </div>
          </div>

          {/* GRAPHIQUE PERFORMANCE */}
          <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1rem 0', color: '#1A1A1A' }}>Performance des Campagnes</h3>
            <div style={{ flex: 1, minHeight: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockEmailStats} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOuv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClics" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }} />
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} itemStyle={{ fontWeight: 800 }} />
                  <Area type="monotone" dataKey="ouvertures" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorOuv)" name="Ouvertures" />
                  <Area type="monotone" dataKey="clics" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorClics)" name="Clics" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#FEF2F2', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.8rem', border: '1px solid #FECACA' }}>
              <AlertTriangle size={20} color="#EF4444" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#991B1B' }}>Bounces / Rejets (0.8%)</div>
                <div style={{ fontSize: '0.8rem', color: '#DC2626' }}>38 emails n'ont pas pu être délivrés cette semaine.</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
