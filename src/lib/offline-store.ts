import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from './supabase';

export interface Task {
  id: string;
  pole_id: string;
  titre: string;
  description?: string;
  statut: 'A faire' | 'En cours' | 'Bloqué' | 'Terminé';
  assigne_a?: number;
  date_limite?: string;
  est_critique: boolean;
}

export interface OfflineAction {
  id: string;
  type: 'update_task' | 'bar_sale';
  payload: Record<string, any>;
  created_at: number;
}

interface TMAStore {
  tasks: Task[];
  offlineQueue: OfflineAction[];
  isOnline: boolean;
  telegramUserId: number | null;

  setTelegramUserId: (id: number) => void;
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (taskId: string, statut: Task['statut']) => void;
  addToQueue: (action: Omit<OfflineAction, 'id' | 'created_at'>) => void;
  flushQueue: () => Promise<void>;
  setOnline: (online: boolean) => void;
}

export const useTMAStore = create<TMAStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      offlineQueue: [],
      isOnline: true,
      telegramUserId: null,

      setTelegramUserId: (id) => set({ telegramUserId: id }),
      setTasks: (tasks) => set({ tasks }),
      setOnline: (online) => set({ isOnline: online }),

      updateTaskStatus: (taskId, statut) => {
        // Mise à jour optimiste locale
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, statut } : t
          ),
        }));
        const { isOnline, addToQueue } = get();
        if (isOnline) {
          supabase.from('taches').update({ statut }).eq('id', taskId).then();
        } else {
          addToQueue({ type: 'update_task', payload: { taskId, statut } });
        }
      },

      addToQueue: (action) =>
        set((state) => ({
          offlineQueue: [
            ...state.offlineQueue,
            { ...action, id: crypto.randomUUID(), created_at: Date.now() },
          ],
        })),

      flushQueue: async () => {
        const { offlineQueue } = get();
        if (offlineQueue.length === 0) return;
        const errors: string[] = [];
        for (const action of offlineQueue) {
          try {
            if (action.type === 'update_task') {
              await supabase
                .from('taches')
                .update({ statut: action.payload.statut })
                .eq('id', action.payload.taskId);
            } else if (action.type === 'bar_sale') {
              await supabase.rpc('decrement_stock', {
                stock_id: action.payload.stockId,
                qty: action.payload.qty,
              });
            }
          } catch (e: any) {
            errors.push(action.id);
          }
        }
        // On vide uniquement les actions qui ont réussi
        set((state) => ({
          offlineQueue: state.offlineQueue.filter((a) => errors.includes(a.id)),
        }));
      },
    }),
    {
      name: 'tma-store',
      partialize: (state) => ({
        tasks: state.tasks,
        offlineQueue: state.offlineQueue,
        telegramUserId: state.telegramUserId,
      }),
    }
  )
);
