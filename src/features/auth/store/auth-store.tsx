import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { authService } from "../services/auth-service";
import { RegisterInput, LoginInput } from "../validation/auth";
import { IUserData } from "../models";
import { useRouter } from "next/navigation";

interface AuthState {
  user: Partial<IUserData> | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;

  register: (data: RegisterInput) => Promise<void>;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
  initialize: () => Promise<void>;
}

const router = useRouter();

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
        isInitialized: false,

        register: async (data: RegisterInput) => {
          set({ isLoading: true, error: null });

          try {
            const response = await authService.register(data);

            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              isLoading: false,
            });

            router.replace('/');

          } catch (error) {
            set({
              error:
                error instanceof Error ? error.message : "Ошибка регистрации",
              isLoading: false,
            });
          }
        },

        login: async (data: LoginInput) => {
          set({ isLoading: true, error: null });

          try {
            const response = await authService.login(data);

            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              isLoading: false,
            });

            router.replace('/');

          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Ошибка входа",
              isLoading: false,
            });
          }
        },

        logout: () => {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });

          localStorage.removeItem("token");
          router.replace('/');
          
        },

        clearError: () => set({ error: null }),

        checkAuth: async () => {
          const { token } = get();

          if (!token) {
            set({ isAuthenticated: false, isInitialized: true });
            return;
          }

          set({ isLoading: true });

          try {
            const userData = await authService.checkAuth();

            set({
              user: userData,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            console.error("Auth check failed:", error);
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        },

        initialize: async () => {
          const { checkAuth, isInitialized } = get();

          if (!isInitialized) {
            await checkAuth();
          }
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.isInitialized = false;
          }
        },
      }
    ),
    {
      name: "auth-store",
    }
  )
);
