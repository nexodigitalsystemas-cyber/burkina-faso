import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Save, Wifi, WifiOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { recordSchema } from '@/lib/validations';
import type { RecordFormData } from '@/lib/validations';
import { useRecordsStore } from '@/stores/recordsStore';
import { useOnline } from '@/hooks/useOnline';

export function RecordForm() {
  const { t } = useTranslation();
  const isOnline = useOnline();
  const addRecord = useRecordsStore((s) => s.addRecord);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RecordFormData>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      nombre: '',
      ciudad: '',
      edad: undefined,
    },
  });

  const edad = watch('edad');
  const esMenor = typeof edad === 'number' && edad < 18 && edad >= 0;

  const onSubmit = async (data: RecordFormData) => {
    setIsSubmitting(true);
    try {
      const success = await addRecord(
        { nombre: data.nombre, ciudad: data.ciudad, edad: Number(data.edad) },
        isOnline
      );

      if (success) {
        toast.success(isOnline ? t('form.success') : t('form.successOffline'), {
          duration: 3000,
        });
        reset();
      } else {
        toast.error(t('form.error'));
      }
    } catch {
      toast.error(t('form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Status indicator */}
      <div className="flex items-center gap-2 text-xs mb-2">
        {isOnline ? (
          <span className="flex items-center gap-1 text-green-600">
            <Wifi className="w-3.5 h-3.5" />
            {t('status.online')}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-amber-600">
            <WifiOff className="w-3.5 h-3.5" />
            {t('status.offline')}
          </span>
        )}
      </div>

      {/* Nome */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 mb-1">
          {t('form.name')}
        </label>
        <input
          id="nombre"
          type="text"
          placeholder={t('form.namePlaceholder')}
          className={`w-full px-3 py-2.5 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.nombre ? 'border-red-300 bg-red-50' : 'border-slate-300'
          }`}
          {...register('nombre')}
        />
        {errors.nombre && (
          <p className="mt-1 text-xs text-red-600">{errors.nombre.message}</p>
        )}
      </div>

      {/* Cidade */}
      <div>
        <label htmlFor="ciudad" className="block text-sm font-medium text-slate-700 mb-1">
          {t('form.city')}
        </label>
        <input
          id="ciudad"
          type="text"
          placeholder={t('form.cityPlaceholder')}
          className={`w-full px-3 py-2.5 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.ciudad ? 'border-red-300 bg-red-50' : 'border-slate-300'
          }`}
          {...register('ciudad')}
        />
        {errors.ciudad && (
          <p className="mt-1 text-xs text-red-600">{errors.ciudad.message}</p>
        )}
      </div>

      {/* Idade */}
      <div>
        <label htmlFor="edad" className="block text-sm font-medium text-slate-700 mb-1">
          {t('form.age')}
        </label>
        <input
          id="edad"
          type="number"
          min={0}
          max={120}
          placeholder={t('form.agePlaceholder')}
          className={`w-full px-3 py-2.5 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.edad ? 'border-red-300 bg-red-50' : 'border-slate-300'
          }`}
          {...register('edad', { valueAsNumber: true })}
        />
        {errors.edad && (
          <p className="mt-1 text-xs text-red-600">{errors.edad.message}</p>
        )}
      </div>

      {/* Es menor (calculado) */}
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md border border-slate-200">
        <input
          type="checkbox"
          checked={esMenor}
          disabled
          className="w-4 h-4 text-blue-600 rounded border-slate-300 opacity-60"
        />
        <span className="text-sm text-slate-600">
          {t('form.isMinor')}:{' '}
          <strong className={esMenor ? 'text-amber-600' : 'text-green-600'}>
            {esMenor ? 'Sí' : 'No'}
          </strong>
        </span>
      </div>

      {/* Botão submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Save className="w-4 h-4" />
        {isSubmitting
          ? '...'
          : isOnline
          ? t('form.submit')
          : t('form.submitOffline')}
      </button>
    </form>
  );
}
