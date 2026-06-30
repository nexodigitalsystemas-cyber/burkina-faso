export interface Record {
  id: string;
  nombre: string;
  ciudad: string;
  edad: number;
  es_menor: boolean;
  created_at: string;
}

export interface OfflineRecord {
  id: string;
  nombre: string;
  ciudad: string;
  edad: number;
  es_menor: boolean;
  created_at: string;
  synced: boolean;
}

export interface RecordStats {
  total: number;
  mayores: number;
  menores: number;
  promedioEdad: number;
}

export type Language = 'es' | 'en' | 'fr';

export type City = 'Ouagadougou' | 'Bobo-Dioulasso' | 'Koudougou' | 'Banfora' | 'Ouahigouya';
