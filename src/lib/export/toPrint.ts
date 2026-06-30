import type { Record } from '@/types';

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
        <td>${new Date(r.created_at).toLocaleString()}</td>
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
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #0f172a; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { border: 1px solid #e2e8f0; padding: 8px; text-align: left; }
        th { background: #2563eb; color: white; }
        tr:nth-child(even) { background: #f8fafc; }
        .meta { color: #475569; font-size: 12px; margin-top: 4px; }
      </style>
    </head>
    <body>
      <h1>Censo Burkina Faso - Registros Demográficos</h1>
      <div class="meta">
        Generado: ${new Date().toLocaleString()} | Total: ${records.length} registros
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

  // Aguardar carga de estilos antes de imprimir
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
