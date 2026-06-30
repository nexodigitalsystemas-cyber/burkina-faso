import { useEffect } from 'react';
import { useOnline } from './useOnline';
import { useRecordsStore } from '@/stores/recordsStore';
import toast from 'react-hot-toast';

export function useSyncQueue() {
  const isOnline = useOnline();

  useEffect(() => {
    if (isOnline) {
      const sync = async () => {
        const success = await useRecordsStore.getState().syncQueue();
        if (success) {
          toast.success('Sincronización completada', { id: 'sync' });
        }
      };
      sync();
    }
  }, [isOnline]);
}
