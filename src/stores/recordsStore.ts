import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Record, RecordStats } from '@/types';
import { insertRecord, fetchAllRecords, batchInsertRecords, isSupabaseConfigured } from '@/lib/supabase';

const OFFLINE_QUEUE_KEY = 'offline_queue';
const LOCAL_RECORDS_KEY = 'local_records';

function getOfflineQueue(): Record[] {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setOfflineQueue(queue: Record[]) {
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
}

function getLocalRecords(): Record[] {
  try {
    const raw = localStorage.getItem(LOCAL_RECORDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalRecords(records: Record[]) {
  localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(records));
}

interface RecordsState {
  records: Record[];
  loading: boolean;
  error: string | null;
  addRecord: (data: { nombre: string; ciudad: string; edad: number }, isOnline: boolean) => Promise<boolean>;
  fetchRecords: () => Promise<void>;
  syncQueue: () => Promise<boolean>;
  getMayores: () => Record[];
  getMenores: () => Record[];
  getStats: () => RecordStats;
}

export const useRecordsStore = create<RecordsState>()((set, get) => ({
  records: getLocalRecords(),
  loading: false,
  error: null,

  addRecord: async (data, isOnline) => {
    const record: Record = {
      id: uuidv4(),
      ...data,
      es_menor: data.edad < 18,
      created_at: new Date().toISOString(),
    };

    if (isOnline && isSupabaseConfigured()) {
      try {
        const saved = await insertRecord(data);
        if (saved) {
          const updated = [saved, ...get().records];
          set({ records: updated });
          setLocalRecords(updated);
          return true;
        }
      } catch (err) {
        console.error('Online insert failed, saving offline:', err);
        // Fallback para offline se o insert falhar
      }
    }

    // Salvar localmente (offline ou fallback)
    const queue = getOfflineQueue();
    queue.push(record);
    setOfflineQueue(queue);

    const updated = [record, ...get().records];
    set({ records: updated });
    setLocalRecords(updated);

    return true;
  },

  fetchRecords: async () => {
    set({ loading: true, error: null });

    try {
      if (isSupabaseConfigured()) {
        const data = await fetchAllRecords();
        set({ records: data, loading: false });
        setLocalRecords(data);
      } else {
        // Sem Supabase: usar dados locais
        set({ records: getLocalRecords(), loading: false });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error fetching records';
      set({ error: msg, loading: false });
      // Fallback para dados locais
      set({ records: getLocalRecords() });
    }
  },

  syncQueue: async () => {
    const queue = getOfflineQueue();
    if (queue.length === 0) return true;

    if (!isSupabaseConfigured()) {
      // Sem Supabase: marcar tudo como sincronizado
      setOfflineQueue([]);
      return true;
    }

    try {
      const toSync = queue.map((r) => ({
        nombre: r.nombre,
        ciudad: r.ciudad,
        edad: r.edad,
      }));

      await batchInsertRecords(toSync);

      // Limpar fila e recarregar registros
      setOfflineQueue([]);
      await get().fetchRecords();
      return true;
    } catch (err) {
      console.error('Sync failed:', err);
      return false;
    }
  },

  getMayores: () => {
    return get().records.filter((r) => !r.es_menor);
  },

  getMenores: () => {
    return get().records.filter((r) => r.es_menor);
  },

  getStats: () => {
    const all = get().records;
    const mayores = all.filter((r) => !r.es_menor);
    const menores = all.filter((r) => r.es_menor);
    const totalEdad = all.reduce((sum, r) => sum + r.edad, 0);

    return {
      total: all.length,
      mayores: mayores.length,
      menores: menores.length,
      promedioEdad: all.length > 0 ? Math.round(totalEdad / all.length) : 0,
    };
  },
}));
