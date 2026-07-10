'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, PhoneOff, CheckCircle2, Zap, Smartphone, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function RegisseursLanding() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="font-bold text-2xl tracking-tighter">EventFlow</div>
        <Link href="#pricing" className="bg-gray-900 text-white px-6 py-2 rounded-full font-medium hover:bg-black transition-colors">
          Réserver ma date
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center pt-20 pb-24 px-4">
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          Uniquement pour les Régisseurs de petits festivals (500-3000 pax)
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Le Système "Régisseur Zen" : Zéro appel logistique la semaine de votre événement.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Fini le chaos des exposants perdus et des techniciens en retard. Tous vos intervenants sont autonomes avec leur Pass Logistique QR Code sur WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="#pricing" className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-black transition-transform hover:scale-105 flex items-center justify-center gap-2">
            Automatiser ma logistique <ChevronRight size={20} />
          </Link>
          <span className="text-gray-500 text-sm">Garantie 100% remboursé si le téléphone sonne.</span>
        </div>
      </section>

      {/* Problem / Solution (The Value Equation) */}
      <section className="bg-gray-50 py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Le coût de l'inaction</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-red-100 p-2 rounded-lg mt-1"><PhoneOff className="text-red-600" size={20}/></div>
                <div>
                  <h3 className="font-bold text-xl">80% de votre temps perdu au téléphone</h3>
                  <p className="text-gray-600">À répéter en boucle : "Oui le parking est à droite... Oui tu as l'électricité... Non tu montes à 14h".</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-red-100 p-2 rounded-lg mt-1"><ShieldCheck className="text-red-600" size={20}/></div>
                <div>
                  <h3 className="font-bold text-xl">Le risque du Burn-Out</h3>
                  <p className="text-gray-600">Ou la nécessité d'embaucher un assistant logistique à 1500€ juste pour faire le flic à l'entrée.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="text-yellow-500" /> La solution EventFlow
            </h2>
            <ul className="space-y-4">
              {[
                "Portail d'onboarding autonome (Plaque, Besoins, Heure)",
                "Envoi automatique de la feuille de route à J-7",
                "Pass Logistique QR Code poussé par SMS/Email à J-1",
                "Dashboard en temps réel des arrivées",
                "App de Scan illimitée pour la sécurité"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium text-gray-700">
                  <CheckCircle2 className="text-green-500" size={20} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The Grand Slam Offer */}
      <section id="pricing" className="py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">L'Offre Irrésistible</h2>
          <p className="text-xl text-gray-600">Tout ce dont vous avez besoin pour un événement parfait.</p>
        </div>

        <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-500 text-white px-6 py-2 font-bold transform translate-x-8 translate-y-6 rotate-45">
            10 PLACES / MOIS
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">Le Système Régisseur Zen</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span>Portail d'onboarding (jusqu'à 500 intervenants)</span>
                  <span className="text-gray-400 line-through">Valeur 500€</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span>Application de Scan illimitée</span>
                  <span className="text-gray-400 line-through">Valeur 150€</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2 text-yellow-400 font-medium">
                  <span className="flex items-center gap-2"><Smartphone size={16}/> Bonus : Templates Email/SMS haute conversion</span>
                  <span>Valeur 99€</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2 text-yellow-400 font-medium">
                  <span className="flex items-center gap-2"><FileText size={16}/> Bonus : Checklist Anti-Crise (PDF)</span>
                  <span>Valeur 49€</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2 text-yellow-400 font-bold">
                  <span>Bonus VIP : Support WhatsApp dédié le Jour J</span>
                  <span>Inestimable</span>
                </div>
              </div>
              
              <div className="text-xl font-bold text-green-400 flex items-start gap-2 bg-gray-800 p-4 rounded-xl border border-gray-700">
                <ShieldCheck size={28} className="shrink-0" />
                <p className="text-sm leading-tight">
                  <strong className="block text-lg mb-1">Garantie "Téléphone Silencieux"</strong>
                  Si notre système ne réduit pas vos appels logistiques de 80% la veille de l'événement, nous vous remboursons intégralement. Vous ne payez que pour la tranquillité d'esprit.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center bg-white text-gray-900 rounded-2xl p-8 text-center">
              <p className="text-gray-500 font-medium mb-2 uppercase tracking-wide">Paiement unique par événement</p>
              <div className="text-6xl font-black mb-2">299€</div>
              <p className="text-gray-400 text-sm line-through mb-8">Valeur totale : 798€</p>
              
              <button className="w-full bg-green-500 text-white p-4 rounded-xl font-bold text-xl hover:bg-green-600 transition-transform hover:scale-105 shadow-lg shadow-green-500/30">
                Sécuriser ma date
              </button>
              <p className="text-xs text-gray-400 mt-4">Places restantes pour ce mois : 4 / 10</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-12 text-gray-500">
        <p>© 2026 EventFlow. Créé par un régisseur, pour les régisseurs.</p>
      </footer>
    </div>
  );
}
