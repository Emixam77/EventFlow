'use client';

import { useState } from 'react';

export default function ScannerPage() {
  const [ticketId, setTicketId] = useState('');
  const [room, setRoom] = useState('Salle 1');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setScanResult(null);

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId, room })
      });

      const data = await response.json();
      
      setScanResult({
        success: data.success,
        message: data.message || data.error
      });
      
      if (data.success) {
        setTicketId('');
      }

    } catch (err: any) {
      setScanResult({ success: false, message: "Erreur réseau." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FAFAFC', display: 'flex', flexDirection: 'column' }}>
      {/* Header Vigile */}
      <nav style={{ padding: '1.5rem 2rem', backgroundColor: '#1A1A1A', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 24, height: 24, background: '#5465FF', borderRadius: '6px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
            ⚡
          </div>
          Scanner Vigile
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '400px', width: '100%', background: 'white', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          
          <div style={{ padding: '2rem' }}>
            <form onSubmit={handleScan}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#2A2A33' }}>Contrôle d'accès</h2>

              {/* Choix de la salle */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#2A2A33', marginBottom: '0.5rem' }}>Porte actuelle (Votre poste)</label>
                <select 
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '2px solid #5465FF', backgroundColor: '#F4F6FF', fontSize: '1rem', fontWeight: 600, color: '#5465FF' }}
                >
                  <option value="Salle 1">Salle 1</option>
                  <option value="Salle 2">Salle 2</option>
                  <option value="Salle 3">Salle 3</option>
                </select>
              </div>

              {/* Input Code Barre */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#2A2A33', marginBottom: '0.5rem' }}>ID du Billet scanné</label>
                <input 
                  type="text" 
                  required
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  placeholder="ex: TKT-A1B2C3D4"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1.2rem', textTransform: 'uppercase' }}
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  backgroundColor: '#1A1A1A', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontWeight: 700, 
                  fontSize: '1rem',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? 'Vérification...' : 'Valider le Billet'}
              </button>
            </form>

            {/* Résultat du Scan */}
            {scanResult && (
              <div style={{ 
                marginTop: '2rem', 
                padding: '1.5rem', 
                borderRadius: '12px', 
                textAlign: 'center',
                backgroundColor: scanResult.success ? '#D1FAE5' : '#FEE2E2',
                color: scanResult.success ? '#065F46' : '#991B1B',
                border: `2px solid ${scanResult.success ? '#10B981' : '#EF4444'}`
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                  {scanResult.success ? '✅' : '❌'}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  {scanResult.success ? 'ACCÈS AUTORISÉ' : 'ACCÈS REFUSÉ'}
                </h3>
                <p style={{ fontWeight: 500 }}>{scanResult.message}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
