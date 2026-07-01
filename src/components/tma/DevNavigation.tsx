'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function DevNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  // Ne pas afficher sur la page de chargement initiale
  if (pathname === '/tma') return null;

  const links = [
    { path: '/tma/dashboard', label: 'Dashboard', icon: '📋' },
    { path: '/tma/benevole', label: 'Bénévole', icon: '🎯' },
    { path: '/tma/bar', label: 'Bar', icon: '🍺' },
    { path: '/tma/hospitality', label: 'Hospitality', icon: '🎤' },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      padding: '0.8rem 0.5rem',
      paddingBottom: 'calc(0.8rem + env(safe-area-inset-bottom, 20px))',
      zIndex: 9999,
      justifyContent: 'space-around',
    }}>
      {links.map((link) => {
        const isActive = pathname === link.path;
        return (
          <button
            key={link.path}
            onClick={() => router.push(link.path)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.3rem',
              color: isActive ? '#10B981' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              flex: 1,
            }}
          >
            <span style={{ fontSize: '1.2rem', filter: isActive ? 'none' : 'grayscale(100%)' }}>
              {link.icon}
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: isActive ? 800 : 500 }}>
              {link.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
