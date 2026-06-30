import type { Record } from '@/types';

function formatDate(date: string | Date): string {
  return new Date(date).toLocaleString();
}

export function exportToPrint(records: Record[]): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const rows = records
    .map(
      (r) => `
      <tr>
        <td>${escapeHtml(r.nombre)}</td>
        <td>${escapeHtml(r.ciudad)}</td>
        <td>${r.edad}</td>
        <td>${r.es_menor ? 'Sí' : 'No'}</td>
        <td>${formatDate(r.created_at)}</td>
      </tr>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Censo Burkina Faso</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; color: #0f172a; }
        h1 { color: #0f172a; margin-bottom: 4px; }
        .subtitle { color: #475569; font-size: 13px; margin-bottom: 8px; }
        .meta { color: #475569; font-size: 12px; margin-top: 4px; margin-bottom: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { border: 1px solid #e2e8f0; padding: 8px; text-align: left; }
        th { background: #2563eb; color: white; }
        tr:nth-child(even) { background: #f8fafc; }
      </style>
    </head>
    <body>
      <h1>Censo Burkina Faso</h1>
      <div class="subtitle">Registros Demográficos</div>
      <div class="meta">
        Generado: ${formatDate(new Date())} | Total: ${records.length} registros
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Edad</th>
            <th>Es Menor</th>
            <th>Fecha Registro</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
