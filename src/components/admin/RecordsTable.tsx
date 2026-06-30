import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Record } from '@/types';

interface RecordsTableProps {
  records: Record[];
}

type SortKey = 'nombre' | 'ciudad' | 'edad' | 'created_at';
type SortDir = 'asc' | 'desc';

export function RecordsTable({ records }: RecordsTableProps) {
  const { t } = useTranslation();
  const [sortKey, setSortKey] = useState<SortKey>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [filter, setFilter] = useState('');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...records]
    .filter((r) => {
      if (!filter) return true;
      const q = filter.toLowerCase();
      return (
        r.nombre.toLowerCase().includes(q) ||
        r.ciudad.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return null;
    return sortDir === 'asc' ? (
      <ChevronUp className="w-3.5 h-3.5 inline ml-1" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 inline ml-1" />
    );
  };

  return (
    <div className="space-y-3">
      {/* Filtro */}
      <input
        type="text"
        placeholder="Buscar por nombre o ciudad..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full sm:w-72 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {/* Tabela */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th
                onClick={() => handleSort('nombre')}
                className="px-4 py-3 text-left font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors select-none"
              >
                {t('admin.colName')}
                <SortIcon col="nombre" />
              </th>
              <th
                onClick={() => handleSort('ciudad')}
                className="px-4 py-3 text-left font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors select-none"
              >
                {t('admin.colCity')}
                <SortIcon col="ciudad" />
              </th>
              <th
                onClick={() => handleSort('edad')}
                className="px-4 py-3 text-left font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors select-none"
              >
                {t('admin.colAge')}
                <SortIcon col="edad" />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                {t('admin.colStatus')}
              </th>
              <th
                onClick={() => handleSort('created_at')}
                className="px-4 py-3 text-left font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors select-none"
              >
                {t('admin.colDate')}
                <SortIcon col="created_at" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-slate-400"
                >
                  {t('admin.noData')}
                </td>
              </tr>
            ) : (
              sorted.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {record.nombre}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {t(`cities.${record.ciudad}` as const)}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{record.edad}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        record.es_menor
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {record.es_menor
                        ? t('admin.statusMinor')
                        : t('admin.statusAdult')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(record.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Contagem */}
      <p className="text-xs text-slate-500">
        Mostrando {sorted.length} de {records.length} registros
      </p>
    </div>
  );
}
