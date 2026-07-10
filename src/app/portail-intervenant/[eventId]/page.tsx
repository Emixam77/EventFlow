'use client';

import { useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Users, Wrench, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import QRCode from 'qrcode';

export default function PortailIntervenant({ params }: { params: Promise<{ eventId: string }> }) {
  const resolvedParams = use(params);
  const [role, setRole] = useState<'exposant' | 'tech' | 'benevole' | ''>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plateNumber: '',
    arrivalTime: '',
    technicalNeeds: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/exhibitors/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: resolvedParams.eventId,
          role,
          ...formData
        }),
      });

      if (!res.ok) throw new Error('Erreur lors de la soumission');
      
      const data = await res.json();
      
      // Générer le QR code pour affichage immédiat
      if (data.ticketId) {
        const qr = await QRCode.toDataURL(data.ticketId, {
          width: 300,
          margin: 2,
          color: { dark: '#000000', light: '#FFFFFF' }
        });
        setQrCodeUrl(qr);
      }
      
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès Confirmé</h2>
          <p className="text-gray-600 mb-6">Votre feuille de route et votre Pass Logistique ont été envoyés sur votre email.</p>
          
          {qrCodeUrl && (
            <div className="bg-gray-50 p-4 rounded-xl inline-block mb-6 border border-gray-100">
              <img src={qrCodeUrl} alt="QR Code d'accès" className="w-48 h-48 mx-auto mix-blend-multiply" />
              <p className="text-xs text-gray-400 mt-2 font-mono uppercase tracking-wider">Pass {role}</p>
            </div>
          )}

          <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm text-left">
            <strong>Prochaine étape :</strong> Conservez bien ce QR Code. Il vous sera demandé à l'entrée logistique le jour J.
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header simple */}
      <div className="bg-gray-900 text-white p-4 text-center flex items-center justify-center">
        <Lock size={16} className="inline-block mr-2 opacity-50" />
        <span className="font-semibold tracking-wide uppercase text-sm opacity-90">Portail Logistique Sécurisé</span>
      </div>

      <div className="max-w-xl mx-auto p-4 md:p-8 mt-8">
        <h1 className="text-3xl font-bold mb-2">Demande d'accès</h1>
        <p className="text-gray-600 mb-8">Veuillez remplir vos informations pour recevoir votre feuille de route et votre Pass Logistique officiel.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Sélection du rôle */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">1. Vous êtes...</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'exposant', label: 'Exposant', icon: Truck },
                { id: 'tech', label: 'Technicien', icon: Wrench },
                { id: 'benevole', label: 'Bénévole', icon: Users },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setRole(t.id as any)}
                  className={`p-4 rounded-xl border-2 text-left flex flex-col items-center justify-center gap-2 transition-all ${role === t.id ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                >
                  <t.icon size={24} />
                  <span className="font-semibold">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {role && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom / Entreprise *</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none transition-all"
                      placeholder="Jean Dupont ou FoodTruck XYZ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none transition-all"
                      placeholder="jean@exemple.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Immatriculation Véhicule</label>
                    <input 
                      type="text" 
                      value={formData.plateNumber}
                      onChange={e => setFormData({...formData, plateNumber: e.target.value.toUpperCase()})}
                      className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none transition-all font-mono"
                      placeholder="AA-123-BB"
                    />
                    <p className="text-xs text-gray-500 mt-1">Nécessaire si vous devez accéder au parking interne.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heure d'arrivée prévue</label>
                    <input 
                      type="time" 
                      value={formData.arrivalTime}
                      onChange={e => setFormData({...formData, arrivalTime: e.target.value})}
                      className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none transition-all"
                    />
                  </div>
                </div>

                {(role === 'exposant' || role === 'tech') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Besoins techniques spécifiques</label>
                    <textarea 
                      value={formData.technicalNeeds}
                      onChange={e => setFormData({...formData, technicalNeeds: e.target.value})}
                      className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none transition-all min-h-[100px]"
                      placeholder="Ex: Raccordement électrique 32A, arrivée d'eau, etc."
                    />
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white p-4 rounded-xl font-bold text-lg hover:bg-black transition-all flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? 'Génération...' : 'Valider ma venue'}
                  {!isSubmitting && <ChevronRight size={20} className="ml-2" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

      </div>
    </div>
  );
}
