'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import EventTemplate, { EventConfig, EventSection, Prestation } from '@/components/EventTemplate';
import AuthModal from '@/components/AuthModal';
import PricingModal from '@/components/PricingModal';
import { Settings, Image as ImageIcon, Ticket, Save, Eye, Palette, LayoutGrid, ArrowUp, ArrowDown, Plus, Trash2, MapPin, Building2, Mic2, Star, Upload, Clock, Lock, Loader2, Info, Share2, MessageCircle, ChevronLeft, ChevronRight, X, Users, Rocket } from 'lucide-react';

const TEMPLATE_FESTIVAL: EventConfig = {
  eventName: 'Mon Nouvel Événement',
  organizerName: 'Mon Organisation',
  eventDate: '24 Décembre 2026',
  location: 'Bordeaux, France',
  primaryColor: '#eb8e24',
  logoText: 'EV',
  hideLogo: false,
  pricingMode: 'grid',
  heroImage: '/hero-latino.png',
  translationEnabled: true,
  sections: [
    { id: 'sec-text', type: 'text', title: 'Présentation', columns: 2, textContents: ["Préparez-vous à vivre l'événement de l'année. Nous avons réuni les meilleurs artistes pour une journée inoubliable.", "Au programme : de la musique, des rencontres, de la street-food authentique et plein d'autres surprises !"] },
    { id: 'sec-benefits', type: 'benefits', title: 'Vivez une expérience inoubliable' },
    { id: 'sec-photos', type: 'photos', title: "Plongez dans l'ambiance", photos: ['/immersion_1.png', '/immersion_2.png', '/immersion_3.png', '/immersion_4.jpg'] },
    { id: 'sec-testimonials', type: 'testimonials', title: "Ce qu'ils en disent", testimonials: [
      { id: '1', text: "L'ambiance était incroyable, l'organisation parfaite.", author: "Camille L.", year: "2025" },
      { id: '2', text: "Les concerts sous le coucher de soleil resteront gravés dans ma mémoire.", author: "Thomas G.", year: "2025" }
    ] },
    { id: 'sec-map', type: 'map', title: 'Où nous trouver', mapAddress: 'Parc de la Villette, Paris', mapTitle: 'Scène Principale', mapIcon: 'pin' }
  ],
  fomo: {
    enabled: true,
    endDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    message: 'Les prix augmentent dans :'
  },
  pricing: [
    { id: 'basic', name: 'Pass Basic', price: 'Gratuit', nextPrice: '5 €', color: '#1A1A1A', bg: '#F9FAFB', popular: false, visibility: 'public', secretCode: '', prestations: [
      { id: 'p1', type: 'concert', title: 'Accès Scène Principale', description: 'Accès libre à tous les concerts du jour.', date: '24 Déc', duration: 'Toute la journée', value: 30 },
      { id: 'p2', type: 'sociale', title: 'Accès Food Village', description: 'Profitez des stands de restauration.', date: '24 Déc', duration: 'En continu', value: 10 }
    ]},
    { id: 'medium', name: 'Pass Premium', price: '45 €', nextPrice: '55 €', color: '#FFFFFF', bg: '#E00000', popular: true, visibility: 'public', secretCode: '', prestations: [
      { id: 'p3', type: 'concert', title: 'Accès Scène Principale (Coupe-file)', description: 'Entrée prioritaire pour tous les concerts.', date: '24 Déc', duration: 'Toute la journée', value: 45 },
      { id: 'p4', type: 'soiree', title: 'Soirée DJ Set Exclusive', description: 'Accès à la soirée de clôture VIP.', date: '24 Déc', duration: '22h00 - 02h00', value: 35 }
    ]},
    { id: 'vip', name: 'Pass Backstage', price: '120 €', nextPrice: '150 €', color: '#1A1A1A', bg: '#F9FAFB', popular: false, visibility: 'secret', secretCode: 'GUESTLIST', prestations: [
      { id: 'p5', type: 'custom', customType: 'VIP', title: 'Accès Backstage', description: 'Rencontre avec les artistes.', date: '24 Déc', duration: 'Toute la journée', value: 150 },
      { id: 'p6', type: 'sociale', title: 'Bar Privé à Volonté', description: 'Boissons incluses toute la nuit.', date: '24 Déc', duration: 'En continu', value: 80 }
    ]}
  ]
};

const TEMPLATE_MASTERCLASS: EventConfig = {
  eventName: 'Masterclass Design',
  organizerName: 'Design Studio',
  eventDate: '15 Octobre 2026',
  location: 'En Ligne / Paris',
  primaryColor: '#10B981',
  logoText: 'MC',
  heroImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  translationEnabled: true,
  sections: [
    { id: 'sec-text', type: 'text', title: 'Programme de la Masterclass', columns: 2, textContents: ["Découvrez les secrets du design UI/UX moderne. Nous aborderons les fondamentaux de la psychologie des couleurs et de la typographie.", "Cette session sera interactive, préparez vos questions et vos maquettes pour des revues en direct !"] },
    { id: 'sec-benefits', type: 'benefits', title: 'Ce que vous allez apprendre', benefitsItems: [
      { id: 'b1', icon: 'building', title: "Fondamentaux", desc: "Les bases du design" },
      { id: 'b2', icon: 'user', title: "Focus Utilisateur", desc: "Créer pour l'humain" },
      { id: 'b3', icon: 'star', title: "Excellence", desc: "Atteindre la perfection visuelle" }
    ]},
    { id: 'sec-map', type: 'map', title: 'Lieu de formation', mapAddress: 'Station F, Paris', mapTitle: 'Campus', mapIcon: 'building' }
  ],
  fomo: { enabled: false, endDate: '', message: '' },
  pricing: [
    { id: 'basic', name: 'Billet Standard', price: '99 €', color: '#1A1A1A', bg: '#F9FAFB', popular: false, visibility: 'public', secretCode: '', features: ['Accès à la conférence', 'Support de cours PDF'] },
    { id: 'premium', name: 'Pass VIP', price: '199 €', color: '#FFFFFF', bg: '#10B981', popular: true, visibility: 'public', secretCode: '', features: ['Place au premier rang', 'Session Q&A privée', 'Replay vidéo illimité'] }
  ]
};

