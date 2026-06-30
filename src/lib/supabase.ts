import { createClient } from '@supabase/supabase-js';
import type { Record } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Cliente Supabase singleton
// NOTA: Para usar, configure as variáveis no .env:
// VITE_SUPABASE_URL=https://xxxx.supabase.co
// VITE_SUPABASE_ANON_KEY=eyJ...
//
// Se não houver Supabase configurado, a app funciona 100% offline
// (localStorage como fallback)
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseKey);
}

// Operações diretas na tabela records
export async function insertRecord(data: Omit<Record, 'id' | 'es_menor' | 'created_at'>): Promise<Record | null> {
  if (!isSupabaseConfigured()) return null;

  const { data: result, error } = await supabase
    .from('records')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }

  return result;
}

export async function fetchAllRecords(): Promise<Record[]> {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from('records')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch error:', error);
    throw error;
  }

  return data || [];
}

export async function batchInsertRecords(records: Omit<Record, 'id' | 'es_menor' | 'created_at'>[]): Promise<Record[] | null> {
  if (!isSupabaseConfigured() || records.length === 0) return null;

  const { data, error } = await supabase
    .from('records')
    .insert(records)
    .select();

  if (error) {
    console.error('Supabase batch insert error:', error);
    throw error;
  }

  return data;
}
