import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { authService } from "../services/auth-service";
import { RegisterInput, LoginInput } from "../validation/auth";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  register: (data: RegisterInput) => Promise<void>;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

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

          if (typeof window !== "undefined") {
            window.location.href = "/dashboard";
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Ошибка регистрации",
            isLoading: false,
          });
        }

        set({ isAuthenticated: true });
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

          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
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

        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-store",
    }
  )
);
