interface ApiResponse {}

interface ApiError {
  message: string;
  code: string;
}

export class WheelsCreationService {
  BASE_URL = "http://localhost:8080";

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Произошла ошибка");
    }

    return data;
  }

  async initWheels() {
    return this.request<ApiResponse>("/api/v1/wheels/init", {
      method: "POST",
    });
  }

  async updateWheels(data: any, path: string) {
    return this.request<ApiResponse>(`/api/v1/wheel/${path}`, {
      method: "PATCH",
      body: JSON.stringify(data)
    });
  }
};

export const wheelsCreationService = new WheelsCreationService();
