'use client';
import { Variants } from 'framer-motion';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, CreditCard, User, CheckCircle2, ChevronRight, ChevronLeft, ArrowLeft, Star, MapPin, Music, Coffee, Tent, Quote, Edit2, Building2, Mic2, Lock, Unlock, Clock, X, Bold, Italic, List, ListOrdered, Info } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';

export type Prestation = {
  id: string;
  type: 'cours' | 'stage' | 'concert' | 'showcase' | 'soiree' | 'after' | 'pre-party' | 'sociale' | 'custom';
  customType?: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  value: number; 
};

export type EventSection = {
  id: string;
  type: 'benefits' | 'photos' | 'testimonials' | 'map' | 'video' | 'text';
  title?: string;
  videoUrl?: string;
  textContent?: string;
  textContents?: string[];
  columns?: 1 | 2 | 3;
  photos?: string[];
  testimonials?: { id: string; text: string; author: string; year: string }[];
  benefitsItems?: { id: string; icon: string; title: string; desc: string }[];
  mapAddress?: string;
  mapTitle?: string;
  mapIcon?: 'pin' | 'building' | 'stage' | 'star';
};

export type EventConfig = {
  eventName: string;
  organizerName?: string;
  titleColor?: string;
  eventDate: string;
  location: string;
  primaryColor: string;
  hideLogo?: boolean;
  logoImage?: string;
  logoText: string;
  heroImage: string;
  translationEnabled?: boolean;
  pricingMode?: 'grid' | 'additive';
  sections: EventSection[];
  fomo: {
    enabled: boolean;
    endDate: string;
    message: string;
  };
  stripeId?: string;
  pricing: {
    id: string;
    name: string;
    price: string;
    features?: string[];
    prestations?: Prestation[];
    color: string;
    bg: string;
    popular: boolean;
    visibility: 'public' | 'secret';
    secretCode: string;
    nextPrice?: string;
  }[];
};

const AVAILABLE_ICONS = [
  'music', 'coffee', 'tent', 'star', 'building', 'user', 'ticket', 'mic', 'quote', 
  'map-pin', 'clock', 'check', 'lock', 'unlock', 'credit-card', 'info'
];

const renderIcon = (name: string, size = 28, color = 'currentColor') => {
  switch(name) {
    case 'music': return <Music size={size} color={color} />;
    case 'coffee': return <Coffee size={size} color={color} />;
    case 'tent': return <Tent size={size} color={color} />;
    case 'star': return <Star size={size} color={color} />;
    case 'building': return <Building2 size={size} color={color} />;
    case 'user': return <User size={size} color={color} />;
    case 'ticket': return <Ticket size={size} color={color} />;
    case 'mic': return <Mic2 size={size} color={color} />;
    case 'quote': return <Quote size={size} color={color} />;
    case 'map-pin': return <MapPin size={size} color={color} />;
    case 'clock': return <Clock size={size} color={color} />;
    case 'check': return <CheckCircle2 size={size} color={color} />;
    case 'lock': return <Lock size={size} color={color} />;
    case 'unlock': return <Unlock size={size} color={color} />;
    case 'credit-card': return <CreditCard size={size} color={color} />;
    case 'info': return <Info size={size} color={color} />;
    default: return <Star size={size} color={color} />;
  }
};

