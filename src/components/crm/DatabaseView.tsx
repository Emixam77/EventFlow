'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, Ticket, Euro, Download, Search, CheckCircle2, XCircle, MoreHorizontal } from 'lucide-react';

const mockSalesData = [
  { name: 'Lun', ventes: 120 },
  { name: 'Mar', ventes: 350 },
  { name: 'Mer', ventes: 420 },
  { name: 'Jeu', ventes: 800 },
  { name: 'Ven', ventes: 1250 },
  { name: 'Sam', ventes: 2800 },
  { name: 'Dim', ventes: 3500 },
];

const mockCustomers = [
  { id: '1', nom: 'Dubois', prenom: 'Antoine', email: 'antoine.d@example.com', tel: '+33 6 12 34 56 78', type: 'VIP Pass 3 Jours', status: 'Envoyé', color: '#8B5CF6', bgColor: '#EDE9FE' },
  { id: '2', nom: 'Martin', prenom: 'Léa', email: 'lea.m@example.com', tel: '+33 6 98 76 54 32', type: 'Early Bird Samedi', status: 'Envoyé', color: '#10B981', bgColor: '#ECFDF5' },
  { id: '3', nom: 'Bernard', prenom: 'Thomas', email: 'thomas.b@example.com', tel: '+33 6 11 22 33 44', type: 'Regular Dimanche', status: 'Erreur Email', color: '#EF4444', bgColor: '#FEF2F2' },
  { id: '4', nom: 'Petit', prenom: 'Julie', email: 'julie.p@example.com', tel: '+33 6 55 44 33 22', type: 'VIP Pass 3 Jours', status: 'Envoyé', color: '#8B5CF6', bgColor: '#EDE9FE' },
  { id: '5', nom: 'Robert', prenom: 'Lucas', email: 'lucas.r@example.com', tel: '+33 6 99 88 77 66', type: 'Regular Samedi', status: 'Envoyé', color: '#3B82F6', bgColor: '#EFF6FF' },
  { id: '6', nom: 'Richard', prenom: 'Emma', email: 'emma.r@example.com', tel: '+33 6 77 88 99 00', type: 'Early Bird Dimanche', status: 'Envoyé', color: '#10B981', bgColor: '#ECFDF5' },
];

export default function DatabaseView() {
  return (
    <div>
      {/* KPIs & Graphique */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* Colonne KPIs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '1.5rem', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Euro size={28} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Chiffre d'Affaires</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1A1A' }}>145 200 €</div>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '1.5rem', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ticket size={28} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Billets Vendus</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1A1A' }}>4 840</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '1.5rem', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={28} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Taux de Remplissage</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1A1A' }}>96.8 %</div>
            </div>
          </div>
        </div>

        {/* Graphique des Ventes */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 1.5rem 0', color: '#1A1A1A' }}>Évolution des Ventes (Derniers 7 jours)</h3>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockSalesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eb8e24" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#eb8e24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontWeight: 600 }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 800, color: '#eb8e24' }}
                />
                <Area type="monotone" dataKey="ventes" stroke="#eb8e24" strokeWidth={3} fillOpacity={1} fill="url(#colorVentes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tableau CRM */}
      <div style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        
        {/* Toolbar du tableau */}
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" placeholder="Rechercher un festivalier..." style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '12px', border: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', outline: 'none', fontSize: '0.9rem' }} />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', backgroundColor: '#1A1A1A', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <Download size={16} /> Exporter CSV
          </button>
        </div>

        {/* Tableau */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <th style={{ padding: '1rem 2rem', color: '#6B7280', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>Client</th>
                <th style={{ padding: '1rem 2rem', color: '#6B7280', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>Contact</th>
                <th style={{ padding: '1rem 2rem', color: '#6B7280', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>Type de Billet</th>
                <th style={{ padding: '1rem 2rem', color: '#6B7280', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>Statut Billet</th>
                <th style={{ padding: '1rem 2rem', color: '#6B7280', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer, idx) => (
                <tr key={customer.id} style={{ borderBottom: idx === mockCustomers.length - 1 ? 'none' : '1px solid #E5E7EB', transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '1rem 2rem' }}>
                    <div style={{ fontWeight: 800, color: '#1A1A1A' }}>{customer.prenom} {customer.nom}</div>
                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>#{customer.id.padStart(5, '0')}</div>
                  </td>
                  <td style={{ padding: '1rem 2rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#4B5563', marginBottom: '0.2rem' }}>{customer.email}</div>
                    <div style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>{customer.tel}</div>
                  </td>
                  <td style={{ padding: '1rem 2rem' }}>
                    <span style={{ backgroundColor: customer.bgColor, color: customer.color, padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800 }}>
                      {customer.type}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 2rem' }}>
                    {customer.status === 'Envoyé' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontWeight: 700, fontSize: '0.9rem' }}>
                        <CheckCircle2 size={16} /> Envoyé
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EF4444', fontWeight: 700, fontSize: '0.9rem' }}>
                        <XCircle size={16} /> Erreur
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '1rem 2rem', color: '#9CA3AF', cursor: 'pointer' }}>
                    <MoreHorizontal size={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