const TEMPLATE_GALA: EventConfig = {
  eventName: 'Gala de Charité 2026',
  organizerName: 'Fondation Espoir',
  eventDate: '31 Décembre 2026',
  location: 'Hôtel de Ville, Paris',
  primaryColor: '#D4AF37', // Gold
  titleColor: '#D4AF37',
  logoText: 'GC',
  heroImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  translationEnabled: true,
  sections: [
    { id: 'sec-text', type: 'text', title: 'Une soirée inoubliable', columns: 1, textContent: "Rejoignez-nous pour notre dîner de gala annuel. Au programme : vente aux enchères caritative, dîner gastronomique et concert privé." },
    { id: 'sec-photos', type: 'photos', title: "Souvenirs de l'an passé", photos: ['https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1522158637959-30385a09e01a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'] },
    { id: 'sec-testimonials', type: 'testimonials', title: "Nos Donateurs", testimonials: [
      { id: '1', text: "Une soirée magique pour une cause magnifique.", author: "Marie P.", year: "2025" }
    ] }
  ],
  fomo: { enabled: false, endDate: '', message: '' },
  pricing: [
    { id: 'table', name: 'Table Privée (8 pers)', price: '1500 €', color: '#FFFFFF', bg: '#1A1A1A', popular: true, visibility: 'public', secretCode: '', features: ['Table réservée', 'Dîner Gastronomique', 'Vins d\'exception'] },
    { id: 'vip', name: 'Mécène', price: '5000 €', color: '#1A1A1A', bg: '#D4AF37', popular: false, visibility: 'secret', secretCode: 'MECENE', features: ['Mention spéciale', 'Table VIP Premier rang', 'Accès Cocktail Privatif'] }
  ]
};

