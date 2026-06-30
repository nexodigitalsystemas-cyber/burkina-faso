import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRecordsStore } from '@/stores/recordsStore';
import { StatsCards } from '@/components/admin/StatsCards';
import { RecordsTable } from '@/components/admin/RecordsTable';
import { ExportButtons } from '@/components/admin/ExportButtons';

type Tab = 'all' | 'adults' | 'minors';

export function AdminDashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { records, fetchRecords, getMayores, getMenores, getStats } =
    useRecordsStore();
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    const load = async () => {
      await fetchRecords();
      setLoading(false);
    };
    load();
  }, [isAuthenticated, navigate, fetchRecords]);

  if (!isAuthenticated) return null;

  const stats = getStats();

  const filteredRecords =
    activeTab === 'adults'
      ? getMayores()
      : activeTab === 'minors'
      ? getMenores()
      : records;

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'all', label: t('admin.tabAll'), count: stats.total },
    { id: 'adults', label: t('admin.tabAdults'), count: stats.mayores },
    { id: 'minors', label: t('admin.tabMinors'), count: stats.menores },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {t('admin.title')}
              </h1>
              <p className="text-xs text-slate-500">
                {stats.total} {t('admin.total').toLowerCase()}
              </p>
            </div>
          </div>
          <ExportButtons
            records={activeTab === 'all' ? records : filteredRecords}
            filename={`censo-burkina-${activeTab}`}
          />
        </div>

        {/* Stats */}
        <StatsCards stats={stats} />

        {/* Tabs + Tabela */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          {/* Tabs */}
          <div className="border-b border-slate-200">
            <div className="flex gap-1 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tabela */}
          <div className="p-4">
            {loading ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                Cargando registros...
              </div>
            ) : (
              <RecordsTable records={filteredRecords} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
