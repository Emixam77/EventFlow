'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Truck, Wrench, Users, CheckCircle2, Clock, Search, Filter } from 'lucide-react';

export default function DashboardLogistique() {
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    // On charge tous ceux qui ont un rôle défini (donc pas des acheteurs de billets classiques)
    const { data, error } = await supabase
      .from('attendees')
      .select('*')
      .not('role', 'is', null)
      .order('created_at', { ascending: false });
    
    if (data) setAttendees(data);
    setLoading(false);
  };

  const filteredAttendees = attendees.filter(a => filterRole === 'all' || a.role === filterRole);

  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'exposant': return <Truck size={16} className="text-blue-500" />;
      case 'tech': return <Wrench size={16} className="text-orange-500" />;
      case 'benevole': return <Users size={16} className="text-purple-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="bg-gray-900 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Système Régisseur Zen</h1>
            <p className="text-gray-400 text-sm">Dashboard Logistique Temps Réel</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-gray-800 px-4 py-2 rounded-lg text-center">
              <span className="block text-2xl font-bold text-green-400">{attendees.filter(a => a.status === 'scanned').length}</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Arrivés</span>
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-lg text-center">
              <span className="block text-2xl font-bold text-yellow-400">{attendees.filter(a => a.status === 'valide').length}</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">En attente</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 mt-6">
        
        {/* Filtres */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-200">
            {[
              { id: 'all', label: 'Tous' },
              { id: 'exposant', label: 'Exposants' },
              { id: 'tech', label: 'Techniciens' },
              { id: 'benevole', label: 'Bénévoles' }
            ].map(f => (
              <button 
                key={f.id}
                onClick={() => setFilterRole(f.id)}
                className={\`px-4 py-2 rounded-lg text-sm font-medium transition-colors \${filterRole === f.id ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}\`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher (Nom, Plaque...)" 
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-gray-900 outline-none w-full md:w-64"
            />
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Statut</th>
                <th className="p-4 font-semibold">Intervenant</th>
                <th className="p-4 font-semibold">Rôle</th>
                <th className="p-4 font-semibold">Heure d'arrivée</th>
                <th className="p-4 font-semibold">Plaque (Véhicule)</th>
                <th className="p-4 font-semibold">Besoins Tech.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">Chargement des données...</td>
                </tr>
              ) : filteredAttendees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">Aucun intervenant trouvé.</td>
                </tr>
              ) : (
                filteredAttendees.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      {a.status === 'scanned' ? (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                          <CheckCircle2 size={14} /> Sur site
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                          <Clock size={14} /> Attendu
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-900">{a.name}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 capitalize text-sm text-gray-600">
                        {getRoleIcon(a.role)} {a.role}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 font-mono">
                      {a.arrival_time || '--:--'}
                    </td>
                    <td className="p-4">
                      {a.plate_number ? (
                        <span className="bg-gray-100 border border-gray-300 text-gray-700 font-mono text-xs px-2 py-1 rounded">
                          {a.plate_number}
                        </span>
                      ) : <span className="text-gray-300">-</span>}
                    </td>
                    <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={a.technical_needs || ''}>
                      {a.technical_needs || <span className="text-gray-300 italic">Aucun</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
