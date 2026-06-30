import Papa from 'papaparse';
import type { Record } from '@/types';

export async function exportToCSV(records: Record[], filename: string = 'censo-burkina.csv'): Promise<void> {
  const data = records.map((r) => ({
    Nombre: r.nombre,
    Ciudad: r.ciudad,
    Edad: r.edad,
    'Es Menor': r.es_menor ? 'Sí' : 'No',
    'Fecha Registro': new Date(r.created_at).toLocaleString(),
  }));

  const csv = Papa.unparse(data, {
    delimiter: ';',
    header: true,
  });

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