export default function EventBuilder() {
  const [config, setConfig] = useState<EventConfig>(TEMPLATE_FESTIVAL);

  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<'templates' | 'general' | 'design' | 'tickets' | 'postachat'>('templates');
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>('pricing');
  const [activeTemplateId, setActiveTemplateId] = useState<string>('festival');
  const [customTemplates, setCustomTemplates] = useState<{id: string, name: string, config: EventConfig}[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('eventflow_custom_templates');
    if (saved) setCustomTemplates(JSON.parse(saved));
  }, []);

  const handleSaveCustomTemplate = () => {
    if (customTemplates.length >= 3) {
      alert('Vous avez atteint la limite de 3 modèles personnalisés.');
      return;
    }
    const name = prompt('Nom de votre modèle personnalisé :');
    if (!name) return;
    const newTemplate = { id: `custom-${Date.now()}`, name, config: JSON.parse(JSON.stringify(config)) };
    const newTemplates = [...customTemplates, newTemplate];
    setCustomTemplates(newTemplates);
    localStorage.setItem('eventflow_custom_templates', JSON.stringify(newTemplates));
    setActiveTemplateId(newTemplate.id);
  };

  const handleLoadTemplate = (id: string, templateConfig: EventConfig) => {
    if (confirm('Voulez-vous charger ce modèle ? Cela effacera votre personnalisation actuelle.')) {
      setConfig(templateConfig);
      setActiveTemplateId(id);
    }
  };
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testMessage, setTestMessage] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [hasHoveredSidebar, setHasHoveredSidebar] = useState(false);
  const [showSidebarHint, setShowSidebarHint] = useState(false);
  
  const [showGuideLeft, setShowGuideLeft] = useState(false);
  const [showGuideRight, setShowGuideRight] = useState(false);
  const [guideFinished, setGuideFinished] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Supabase Auth & Data Fetching
  useEffect(() => {
    const fetchUserAndEvent = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsLoading(false);
        return;
      }
      setUser(session.user);

      const { data: event, error } = await supabase
        .from('events')
        .select('*')
        .eq('organizer_id', session.user.id)
        .maybeSingle();

      if (event && event.config) {
        setEventId(event.id);
        setConfig(event.config as EventConfig);
      }
      setIsLoading(false);
    };

    fetchUserAndEvent();
  }, [router]);

  // Onboarding Animation Effect
  useEffect(() => {
    if (isLoading) return; // Attendre que la page soit complètement chargée

    // Si l'utilisateur a déjà un événement validé ou a fermé l'aide, on n'affiche pas le guide
    if (eventId || guideFinished) {
      setShowGuideLeft(false);
      setShowGuideRight(false);
      return;
    }

    // Timeline de l'animation
    const timer1 = setTimeout(() => {
      setShowGuideLeft(true);
    }, 3000); // 3 secondes après le chargement

    const timer2 = setTimeout(() => {
      setShowGuideRight(true);
      
      // Défilement très lent (8 secondes) via requestAnimationFrame
      if (previewRef.current) {
        const element = previewRef.current;
        const start = element.scrollTop;
        // On s'assure qu'on scroll jusqu'en bas, mais sans erreur si clientHeight n'est pas prêt
        const change = Math.max(0, element.scrollHeight - element.clientHeight - start);
        const duration = 8000;
        const startTime = performance.now();

        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          element.scrollTop = start + change * progress;
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };
        requestAnimationFrame(animateScroll);
      }
    }, 5000); // 3s + 2s

    const autoCloseTimer = setTimeout(() => {
      setGuideFinished(true);
      setShowGuideLeft(false);
      setShowGuideRight(false);
    }, 15000); // Fermeture auto après la fin du scroll

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(autoCloseTimer);
    };
  }, [eventId, guideFinished, isLoading]);

  // Auto-scroll effect pour les sections
  useEffect(() => {
    if (selectedSectionId && !isLoading) {
      const element = document.getElementById(selectedSectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedSectionId, isLoading]);

  const updateConfig = (key: keyof EventConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const updateFomo = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, fomo: { ...prev.fomo, [key]: value } }));
  };

  const updateSection = (id: string, updates: Partial<EventSection>) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(sec => sec.id === id ? { ...sec, ...updates } : sec)
    }));
  };

  const updateBenefitItem = (sectionId: string, itemIndex: number, key: string, value: any) => {
    const section = config.sections.find(s => s.id === sectionId);
    if (!section) return;
    
    let items = section.benefitsItems;
    if (!items || items.length !== 3) {
      items = [
        { id: 'b1', icon: 'music', title: "3 Scènes Live", desc: "Des artistes internationaux et des DJs locaux." },
        { id: 'b2', icon: 'coffee', title: "Food Village", desc: "Plus de 15 stands de street-food authentique." },
        { id: 'b3', icon: 'tent', title: "Espaces Chill", desc: "Des zones ombragées avec transats." }
      ];
    }
    
    const newItems = [...items];
    newItems[itemIndex] = { ...newItems[itemIndex], [key]: value };
    updateSection(sectionId, { benefitsItems: newItems });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...config.sections];
    if (direction === 'up' && index > 0) {
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    } else if (direction === 'down' && index < newSections.length - 1) {
      [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
    }
    updateConfig('sections', newSections);
  };

  const removeSection = (id: string) => {
    updateConfig('sections', config.sections.filter(s => s.id !== id));
    if (selectedSectionId === id) setSelectedSectionId(null);
  };

  const addSection = (type: EventSection['type'], columns?: 1 | 2) => {
    const newId = `sec-${Date.now()}`;
    const newSection: EventSection = {
      id: newId,
      type,
      title: type === 'video' ? 'Nouvelle Vidéo' : 'Nouveau Texte',
      columns,
      photos: type === 'photos' ? [] : undefined,
      testimonials: type === 'testimonials' ? [] : undefined
    };
    updateConfig('sections', [...config.sections, newSection]);
    setSelectedSectionId(newId);
  };

  const updatePricingConfig = (index: number, key: string, value: any) => {
    const newPricing = [...config.pricing];
    newPricing[index] = { ...newPricing[index], [key]: value };
    updateConfig('pricing', newPricing);
  };

  const addPrestation = (passIndex: number) => {
    const pass = config.pricing[passIndex];
    const newPrestation: Prestation = { id: `p-${Date.now()}`, type: 'concert', title: 'Nouvelle prestation', description: '', date: '', duration: '', value: 0 };
    const newPricing = [...config.pricing];
    newPricing[passIndex] = { ...pass, prestations: [...(pass.prestations || []), newPrestation] };
    updateConfig('pricing', newPricing);
  };

  const updatePrestation = (passIndex: number, prestationId: string, key: string, value: any) => {
    const pass = config.pricing[passIndex];
    const newPricing = [...config.pricing];
    newPricing[passIndex] = { 
      ...pass, 
      prestations: pass.prestations?.map(p => p.id === prestationId ? { ...p, [key]: value } : p)
    };
    updateConfig('pricing', newPricing);
  };

  const removePrestation = (passIndex: number, prestationId: string) => {
    const pass = config.pricing[passIndex];
    const newPricing = [...config.pricing];
    newPricing[passIndex] = { 
      ...pass, 
      prestations: pass.prestations?.filter(p => p.id !== prestationId)
    };
    updateConfig('pricing', newPricing);
  };

  const handleSave = async (currentUser = user) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsSaving(true);
    try {
      if (eventId) {
        // UPDATE
        const { error } = await supabase
          .from('events')
          .update({ config })
          .eq('id', eventId);
        if (error) throw error;
        alert('Événement mis à jour avec succès !');
        const slug = config.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        router.push(`/e/${slug}`);
      } else {
        // INSERT
        const slug = config.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const { data, error } = await supabase
          .from('events')
          .insert([{ organizer_id: currentUser.id, slug, config }])
          .select()
          .single();
        if (error) throw error;
        setEventId(data.id);
        router.push(`/e/${slug}`);
      }
    } catch (err: any) {
      alert('Erreur lors de la sauvegarde : ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAuthSuccess = async () => {
    setIsAuthModalOpen(false);
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setUser(session.user);
      handleSave(session.user);
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F4F6', color: '#666' }}>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
        <span style={{ marginLeft: '1rem', fontWeight: 600, fontSize: '1.2rem' }}>Connexion sécurisée en cours...</span>
      </div>
    );
  }

  const activeTabStyle = { backgroundColor: '#10B981', color: 'white', fontWeight: 800, border: 'none' };
  const inactiveTabStyle = { backgroundColor: '#F9FAFB', color: '#666', fontWeight: 500, border: 'none', borderBottom: '2px solid transparent' };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      
      {/* ⬅️ SIDEBAR ÉDITEUR */}
      <div 
        onMouseEnter={() => {
          if (!hasHoveredSidebar) {
            setHasHoveredSidebar(true);
            setShowSidebarHint(true);
          }
        }}
        style={{ width: isSidebarExpanded ? '600px' : '400px', minWidth: isSidebarExpanded ? '600px' : '400px', flexShrink: 0, transition: 'all 0.3s ease', backgroundColor: 'white', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', zIndex: 100, boxShadow: '5px 0 15px rgba(0,0,0,0.05)' }}
      >
        
        {/* HEADER SIDEBAR */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1A1A1A', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings size={20} /> EventBuilder
            <div style={{ position: 'relative', marginLeft: 'auto' }}>
              <button onClick={() => { setIsSidebarExpanded(!isSidebarExpanded); setShowSidebarHint(false); }} style={{ background: '#1A1A1A', border: '1px solid #1A1A1A', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.4rem', borderRadius: '8px', transition: 'all 0.2s', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} title={isSidebarExpanded ? "Réduire le menu" : "Élargir le menu"}>
                {isSidebarExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
              {showSidebarHint && !isSidebarExpanded && (
                <div style={{ position: 'absolute', top: '130%', right: '0', backgroundColor: '#10B981', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, whiteSpace: 'nowrap', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)', animation: 'fadeUp 0.3s ease', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>Élargir l'éditeur ☝️</span>
                  <button onClick={() => setShowSidebarHint(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', padding: '0.2rem', marginLeft: '0.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Fermer">
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </h2>
          <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.2rem', marginBottom: '0.8rem' }}>Édition WYSIWYG en direct</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => router.push('/dashboard/events/terrain')}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.6rem 0.4rem', borderRadius: '8px', border: '1px solid #E0E7FF', background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem', color: '#4338CA' }}
            >
              <span>⚙️ Terrain</span>
              <span style={{ background: '#6366F1', color: '#FFF', fontSize: '0.55rem', padding: '0.1rem 0.3rem', borderRadius: '4px', fontWeight: 800 }}>PRO</span>
            </button>
            <button
              onClick={() => router.push('/dashboard/events/crm')}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.6rem 0.4rem', borderRadius: '8px', border: '1px solid #FEF3C7', background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem', color: '#D97706' }}
            >
              <Users size={14} /> CRM
            </button>
            <button
              onClick={() => setShowPricingModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem', color: '#444' }}
            >
              <Info size={14} /> Tarifs
            </button>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E5E7EB' }}>
          <button onClick={() => { setActiveTab('templates'); }} style={{ flex: 1, padding: '1rem 0.2rem', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem', ...(activeTab === 'templates' ? activeTabStyle : inactiveTabStyle) }}>Modèles</button>
          <button onClick={() => { setActiveTab('general'); setSelectedSectionId('header'); }} style={{ flex: 1, padding: '1rem 0.2rem', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem', ...(activeTab === 'general' ? activeTabStyle : inactiveTabStyle) }}>Infos</button>
          <button onClick={() => setActiveTab('design')} style={{ flex: 1, padding: '1rem 0.2rem', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem', ...(activeTab === 'design' ? activeTabStyle : inactiveTabStyle) }}>Design</button>
          <button onClick={() => { setActiveTab('tickets'); setSelectedSectionId('pricing'); }} style={{ flex: 1, padding: '1rem 0.2rem', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem', ...(activeTab === 'tickets' ? activeTabStyle : inactiveTabStyle) }}>Billets</button>
          <button onClick={() => setActiveTab('postachat')} style={{ flex: 1, padding: '1rem 0.2rem', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem', ...(activeTab === 'postachat' ? activeTabStyle : inactiveTabStyle) }}>Post-Achat</button>
        </div>

        {/* CONTENT SIDEBAR */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          
          {activeTab === 'templates' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
                Gagnez du temps en chargeant une configuration prédéfinie. Ces configurations peuvent être adaptées à vos habitudes. <strong style={{ color: '#EF4444' }}>Attention : cela écrasera votre design actuel.</strong>
              </p>
              
              <div onClick={() => handleLoadTemplate('festival', TEMPLATE_FESTIVAL)} style={{ padding: '1rem', border: activeTemplateId === 'festival' ? '3px solid #10B981' : '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', background: 'linear-gradient(to right, #1F2937, #111827)', color: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Festival / Soirée</h3>
                  {activeTemplateId === 'festival' && <span style={{ backgroundColor: '#10B981', color: 'white', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800 }}>Actif</span>}
                </div>
                <p style={{ fontSize: '0.75rem', opacity: 0.8, margin: 0 }}>Design sombre, focus sur le line-up, FOMO activé.</p>
              </div>

              <div onClick={() => handleLoadTemplate('masterclass', TEMPLATE_MASTERCLASS)} style={{ padding: '1rem', border: activeTemplateId === 'masterclass' ? '3px solid #10B981' : '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', background: 'linear-gradient(to right, #ECFDF5, #D1FAE5)', color: '#065F46' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Masterclass / Conférence</h3>
                  {activeTemplateId === 'masterclass' && <span style={{ backgroundColor: '#10B981', color: 'white', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800 }}>Actif</span>}
                </div>
                <p style={{ fontSize: '0.75rem', opacity: 0.8, margin: 0 }}>Design épuré, texte détaillé, billets VIP.</p>
              </div>

              <div onClick={() => handleLoadTemplate('gala', TEMPLATE_GALA)} style={{ padding: '1rem', border: activeTemplateId === 'gala' ? '3px solid #10B981' : '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', background: 'linear-gradient(to right, #FEF3C7, #FDE68A)', color: '#92400E' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Gala / Dîner Spectacle</h3>
                  {activeTemplateId === 'gala' && <span style={{ backgroundColor: '#10B981', color: 'white', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800 }}>Actif</span>}
                </div>
                <p style={{ fontSize: '0.75rem', opacity: 0.8, margin: 0 }}>Design premium (Or), focus sur les témoignages.</p>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '1rem 0' }} />

              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1A1A1A', margin: 0 }}>Mes Modèles Personnalisés ({customTemplates.length}/3)</h4>
              
              {customTemplates.map(tpl => (
                <div key={tpl.id} onClick={() => handleLoadTemplate(tpl.id, tpl.config)} style={{ padding: '1rem', border: activeTemplateId === tpl.id ? '3px solid #10B981' : '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', background: '#F9FAFB', color: '#1A1A1A' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 0.2rem 0' }}>{tpl.name}</h3>
                    {activeTemplateId === tpl.id && <span style={{ backgroundColor: '#10B981', color: 'white', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800 }}>Actif</span>}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); const newArr = customTemplates.filter(t => t.id !== tpl.id); setCustomTemplates(newArr); localStorage.setItem('eventflow_custom_templates', JSON.stringify(newArr)); }} style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.7rem', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>Supprimer</button>
                </div>
              ))}

              <button onClick={handleSaveCustomTemplate} disabled={customTemplates.length >= 3} style={{ marginTop: '0.5rem', padding: '0.8rem', borderRadius: '8px', border: '1px dashed #CCC', backgroundColor: customTemplates.length >= 3 ? '#F3F4F6' : 'white', color: customTemplates.length >= 3 ? '#9CA3AF' : '#1A1A1A', fontWeight: 700, cursor: customTemplates.length >= 3 ? 'not-allowed' : 'pointer' }}>
                + Enregistrer la configuration actuelle
              </button>
            </div>
          )}

          {activeTab === 'general' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#444' }}>Nom de l'événement</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" value={config.eventName} onChange={e => updateConfig('eventName', e.target.value)} style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #CCC', fontSize: '0.9rem' }} />
                  <div style={{ position: 'relative', width: '45px', height: '45px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #CCC', flexShrink: 0 }} title="Couleur du titre">
                    <input type="color" value={config.titleColor || '#FFFFFF'} onChange={e => updateConfig('titleColor', e.target.value)} style={{ width: '150%', height: '150%', position: 'absolute', top: '-25%', left: '-25%', cursor: 'pointer', border: 'none' }} />
                  </div>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#444' }}>Nom de l'organisateur</label>
                <input type="text" value={config.organizerName || ''} onChange={e => updateConfig('organizerName', e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #CCC', fontSize: '0.9rem' }} placeholder="Ex: Ma Structure Event" />
              </div>
              <div style={{ backgroundColor: '#F9FAFB', padding: '1rem', borderRadius: '8px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: '#444', cursor: 'pointer' }}>
                  Masquer l'icône de l'organisateur
                  <input type="checkbox" checked={config.hideLogo || false} onChange={e => updateConfig('hideLogo', e.target.checked)} />
                </label>
                {!config.hideLogo && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.3rem' }}>URL du Logo de l'organisation (optionnel)</label>
                    <input type="text" value={config.logoImage || ''} onChange={e => updateConfig('logoImage', e.target.value)} onFocus={() => { if(!user) setIsAuthModalOpen(true); }} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CCC', fontSize: '0.85rem' }} placeholder="https://... (Connexion requise)" />
                  </div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#444' }}>Date(s)</label>
                <input type="text" value={config.eventDate} onChange={e => updateConfig('eventDate', e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #CCC', fontSize: '0.9rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#444' }}>Lieu</label>
                <input type="text" value={config.location} onChange={e => updateConfig('location', e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #CCC', fontSize: '0.9rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#444' }}>Compte Stripe (Paiements)</label>
                <div style={{ padding: '0.8rem', backgroundColor: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <Lock size={16} color="#15803D" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#15803D', lineHeight: 1.4 }}>
                    <strong>100% Sécurisé.</strong> Nous n'avons aucun accès à votre compte bancaire. Cet identifiant sert uniquement à reverser instantanément 100% des ventes de billets sur votre compte Stripe.
                  </p>
                </div>
                <input type="text" value={config.stripeId || ''} onChange={e => updateConfig('stripeId', e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #CCC', fontSize: '0.9rem' }} placeholder="ex: acct_12345..." />
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* BRANDING */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#444' }}>Texte du Logo (Max 3 lettres)</label>
                  <input type="text" maxLength={3} value={config.logoText} onChange={e => updateConfig('logoText', e.target.value.toUpperCase())} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #CCC', fontSize: '0.9rem' }} />
                </div>
                <div>
                   <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#444' }}><Palette size={16} /> Couleur Principale</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="color" value={config.primaryColor} onChange={e => updateConfig('primaryColor', e.target.value)} style={{ width: '40px', height: '40px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
                    <input type="text" value={config.primaryColor} onChange={e => updateConfig('primaryColor', e.target.value)} style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #CCC', fontSize: '0.9rem', textTransform: 'uppercase' }} />
                  </div>
                </div>
              </div>

              {/* IMAGE DE COUVERTURE */}
              <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#444' }}>Image de couverture (URL)</label>
                <input type="text" value={config.heroImage || ''} onChange={e => updateConfig('heroImage', e.target.value)} onFocus={() => { if(!user) setIsAuthModalOpen(true); }} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #CCC', fontSize: '0.9rem' }} placeholder="https://... (Connexion requise)" />
              </div>

              {/* TRANSLATION */}
              <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1A1A1A', fontWeight: 800, fontSize: '0.9rem' }}>
                    🌍 Traduction multi-langues
                  </div>
                  <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" className="sr-only" checked={config.translationEnabled || false} onChange={e => updateConfig('translationEnabled', e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                    <div style={{ width: '36px', height: '20px', backgroundColor: config.translationEnabled ? '#10B981' : '#D1D5DB', borderRadius: '20px', transition: 'background-color 0.2s', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '2px', left: config.translationEnabled ? '18px' : '2px', width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}></div>
                    </div>
                  </label>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem', marginBottom: 0 }}>
                  Affiche le sélecteur Google Translate sur la page publique.
                </p>
              </div>

              {/* SECTIONS MANAGER */}
              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 800, marginBottom: '1rem', color: '#1A1A1A' }}>
                  <LayoutGrid size={18} /> Gérer les sections
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {config.sections.map((sec, index) => {
                    const isActive = selectedSectionId === sec.id;
                    return (
                      <div key={sec.id} style={{ display: 'flex', flexDirection: 'column', border: isActive ? '2px solid #10B981' : '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden', boxShadow: isActive ? '0 4px 12px rgba(16, 185, 129, 0.2)' : 'none', transition: 'all 0.2s' }}>
                        <div onClick={() => setSelectedSectionId(sec.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem', backgroundColor: isActive ? '#10B981' : 'white', cursor: 'pointer', color: isActive ? 'white' : '#1A1A1A' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{sec.type === 'video' ? 'Vidéo' : sec.type === 'text' ? 'Texte' : sec.type === 'map' ? 'Carte' : sec.type.charAt(0).toUpperCase() + sec.type.slice(1)}</span>
                          <div style={{ display: 'flex', gap: '0.2rem' }}>
                            <button onClick={(e) => { e.stopPropagation(); moveSection(index, 'up'); }} disabled={index === 0} style={{ padding: '0.3rem', border: 'none', background: 'transparent', cursor: index === 0 ? 'not-allowed' : 'pointer', color: isActive ? 'rgba(255,255,255,0.7)' : (index === 0 ? '#CCC' : '#666') }}><ArrowUp size={16} /></button>
                            <button onClick={(e) => { e.stopPropagation(); moveSection(index, 'down'); }} disabled={index === config.sections.length - 1} style={{ padding: '0.3rem', border: 'none', background: 'transparent', cursor: index === config.sections.length - 1 ? 'not-allowed' : 'pointer', color: isActive ? 'rgba(255,255,255,0.7)' : (index === config.sections.length - 1 ? '#CCC' : '#666') }}><ArrowDown size={16} /></button>
                            <button onClick={(e) => { e.stopPropagation(); removeSection(sec.id); }} style={{ padding: '0.3rem', border: 'none', background: 'transparent', cursor: 'pointer', color: isActive ? 'white' : '#EF4444' }}><Trash2 size={16} /></button>
                          </div>
                        </div>
                        {isActive && sec.type === 'benefits' && (
                          <div style={{ padding: '1rem', backgroundColor: '#FAFAFA', borderTop: '1px solid #E5E7EB' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.8rem', color: '#444' }}>Contenu des 3 colonnes</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              {(sec.benefitsItems || [
                                { id: 'b1', icon: 'music', title: "3 Scènes Live", desc: "Des artistes internationaux et des DJs locaux." },
                                { id: 'b2', icon: 'coffee', title: "Food Village", desc: "Plus de 15 stands de street-food authentique." },
                                { id: 'b3', icon: 'tent', title: "Espaces Chill", desc: "Des zones ombragées avec transats." }
                              ]).map((item, itemIdx) => (
                                <div key={itemIdx} style={{ backgroundColor: 'white', padding: '0.8rem', borderRadius: '8px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <select value={item.icon} onChange={e => updateBenefitItem(sec.id, itemIdx, 'icon', e.target.value)} style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #CCC', fontSize: '0.8rem', backgroundColor: '#F9FAFB' }}>
                                      <option value="star">Icône : ⭐ Étoile</option>
                                      <option value="music">Icône : 🎵 Musique</option>
                                      <option value="coffee">Icône : ☕ Food</option>
                                      <option value="tent">Icône : ⛺ Tente</option>
                                      <option value="building">Icône : 🏢 Bâtiment</option>
                                      <option value="ticket">Icône : 🎫 Billet</option>
                                      <option value="user">Icône : 👤 Personne</option>
                                      <option value="mic">Icône : 🎤 Micro</option>
                                      <option disabled>──────────</option>
                                      <option value="🔥">Émoji : 🔥 Feu</option>
                                      <option value="🎉">Émoji : 🎉 Fête</option>
                                      <option value="🚀">Émoji : 🚀 Fusée</option>
                                      <option value="🥂">Émoji : 🥂 Trinquer</option>
                                      <option value="✨">Émoji : ✨ Étincelles</option>
                                      <option value="🌮">Émoji : 🌮 Tacos</option>
                                      <option value="🌍">Émoji : 🌍 Monde</option>
                                      <option value="🎧">Émoji : 🎧 Casque</option>
                                    </select>
                                    <input type="text" value={item.title} onChange={e => updateBenefitItem(sec.id, itemIdx, 'title', e.target.value)} style={{ flex: 1, padding: '0.4rem', borderRadius: '4px', border: '1px solid #CCC', fontSize: '0.8rem', fontWeight: 800 }} placeholder="Titre principal" />
                                  </div>
                                  <textarea value={item.desc} onChange={e => updateBenefitItem(sec.id, itemIdx, 'desc', e.target.value)} style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #CCC', fontSize: '0.8rem', resize: 'vertical' }} placeholder="Description" rows={2} />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {isActive && sec.type === 'text' && (
                          <div style={{ padding: '1rem', backgroundColor: '#FAFAFA', borderTop: '1px solid #E5E7EB' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.8rem', color: '#444' }}>Mise en page (Colonnes)</label>
                            <select value={sec.columns || 1} onChange={e => updateSection(sec.id, { columns: parseInt(e.target.value) as 1|2|3 })} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #CCC', fontSize: '0.85rem' }}>
                              <option value={1}>1 Colonne (Texte large)</option>
                              <option value={2}>2 Colonnes (Texte divisé)</option>
                              <option value={3}>3 Colonnes (Petits encarts)</option>
                            </select>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                  <button onClick={() => addSection('text')} style={{ flex: '1 1 45%', padding: '0.6rem', border: '1px dashed #CCC', borderRadius: '8px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>+ Texte</button>
                  <button onClick={() => addSection('video')} style={{ flex: '1 1 45%', padding: '0.6rem', border: '1px dashed #CCC', borderRadius: '8px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>+ Vidéo</button>
                  <button onClick={() => addSection('photos')} style={{ flex: '1 1 45%', padding: '0.6rem', border: '1px dashed #CCC', borderRadius: '8px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>+ Photos</button>
                  <button onClick={() => addSection('testimonials')} style={{ flex: '1 1 45%', padding: '0.6rem', border: '1px dashed #CCC', borderRadius: '8px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>+ Avis</button>
                  <button onClick={() => addSection('map')} style={{ flex: '1 1 45%', padding: '0.6rem', border: '1px dashed #CCC', borderRadius: '8px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>+ Carte</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* DISPLAY MODE CONFIG */}
              <div style={{ backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.8rem', color: '#1A1A1A' }}>Mode d'affichage de la billetterie</label>
                <select value={config.pricingMode || 'grid'} onChange={e => updateConfig('pricingMode', e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #CCC', fontSize: '0.9rem', backgroundColor: 'white' }}>
                  <option value="grid">Grille visuelle (Cartes de prix)</option>
                  <option value="additive">Liste additive (Façon Weezevent)</option>
                </select>
              </div>

              {/* FOMO TIMER CONFIG */}
              <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#B91C1C', fontWeight: 800, fontSize: '0.9rem' }}>
                    <Clock size={18} /> Stratégie d'Urgence (FOMO)
                  </div>
                  <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" className="sr-only" checked={config.fomo.enabled} onChange={e => updateFomo('enabled', e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                    <div style={{ width: '36px', height: '20px', backgroundColor: config.fomo.enabled ? '#10B981' : '#D1D5DB', borderRadius: '20px', transition: 'background-color 0.2s', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '2px', left: config.fomo.enabled ? '18px' : '2px', width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}></div>
                    </div>
                  </label>
                </div>
                
                {config.fomo.enabled && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', animation: 'fadeIn 0.3s' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem', color: '#7F1D1D' }}>Date de fin (Fin de l'offre)</label>
                      <input type="datetime-local" value={config.fomo.endDate} onChange={e => updateFomo('endDate', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #FECACA', fontSize: '0.8rem' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem', color: '#7F1D1D' }}>Message accrocheur</label>
                      <input type="text" value={config.fomo.message} onChange={e => updateFomo('message', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #FECACA', fontSize: '0.8rem' }} placeholder="Les prix augmentent dans :" />
                    </div>
                  </div>
                )}
              </div>

              {/* TICKETS CONFIG */}
              <div style={{ fontSize: '0.85rem', color: '#666', backgroundColor: '#F3F4F6', padding: '0.8rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Ticket size={16} /> Gérer les tarifs et accès
              </div>
              
              {config.pricing.map((pass, index) => (
                <div key={pass.id} style={{ border: pass.visibility === 'secret' ? '2px dashed #F59E0B' : '1px solid #E5E7EB', borderRadius: '12px', padding: '1rem', backgroundColor: pass.visibility === 'secret' ? '#FEF3C7' : (pass.popular ? '#F0F9FF' : 'white') }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: pass.visibility === 'secret' ? '#B45309' : '#1A1A1A' }}>
                      {pass.visibility === 'secret' ? <Lock size={16} /> : <Ticket size={16} />} Pass {index + 1}
                    </span>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 700, color: '#666', cursor: 'pointer' }}>
                      Populaire <input type="checkbox" checked={pass.popular} onChange={e => updatePricingConfig(index, 'popular', e.target.checked)} />
                    </label>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input type="text" value={pass.name} onChange={e => updatePricingConfig(index, 'name', e.target.value)} style={{ flex: 2, padding: '0.5rem', borderRadius: '6px', border: '1px solid #CCC', fontSize: '0.85rem' }} placeholder="Nom" />
                      <input type="text" value={pass.price} onChange={e => updatePricingConfig(index, 'price', e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #CCC', fontSize: '0.85rem' }} placeholder="Prix" />
                    </div>

                    {config.fomo.enabled && (
                      <div style={{ animation: 'fadeIn 0.3s' }}>
                        <input type="text" value={pass.nextPrice || ''} onChange={e => updatePricingConfig(index, 'nextPrice', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px dashed #EF4444', fontSize: '0.85rem', color: '#B91C1C', backgroundColor: '#FEF2F2' }} placeholder="Prix après augmentation" title="Ce prix remplacera le prix actuel quand le minuteur arrivera à 0" />
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.5)', padding: '0.5rem', borderRadius: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#444' }}>Visibilité :</span>
                      <select value={pass.visibility} onChange={e => updatePricingConfig(index, 'visibility', e.target.value)} style={{ flex: 1, padding: '0.4rem', borderRadius: '4px', border: '1px solid #CCC', fontSize: '0.8rem', backgroundColor: 'white' }}>
                        <option value="public">🌍 Public (Visible par tous)</option>
                        <option value="secret">🕵️ Secret (Code requis)</option>
                      </select>
                    </div>

                    {pass.visibility === 'secret' && (
                      <div style={{ animation: 'fadeIn 0.3s' }}>
                        <input type="text" value={pass.secretCode} onChange={e => updatePricingConfig(index, 'secretCode', e.target.value.toUpperCase())} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '2px solid #F59E0B', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700 }} placeholder="CODE INVITATION (ex: VIP2026)" />
                      </div>
                    )}

                    {/* Prestations Editor */}
                    <div style={{ marginTop: '1rem', borderTop: '1px solid #E5E7EB', paddingTop: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#444' }}>Programme inclus dans le pass</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {pass.prestations?.map((prest, pIdx) => (
                          <div key={prest.id} style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', padding: '0.8rem', borderRadius: '8px', position: 'relative' }}>
                            <button onClick={() => removePrestation(index, prest.id)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '10px' }}>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <select value={prest.type} onChange={e => updatePrestation(index, prest.id, 'type', e.target.value)} style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #CCC', fontSize: '0.8rem', backgroundColor: 'white' }}>
                                  <option value="cours">Cours</option>
                                  <option value="stage">Stage</option>
                                  <option value="concert">Concert</option>
                                  <option value="showcase">Showcase</option>
                                  <option value="soiree">Soirée</option>
                                  <option value="after">After</option>
                                  <option value="pre-party">Pré-party</option>
                                  <option value="sociale">Sociale</option>
                                  <option value="custom">Personnalisé...</option>
                                </select>
                                {prest.type === 'custom' && (
                                  <input type="text" value={prest.customType || ''} onChange={e => updatePrestation(index, prest.id, 'customType', e.target.value)} style={{ flex: 1, padding: '0.4rem', borderRadius: '4px', border: '1px solid #CCC', fontSize: '0.8rem' }} placeholder="Type perso" />
                                )}
                              </div>
                              <input type="text" value={prest.title} onChange={e => updatePrestation(index, prest.id, 'title', e.target.value)} style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #CCC', fontSize: '0.8rem', fontWeight: 800 }} placeholder="Titre de la prestation" />
                              <textarea value={prest.description} onChange={e => updatePrestation(index, prest.id, 'description', e.target.value)} style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #CCC', fontSize: '0.8rem', resize: 'vertical' }} placeholder="Descriptif court" rows={2} />
                              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <input type="text" value={prest.date} onChange={e => updatePrestation(index, prest.id, 'date', e.target.value)} style={{ flex: '1 1 80px', padding: '0.4rem', borderRadius: '4px', border: '1px solid #CCC', fontSize: '0.8rem' }} placeholder="Date" />
                                <input type="text" value={prest.duration} onChange={e => updatePrestation(index, prest.id, 'duration', e.target.value)} style={{ flex: '1 1 80px', padding: '0.4rem', borderRadius: '4px', border: '1px solid #CCC', fontSize: '0.8rem' }} placeholder="Durée" />
                                <input type="number" value={prest.value || ''} onChange={e => updatePrestation(index, prest.id, 'value', Number(e.target.value))} style={{ flex: '1 1 80px', padding: '0.4rem', borderRadius: '4px', border: '1px solid #10B981', fontSize: '0.8rem', color: '#065F46', fontWeight: 800 }} placeholder="Valeur €" title="Prix de cette prestation seule" />
                              </div>
                            </div>
                          </div>
                        ))}
                        <button onClick={() => addPrestation(index)} style={{ padding: '0.6rem', border: '1px dashed #10B981', borderRadius: '6px', background: 'transparent', color: '#10B981', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                          <Plus size={14} /> Ajouter une prestation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'postachat' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {!user ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: '#F9FAFB', borderRadius: '12px', border: '1px dashed #D1D5DB' }}>
                  <Lock size={32} color="#9CA3AF" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.5rem' }}>Connexion Requise</h3>
                  <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    Vous devez être connecté pour configurer les emails de billetterie et effectuer des tests d'envois avant la mise en ligne.
                  </p>
                  <button onClick={() => setIsAuthModalOpen(true)} style={{ padding: '0.8rem 2rem', backgroundColor: '#10B981', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                    Se connecter
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ backgroundColor: '#EEF2FF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E0E7FF' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#3730A3', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MessageCircle size={18} /> Message de Remerciement
                    </h3>
                    <p style={{ color: '#4F46E5', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                      Personnalisez le texte qui accompagnera le QR Code envoyé à vos acheteurs.
                    </p>
                    <textarea 
                      value={testMessage}
                      onChange={(e) => setTestMessage(e.target.value)}
                      placeholder="Merci pour votre commande ! Préparez vos billets pour le jour J..."
                      style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #C7D2FE', fontSize: '0.9rem', minHeight: '100px', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1A1A', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      🎯 Pré-Contrôle (Tir à Blanc)
                    </h3>
                    <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                      Testez toute la chaîne logistique en un clic. <strong>1)</strong> Recevez le QR code sur <em>{user.email}</em> et <strong>2)</strong> Vérifiez que votre vente s'ajoute bien dans votre base de données CRM.
                    </p>
                    
                    <button 
                      disabled={isSendingTest}
                      onClick={async () => {
                        setIsSendingTest(true);
                        try {
                          const res = await fetch('/api/tickets/generate', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              event_id: 'evt_1',
                              name: 'Tir à Blanc (Test)',
                              email: user.email,
                              ticket_type: 'Pass Test VIP',
                              custom_message: testMessage
                            })
                          });
                          const data = await res.json();
                          if (data.success) {
                            alert(`Fausse vente générée avec succès !\n\n🎫 Billet: ${data.ticketId}\n✅ Ligne "Tir à Blanc" ajoutée au CRM (Simulation)\n${data.emailSent ? '📧 Email envoyé par Resend !' : 'ℹ️ Simulation d\'email (Clé API Resend manquante en dev)'}`);
                          } else {
                            alert('Erreur lors du test: ' + data.error);
                          }
                        } catch (err) {
                          alert('Erreur de connexion au serveur.');
                        } finally {
                          setIsSendingTest(false);
                        }
                      }}
                      style={{ width: '100%', padding: '1rem', backgroundColor: '#1A1A1A', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '0.95rem', cursor: isSendingTest ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'background 0.2s', opacity: isSendingTest ? 0.7 : 1 }}
                      onMouseEnter={e => !isSendingTest && (e.currentTarget.style.backgroundColor = '#333')}
                      onMouseLeave={e => !isSendingTest && (e.currentTarget.style.backgroundColor = '#1A1A1A')}
                    >
                      {isSendingTest ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Rocket size={18} />} 
                      {isSendingTest ? 'Envoi en cours...' : 'Lancer un Tir à Blanc'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>

        {/* BOTTOM ACTION */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
          <button onClick={handleSave} disabled={isSaving} style={{ width: '100%', padding: '1rem', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '1rem', cursor: isSaving ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: isSaving ? 0.7 : 1 }}>
            {isSaving ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={18} />} 
            {isSaving ? 'Enregistrement...' : 'Enregistrer & Publier'}
          </button>
        </div>
      </div>

      {/* ➡️ PREVIEW LIVE */}
      <div ref={previewRef} style={{ flex: 1, backgroundColor: '#F3F4F6', position: 'relative', overflowY: 'auto', scrollBehavior: 'smooth' }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'white', padding: '0.8rem 2rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: '0.9rem', fontWeight: 600 }}>
            <Eye size={18} /> Aperçu en direct (Cliquez sur les textes pour modifier)
          </div>
          <button onClick={() => { if(!user) setIsAuthModalOpen(true); else setShowShareModal(true); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #E5E7EB', backgroundColor: 'white', color: '#1A1A1A', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>
            <Share2 size={16} /> Partager
          </button>
        </div>
        
        <div style={{ boxShadow: '0 0 30px rgba(0,0,0,0.1)', minHeight: '100%', backgroundColor: 'white' }}>
          <EventTemplate 
            config={config} 
            isPreview={true} 
            isEditable={true} 
            onUpdateConfig={updateConfig} 
            onUpdateSection={updateSection} 
          />
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultIsLogin={false} 
        onSuccess={handleAuthSuccess} 
      />

      <PricingModal 
        isOpen={showPricingModal} 
        onClose={() => setShowPricingModal(false)} 
      />

      {/* ONBOARDING ANIMÉ */}
      {showGuideLeft && !isAuthModalOpen && !showPricingModal && !showShareModal && (
        <div style={{ position: 'fixed', top: '50%', left: '200px', transform: 'translate(-50%, -50%)', background: '#0A0A0A', color: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 1000, maxWidth: '280px', textAlign: 'center', animation: 'fadeUp 0.5s ease' }}>
          <button onClick={() => setShowGuideLeft(false)} style={{ position: 'absolute', top: '0.5rem', right: '0.8rem', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.2rem', padding: '0.2rem' }}>✕</button>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👈</div>
          <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Votre interface</h4>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.5, opacity: 0.9 }}>
            Renseignez et modifiez les informations de votre événement ici à gauche.
          </p>
        </div>
      )}

      {showGuideRight && !isAuthModalOpen && !showPricingModal && !showShareModal && (
        <div style={{ position: 'fixed', top: '50%', left: 'calc(400px + (100vw - 400px) / 2)', transform: 'translate(-50%, -50%)', background: '#0A0A0A', color: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 1000, maxWidth: '320px', textAlign: 'center', animation: 'fadeUp 0.5s ease' }}>
          <button onClick={() => { setShowGuideRight(false); setGuideFinished(true); }} style={{ position: 'absolute', top: '0.5rem', right: '0.8rem', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.2rem', padding: '0.2rem' }}>✕</button>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</div>
          <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Aperçu en direct</h4>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.5, opacity: 0.9 }}>
            Voyez votre page publique se construire au fur et à mesure sur la droite. Elle s'adapte en temps réel !
          </p>
        </div>
      )}
      
      {/* MODAL PARTAGE */}
      {showShareModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={e => { if (e.target === e.currentTarget) setShowShareModal(false); }}>
          <div style={{ background: '#FFF', padding: '2.5rem 2rem', borderRadius: '16px', width: '100%', maxWidth: '400px', position: 'relative', textAlign: 'center' }}>
            <button onClick={() => setShowShareModal(false)} style={{ position: 'absolute', top: '1rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}>✕</button>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem', color: '#0A0A0A' }}>Partagez votre événement</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem' }}>Faites du bruit et attirez du monde !</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', borderRadius: '8px', border: 'none', backgroundColor: '#1877F2', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/e/' + (config.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')))}`, '_blank')}>
                Partager sur Facebook
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', borderRadius: '8px', border: 'none', backgroundColor: '#000000', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/e/' + (config.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')))}&text=${encodeURIComponent('Découvrez mon événement ' + config.eventName)}`, '_blank')}>
                Partager sur X (Twitter)
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', borderRadius: '8px', border: 'none', backgroundColor: '#25D366', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('Découvrez mon événement ' + config.eventName + ' : ' + window.location.origin + '/e/' + (config.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')))}`, '_blank')}>
                Partager sur WhatsApp
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #CCC', backgroundColor: 'white', color: '#1A1A1A', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => { navigator.clipboard.writeText(window.location.origin + '/e/' + (config.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))); alert('Lien copié dans le presse-papier !'); }}>
                Copier le lien
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
