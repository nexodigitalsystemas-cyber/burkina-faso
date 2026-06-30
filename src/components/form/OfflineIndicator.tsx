import { useTranslation } from 'react-i18next';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useOnline } from '@/hooks/useOnline';

export function OfflineIndicator() {
  const { t } = useTranslation();
  const isOnline = useOnline();

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium shadow-md transition-colors ${
        isOnline
          ? 'bg-green-100 text-green-700'
          : 'bg-amber-100 text-amber-700'
      }`}
      role="status"
      aria-live="polite"
    >
      {isOnline ? (
        <>
          <Wifi className="w-3.5 h-3.5" />
          <span>{t('status.online')}</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3.5 h-3.5" />
          <span>{t('status.offline')}</span>
          <RefreshCw className="w-3 h-3 animate-spin" />
        </>
      )}
    </div>
  );
}
