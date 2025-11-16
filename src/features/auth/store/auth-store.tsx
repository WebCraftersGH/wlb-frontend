import { createStore } from "zustand";

type AuthState = {
  email: string | undefined;
};

type AuthAction = {
  setEmail: (email: string) => void;
  sendEmailStepData: (state: AuthState) => void;
};

export type AuthStore = AuthState & AuthAction;

const defaultInitState: AuthState = {
  email: undefined,
};

export const initAuthStore = (): AuthState => {
  return { ...defaultInitState };
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,

    setEmail: (email: string) => set(() => ({ email: email })),

    sendEmailStepData: (state) => {
      console.log(state);
    },
  }));
};
