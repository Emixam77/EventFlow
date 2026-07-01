'use client';

import { useState } from 'react';

const PRODUCTS = [
  { id: 'beer', name: '🍺 Bière Pression', price: 5 },
  { id: 'water', name: '💧 Bouteille d\'Eau', price: 2 },
  { id: 'soda', name: '🥤 Soda', price: 3 },
  { id: 'burger', name: '🍔 Burger Frites', price: 12 },
  { id: 'hotdog', name: '🌭 Hot-Dog', price: 6 },
  { id: 'shot', name: '🥃 Shooter', price: 4 },
];

export default function POSPage() {
  const [ticketId, setTicketId] = useState('');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [transactionResult, setTransactionResult] = useState<{ success: boolean; message: string; remaining?: number } | null>(null);

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id]--;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const totalAmount = Object.entries(cart).reduce((total, [id, qty]) => {
    const product = PRODUCTS.find(p => p.id === id);
    return total + (product?.price || 0) * qty;
  }, 0);

  const getCartDescription = () => {
    return Object.entries(cart).map(([id, qty]) => {
      const product = PRODUCTS.find(p => p.id === id);
      return `${qty}x ${product?.name}`;
    }).join(', ');
  };

  const handleCharge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalAmount === 0) {
      alert("Le panier est vide.");
      return;
    }

    setIsLoading(true);
    setTransactionResult(null);

    try {
      const response = await fetch('/api/cashless', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ticketId, 
          amount: totalAmount,
          items: getCartDescription()
        })
      });

      const data = await response.json();
      
      setTransactionResult({
        success: data.success,
        message: data.message || data.error,
        remaining: data.remainingCredit
      });
      
      if (data.success) {
        setTicketId('');
        setCart({});
      }

    } catch (err: any) {
      setTransactionResult({ success: false, message: "Erreur réseau." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FAFAFC', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ padding: '1.5rem 2rem', backgroundColor: '#2A2A33', borderBottom: '1px solid #1A1A1A', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 24, height: 24, background: '#10B981', borderRadius: '6px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
            💳
          </div>
          Caisse Bar (Cashless)
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', padding: '2rem', gap: '2rem', justifyContent: 'center' }}>
        
        {/* Colonne Catalogue (Gauche) */}
        <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#2A2A33' }}>Catalogue Produits</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
            {PRODUCTS.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product.id)}
                style={{
                  padding: '1.5rem 1rem',
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'transform 0.1s',
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{product.name}</div>
                <div style={{ color: '#10B981', fontWeight: 800, fontSize: '1.2rem' }}>{product.price} €</div>
              </button>
            ))}
          </div>
        </div>

        {/* Colonne Panier & Encaisser (Droite) */}
        <div style={{ flex: '1 1 300px', maxWidth: '400px', background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', alignSelf: 'flex-start' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#2A2A33' }}>Panier en cours</h2>
          
          <div style={{ minHeight: '150px', marginBottom: '2rem' }}>
            {Object.keys(cart).length === 0 ? (
              <p style={{ color: '#9CA3AF', fontStyle: 'italic' }}>Le panier est vide.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {Object.entries(cart).map(([id, qty]) => {
                  const product = PRODUCTS.find(p => p.id === id);
                  return (
                    <li key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #F3F4F6' }}>
                      <span style={{ fontWeight: 500 }}>{qty}x {product?.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontWeight: 700, color: '#10B981' }}>{(product?.price || 0) * qty} €</span>
                        <button onClick={() => removeFromCart(id)} style={{ background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '4px', width: '24px', height: '24px', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderTop: '2px dashed #E5E7EB', borderBottom: '2px dashed #E5E7EB', marginBottom: '2rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>TOTAL</span>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#10B981' }}>{totalAmount} €</span>
          </div>

          <form onSubmit={handleCharge}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#2A2A33', marginBottom: '0.5rem' }}>Scanner l'ID Billet</label>
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
              disabled={isLoading || totalAmount === 0}
              style={{ 
                width: '100%', 
                padding: '1rem', 
                backgroundColor: '#10B981', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                fontWeight: 700, 
                fontSize: '1.1rem',
                cursor: (isLoading || totalAmount === 0) ? 'not-allowed' : 'pointer',
                opacity: (isLoading || totalAmount === 0) ? 0.7 : 1
              }}
            >
              {isLoading ? 'Transaction en cours...' : 'Débiter le Bracelet'}
            </button>
          </form>

          {transactionResult && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              borderRadius: '8px', 
              textAlign: 'center',
              backgroundColor: transactionResult.success ? '#D1FAE5' : '#FEE2E2',
              color: transactionResult.success ? '#065F46' : '#991B1B',
            }}>
              <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{transactionResult.success ? '✅ PAIEMENT ACCEPTÉ' : '❌ PAIEMENT REFUSÉ'}</p>
              <p style={{ fontSize: '0.9rem' }}>{transactionResult.message}</p>
              {transactionResult.success && (
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', fontStyle: 'italic' }}>Nouveau Solde : {transactionResult.remaining} €</p>
              )}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
