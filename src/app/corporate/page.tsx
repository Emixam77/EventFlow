import React from 'react';
import Link from 'next/link';

export default function CorporateLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      
      {/* NAVIGATION */}
      <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none">E</span>
            </div>
            <span className="font-semibold text-xl tracking-tight text-slate-900">EventFlow <span className="font-light text-slate-500">Corporate</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#problem" className="hover:text-slate-900 transition-colors">Le Problème</a>
            <a href="#solution" className="hover:text-slate-900 transition-colors">La Solution</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Fonctionnalités</a>
          </div>
          <Link href="/register" className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors shadow-sm">
            Démarrer l'essai gratuit
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-8 border border-blue-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Nouveau : Portail Client B2B
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
          Votre agence perd <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">20 heures par événement</span> sur l'administratif.
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Arrêtez de courir après les devis de vos prestataires et de mettre à jour manuellement le planning de vos clients. Centralisez, automatisez, et reprenez le contrôle de vos séminaires.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md text-base font-medium transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            Commencer l'essai de 14 jours
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <a href="#demo" className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-md text-base font-medium transition-colors shadow-sm flex items-center justify-center">
            Voir la démo
          </a>
        </div>
        <p className="mt-4 text-sm text-slate-500">Aucune carte bancaire requise. Annulable à tout moment.</p>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-10 border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider">Fait gagner du temps à +200 agences événementielles en Europe</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale">
            {/* Fake logos using text for demo */}
            <span className="text-2xl font-bold font-serif">Acme Events</span>
            <span className="text-2xl font-bold tracking-tighter">GLOBE</span>
            <span className="text-2xl font-black italic">Seminaires.io</span>
            <span className="text-2xl font-semibold uppercase">Apex</span>
            <span className="text-2xl font-light">Lumière</span>
          </div>
        </div>
      </section>

      {/* PROBLEM (Agitate) */}
      <section id="problem" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">L'enfer logistique caché derrière chaque événement réussi.</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Devis et factures éparpillés</h3>
                  <p className="text-slate-600">Vos prestataires (traiteurs, freelances, lieux) envoient leurs documents par mail, WhatsApp ou SMS. Vous perdez la trace des acomptes versés.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Le client qui relance en permanence</h3>
                  <p className="text-slate-600">"Où en est le planning ?" "Avez-vous validé le menu ?" Votre équipe passe des heures à rassurer le client plutôt qu'à produire.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Erreurs humaines coûteuses</h3>
                  <p className="text-slate-600">Oublier de payer le solde d'un DJ ou se tromper sur l'heure d'arrivée du bus. Des détails qui gâchent l'expérience de vos clients B2B.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
              <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
              <div>
                <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                <div className="h-3 w-24 bg-slate-100 rounded"></div>
              </div>
            </div>
            <div className="space-y-4 opacity-50">
              <div className="h-3 w-full bg-slate-100 rounded"></div>
              <div className="h-3 w-5/6 bg-slate-100 rounded"></div>
              <div className="h-3 w-4/6 bg-slate-100 rounded"></div>
            </div>
            <div className="mt-8 p-4 bg-red-50 text-red-700 text-sm rounded-md border border-red-100">
              URGENT : Le traiteur attend son acompte depuis 5 jours. Risque d'annulation.
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">EventFlow automatise vos processus d'agence.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Un hub central pour vos prestataires. Un portail premium pour vos clients B2B.</p>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 bg-blue-900/50 text-blue-400 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Portail Prestataires</h3>
            <p className="text-slate-400">Chaque prestataire téléverse ses propres devis et factures. Le système suit automatiquement les acomptes et les soldes restants.</p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-blue-500 transition-colors transform md:-translate-y-4">
            <div className="w-12 h-12 bg-blue-900/50 text-blue-400 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Espace Client B2B</h3>
            <p className="text-slate-400">Offrez à vos clients un accès VIP en marque blanche. Ils peuvent valider le planning, voir les avancées et télécharger vos factures.</p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 bg-blue-900/50 text-blue-400 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Planning Centralisé</h3>
            <p className="text-slate-400">Un seul planning, mis à jour en temps réel. Si l'heure du dîner change, le traiteur, le DJ et le client sont notifiés instantanément.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">Comment ça marche ?</h2>
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          
          {/* Step 1 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-600 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
              1
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Créez l'événement</h4>
              <p className="text-slate-600 text-sm">Définissez le budget global, les dates et générez les accès pour votre client B2B en un clic.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-600 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
              2
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Invitez vos prestataires</h4>
              <p className="text-slate-600 text-sm">Envoyez un lien unique. Ils uploadent eux-mêmes leurs devis et remplissent leurs besoins logistiques (horaires, camions).</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-600 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
              3
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Pilotez le Jour J</h4>
              <p className="text-slate-600 text-sm">Le client valide le planning final, vous payez les soldes en un clic, et l'événement se déroule sans accroc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 bg-slate-100 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Un tarif simple. Un ROI immédiat.</h2>
            <p className="text-slate-600 text-lg">Remplacez 3 logiciels différents par un seul hub conçu pour les agences.</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-2/3">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Licence Agence Illimitée</h3>
              <p className="text-slate-500 mb-6">Événements illimités, clients illimités, tranquillité d'esprit garantie.</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  Portails Prestataires illimités
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  Espaces Clients B2B en Marque Blanche
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  Suivi financier (Acomptes / Soldes)
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  Génération des plannings (Call Sheets)
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 md:p-12 md:w-1/3 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-slate-200">
              <p className="text-slate-500 font-medium mb-1">Abonnement Mensuel</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">499€</span>
                <span className="text-slate-500">/mois</span>
              </div>
              <Link href="/register" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-3 rounded-md font-medium transition-colors shadow-md">
                Essai 14 jours
              </Link>
              <p className="mt-4 text-xs text-slate-400 text-center">Annulable d'un clic.<br/>Pas de CB requise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Prêt à professionnaliser votre agence ?
        </h2>
        <p className="text-xl text-slate-600 mb-10">
          Rejoignez les agences qui ont arrêté de courir après les devis et qui se concentrent sur la création d'expériences mémorables.
        </p>
        <Link href="/register" className="inline-block bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-md text-lg font-medium transition-colors shadow-xl hover:shadow-2xl">
          Démarrer mon essai gratuit (14 jours)
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs leading-none">E</span>
            </div>
            <span className="font-semibold text-slate-900">EventFlow</span>
          </div>
          <p className="text-slate-400 text-sm">© 2026 EventFlow. Conçu pour les Agences Événementielles.</p>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-900">Mentions légales</a>
            <a href="#" className="hover:text-slate-900">Confidentialité</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
