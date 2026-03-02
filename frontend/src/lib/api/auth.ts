import type { AuthResponse, LoginCredentials, RegisterData, User } from '$lib/types/auth';
import { apiClient } from './client';

export const authService = {
	async register(data: RegisterData): Promise<AuthResponse> {
		const response = await apiClient.post<AuthResponse>('/auth/register', data);
		return response.data;
	},

	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
		return response.data;
	},

	async me(): Promise<User> {
		const response = await apiClient.get<User>('/auth/me');
		return response.data;
	},

	async logout(): Promise<void> {
		await apiClient.post('/auth/logout');
	},

	async refresh(): Promise<{ token: string }> {
		const response = await apiClient.post<{ token: string }>('/auth/refresh');
		return response.data;
	}
};
