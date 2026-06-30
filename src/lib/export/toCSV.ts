import Papa from 'papaparse';
import type { Record } from '@/types';

function formatDate(date: string | Date): string {
  return new Date(date).toLocaleString();
}

export async function exportToCSV(records: Record[], filename: string = 'censo-burkina.csv'): Promise<void> {
  const headerRows = [
    { Section: 'Rapport', Détail: 'Recensement Burkina Faso - Dossiers démographiques' },
    { Section: 'Généré le', Détail: formatDate(new Date()) },
    { Section: 'Total des enregistrements', Détail: records.length },
    { Section: '', Détail: '' },
  ];

  const data = records.map((r) => ({
    Nom: r.nombre,
    Ville: r.ciudad,
    Âge: r.edad,
    Mineur: r.es_menor ? 'Oui' : 'Non',
    'Date d\'enregistrement': formatDate(r.created_at),
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
