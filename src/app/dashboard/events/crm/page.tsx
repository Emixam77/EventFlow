'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, MessageSquare, Mail, Database } from 'lucide-react';

import DatabaseView from '@/components/crm/DatabaseView';
import SmsCampaignView from '@/components/crm/SmsCampaignView';
import EmailCampaignView from '@/components/crm/EmailCampaignView';
import AvantagesCrm from '@/components/crm/AvantagesCrm';
import PricingModal from '@/components/PricingModal';

const TABS = [
  { id: 'database', label: '📊 Base de Données', description: 'Gestion des festivaliers et suivi des ventes', icon: Database },
  { id: 'sms', label: '💬 Campagnes SMS (Twilio)', description: 'Communication d\'urgence & infos pratiques', icon: MessageSquare },
  { id: 'email', label: '✉️ Emailing', description: 'Newsletters et envois des billets', icon: Mail },
  { id: 'avantages', label: '🚀 Pourquoi passer Pro ?', description: 'Découvrez la puissance de l\'écosystème CRM', icon: Users },
];

export default function CrmPage() {
  const [activeTab, setActiveTab] = useState('database');
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const currentTab = TABS.find(t => t.id === activeTab);

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
      
      {/* Header & Retour */}
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/dashboard/events/builder" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#666', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.5rem', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#1A1A1A'} onMouseLeave={e => e.currentTarget.style.color = '#666'}>
          <ArrowLeft size={16} /> Retour à l'Éditeur (EventBuilder)
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'linear-gradient(135deg, #1A1A1A, #333)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <Users size={24} color="#eb8e24" />
          </div>
          <div>
            <h1 style={{ fontWeight: 900, fontSize: '1.8rem', margin: 0, color: '#1A1A1A' }}>Back-office & CRM</h1>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: 0 }}>
              {currentTab?.description}
            </p>
          </div>
          <div style={{ marginLeft: 'auto', background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: '8px', padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 800, color: '#065F46', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            Synchronisation Google Sheets Active
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div style={{ display: 'flex', borderBottom: '2px solid #E5E7EB', marginBottom: '2rem', overflowX: 'auto', gap: '2rem' }}>
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 0',
                border: 'none',
                borderBottom: isActive ? '3px solid #1A1A1A' : '3px solid transparent',
                marginBottom: '-2px',
                background: 'none',
                cursor: 'pointer',
                fontWeight: isActive ? 800 : 600,
                color: isActive ? '#1A1A1A' : '#6B7280',
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={18} color={isActive ? '#eb8e24' : '#9CA3AF'} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Contenu de l'onglet actif */}
      <div style={{ animation: 'fadeUp 0.4s ease' }}>
        {activeTab === 'database' && <DatabaseView />}
        {activeTab === 'sms' && <SmsCampaignView />}
        {activeTab === 'email' && <EmailCampaignView />}
        {activeTab === 'avantages' && <AvantagesCrm onOpenPricing={() => setIsPricingModalOpen(true)} />}
      </div>

      {/* MODAL TARIFS */}
      <PricingModal isOpen={isPricingModalOpen} onClose={() => setIsPricingModalOpen(false)} />
    </div>
  );
}
