import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthState {
  user: { email: string } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// NOTA SOBRE AUTH:
// Opção 1 (recomendada): Criar um user no Supabase Auth Dashboard
//    e usar signInWithPassword diretamente.
// Opção 2: Usar tabela custom 'admins' com bcrypt hash.
//    Neste projeto usamos a Opção 1 (Supabase Auth nativo).
//    Para criar o admin, vá em Authentication > Users no Dashboard
//    e adicione: email='admin@censo.bf', password='admin123'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string): Promise<boolean> => {
        // Se não há Supabase configurado, aceita credenciais mock para demo
        if (!isSupabaseConfigured()) {
          if (email === 'admin@censo.bf' && password === 'admin123') {
            set({ user: { email }, isAuthenticated: true });
            return true;
          }
          return false;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || !data.user) {
          console.error('Login error:', error);
          return false;
        }

        set({
          user: { email: data.user.email || '' },
          isAuthenticated: true,
        });
        return true;
      },

      logout: async () => {
        if (isSupabaseConfigured()) {
          await supabase.auth.signOut();
        }
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'censo-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
