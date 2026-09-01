import { api } from "@/lib/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

class AuthService {
  async register(payload: RegisterPayload) {
    const response = await api.post<LoginResponse>(
      "/auth/register",
      payload
    );

    return response.data;
  }
  async login(payload: LoginPayload) {
    const response = await api.post<LoginResponse>(
      "/auth/login",
      payload
    );

    return response.data;
  }
}

export default new AuthService();