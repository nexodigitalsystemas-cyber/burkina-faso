import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileSpreadsheet, FileText, Printer, Loader2 } from 'lucide-react';
import type { Record } from '@/types';

interface ExportButtonsProps {
  records: Record[];
  filename?: string;
}

export function ExportButtons({ records, filename = 'censo-burkina' }: ExportButtonsProps) {
  const { t } = useTranslation();
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExportCSV = async () => {
    setExporting('csv');
    try {
      const { exportToCSV } = await import('@/lib/export/toCSV');
      await exportToCSV(records, `${filename}.csv`);
    } catch (err) {
      console.error('CSV export error:', err);
    } finally {
      setExporting(null);
    }
  };

  const handleExportPDF = async () => {
    setExporting('pdf');
    try {
      const { exportToPDF } = await import('@/lib/export/toPDF');
      await exportToPDF(records, `${filename}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setExporting(null);
    }
  };

  const handlePrint = () => {
    const { exportToPrint } = require('@/lib/export/toPrint');
    exportToPrint(records);
  };

  const buttons = [
    {
      id: 'csv',
      label: t('admin.exportCSV'),
      icon: FileSpreadsheet,
      action: handleExportCSV,
      color: 'text-green-700 bg-green-50 hover:bg-green-100 border-green-200',
    },
    {
      id: 'pdf',
      label: t('admin.exportPDF'),
      icon: FileText,
      action: handleExportPDF,
      color: 'text-red-700 bg-red-50 hover:bg-red-100 border-red-200',
    },
    {
      id: 'print',
      label: t('admin.exportPrint'),
      icon: Printer,
      action: handlePrint,
      color: 'text-slate-700 bg-slate-50 hover:bg-slate-100 border-slate-200',
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((btn) => {
        const Icon = btn.icon;
        return (
          <button
            key={btn.id}
            onClick={btn.action}
            disabled={exporting === btn.id || records.length === 0}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${btn.color}`}
          >
            {exporting === btn.id ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Icon className="w-3.5 h-3.5" />
            )}
            {btn.label}
          </button>
        );
      })}
    </div>
  );
}
