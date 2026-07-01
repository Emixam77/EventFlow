'use client';

import { Plane, Car, Music, CheckCircle2, AlertCircle, Clock, Star, MapPin } from 'lucide-react';

export default function HospitalityManager() {
  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      
      {/* BANDEAU DEMO */}
      <div style={{ backgroundColor: '#1A1A1A', color: 'white', padding: '1rem 1.5rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🎮</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>Mode Démonstration Actif</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#A1A1AA' }}>Vous naviguez sur des données pré-générées de type "Tête d'Affiche".</p>
          </div>
        </div>
        <div style={{ padding: '0.4rem 0.8rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, color: '#eb8e24' }}>
          Modification désactivée
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* COLONNE GAUCHE : FLIGHT TRACKER & NAVETTE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* L'ARTISTE */}
          <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'linear-gradient(135deg, #1A1A1A, #333)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
              <Music size={32} color="#eb8e24" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#FEF3C7', color: '#D97706', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                <Star size={12} fill="currentColor" /> Tête d'Affiche
              </div>
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem', fontWeight: 900, color: '#1A1A1A' }}>Daft Punk Tribute</h2>
              <div style={{ color: '#666', fontSize: '0.9rem', display: 'flex', gap: '1.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> Show : 23h30</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={16} /> Main Stage</span>
              </div>
            </div>
          </div>

          {/* LOGISTIQUE VOL & NAVETTE */}
          <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 2rem 0', color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Suivi Logistique
            </h3>
            
            {/* Timeline Visuelle */}
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              {/* Ligne verticale de la timeline */}
              <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '11px', width: '2px', backgroundColor: '#E5E7EB', zIndex: 0 }} />
              
              {/* Étape 1 : Vol */}
              <div style={{ position: 'relative', zIndex: 1, marginBottom: '2.5rem' }}>
                <div style={{ position: 'absolute', left: '-2rem', top: '2px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#10B981', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <CheckCircle2 size={12} color="white" />
                </div>
                <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Plane size={18} color="#6B7280" /> Vol AF1234 (Paris CDG)
                    </h4>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: '#6B7280' }}>Atterri à l'Aéroport de Genève</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: '#10B981' }}>14h00</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase' }}>Terminé</div>
                  </div>
                </div>
              </div>

              {/* Étape 2 : Navette */}
              <div style={{ position: 'relative', zIndex: 1, marginBottom: '2.5rem' }}>
                <div style={{ position: 'absolute', left: '-2rem', top: '2px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#F59E0B', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
                </div>
                <div style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '12px', padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.05)' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#92400E', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Car size={18} color="#D97706" /> Navette VIP (Mercedes V-Class)
                    </h4>
                    <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: '#B45309' }}>Chauffeur : Alexandre (+33 6 12 34 56 78)</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: '#D97706' }}>ETA 15h15</div>
                    <div style={{ fontSize: '0.75rem', color: '#B45309', textTransform: 'uppercase', fontWeight: 700 }}>En route</div>
                  </div>
                </div>
              </div>

              {/* Étape 3 : Arrivée sur site */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ position: 'absolute', left: '-2rem', top: '2px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#E5E7EB', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                </div>
                <div style={{ backgroundColor: 'white', border: '1px dashed #D1D5DB', borderRadius: '12px', padding: '1.2rem', opacity: 0.6 }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={18} /> Arrivée Entrée Artistes
                  </h4>
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: '#9CA3AF' }}>Check-in & Remise des pass</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* COLONNE DROITE : LOGE & RIDER */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* STATUT LOGE */}
          <div style={{ backgroundColor: '#ECFDF5', borderRadius: '24px', padding: '2rem', border: '1px solid #A7F3D0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <CheckCircle2 size={32} color="#10B981" />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#065F46' }}>Loge VIP 1</h3>
                <div style={{ color: '#059669', fontSize: '0.9rem', fontWeight: 700 }}>Statut : Prête</div>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#047857', lineHeight: 1.5 }}>
              La loge a été nettoyée, sécurisée et le catering est en place. Climatisation réglée sur 21°C.
            </p>
          </div>

          {/* RIDER (EXIGENCES) */}
          <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #E5E7EB' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1.5rem 0', color: '#1A1A1A' }}>Catering & Rider</h3>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: '0.9rem', color: '#4B5563' }}>
                <CheckCircle2 size={16} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>2 Bouteilles de Champagne Dom Pérignon</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: '0.9rem', color: '#4B5563' }}>
                <CheckCircle2 size={16} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Eau minérale (Température ambiante uniquement)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: '0.9rem', color: '#4B5563' }}>
                <CheckCircle2 size={16} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Bol de M&M's <strong style={{ color: '#1A1A1A' }}>(Rouges retirés obligatoirement)</strong></span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: '0.9rem', color: '#4B5563', padding: '0.8rem', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <AlertCircle size={16} color="#EF4444" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: '#991B1B', fontWeight: 600 }}>10 Serviettes de bain NOIRES (En attente de livraison)</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}
