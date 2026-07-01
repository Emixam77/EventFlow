'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Zap, Star, ShieldCheck, ArrowRight, Server, Phone, Users } from 'lucide-react';
import EcosystemInfographic from './EcosystemInfographic';

type PricingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type PlanMode = 'payg' | 'monthly' | 'lifetime';

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const [mode, setMode] = useState<PlanMode>('payg');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = (planName: string) => {
    setIsProcessing(true);
    // Simulation d'une redirection Stripe
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Redirection vers la caisse Stripe pour le plan : ${planName} (${mode})`);
    }, 1500);
  };

  const getPriceCore = () => {
    switch(mode) {
      case 'payg': return { price: '1.5%', suffix: '+ 0.49€ / billet', label: 'Sans engagement' };
      case 'monthly': return { price: '49€', suffix: '/ mois', label: 'Facturé mensuellement' };
      case 'lifetime': return { price: '550€', suffix: 'Paiement unique', label: 'Accès à vie' };
    }
  };

  const getPricePro = () => {
    switch(mode) {
      case 'payg': return { price: '2%', suffix: '+ 0.69€ / billet', label: 'Sans engagement' };
      case 'monthly': return { price: '89€', suffix: '/ mois', label: 'Facturé mensuellement' };
      case 'lifetime': return { price: '999€', suffix: 'Paiement unique', label: 'Accès à vie' };
    }
  };

  const corePricing = getPriceCore();
  const proPricing = getPricePro();

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
          
          {/* BACKDROP */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)' }}
          />

          {/* MODAL CONTENT */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{ position: 'relative', width: '100%', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto', backgroundColor: '#FAFAFA', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
          >
            {/* CLOSE BUTTON */}
            <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'white', border: '1px solid #E5E7EB', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <X size={20} color="#666" />
            </button>

            {/* HEADER */}
            <div style={{ padding: '4rem 2rem 2rem', textAlign: 'center', backgroundColor: '#1A1A1A', color: 'white', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '120%', height: '200%', background: 'radial-gradient(circle at top, rgba(235, 142, 36, 0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '30px', color: '#eb8e24', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>
                <Zap size={16} /> Écosystème Tout-en-un
              </div>
              
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0 0 1rem 0', letterSpacing: '-0.02em' }}>
                Arrêtez de payer des commissions abusives.
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#A1A1AA', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                Passez au niveau supérieur. Créez des pages sublimes, gérez vos ventes, vos emails, vos SMS et vos équipes sur une seule plateforme.
              </p>

              {/* TOGGLE */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: '100px', display: 'flex', gap: '0.4rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <button onClick={() => setMode('payg')} style={{ padding: '0.8rem 1.5rem', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s', backgroundColor: mode === 'payg' ? 'white' : 'transparent', color: mode === 'payg' ? '#1A1A1A' : 'white', boxShadow: mode === 'payg' ? '0 4px 10px rgba(0,0,0,0.1)' : 'none' }}>
                    Par Billet (Pay-as-you-go)
                  </button>
                  <button onClick={() => setMode('monthly')} style={{ padding: '0.8rem 1.5rem', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s', backgroundColor: mode === 'monthly' ? 'white' : 'transparent', color: mode === 'monthly' ? '#1A1A1A' : 'white', boxShadow: mode === 'monthly' ? '0 4px 10px rgba(0,0,0,0.1)' : 'none' }}>
                    Mensuel (0% Comm.)
                  </button>
                  <button onClick={() => setMode('lifetime')} style={{ padding: '0.8rem 1.5rem', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s', backgroundColor: mode === 'lifetime' ? '#eb8e24' : 'transparent', color: mode === 'lifetime' ? 'white' : 'white', boxShadow: mode === 'lifetime' ? '0 4px 15px rgba(235, 142, 36, 0.4)' : 'none' }}>
                    À vie (Early Adopter)
                  </button>
                </div>
              </div>
              
              {/* BÉNÉFICES DU MODE DE PAIEMENT */}
              <div style={{ textAlign: 'center', marginTop: '1.5rem', minHeight: '24px' }}>
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#10B981', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <CheckCircle2 size={16} /> 
                  {mode === 'payg' && "Sans engagement : on paye quand on est payé"}
                  {mode === 'monthly' && "Réduction de coût sur le long terme"}
                  {mode === 'lifetime' && "On possède l'infrastructure 100% à vie"}
                </motion.div>
              </div>

            </div>

            {/* INFOGRAPHIE ÉCOSYSTÈME */}
            <div style={{ padding: '0 2rem', marginTop: '3rem' }}>
              <EcosystemInfographic />
            </div>

            {/* CARDS CONTAINER */}
            <div style={{ padding: '1rem 2rem 3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', alignItems: 'flex-start' }}>
              
              {/* CARD: CORE */}
              <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2.5rem', border: '1px solid #E5E7EB', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1A1A1A', margin: '0 0 0.5rem 0' }}>Socle 2-en-1 (Indissociable)</h3>
                <p style={{ color: '#666', fontSize: '0.95rem', margin: '0 0 2rem 0' }}>Modules 1 & 2 : Le socle essentiel pour vendre et gérer vos participants.</p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1A1A1A', lineHeight: 1 }}>{corePricing.price}</div>
                  <div style={{ fontSize: '1rem', color: '#666', fontWeight: 600, marginTop: '0.5rem' }}>{corePricing.suffix}</div>
                  <div style={{ fontSize: '0.8rem', color: '#9CA3AF', marginTop: '0.2rem' }}>{corePricing.label}</div>
                </div>

                <button onClick={() => handleCheckout('Pack Core')} disabled={isProcessing} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #E5E7EB', backgroundColor: 'white', color: '#1A1A1A', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                  {isProcessing ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Server size={18} /></motion.div> : 'Choisir ce plan'}
                </button>

                <div style={{ marginTop: '2rem' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1A1A1A', marginBottom: '1rem' }}>Inclus dans ce pack :</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#4B5563', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> Éditeur WYSIWYG & Landing pages</li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#4B5563', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> Billetterie illimitée (Stripe Connect)</li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#4B5563', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> Envoi des billets & QR Codes par email</li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#4B5563', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> CRM complet & Suivi des ventes</li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#4B5563', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> Synchronisation Google Sheets</li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#4B5563', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> Campagnes SMS via Twilio*</li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#4B5563', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> Routeur Emailing Intégré</li>
                  </ul>
                  
                  <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed #E5E7EB' }}>
                    <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0, fontStyle: 'italic', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <span style={{ color: '#eb8e24', fontWeight: 800 }}>*</span> Option Twilio : 
                      <strong>
                        {mode === 'payg' && '+25€ / événement'}
                        {mode === 'monthly' && '+20€ / mois'}
                        {mode === 'lifetime' && 'Abonnement aux frais du client'}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD: PRO */}
              <div style={{ backgroundColor: '#1A1A1A', borderRadius: '24px', padding: '2.5rem', border: '2px solid #eb8e24', boxShadow: '0 20px 40px rgba(235, 142, 36, 0.2)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#eb8e24', color: 'white', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 10px rgba(235, 142, 36, 0.3)' }}>
                  <Star size={14} fill="currentColor" /> Écosystème Complet
                </div>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', margin: '0 0 0.5rem 0' }}>Pack Pro</h3>
                <p style={{ color: '#A1A1AA', fontSize: '0.95rem', margin: '0 0 2rem 0' }}>Modules 1, 2 & 3 : Pilotez votre événement de A à Z avec vos équipes.</p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', lineHeight: 1 }}>{proPricing.price}</div>
                  <div style={{ fontSize: '1rem', color: '#D4D4D8', fontWeight: 600, marginTop: '0.5rem' }}>{proPricing.suffix}</div>
                  <div style={{ fontSize: '0.8rem', color: '#71717A', marginTop: '0.2rem' }}>{proPricing.label}</div>
                </div>

                <button onClick={() => handleCheckout('Pack Pro')} disabled={isProcessing} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: 'none', backgroundColor: '#eb8e24', color: 'white', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(235, 142, 36, 0.4)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f09c3c'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#eb8e24'}>
                  {isProcessing ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Server size={18} /></motion.div> : 'Débloquer le Pack Pro'} <ArrowRight size={18} />
                </button>

                <div style={{ marginTop: '2rem' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'white', marginBottom: '1rem' }}>Tout le Pack Core, PLUS :</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#E4E4E7', fontSize: '0.95rem' }}><Users size={18} color="#eb8e24" style={{ flexShrink: 0, marginTop: '2px' }} /> Gestion avancée des équipes (Staff)</li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#E4E4E7', fontSize: '0.95rem' }}><ShieldCheck size={18} color="#eb8e24" style={{ flexShrink: 0, marginTop: '2px' }} /> Application mobile de Scan (iOS/Android)</li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#E4E4E7', fontSize: '0.95rem' }}><ShieldCheck size={18} color="#eb8e24" style={{ flexShrink: 0, marginTop: '2px' }} /> Attribution des accès par zones</li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#E4E4E7', fontSize: '0.95rem' }}><Users size={18} color="#eb8e24" style={{ flexShrink: 0, marginTop: '2px' }} /> Tracking de présence du staff / Bénévoles</li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#E4E4E7', fontSize: '0.95rem' }}><Phone size={18} color="#eb8e24" style={{ flexShrink: 0, marginTop: '2px' }} /> Support Client Dédié VIP (24/7)</li>
                  </ul>
                </div>
              </div>

            </div>

            <div style={{ textAlign: 'center', padding: '0 2rem 2rem', color: '#9CA3AF', fontSize: '0.85rem' }}>
              * Les paiements en ligne impliquent des frais de traitement bancaire Stripe (environ 1.5% + 0.25€) indépendants de notre plateforme.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
