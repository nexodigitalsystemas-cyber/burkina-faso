import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Record } from '@/types';

export async function exportToPDF(records: Record[], filename: string = 'censo-burkina.pdf'): Promise<void> {
  const doc = new jsPDF({ orientation: 'landscape' });

  doc.setFontSize(16);
  doc.text('Censo Burkina Faso - Registros Demográficos', 14, 20);

  doc.setFontSize(10);
  doc.text(`Generado: ${new Date().toLocaleString()}`, 14, 28);
  doc.text(`Total registros: ${records.length}`, 14, 34);

  autoTable(doc, {
    startY: 40,
    head: [['Nombre', 'Ciudad', 'Edad', 'Es Menor', 'Fecha Registro']],
    body: records.map((r) => [
      r.nombre,
      r.ciudad,
      String(r.edad),
      r.es_menor ? 'Sí' : 'No',
      new Date(r.created_at).toLocaleString(),
    ]),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [37, 99, 235] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  doc.save(filename);
}
