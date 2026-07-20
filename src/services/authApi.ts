import API from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export const authApi = {
  login: (data: LoginPayload) =>
    API.post<AuthResponse>("/auth/login", data),

  register: (data: RegisterPayload) =>
    API.post<string>("/auth/register", data),
};
