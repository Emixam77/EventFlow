'use client';

import { Smartphone, WifiOff, CreditCard, ShieldCheck, Zap, ArrowRight, BarChart3 } from 'lucide-react';

interface AvantagesProProps {
  onOpenPricing: () => void;
}

export default function AvantagesPro({ onOpenPricing }: AvantagesProProps) {
  return (
    <div style={{ animation: 'fadeUp 0.5s ease', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* HEADER HERO */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FEF3C7', color: '#D97706', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Zap size={14} fill="currentColor" /> Le Module Terrain Pro
        </div>
        <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#1A1A1A', margin: '0 0 1rem 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Débloquez la puissance<br/>de vos équipes sur le terrain.
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Ne laissez plus les imprévus ruiner votre événement. Le module Pro vous donne le contrôle total, même dans les pires conditions.
        </p>
      </div>

      {/* GRILLE DES AVANTAGES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
        
        {/* ARGUMENT 1 : TELEGRAM / OFFLINE FIRST */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '3rem', border: '1px solid #E5E7EB', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.03, transform: 'rotate(-15deg)' }}>
            <WifiOff size={200} />
          </div>
          
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Smartphone size={32} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '1rem' }}>
            L'App Telegram (Offline First)
          </h3>
          <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
            Le réseau 4G/5G sature toujours pendant les festivals. Notre application est intégrée directement dans Telegram. Elle est ultra-légère et fonctionne en <strong>basse bande passante (Edge/3G)</strong>. Vos coordinateurs reçoivent les alertes vitales même au milieu de 10 000 personnes.
          </p>
        </div>

        {/* ARGUMENT 2 : CASHLESS */}
        <div style={{ backgroundColor: '#1A1A1A', borderRadius: '24px', padding: '3rem', border: '1px solid #333', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.05, transform: 'rotate(10deg)' }}>
            <CreditCard size={200} />
          </div>
          
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#333', color: '#eb8e24', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <CreditCard size={32} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', marginBottom: '1rem' }}>
            Système Cashless Intégré
          </h3>
          <p style={{ fontSize: '1rem', color: '#A1A1AA', lineHeight: 1.6, margin: 0 }}>
            Fini les vols, les erreurs de caisse et les files d'attente interminables. Gérez les rechargements des bracelets directement depuis l'application. Suivez le chiffre d'affaires de vos bars <strong>en temps réel</strong> et réagissez immédiatement.
          </p>
        </div>

        {/* ARGUMENT 3 : GESTION DES ACCÈS */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '3rem', border: '1px solid #E5E7EB', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <ShieldCheck size={32} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '1rem' }}>
            Maîtrise des Effectifs & Accès
          </h3>
          <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
            Scannez les QR codes de vos bénévoles à leur arrivée. Attribuez-leur des zones (Pass All Access, Backstage, Fosse). Vous savez exactement qui est sur site, qui est en pause, et où ils se trouvent. La sécurité avant tout.
          </p>
        </div>

        {/* ARGUMENT 4 : DATA & REPORTING */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '3rem', border: '1px solid #E5E7EB', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#FDF2F8', color: '#DB2777', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <BarChart3 size={32} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '1rem' }}>
            Rapports de Fin d'Événement
          </h3>
          <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
            Heures prestées par les bénévoles, temps de résolution des incidents, consommation de fûts à l'heure... Toutes les données du terrain sont compilées dans un rapport pour vous aider à optimiser votre prochaine édition.
          </p>
        </div>

      </div>

      {/* CALL TO ACTION (CTA) */}
      <div style={{ textAlign: 'center', backgroundColor: '#F9FAFB', padding: '4rem 2rem', borderRadius: '24px', border: '1px dashed #D1D5DB', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#1A1A1A', margin: '0 0 1rem 0' }}>Prêt à passer à la vitesse supérieure ?</h3>
        <p style={{ color: '#666', maxWidth: '500px', margin: '0 0 2rem 0', fontSize: '1.1rem' }}>
          Ce module est inclus dans le <strong>Pack Pro</strong>. Débloquez cet écosystème complet et reprenez le contrôle de votre terrain.
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
