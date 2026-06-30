import { useTranslation } from 'react-i18next';
import { RecordForm } from '@/components/form/RecordForm';
import { OfflineIndicator } from '@/components/form/OfflineIndicator';
import { useSyncQueue } from '@/hooks/useSyncQueue';

export function FormPage() {
  const { t } = useTranslation();
  useSyncQueue();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 inline-flex items-center justify-center gap-2">
            <span role="img" aria-label="Burkina Faso flag">🇧🇫</span>
            {t('app.title')}
          </h1>
          <p className="text-sm text-slate-500">{t('app.subtitle')}</p>
        </div>
      </div>

      {/* Formulário */}
      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            {t('form.title')}
          </h2>
          <RecordForm />
        </div>
      </div>

      <OfflineIndicator />
    </div>
  );
}
