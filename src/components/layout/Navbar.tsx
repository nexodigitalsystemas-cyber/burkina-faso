import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { Globe, LogOut, ClipboardList } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import type { Language } from '@/types';

const languages: { code: Language; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isAdminPage = location.pathname.startsWith('/admin');

  const handleLanguageChange = (code: Language) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 font-semibold text-slate-900 hover:text-blue-600 transition-colors"
        >
          <img
            src="/logo_burkina.jpeg"
            alt="Logo Burkina Faso"
            className="w-8 h-8 rounded-md object-cover"
          />
          <span className="hidden sm:inline text-lg">{t('app.title')}</span>
        </button>

        {/* Ações */}
        <div className="flex items-center gap-3">
          {/* Seletor de idioma */}
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4 text-slate-400" />
            <div className="flex gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    i18n.language === lang.code
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Navegação admin apenas na área admin autenticada */}
          {isAuthenticated && isAdminPage ? (
            <div className="flex items-center gap-2">
              {user?.email ? (
                <span className="text-xs text-slate-500 hidden sm:inline">
                  {user.email}
                </span>
              ) : null}
              <button
                onClick={() => {
                  logout();
                  navigate('/admin/login');
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('nav.logout')}</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
