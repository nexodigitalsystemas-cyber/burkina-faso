import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Record } from '@/types';

function formatDate(date: string | Date): string {
  return new Date(date).toLocaleString();
}

export async function exportToPDF(records: Record[], filename: string = 'censo-burkina.pdf'): Promise<void> {
  const doc = new jsPDF({ orientation: 'landscape' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Recensement Burkina Faso', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Dossiers démographiques', 14, 26);
  doc.text(`Généré le : ${formatDate(new Date())}`, 14, 34);
  doc.text(`Total des enregistrements : ${records.length}`, 14, 40);
  doc.text('Liste des enregistrements', 14, 48);

  autoTable(doc, {
    startY: 54,
    head: [['Nom', 'Ville', 'Âge', 'Mineur', 'Date d\'enregistrement']],
    body: records.map((r) => [
      r.nombre,
      r.ciudad,
      String(r.edad),
      r.es_menor ? 'Oui' : 'Non',
      formatDate(r.created_at),
    ]),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [37, 99, 235] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  doc.save(filename);
}
