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
  doc.text('Censo Burkina Faso', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Registros Demográficos', 14, 26);
  doc.text(`Generado: ${formatDate(new Date())}`, 14, 34);
  doc.text(`Total registros: ${records.length}`, 14, 40);
  doc.text('Lista de registros', 14, 48);

  autoTable(doc, {
    startY: 54,
    head: [['Nombre', 'Ciudad', 'Edad', 'Es Menor', 'Fecha Registro']],
    body: records.map((r) => [
      r.nombre,
      r.ciudad,
      String(r.edad),
      r.es_menor ? 'Sí' : 'No',
      formatDate(r.created_at),
    ]),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [37, 99, 235] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  doc.save(filename);
}