const IconPicker = ({ currentIcon, onSelect, isEditable, primaryColor }: { currentIcon: string, onSelect: (icon: string) => void, isEditable: boolean, primaryColor: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!isEditable) {
    return <div>{renderIcon(currentIcon)}</div>;
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {renderIcon(currentIcon)}
        <div style={{ position: 'absolute', top: -8, right: -12, color: '#10B981', opacity: 0.8, backgroundColor: 'white', borderRadius: '50%', padding: '2px' }}><Edit2 size={10} /></div>
      </div>
      
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem', backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1rem', width: '250px', zIndex: 50, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
          <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.8rem', fontWeight: 800, color: '#1A1A1A' }}>Choisir une icône</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.8rem' }}>
            {AVAILABLE_ICONS.map(icon => (
              <div 
                key={icon} 
                onClick={(e) => { e.stopPropagation(); onSelect(icon); setIsOpen(false); }}
                style={{ padding: '0.4rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: currentIcon === icon ? `${primaryColor}22` : '#F9FAFB', color: currentIcon === icon ? primaryColor : '#444', transition: 'all 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${primaryColor}22`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentIcon === icon ? `${primaryColor}22` : '#F9FAFB'}
              >
                {renderIcon(icon, 20)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export type EventTemplateProps = {
  config: EventConfig;
  slug?: string;
  isPreview?: boolean;
  isEditable?: boolean;
  onUpdateConfig?: (key: keyof EventConfig, value: any) => void;
  onUpdateSection?: (id: string, updates: Partial<EventSection>) => void;
};

const renderPrestationIcon = (type: string) => {
  switch (type) {
    case 'cours': return '🕺';
    case 'stage': return '🎓';
    case 'concert': return '🎸';
    case 'showcase': return '🎤';
    case 'soiree': return '🌙';
    case 'after': return '🌅';
    case 'pre-party': return '🥂';
    case 'sociale': return '🤝';
    default: return '✨';
  }
};

const ScrollButton = ({ direction, onClick, primaryColor }: { direction: 'left'|'right', onClick: () => void, primaryColor: string }) => (
  <motion.button 
    whileHover={{ scale: 1.1, backgroundColor: primaryColor, color: 'white', borderColor: primaryColor }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    style={{ background: 'white', border: '1px solid #E5E7EB', color: '#1A1A1A', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s, color 0.2s' }}
  >
    {direction === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
  </motion.button>
);

const EditableText = ({ text, onSave, isEditable, tag = 'div', className = '', style = {} }: { text: string, onSave: (val: string) => void, isEditable: boolean, tag?: React.ElementType, className?: string, style?: React.CSSProperties }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [val, setVal] = useState(text);
  const inputRef = useRef<any>(null);

  useEffect(() => { setVal(text); }, [text]);
  useEffect(() => { if (isEditing && inputRef.current) { inputRef.current.focus(); } }, [isEditing]);

  const handleBlur = () => { setIsEditing(false); if(val !== text) onSave(val); };
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleBlur(); };

  if (!isEditable) {
    const Tag = tag as any;
    return <Tag className={className} style={style}>{text}</Tag>;
  }

  if (isEditing) {
    return (
      <input 
        ref={inputRef} value={val} onChange={e => setVal(e.target.value)} onBlur={handleBlur} onKeyDown={handleKeyDown}
        style={{ ...style, width: '100%', border: '2px dashed #10B981', background: 'rgba(255,255,255,0.8)', padding: '2px 8px', borderRadius: '4px', outline: 'none' }}
      />
    );
  }

  const Tag = tag as any;
  return (
    <Tag className={className} style={{ ...style, cursor: 'text', position: 'relative', display: 'inline-block' }} onClick={() => setIsEditing(true)}>
      {text}
      <span style={{ position: 'absolute', top: -10, right: -15, color: '#10B981', opacity: 0.8, backgroundColor: 'white', borderRadius: '50%', padding: '2px' }}><Edit2 size={10} /></span>
    </Tag>
  );
};

const EditableTextArea = ({ text, onSave, isEditable, style = {} }: { text: string, onSave: (val: string) => void, isEditable: boolean, style?: React.CSSProperties }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: text,
    editable: isEditable && isEditing,
    onBlur: ({ editor }) => {
      setIsEditing(false);
      onSave(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && text !== editor.getHTML()) {
      editor.commands.setContent(text);
    }
  }, [text, editor]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable && isEditing);
      if (isEditing) {
        editor.commands.focus();
      }
    }
  }, [isEditing, isEditable, editor]);

  if (!isEditable) {
    return <div style={{ ...style }} dangerouslySetInnerHTML={{ __html: text }} className="tiptap-render" />;
  }

  return (
    <div 
      style={{ ...style, cursor: isEditing ? 'text' : 'pointer', minHeight: text ? 'auto' : '50px', border: isEditing ? '2px dashed #10B981' : (text ? 'none' : '1px dashed #CCC'), opacity: (!text && !isEditing) ? 0.5 : 1, padding: (text && !isEditing) ? 0 : '8px', borderRadius: '4px', backgroundColor: isEditing ? 'white' : 'transparent', color: isEditing ? '#1A1A1A' : 'inherit' }}
      onClick={() => { if (!isEditing) setIsEditing(true); }}
      className="tiptap-container"
    >
      {editor && isEditing && (
        <BubbleMenu editor={editor}>
          <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#1F2937', padding: '0.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <button onClick={() => editor.chain().focus().toggleBold().run()} style={{ background: editor.isActive('bold') ? '#4B5563' : 'transparent', color: 'white', border: 'none', padding: '0.2rem', borderRadius: '4px', cursor: 'pointer' }}><Bold size={16} /></button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} style={{ background: editor.isActive('italic') ? '#4B5563' : 'transparent', color: 'white', border: 'none', padding: '0.2rem', borderRadius: '4px', cursor: 'pointer' }}><Italic size={16} /></button>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()} style={{ background: editor.isActive('bulletList') ? '#4B5563' : 'transparent', color: 'white', border: 'none', padding: '0.2rem', borderRadius: '4px', cursor: 'pointer' }}><List size={16} /></button>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()} style={{ background: editor.isActive('orderedList') ? '#4B5563' : 'transparent', color: 'white', border: 'none', padding: '0.2rem', borderRadius: '4px', cursor: 'pointer' }}><ListOrdered size={16} /></button>
          </div>
        </BubbleMenu>
      )}
      {!isEditing && !text ? 'Cliquez ici pour insérer votre texte...' : <EditorContent editor={editor} />}
    </div>
  );
};

export default function EventTemplate({ config, slug, isPreview = false, isEditable = false, onUpdateConfig, onUpdateSection }: EventTemplateProps) {
  const photosScrollRef = useRef<HTMLDivElement>(null);
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 350;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [passType, setPassType] = useState('basic');
  const [initialCredit, setInitialCredit] = useState('0');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [ticketData, setTicketData] = useState<{ ticketId?: string } | null>(null);

  // VIP Logic
  const [unlockedCodes, setUnlockedCodes] = useState<string[]>([]);
  const [isVipPromptOpen, setIsVipPromptOpen] = useState(false);
  const [vipCodeInput, setVipCodeInput] = useState('');
  const [selectedPassForProgram, setSelectedPassForProgram] = useState<string | null>(null);

  const handleVipUnlock = () => {
    if (vipCodeInput.trim() !== '') {
      setUnlockedCodes(prev => [...prev, vipCodeInput.trim().toUpperCase()]);
      setIsVipPromptOpen(false);
      setVipCodeInput('');
    }
  };

  // FOMO Logic
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isFomoExpired, setIsFomoExpired] = useState(false);

  useEffect(() => {
    if (!config.fomo?.enabled || !config.fomo?.endDate) {
      setIsFomoExpired(false);
      return;
    }

    const calculateTimeLeft = () => {
      const difference = +new Date(config.fomo.endDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
        setIsFomoExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsFomoExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [config.fomo]);

  // Google Translate Logic
  useEffect(() => {
    if (config.translationEnabled && !document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'fr', layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false },
          'google_translate_element'
        );
      };
    }
  }, [config.translationEnabled]);

  const handleLanguageChange = (lang: string) => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    } else {
      document.cookie = `googtrans=/auto/${lang}; path=/`;
      window.location.reload();
    }
  };

  const openWizard = (pass = 'basic') => {
    setPassType(pass);
    setStep(1);
    setIsWizardOpen(true);
  };

  const submitOrder = async () => {
    if (isPreview) {
      alert("Mode Aperçu : Commande simulée !");
      setTicketData({ ticketId: "PREVIEW-TICKET-01" });
      setStep(4);
      return;
    }

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          eventSlug: slug || 'evenement',
          passType,
          initialCredit: parseFloat(initialCredit) || 0,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Une erreur est survenue.');
      }

      setTicketData({ ticketId: data.ticketId });
      setStep(4);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const fadeUpBlur: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' as const } }
  };


  const renderSection = (section: EventSection) => {
    const handleTitleSave = (newTitle: string) => {
      if (onUpdateSection) onUpdateSection(section.id, { title: newTitle });
    };

    switch (section.type) {
      case 'benefits':
        const defaultBenefits = [
          { id: 'b1', icon: 'music', title: "3 Scènes Live", desc: "Des artistes internationaux et des DJs locaux." },
          { id: 'b2', icon: 'coffee', title: "Food Village", desc: "Plus de 15 stands de street-food authentique." },
          { id: 'b3', icon: 'tent', title: "Espaces Chill", desc: "Des zones ombragées avec transats." }
        ];
        const benefitsToRender = section.benefitsItems && section.benefitsItems.length === 3 ? section.benefitsItems : defaultBenefits;

        return (
          <motion.section id={section.id} key={section.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpBlur} className="responsive-padding" style={{ backgroundColor: '#FFF' }}>
            <EditableText isEditable={isEditable} tag="h2" className="responsive-section-title" style={{ fontWeight: 800, textAlign: 'center', color: '#1A1A1A', marginBottom: '3rem' }} text={section.title || "Vivez une expérience inoubliable"} onSave={handleTitleSave} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {benefitsToRender.map((b, idx) => (
                <div key={b.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem', backgroundColor: '#F9FAFB', borderRadius: '24px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: `${config.primaryColor}1A`, color: config.primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <IconPicker 
                      currentIcon={b.icon} 
                      isEditable={isEditable} 
                      primaryColor={config.primaryColor}
                      onSelect={(newIcon) => {
                        if (onUpdateSection) {
                          const newItems = [...benefitsToRender];
                          newItems[idx] = { ...b, icon: newIcon };
                          onUpdateSection(section.id, { benefitsItems: newItems });
                        }
                      }}
                    />
                  </div>
                  <EditableText isEditable={isEditable} tag="h3" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.5rem' }} text={b.title} onSave={(val) => {
                    if (onUpdateSection) {
                      const newItems = [...benefitsToRender];
                      newItems[idx] = { ...b, title: val };
                      onUpdateSection(section.id, { benefitsItems: newItems });
                    }
                  }} />
                  <EditableTextArea isEditable={isEditable} style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6 }} text={b.desc} onSave={(val) => {
                    if (onUpdateSection) {
                      const newItems = [...benefitsToRender];
                      newItems[idx] = { ...b, desc: val };
                      onUpdateSection(section.id, { benefitsItems: newItems });
                    }
                  }} />
                </div>
              ))}
            </div>
          </motion.section>
        );
      case 'photos':
        const photos = section.photos && section.photos.length > 0 ? section.photos : ['/immersion_1.png', '/immersion_2.png', '/immersion_3.png', '/immersion_4.jpg'];
        return (
          <motion.section id={section.id} key={section.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpBlur} className="responsive-padding">
            <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
              <EditableText isEditable={isEditable} tag="h2" className="responsive-section-title" style={{ fontWeight: 800, color: '#1A1A1A', margin: 0 }} text={section.title || "Plongez dans l'ambiance"} onSave={handleTitleSave} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {photos.map((photoUrl, i) => (
                <div key={i} style={{ height: '300px', backgroundImage: `url(${photoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '20px', backgroundColor: '#EEE', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
              ))}
            </div>
          </motion.section>
        );
      case 'testimonials':
        const quotes = section.testimonials && section.testimonials.length > 0 ? section.testimonials : [
          { id: '1', text: "L'ambiance était incroyable, l'organisation parfaite.", author: "Camille L.", year: "2025" },
          { id: '2', text: "Les concerts sous le coucher de soleil resteront gravés dans ma mémoire.", author: "Thomas G.", year: "2025" }
        ];
        return (
          <motion.section id={section.id} key={section.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpBlur} className="responsive-padding">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Quote size={28} color={config.primaryColor} style={{ opacity: 0.3 }} />
                <EditableText isEditable={isEditable} tag="h2" className="responsive-section-title" style={{ fontWeight: 800, color: '#1A1A1A', margin: 0 }} text={section.title || "Ce qu'ils en disent"} onSave={handleTitleSave} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}><ScrollButton direction="left" onClick={() => scrollContainer(testimonialsScrollRef, 'left')} primaryColor={config.primaryColor} /><ScrollButton direction="right" onClick={() => scrollContainer(testimonialsScrollRef, 'right')} primaryColor={config.primaryColor} /></div>
            </div>
            <div className="horizontal-scroll" ref={testimonialsScrollRef}>
              {quotes.map((quote) => (
                <div key={quote.id} className="scroll-item" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.2rem', color: '#FBBF24', marginBottom: '1rem' }}><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                    <p style={{ fontSize: '0.9rem', color: '#444', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.6 }}>"{quote.text}"</p>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1A1A1A' }}>{quote.author} <span style={{ fontWeight: 400, color: '#888' }}>- Édition {quote.year}</span></div>
                </div>
              ))}
            </div>
          </motion.section>
        );
      case 'map':
        const mapUrl = section.mapAddress 
          ? `https://www.google.com/maps?q=${encodeURIComponent(section.mapAddress)}&output=embed`
          : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.874558066526!2d2.388836515675127!3d48.88915597929112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66dcb301d01dd%3A0xa646279f1dfad57e!2sParc%20de%20la%20Villette!5e0!3m2!1sfr!2sfr!4v1689255877864!5m2!1sfr!2sfr";
        
        let MapIconComponent = MapPin;
        if (section.mapIcon === 'building') MapIconComponent = Building2;
        if (section.mapIcon === 'stage') MapIconComponent = Mic2;
        if (section.mapIcon === 'star') MapIconComponent = Star;

        return (
          <motion.section id={section.id} key={section.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpBlur} className="responsive-padding">
            <EditableText isEditable={isEditable} tag="h2" className="responsive-section-title" style={{ fontWeight: 800, color: '#1A1A1A', marginBottom: '1.5rem' }} text={section.title || "Où nous trouver"} onSave={handleTitleSave} />
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
              <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ padding: '1rem', borderRadius: '16px', border: `2px solid ${config.primaryColor}`, backgroundColor: `${config.primaryColor}1A` }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapIconComponent size={16} color={config.primaryColor} /> 
                    {section.mapTitle || "Emplacement"}
                  </h3>
                  <p style={{ color: '#666', fontSize: '0.8rem' }}>{section.mapAddress || "Parc de la Villette, Paris"}</p>
                </div>
              </div>
              <div style={{ flex: '2 1 350px', height: '300px', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#EEE' }}>
                <iframe src={mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
              </div>
            </div>
          </motion.section>
        );
      case 'text':
        const columnsCount = section.columns || 1;
        const texts = section.textContents || [section.textContent || "Tapez votre texte ici..."];
        return (
          <motion.section id={section.id} key={section.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpBlur} className="responsive-padding">
            <EditableText isEditable={isEditable} tag="h2" className="responsive-section-title" style={{ fontWeight: 800, color: '#1A1A1A', marginBottom: '1.5rem' }} text={section.title || "À propos"} onSave={handleTitleSave} />
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${Math.max(200, 800 / columnsCount)}px, 1fr))`, gap: '2rem' }}>
              {Array.from({ length: columnsCount }).map((_, i) => (
                <EditableTextArea isEditable={isEditable} 
                  key={i}
                  text={texts[i] || ""} 
                  onSave={(val) => { 
                    if(onUpdateSection) {
                      const newTexts = [...texts];
                      newTexts[i] = val;
                      onUpdateSection(section.id, { textContents: newTexts, textContent: newTexts[0] });
                    }
                  }} 
                  style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.8, whiteSpace: 'pre-wrap' }} 
                />
              ))}
            </div>
          </motion.section>
        );
      case 'video':
        return (
          <motion.section id={section.id} key={section.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpBlur} className="responsive-padding">
            <EditableText isEditable={isEditable} tag="h2" className="responsive-section-title" style={{ fontWeight: 800, color: '#1A1A1A', marginBottom: '1.5rem' }} text={section.title || "Teaser Vidéo"} onSave={handleTitleSave} />
            <div style={{ width: '100%', height: '400px', backgroundColor: '#000', borderRadius: '20px', overflow: 'hidden' }}>
              {section.videoUrl ? (
                <iframe src={section.videoUrl.replace('watch?v=', 'embed/')} width="100%" height="100%" style={{ border: 0 }} allowFullScreen />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>Entrez l'URL de la vidéo dans la Sidebar</div>
              )}
            </div>
          </motion.section>
        );
      default:
        return null;
    }
  };

  const visiblePricing = config.pricing.filter(pass => {
    if (isPreview) return true; // Show all to organizer in preview, wait no, let's show real logic even in preview to test it
    if (pass.visibility === 'public') return true;
    if (pass.visibility === 'secret' && unlockedCodes.includes(pass.secretCode?.toUpperCase())) return true;
    return false;
  });
  
  // Actually for Organizer preview, maybe they want to test the secret code? 
  // Let's make it behave exactly like production. If they want to see it, they can type the code in the preview.

  return (
    <div style={{ backgroundColor: config.bg, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Translate widget moved below header */}

      <style>{`
        .tiptap-container .tiptap:focus { outline: none; }
        .tiptap-container p, .tiptap-render p { margin-bottom: 0.5rem; line-height: 1.8; }
        .tiptap-container ul, .tiptap-render ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .tiptap-container ol, .tiptap-render ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .tiptap-container strong, .tiptap-render strong { font-weight: 800; }
        .tiptap-container em, .tiptap-render em { font-style: italic; }
        .responsive-title { font-size: clamp(1.8rem, 4.5vw, 3.2rem); }
        .responsive-subtitle { font-size: clamp(0.9rem, 2.5vw, 1.2rem); }
        .responsive-section-title { font-size: clamp(1.6rem, 3.5vw, 2rem); }
        .responsive-padding { padding: clamp(2rem, 5vw, 5rem) clamp(1rem, 5vw, 2rem); }
        .narrow-container { max-width: 900px; margin: 0 auto; }
        .horizontal-scroll { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 1.5rem; padding-bottom: 2rem; -ms-overflow-style: none; scrollbar-width: none; }
        .horizontal-scroll::-webkit-scrollbar { display: none; }
        .scroll-item { scroll-snap-align: center; flex: 0 0 85%; max-width: 350px; }
        .scroll-item-large { scroll-snap-align: center; flex: 0 0 90%; max-width: 550px; }
        .pricing-container { display: flex; justify-content: center; align-items: center; }
        .pricing-middle-card { margin: 0 -2rem; }
        @media (max-width: 800px) {
          .pricing-container { flex-direction: column; gap: 2rem; }
          .pricing-middle-card { margin: 0; }
        }
        
        /* Stylisation minimale du widget Google Translate */
        .goog-te-gadget-icon { display: none !important; }
        .goog-te-gadget-simple { display: none !important; }
        .VIpgJd-ZVi9od-ORHb-OEVmcd { display: none !important; }
        .flag-btn:hover { transform: scale(1.1); }
      `}</style>

      {/* 1. HEADER */}
      <header id="header" style={{ 
        position: 'relative', height: '60vh', minHeight: '450px',
        backgroundImage: `url(${config.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', marginBottom: '4rem'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        <div style={{ position: 'relative', zIndex: 10, padding: '0 2rem', width: '100%', maxWidth: '900px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <EditableText isEditable={isEditable} tag="h1" className="responsive-title" style={{ fontWeight: 900, marginBottom: '0.5rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)', color: config.titleColor || 'white', textAlign: 'center' }} text={config.eventName} onSave={(val) => onUpdateConfig && onUpdateConfig('eventName', val)} />
            <EditableText isEditable={isEditable} tag="p" className="responsive-subtitle" style={{ marginBottom: '0.5rem', fontWeight: 600, textShadow: '0 2px 10px rgba(0,0,0,0.5)', textAlign: 'center' }} text={`${config.eventDate} • ${config.location}`} onSave={() => {}} />
            <EditableText isEditable={isEditable} tag="p" style={{ marginBottom: '2rem', fontSize: '0.85rem', fontWeight: 600, textShadow: '0 2px 10px rgba(0,0,0,0.5)', textAlign: 'center', opacity: 0.9 }} text={config.organizerName ? `Organisé par ${config.organizerName}` : 'Organisateur non renseigné'} onSave={(val) => onUpdateConfig && onUpdateConfig('organizerName', val.replace('Organisé par ', ''))} />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ padding: '0.9rem 2.2rem', fontSize: '1rem', fontWeight: 800, backgroundColor: config.primaryColor, color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: `0 10px 25px ${config.primaryColor}66` }}>
              Réserver ma place
            </motion.button>
          </div>
        </div>
        {!config.hideLogo && (
          <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', padding: '4px', zIndex: 20 }}>
            {config.logoImage ? (
              <img src={config.logoImage} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: config.primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem' }}>{config.logoText}</div>
            )}
          </div>
        )}
      </header>

      <div className="narrow-container">
        
        {config.translationEnabled && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '3rem 0 1rem 0' }}>
            <div id="google_translate_element" style={{ display: 'none' }}></div>
            <button className="flag-btn" onClick={() => handleLanguageChange('fr')} style={{ fontSize: '2.5rem', background: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.2s', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }} title="Français">🇫🇷</button>
            <button className="flag-btn" onClick={() => handleLanguageChange('en')} style={{ fontSize: '2.5rem', background: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.2s', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }} title="English">🇬🇧</button>
            <button className="flag-btn" onClick={() => handleLanguageChange('es')} style={{ fontSize: '2.5rem', background: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.2s', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }} title="Español">🇪🇸</button>
          </div>
        )}

        {/* BLOCS DYNAMIQUES */}
        {config.sections.map((section) => renderSection(section))}

        {/* PRICING (TOUJOURS EN BAS) */}
        <motion.section id="pricing" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpBlur} className="responsive-padding" style={{ textAlign: 'center', paddingBottom: '6rem' }}>
          
          <h2 className="responsive-section-title" style={{ fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem' }}>Réservez votre expérience</h2>
          <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: config.fomo?.enabled ? '1rem' : '4rem' }}>Sélectionnez le pass qui vous correspond.</p>

          {/* FOMO TIMER */}
          {config.fomo?.enabled && (
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FEF2F2', border: '2px solid #FECACA', padding: '1rem 2rem', borderRadius: '16px', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EF4444', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                <Clock size={20} /> {config.fomo.message || "Les prix augmentent dans :"}
              </div>
              <div style={{ display: 'flex', gap: '1rem', color: '#B91C1C', fontWeight: 900, fontSize: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><span>{String(timeLeft.days).padStart(2, '0')}</span><span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Jours</span></div><span style={{ opacity: 0.5 }}>:</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><span>{String(timeLeft.hours).padStart(2, '0')}</span><span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Heures</span></div><span style={{ opacity: 0.5 }}>:</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><span>{String(timeLeft.minutes).padStart(2, '0')}</span><span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Min</span></div><span style={{ opacity: 0.5 }}>:</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><span>{String(timeLeft.seconds).padStart(2, '0')}</span><span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Sec</span></div>
              </div>
            </div>
          )}

          {config.pricingMode === 'additive' ? (
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#F9FAFB', padding: '1rem 1.5rem', fontWeight: 800, borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between' }}>
                <span>Type de Billet</span>
                <span>Quantité</span>
              </div>
              {visiblePricing.map((pass, idx) => (
                <div key={pass.id} style={{ padding: '1.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>{pass.name}</h3>
                      {pass.visibility === 'secret' && <span style={{ backgroundColor: '#F59E0B', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase' }}>Déverrouillé</span>}
                    </div>
                    <p style={{ fontSize: '1rem', fontWeight: 700, color: '#1A1A1A', margin: 0 }}>
                      {isFomoExpired && pass.nextPrice ? pass.nextPrice : pass.price}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '50px', padding: '0.5rem' }}>
                    <button style={{ width: '30px', height: '30px', borderRadius: '50%', border: 'none', background: 'white', color: '#1A1A1A', fontWeight: 800, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>-</button>
                    <span style={{ fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>0</span>
                    <button style={{ width: '30px', height: '30px', borderRadius: '50%', border: 'none', background: 'white', color: '#1A1A1A', fontWeight: 800, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>+</button>
                  </div>
                </div>
              ))}
              <div style={{ padding: '1.5rem', backgroundColor: '#FAFAFA', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>Total : 0 €</span>
                <button style={{ padding: '0.8rem 2rem', fontSize: '1rem', fontWeight: 800, backgroundColor: config.primaryColor, color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: `0 4px 10px ${config.primaryColor}40` }}>Continuer</button>
              </div>
            </div>
          ) : (
            <div className="pricing-container">
            {visiblePricing.map((pass, idx) => {
              const icon = pass.visibility === 'secret' ? <Lock size={24} /> : (idx === 0 ? <User size={24} /> : (idx === 1 ? <Star size={24} /> : <Ticket size={24} />));
              return (
                <div key={pass.id} className={pass.popular ? "pricing-middle-card" : ""} style={{ position: 'relative', padding: pass.popular ? '4.5rem 2rem' : '2.5rem 1.5rem', backgroundColor: pass.bg, color: pass.color, borderRadius: '150px', boxShadow: pass.popular ? `0 20px 50px ${config.primaryColor}66` : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 260px', width: '100%', maxWidth: '300px', zIndex: pass.popular ? 10 : 1, border: pass.popular ? '6px solid white' : 'none' }}>
                  {pass.visibility === 'secret' && (
                    <div style={{ position: 'absolute', top: '30px', backgroundColor: '#F59E0B', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase' }}>Accès Déverrouillé</div>
                  )}
                  <div style={{ marginBottom: '1rem', opacity: pass.popular ? 1 : 0.6 }}>{icon}</div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '2rem' }}>{pass.name}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {pass.prestations && pass.prestations.length > 0 ? (
                      <>
                        {pass.prestations.slice(0, 3).map((p, i) => (
                          <li key={i} style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.8rem', opacity: 0.9 }}>
                            <span style={{ fontSize: '1.2rem' }}>{renderPrestationIcon(p.type)}</span>
                            <span><strong style={{ display: 'block', marginBottom: '0.1rem' }}>{p.title}</strong><span style={{ fontSize: '0.7rem', opacity: 0.7 }}>{p.duration} • {p.date}</span></span>
                          </li>
                        ))}
                        {pass.prestations.length > 3 && (
                          <li style={{ fontSize: '0.8rem', color: pass.popular ? 'rgba(255,255,255,0.7)' : '#666', fontStyle: 'italic', textAlign: 'center', marginTop: '0.5rem' }}>
                            + {pass.prestations.length - 3} autres prestations...
                          </li>
                        )}
                        <button onClick={() => setSelectedPassForProgram(pass.id)} style={{ marginTop: '0.5rem', background: 'none', border: `1px solid ${pass.popular ? 'white' : '#E5E7EB'}`, color: pass.popular ? 'white' : '#1A1A1A', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(128,128,128,0.1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                          Voir le programme détaillé
                        </button>
                      </>
                    ) : (
                      pass.features?.map((feature, i) => <li key={i} style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.9 }}><CheckCircle2 size={16} /> {feature}</li>)
                    )}
                  </ul>

                  {pass.prestations && pass.prestations.length > 0 && (
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: pass.popular ? 'rgba(255,255,255,0.6)' : '#9CA3AF', marginBottom: '0.5rem', textDecoration: 'line-through' }}>
                      Valeur totale : {pass.prestations.reduce((acc, p) => acc + (Number(p.value) || 0), 0)} €
                    </div>
                  )}

                  <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.1 }}>
                    {isFomoExpired && pass.nextPrice ? (
                      <>
                        <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: pass.popular ? 'rgba(255,255,255,0.6)' : '#999', marginBottom: '0.2rem', fontWeight: 600 }}>{pass.price}</span>
                        <span>{pass.nextPrice}</span>
                      </>
                    ) : (
                      <span>{pass.price}</span>
                    )}
                  </div>
                  <button onClick={() => openWizard(pass.id)} style={{ width: '100%', padding: '1rem', backgroundColor: pass.popular ? 'white' : '#1A1A1A', color: pass.popular ? config.primaryColor : 'white', border: 'none', borderRadius: '50px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                    Choisir ce Pass
                  </button>
                </div>
              )
            })}
          </div>
          )}

          {/* VIP SECRET UNLOCK */}
          {!isVipPromptOpen && (
            <button onClick={() => setIsVipPromptOpen(true)} style={{ marginTop: '3rem', background: 'none', border: 'none', color: '#666', fontSize: '0.85rem', textDecoration: 'underline', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Unlock size={14} /> J'ai un code d'invitation
            </button>
          )}
          {isVipPromptOpen && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" placeholder="Entrez le code secret..." value={vipCodeInput} onChange={e => setVipCodeInput(e.target.value)} style={{ padding: '0.8rem 1rem', borderRadius: '50px', border: '2px solid #E5E7EB', outline: 'none', fontSize: '0.9rem', width: '250px', textAlign: 'center', textTransform: 'uppercase' }} />
                <button onClick={handleVipUnlock} style={{ padding: '0.8rem 1.5rem', borderRadius: '50px', backgroundColor: '#1A1A1A', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Déverrouiller</button>
              </div>
              <button onClick={() => setIsVipPromptOpen(false)} style={{ background: 'none', border: 'none', color: '#999', fontSize: '0.8rem', cursor: 'pointer', marginTop: '0.5rem' }}>Annuler</button>
            </motion.div>
          )}

        </motion.section>

      </div>

      {/* PROGRAM MODAL */}
      <AnimatePresence>
        {selectedPassForProgram && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelectedPassForProgram(null)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ backgroundColor: 'white', borderRadius: '24px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem', position: 'relative', color: '#1A1A1A' }}>
              <button onClick={() => setSelectedPassForProgram(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#F3F4F6', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#666' }}><X size={20} /></button>
              
              {(() => {
                const pass = config.pricing.find(p => p.id === selectedPassForProgram);
                if (!pass) return null;
                const totalValue = pass.prestations?.reduce((acc, p) => acc + (Number(p.value) || 0), 0) || 0;
                
                return (
                  <>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', paddingRight: '2rem' }}>Programme : {pass.name}</h3>
                    <div style={{ display: 'inline-block', backgroundColor: '#ECFDF5', color: '#065F46', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 800, marginBottom: '2rem', border: '1px solid #A7F3D0' }}>
                      Valeur totale des prestations : {totalValue} € <span style={{ opacity: 0.5 }}>|</span> Prix du pass : {pass.price}
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {pass.prestations?.map((p, i) => (
                        <div key={i} style={{ display: 'flex', gap: '1rem', paddingBottom: '1.5rem', borderBottom: i !== pass.prestations!.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
                          <div style={{ fontSize: '2.5rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {renderPrestationIcon(p.type)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>{p.title}</h4>
                              <span style={{ fontSize: '0.9rem', fontWeight: 900, color: config.primaryColor, whiteSpace: 'nowrap', marginLeft: '1rem' }}>{p.value} €</span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>🗓️ {p.date}</span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>⏱️ {p.duration}</span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', textTransform: 'capitalize' }}>🏷️ {p.type === 'custom' ? p.customType : p.type}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#444', lineHeight: 1.5 }}>{p.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => { setSelectedPassForProgram(null); openWizard(pass.id); }} style={{ width: '100%', padding: '1.2rem', backgroundColor: config.primaryColor, color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', marginTop: '2.5rem', boxShadow: `0 10px 20px ${config.primaryColor}44` }}>
                      Sélectionner ce Pass
                    </button>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
