export interface User {
	id: number;
	name: string;
	email: string;
	role: 'admin' | 'shop_owner' | 'seller' | 'buyer';
	created_at: string;
	updated_at: string;
}

export interface AuthResponse {
	token: string;
	user: User;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterData {
	name: string;
	email: string;
	password: string;
	role: 'admin' | 'shop_owner' | 'seller' | 'buyer';
}
