import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginSchema } from '@/lib/validations';
import type { LoginFormData } from '@/lib/validations';
import { useAuth } from '@/hooks/useAuth';

export function AdminLoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const success = await login(data.email, data.password);
      if (success) {
        toast.success('Login exitoso');
        navigate('/admin');
      } else {
        toast.error(t('admin.loginError'));
      }
    } catch {
      toast.error(t('admin.loginError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      {/* Padrão de pontos sutil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-circle(circle, #0f172a 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Voltar */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('notFound.back')}
        </button>

        {/* Card de login */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-full bg-blue-50 mb-3">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              {t('admin.title')}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {t('admin.loginSubtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                {t('admin.email')}
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@censo.bf"
                className={`w-full px-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-slate-300'
                }`}
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                {t('admin.password')}
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••"
                className={`w-full px-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password
                    ? 'border-red-300 bg-red-50'
                    : 'border-slate-300'
                }`}
                {...register('password')}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? '...' : t('admin.loginButton')}
            </button>
          </form>

          <p className="text-xs text-slate-400 text-center mt-4">
            Demo: admin@censo.bf / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
