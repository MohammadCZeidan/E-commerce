export interface Product {
	id: number;
	product_id?: string;
	user_id?: number;
	name: string;
	description: string;
	price: number;
	image?: string;
	category: string;
	stock: number;
	rating: number;
	tags: string[];
	images?: ProductImage[];
	owner?: User;
	created_at?: string;
	updated_at?: string;
}

export interface ProductImage {
	id: number;
	product_id: number;
	path: string;
	url: string;
	created_at?: string;
	updated_at?: string;
}

export interface User {
	id: number;
	name: string;
	email: string;
	role: 'admin' | 'shop_owner' | 'seller' | 'buyer';
	created_at?: string;
	updated_at?: string;
}

export interface AuthResponse {
	token: string;
	user: User;
}

export interface PaginatedResponse<T> {
	data: T[];
	current_page: number;
	last_page: number;
	per_page: number;
	total: number;
}
