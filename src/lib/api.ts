import type { AuthResponse, User, Product, PaginatedResponse } from '$lib/types';

const API_BASE_URL = 'http://localhost:8000/api';

function getAuthHeaders(token?: string | null): HeadersInit {
	const headers: HeadersInit = {
		'Accept': 'application/json'
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	return headers;
}

// Auth endpoints
export const authApi = {
	register: async (data: { name: string; email: string; password: string; role: string }): Promise<AuthResponse> => {
		const response = await fetch(`${API_BASE_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Registration failed');
		}

		return response.json();
	},

	login: async (email: string, password: string): Promise<AuthResponse> => {
		const response = await fetch(`${API_BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Login failed');
		}

		return response.json();
	},

	logout: async (token: string): Promise<void> => {
		await fetch(`${API_BASE_URL}/auth/logout`, {
			method: 'POST',
			headers: getAuthHeaders(token)
		});
	},

	me: async (token: string): Promise<User> => {
		const response = await fetch(`${API_BASE_URL}/auth/me`, {
			headers: getAuthHeaders(token)
		});

		if (!response.ok) {
			throw new Error('Failed to fetch user');
		}

		return response.json();
	}
};

// Product endpoints
export const productApi = {
	getAll: async (page = 1): Promise<PaginatedResponse<Product>> => {
		const response = await fetch(`${API_BASE_URL}/products?page=${page}`);
		
		if (!response.ok) {
			throw new Error('Failed to fetch products');
		}

		return response.json();
	},

	getOne: async (id: number): Promise<Product> => {
		const response = await fetch(`${API_BASE_URL}/products/${id}`);
		
		if (!response.ok) {
			throw new Error('Failed to fetch product');
		}

		return response.json();
	},

	create: async (token: string, formData: FormData): Promise<Product> => {
		const response = await fetch(`${API_BASE_URL}/products`, {
			method: 'POST',
			headers: getAuthHeaders(token),
			body: formData
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Failed to create product');
		}

		return response.json();
	},

	update: async (token: string, id: number, formData: FormData): Promise<Product> => {
		formData.append('_method', 'PUT');
		
		const response = await fetch(`${API_BASE_URL}/products/${id}`, {
			method: 'POST',
			headers: getAuthHeaders(token),
			body: formData
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Failed to update product');
		}

		return response.json();
	},

	delete: async (token: string, id: number): Promise<void> => {
		const response = await fetch(`${API_BASE_URL}/products/${id}`, {
			method: 'DELETE',
			headers: getAuthHeaders(token)
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Failed to delete product');
		}
	}
};
