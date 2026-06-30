import { useTranslation } from 'react-i18next';
import { Users, UserCheck, UserX, Calculator } from 'lucide-react';
import type { RecordStats } from '@/types';

interface StatsCardsProps {
  stats: RecordStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const { t } = useTranslation();

  const cards = [
    {
      label: t('admin.total'),
      value: stats.total,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: t('admin.adults'),
      value: stats.mayores,
      icon: UserCheck,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: t('admin.minors'),
      value: stats.menores,
      icon: UserX,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: t('admin.avgAge'),
      value: stats.promedioEdad,
      icon: Calculator,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${card.bg}`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div>
                <p className="text-xs text-slate-500">{card.label}</p>
                <p className="text-xl font-bold text-slate-900">{card.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
