'use client';

import { useEffect } from 'react';
import DevNavigation from '@/components/tma/DevNavigation';
export default function TMALayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialisation du SDK Telegram WebApp
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      const twa = (window as any).Telegram.WebApp;
      twa.ready();
      twa.expand(); // Plein écran immédiat
      // Appliquer les couleurs du thème Telegram
      document.documentElement.style.setProperty('--tg-theme-bg', twa.themeParams?.bg_color || '#0A0A0A');
      document.documentElement.style.setProperty('--tg-theme-text', twa.themeParams?.text_color || '#FFFFFF');
    }
  }, []);

  return (
    <html lang="fr">
      <head>
        {/* SDK officiel Telegram WebApp */}
        <script src="https://telegram.org/js/telegram-web-app.js" async />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
          body { 
            background: var(--tg-theme-bg, #0A0A0A);
            color: var(--tg-theme-text, #FFFFFF);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            min-height: 100dvh;
            overscroll-behavior: none;
          }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
          @keyframes spin { 100% { transform: rotate(360deg); } }
          @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        `}</style>
      </head>
      <body>
        <div style={{ paddingBottom: '70px' }}>{children}</div>
        <DevNavigation />
      </body>
    </html>
  );
}
