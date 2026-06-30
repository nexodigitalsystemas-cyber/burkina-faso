import Papa from 'papaparse';
import type { Record } from '@/types';

function formatDate(date: string | Date): string {
  return new Date(date).toLocaleString();
}

export async function exportToCSV(records: Record[], filename: string = 'censo-burkina.csv'): Promise<void> {
  const headerRows = [
    { Sección: 'Reporte', Detalle: 'Censo Burkina Faso - Registros Demográficos' },
    { Sección: 'Generado', Detalle: formatDate(new Date()) },
    { Sección: 'Total registros', Detalle: records.length },
    { Sección: '', Detalle: '' },
  ];

  const data = records.map((r) => ({
    Nombre: r.nombre,
    Ciudad: r.ciudad,
    Edad: r.edad,
    'Es Menor': r.es_menor ? 'Sí' : 'No',
    'Fecha Registro': formatDate(r.created_at),
  }));

  const csv = Papa.unparse([...headerRows, ...data], {
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
