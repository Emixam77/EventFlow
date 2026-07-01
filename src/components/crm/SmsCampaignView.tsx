'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { MessageSquare, Send, Smartphone, AlertCircle, Phone, CheckCircle2, Users } from 'lucide-react';

const mockSmsStats = {
  envoyes: 4840,
  delivres: 4790,
  clics: 3120,
};

const pieData = [
  { name: 'Délivrés', value: mockSmsStats.delivres, color: '#10B981' },
  { name: 'Non Délivrés (Erreur)', value: mockSmsStats.envoyes - mockSmsStats.delivres, color: '#EF4444' }
];

const barData = [
  { name: '10h', clics: 120 },
  { name: '11h', clics: 450 },
  { name: '12h', clics: 890 },
  { name: '13h', clics: 1200 },
  { name: '14h', clics: 460 },
];

export default function SmsCampaignView() {
  const [message, setMessage] = useState("🚨 Alerte Info : Suite aux conditions météo, l'ouverture des portes est décalée à 18h00. Préparez vos QR codes ! À tout de suite. L'équipe EventFlow.");

  return (
    <div>
      {/* HEADER TWILIO */}
      <div style={{ backgroundColor: '#1A1A1A', color: 'white', padding: '1rem 1.5rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>💬</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Intégration Twilio Active</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#A1A1AA' }}>Vous envoyez des messages via le numéro vérifié : +33 6 44 33 22 11</p>
          </div>
        </div>
        <div style={{ padding: '0.4rem 0.8rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={14} /> Connecté
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* COLONNE GAUCHE : ÉDITEUR */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={18} /> Nouvelle Campagne SMS
          </h3>
          <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 2rem 0' }}>Rédigez votre message. Attention, 1 SMS = 160 caractères.</p>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.5rem' }}>Destinataires</label>
            <div style={{ padding: '0.8rem 1rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '0.9rem', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={16} color="#6B7280" /> Tous les acheteurs (4 840 contacts)
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.5rem' }}>
              Message
              <span style={{ color: message.length > 160 ? '#EF4444' : '#6B7280', fontWeight: 600 }}>{message.length} / 160 chars</span>
            </label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '100%', height: '120px', padding: '1rem', borderRadius: '12px', border: message.length > 160 ? '2px solid #EF4444' : '1px solid #E5E7EB', backgroundColor: '#F9FAFB', outline: 'none', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'none' }}
            />
            {message.length > 160 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#EF4444', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 600 }}>
                <AlertCircle size={14} /> Attention : Ce message comptera comme 2 SMS par destinataire.
              </div>
            )}
          </div>

          <button style={{ width: '100%', padding: '1rem', backgroundColor: '#1A1A1A', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <Send size={18} /> Envoyer la campagne (Simulation)
          </button>
        </div>

        {/* COLONNE DROITE : APERÇU IPHONE */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '300px', height: '600px', backgroundColor: '#F3F4F6', borderRadius: '40px', border: '12px solid #1A1A1A', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Notch */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '25px', backgroundColor: '#1A1A1A', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', zIndex: 10 }} />
            
            {/* Header iMessage */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', paddingTop: '2.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.2rem' }}>
                <Phone size={20} color="#9CA3AF" />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1A1A1A' }}>EventFlow</div>
            </div>

            {/* Content iMessage */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '1rem', backgroundColor: '#F9FAFB' }}>
              <div style={{ alignSelf: 'center', fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 600 }}>Aujourd'hui 14:02</div>
              <div style={{ alignSelf: 'flex-start', backgroundColor: '#E5E5EA', color: 'black', padding: '0.8rem 1rem', borderRadius: '18px', borderBottomLeftRadius: '4px', maxWidth: '85%', fontSize: '0.9rem', lineHeight: 1.4 }}>
                {message || 'Écrivez un message...'}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RÉSULTATS DE LA DERNIÈRE CAMPAGNE */}
      <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 2rem 0', color: '#1A1A1A' }}>Statistiques : Dernière campagne (App Cashless)</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
          
          {/* Taux de délivrabilité (Pie) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: '#4B5563' }}>Délivrabilité</h4>
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
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} itemStyle={{ fontWeight: 700 }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1A1A1A', lineHeight: 1 }}>98.9%</div>
              </div>
            </div>
          </div>

          {/* Clics sur le lien (Bar) */}
          <div>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: '#4B5563' }}>Clics générés (Lien App Cashless)</h4>
            <div style={{ width: '100%', height: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontWeight: 600 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontWeight: 600 }} />
                  <RechartsTooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} itemStyle={{ fontWeight: 800, color: '#3B82F6' }} />
                  <Bar dataKey="clics" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
