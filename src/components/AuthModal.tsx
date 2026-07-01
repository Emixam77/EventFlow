'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultIsLogin?: boolean;
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, defaultIsLogin = false, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: "'Inter', sans-serif" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .btn-red-modal {
          background: #E00000;
          color: white;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.2s;
          border: none;
        }
        .btn-red-modal:hover { background: #A00000; }
      `}</style>

      <div style={{ background: '#FFF', padding: '3rem', width: '100%', maxWidth: '440px', animation: 'fadeUp 0.3s ease', color: '#0A0A0A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.3rem' }}>
              {isLogin ? 'Connexion' : 'Créer un compte'}
            </h3>
            <p style={{ color: '#888', fontSize: '0.85rem' }}>
              {isLogin ? 'Accédez à votre espace organisateur' : 'Gratuit · Sans carte de crédit'}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}>✕</button>
        </div>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width: '100%', padding: '0.9rem', border: '2px solid #E5E5E5', fontSize: '0.95rem', outline: 'none', transition: 'border 0.2s', color: '#0A0A0A' }}
              onFocus={e => e.target.style.borderColor = '#E00000'}
              onBlur={e => e.target.style.borderColor = '#E5E5E5'}
              placeholder="votre@email.com" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: '100%', padding: '0.9rem', border: '2px solid #E5E5E5', fontSize: '0.95rem', outline: 'none', transition: 'border 0.2s', color: '#0A0A0A' }}
              onFocus={e => e.target.style.borderColor = '#E00000'}
              onBlur={e => e.target.style.borderColor = '#E5E5E5'}
              placeholder="••••••••" />
          </div>

          {errorMsg && <div style={{ background: '#FFF0F0', border: '1px solid #FCA5A5', padding: '0.8rem', fontSize: '0.85rem', color: '#DC2626' }}>{errorMsg}</div>}

          <button type="submit" className="btn-red-modal" disabled={isLoading}
            style={{ marginTop: '0.5rem', opacity: isLoading ? 0.7 : 1, padding: '1rem' }}>
            {isLoading ? '...' : isLogin ? 'Se connecter →' : 'Créer mon compte →'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #E5E5E5' }}>
          <button onClick={() => setIsLogin(!isLogin)} type="button"
            style={{ background: 'none', border: 'none', color: '#E00000', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
            {isLogin ? "Pas encore de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
          </button>
        </div>
      </div>
    </div>
  );
}
