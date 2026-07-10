'use client';

import { motion } from 'framer-motion';
import { Diamond, Check, HeartHandshake, PhoneOff, Infinity, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function WeddingPlannerLanding() {
  return (
    <div className="min-h-screen bg-[#FCFBF8] text-stone-800 font-serif">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto">
        <div className="font-bold text-3xl tracking-widest text-stone-900 flex items-center gap-2">
          <Diamond size={24} className="text-amber-600" /> EVENTFLOW <span className="font-light text-stone-400">LUXURY</span>
        </div>
        <Link href="#pricing" className="hidden md:inline-block bg-stone-900 text-[#FCFBF8] px-8 py-3 rounded-full font-sans tracking-wide text-sm hover:bg-stone-800 transition-colors">
          Demander une démonstration
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center pt-24 pb-32 px-6">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-5 py-2 rounded-full font-sans text-xs uppercase tracking-widest font-semibold mb-10 border border-amber-200">
          Pour les Agences de Wedding Planning Haut de Gamme
        </div>
        
        <h1 className="text-5xl md:text-7xl font-normal tracking-tight mb-8 leading-[1.1] text-stone-900">
          L'excellence le Jour J.<br />
          <span className="italic text-amber-700">Le silence la veille.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-stone-500 mb-14 max-w-3xl mx-auto font-sans font-light leading-relaxed">
          Offrez à vos mariés une expérience d'une fluidité absolue. 
          EventFlow automatise la coordination de vos prestataires, pour que vous puissiez vous concentrer sur ce qui compte : la magie de l'instant.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 font-sans">
          <Link href="#pricing" className="w-full sm:w-auto bg-amber-700 text-[#FCFBF8] px-10 py-5 rounded-full text-sm uppercase tracking-widest hover:bg-amber-800 transition-transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl shadow-amber-900/10">
            Découvrir le Portail Prestige <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* The Pain (PAS Framework) */}
      <section className="bg-stone-900 text-stone-300 py-32 px-6">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-[#FCFBF8] mb-6">Dans l'ombre du luxe, le chaos logistique.</h2>
          <p className="text-xl font-sans font-light max-w-2xl mx-auto text-stone-400">
            Vous vendez du rêve à vos clients à plus de 50 000€. Mais en coulisses, votre équipe frôle le burn-out.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 font-sans">
          <div className="bg-stone-800/50 p-10 rounded-2xl border border-stone-800">
            <PhoneOff className="text-amber-500 mb-6" size={32} />
            <h3 className="text-xl text-[#FCFBF8] mb-4">Le téléphone qui ne s'arrête jamais</h3>
            <p className="text-stone-400 font-light leading-relaxed">
              La veille du mariage, vous passez 12 heures à répéter l'adresse au traiteur et l'heure d'arrivée au DJ.
            </p>
          </div>
          <div className="bg-stone-800/50 p-10 rounded-2xl border border-stone-800">
            <HeartHandshake className="text-amber-500 mb-6" size={32} />
            <h3 className="text-xl text-[#FCFBF8] mb-4">L'image de marque menacée</h3>
            <p className="text-stone-400 font-light leading-relaxed">
              Un prestataire qui arrive au mauvais endroit au moment des photos gâche l'expérience premium de vos mariés.
            </p>
          </div>
          <div className="bg-stone-800/50 p-10 rounded-2xl border border-stone-800">
            <Clock className="text-amber-500 mb-6" size={32} />
            <h3 className="text-xl text-[#FCFBF8] mb-4">L'épuisement silencieux</h3>
            <p className="text-stone-400 font-light leading-relaxed">
              Vos wedding planners sont épuisés avant même que l'événement ne commence à cause des micro-détails administratifs.
            </p>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-amber-700 font-sans text-sm font-bold uppercase tracking-widest mb-4">La Solution EventFlow</div>
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight">L'art de la délégation invisible.</h2>
            <div className="space-y-8 font-sans">
              <div className="flex gap-5 items-start">
                <div className="bg-amber-100 p-3 rounded-full shrink-0"><Check className="text-amber-700" size={20}/></div>
                <div>
                  <h3 className="font-semibold text-stone-900 text-lg mb-2">Portail Prestataire Marque Blanche</h3>
                  <p className="text-stone-600 font-light">Un espace élégant à vos couleurs où fleuristes et traiteurs valident leurs besoins techniques de manière autonome.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="bg-amber-100 p-3 rounded-full shrink-0"><Check className="text-amber-700" size={20}/></div>
                <div>
                  <h3 className="font-semibold text-stone-900 text-lg mb-2">Brieffing WhatsApp Automatisé</h3>
                  <p className="text-stone-600 font-light">Le GPS, le parking et les instructions sont envoyés automatiquement sur le smartphone de chaque intervenant à H-24.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="bg-amber-100 p-3 rounded-full shrink-0"><Check className="text-amber-700" size={20}/></div>
                <div>
                  <h3 className="font-semibold text-stone-900 text-lg mb-2">Dashboard de Coordination</h3>
                  <p className="text-stone-600 font-light">Suivez l'arrivée de tous vos prestataires sur une tablette, discrètement, pendant que vous chouchoutez la mariée.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-amber-600/10 rounded-[2rem] transform translate-x-4 translate-y-4"></div>
            <div className="bg-white p-12 rounded-[2rem] border border-stone-100 shadow-2xl relative z-10 font-sans">
              <div className="border-b border-stone-100 pb-6 mb-6">
                <div className="text-xs text-stone-400 uppercase tracking-widest mb-2">Notification prestataire</div>
                <div className="font-medium text-stone-900">Demain : Mariage de Sophie & Thomas</div>
              </div>
              <div className="space-y-4 text-sm text-stone-600 mb-8">
                <p>📍 Entrée de service : Portail Sud</p>
                <p>⏱️ Heure de montage : 09h00 précises</p>
                <p>🔌 Électricité : Prise triphasée validée</p>
              </div>
              <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-center text-sm font-medium">
                Pass Logistique généré
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Pricing */}
      <section id="pricing" className="bg-[#f7f5f0] py-32 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6">Pour les agences d'exception.</h2>
          <p className="font-sans text-xl text-stone-500 font-light max-w-2xl mx-auto">
            Un abonnement mensuel simple pour couvrir tous les mariages de votre saison.
          </p>
        </div>

        <div className="max-w-lg mx-auto bg-white rounded-3xl p-10 md:p-14 shadow-2xl border border-stone-100 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-stone-900 text-[#FCFBF8] font-sans text-xs uppercase tracking-widest px-6 py-2 rounded-full font-bold">
              Édition illimitée
            </div>
          </div>
          
          <div className="text-center font-sans mb-10 pt-4">
            <div className="text-6xl font-light text-stone-900 mb-4">499€<span className="text-xl text-stone-400 font-normal">/mois</span></div>
            <p className="text-stone-500">Sans engagement. Nombre de mariages illimité.</p>
          </div>
          
          <div className="space-y-6 font-sans text-stone-700 mb-12">
            <div className="flex items-center gap-4"><Infinity className="text-amber-600 shrink-0" size={20} /> <span className="font-medium">Événements illimités</span></div>
            <div className="flex items-center gap-4"><Check className="text-amber-600 shrink-0" size={20} /> <span className="font-medium">Prestataires illimités</span></div>
            <div className="flex items-center gap-4"><Check className="text-amber-600 shrink-0" size={20} /> <span>Portail en marque blanche (Votre logo)</span></div>
            <div className="flex items-center gap-4"><Check className="text-amber-600 shrink-0" size={20} /> <span>Automatisation WhatsApp & SMS</span></div>
            <div className="flex items-center gap-4"><Check className="text-amber-600 shrink-0" size={20} /> <span>Formation de votre équipe incluse</span></div>
          </div>
          
          <button className="w-full bg-stone-900 text-[#FCFBF8] font-sans py-5 rounded-xl font-medium tracking-wide hover:bg-stone-800 transition-colors shadow-xl shadow-stone-900/10">
            Démarrer ma période d'essai (14j)
          </button>
        </div>
        
        <div className="max-w-lg mx-auto mt-10 flex items-start gap-4 p-6 bg-white/50 rounded-2xl border border-stone-200/50">
          <ShieldCheck className="text-stone-400 shrink-0" size={28} />
          <p className="font-sans text-sm text-stone-500 leading-relaxed">
            <strong className="text-stone-700 font-medium">Garantie Prestige :</strong> Nous configurons le portail à vos couleurs en 48h. Si vous n'économisez pas au minimum 15 heures d'administration sur votre premier mariage, nous vous remboursons le premier mois.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-500 text-center py-16 font-sans text-sm">
        <div className="flex justify-center items-center gap-2 mb-6 text-stone-400">
          <Diamond size={18} /> EVENTFLOW LUXURY
        </div>
        <p>© 2026 EventFlow. L'excellence opérationnelle pour l'événementiel.</p>
      </footer>
    </div>
  );
}
