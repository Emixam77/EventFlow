'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import EquipeManager from '@/components/terrain/EquipeManager';
import TachesManager from '@/components/terrain/TachesManager';
import FoodAndBeverageManager from '@/components/terrain/FoodAndBeverageManager';
import HospitalityManager from '@/components/terrain/HospitalityManager';
import AvantagesPro from '@/components/terrain/AvantagesPro';
import PricingModal from '@/components/PricingModal';

const TABS = [
  { id: 'equipe', label: '👥 Équipes & Pôles', description: 'Mode Démo : Découvrez la gestion des équipes' },
  { id: 'taches', label: '🎯 Tâches & Domino', description: 'Planifiez les missions et chaînes de dépendances' },
  { id: 'fnb', label: '🍺 Bar & Restauration', description: 'Stocks, alertes et horaires de service' },
  { id: 'hospitality', label: '🎤 Hospitality', description: 'Mode Démo : Logistique Tête d\'Affiche' },
  { id: 'avantages', label: '🚀 Pourquoi passer Pro ?', description: 'Découvrez la puissance du module Terrain' },
];

export default function TerrainPage() {
  const [activeTab, setActiveTab] = useState('equipe');
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  useEffect(() => {
    // POUR LE TEST : Accès Pro forcé
    setHasAccess(true);
    // En production, décommenter la vérification Supabase ci-dessous :
    // const checkAccess = async () => {
    //   const { data } = await supabase
    //     .from('event_subscriptions')
    //     .select('has_terrain_module')
    //     .eq('has_terrain_module', true)
    //     .limit(1)
    //     .maybeSingle();
    //   setHasAccess(!!data);
    // };
    // checkAccess();
  }, []);

  if (hasAccess === null) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#9CA3AF', fontSize: '0.9rem' }}>
        Vérification de l'abonnement...
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
        <h2 style={{ fontWeight: 900, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Module Gestion Terrain</h2>
        <p style={{ color: '#6B7280', marginBottom: '2rem', lineHeight: 1.6 }}>
          Ce module est disponible dans le forfait <strong>Pro</strong>. Il vous permet de gérer votre équipe, vos tâches et votre logistique directement depuis votre Mini-App Telegram.
        </p>
        <button style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#FFF', border: 'none', borderRadius: '12px', padding: '0.8rem 2rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>
          ⚡ Passer au forfait Pro
        </button>
      </div>
    );
  }

  const currentTab = TABS.find(t => t.id === activeTab);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Retour */}
      <Link href="/dashboard/events/builder" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#666', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.5rem', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#1A1A1A'} onMouseLeave={e => e.currentTarget.style.color = '#666'}>
        <ArrowLeft size={16} /> Retour à l'Éditeur (EventBuilder)
      </Link>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ fontSize: '2rem' }}>⚙️</div>
          <div>
            <h1 style={{ fontWeight: 900, fontSize: '1.6rem', margin: 0 }}>Gestion Terrain</h1>
            <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: 0 }}>
              {currentTab?.description}
            </p>
          </div>
          <div style={{ marginLeft: 'auto', background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: '8px', padding: '0.3rem 0.8rem', fontSize: '0.75rem', fontWeight: 700, color: '#065F46' }}>
            ✅ Forfait Pro actif
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div style={{ display: 'flex', borderBottom: '2px solid #F3F4F6', marginBottom: '2rem', overflowX: 'auto', gap: '0' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.8rem 1.2rem',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #6366F1' : '2px solid transparent',
              marginBottom: '-2px',
              background: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? 800 : 500,
              color: activeTab === tab.id ? '#6366F1' : '#6B7280',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu de l'onglet actif */}
      <div>
        {activeTab === 'equipe' && <EquipeManager />}
        {activeTab === 'taches' && <TachesManager userRole="organisateur" />}
        {activeTab === 'fnb' && <FoodAndBeverageManager />}
        {activeTab === 'hospitality' && <HospitalityManager />}
        {activeTab === 'avantages' && <AvantagesPro onOpenPricing={() => setIsPricingModalOpen(true)} />}
      </div>

      {/* MODAL TARIFS */}
      <PricingModal isOpen={isPricingModalOpen} onClose={() => setIsPricingModalOpen(false)} />
    </div>
  );
}
