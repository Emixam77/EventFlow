'use client';

import { Rocket, LineChart, Globe, Shield, ArrowRight, Star } from 'lucide-react';

interface AvantagesCrmProps {
  onOpenPricing: () => void;
}

export default function AvantagesCrm({ onOpenPricing }: AvantagesCrmProps) {
  return (
    <div style={{ animation: 'fadeUp 0.5s ease', maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem' }}>
      
      {/* HEADER HERO */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FEF3C7', color: '#D97706', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Star size={14} fill="currentColor" /> L'Écosystème CRM
        </div>
        <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#1A1A1A', margin: '0 0 1rem 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Transformez vos acheteurs<br/>en véritables fans.
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          La billetterie n'est que la première étape. Avec notre CRM intégré, fidélisez votre audience et communiquez avec eux comme jamais auparavant.
        </p>
      </div>

      {/* GRILLE DES AVANTAGES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
        
        {/* ARGUMENT 1 */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '3rem', border: '1px solid #E5E7EB', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <LineChart size={32} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '1rem' }}>
            Des Données Centralisées
          </h3>
          <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
            Fini les exports Excel laborieux. Toutes vos données clients, historiques d'achat et habitudes de consommation sont réunies au même endroit, synchronisées en temps réel.
          </p>
        </div>

        {/* ARGUMENT 2 */}
        <div style={{ backgroundColor: '#1A1A1A', borderRadius: '24px', padding: '3rem', border: '1px solid #333', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', color: 'white' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#333', color: '#eb8e24', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Globe size={32} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', marginBottom: '1rem' }}>
            Communication Omnicanale
          </h3>
          <p style={{ fontSize: '1rem', color: '#A1A1AA', lineHeight: 1.6, margin: 0 }}>
            Email, SMS, ou Push Notifications. Touchez votre audience là où elle se trouve. Programmez vos annonces de line-up et gérez les urgences de dernière minute en un clic.
          </p>
        </div>

        {/* ARGUMENT 3 */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '3rem', border: '1px solid #E5E7EB', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Shield size={32} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '1rem' }}>
            Sécurité & RGPD
          </h3>
          <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
            Vos données sont votre atout le plus précieux. Nous garantissons une infrastructure hautement sécurisée et 100% conforme aux normes européennes de protection des données.
          </p>
        </div>

        {/* ARGUMENT 4 */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '3rem', border: '1px solid #E5E7EB', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Rocket size={32} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '1rem' }}>
            Automatisation Puissante
          </h3>
          <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
            Mettez votre marketing en pilote automatique. Relances paniers abandonnés, emails de remerciements post-événement et campagnes de fidélisation générées par l'IA.
          </p>
        </div>
      </div>

      {/* CALL TO ACTION (CTA) */}
      <div style={{ textAlign: 'center', backgroundColor: '#F9FAFB', padding: '4rem 2rem', borderRadius: '24px', border: '1px dashed #D1D5DB', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1A1A', margin: '0 0 1rem 0' }}>Prêt à fidéliser votre audience ?</h3>
        <p style={{ color: '#666', maxWidth: '500px', margin: '0 0 2rem 0', fontSize: '1.1rem' }}>
          Intégrez cet écosystème sur-puissant à votre événement et reprenez le contrôle de votre base de données.
        </p>
        <button 
          onClick={onOpenPricing}
          style={{ padding: '1.2rem 2.5rem', backgroundColor: '#eb8e24', color: 'white', border: 'none', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', boxShadow: '0 10px 25px rgba(235, 142, 36, 0.4)', transition: 'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Découvrir nos Offres <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
}
