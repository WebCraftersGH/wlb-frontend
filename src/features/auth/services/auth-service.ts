import { IUserData } from "../models";
import { LoginInput, RegisterInput } from "../validation/auth";

export interface AuthResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

export interface ApiError {
  message: string;
  code: string;
}

class AuthService {
  BASE_URL = "http://localhost:8080";

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Произошла ошибка");
    }

    return data;
  }

  async register(data: RegisterInput): Promise<AuthResponse> {
    return this.request<AuthResponse>("/api/v1/register", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      credentials: "include",
    });
  }

  async login(data: LoginInput): Promise<AuthResponse> {
    return this.request<AuthResponse>("/api/v1/login", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    });
  }

  async logout(data: LoginInput): Promise<AuthResponse> {
    return this.request<AuthResponse>("/api/v1/logout", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async checkAuth(): Promise<Partial<IUserData>> {
    const response = await fetch('/api/auth/me', {})

    if (!response.ok) {
      throw new Error('Not authenticated')
    }

    return response.json()
  }
}

export const authService = new AuthService();
