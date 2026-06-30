import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  if (!deferredPrompt || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-blue-600 text-white rounded-lg shadow-lg p-4 max-w-md mx-auto sm:left-auto sm:right-4 sm:w-full">
      <div className="flex items-start gap-3">
        <Download className="w-5 h-5 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm">{t('pwa.install')}</p>
          <p className="text-xs text-blue-100 mt-0.5">{t('pwa.installDesc')}</p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleInstall}
              className="px-4 py-1.5 bg-white text-blue-600 rounded-md text-xs font-semibold hover:bg-blue-50 transition-colors"
            >
              {t('pwa.installButton')}
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="px-4 py-1.5 text-blue-100 hover:text-white text-xs transition-colors"
            >
              {t('pwa.dismiss')}
            </button>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-blue-200 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
