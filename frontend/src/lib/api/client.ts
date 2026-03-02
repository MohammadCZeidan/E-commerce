import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiClient {
	private client: AxiosInstance;

	constructor() {
		this.client = axios.create({
			baseURL: API_URL,
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// Request interceptor - add auth token
		this.client.interceptors.request.use(
			(config) => {
				if (browser) {
					const token = localStorage.getItem('auth_token');
					if (token) {
						config.headers.Authorization = `Bearer ${token}`;
					}
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		// Response interceptor - handle 401
		this.client.interceptors.response.use(
			(response) => response,
			async (error: AxiosError) => {
				if (error.response?.status === 401 && browser) {
					localStorage.removeItem('auth_token');
					localStorage.removeItem('user');
					await goto('/auth');
				}
				return Promise.reject(error);
			}
		);
	}

	get instance() {
		return this.client;
	}
}

export const apiClient = new ApiClient().instance;
