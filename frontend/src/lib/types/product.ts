export interface ProductImage {
	id: number;
	product_id: number;
	path: string;
	created_at: string;
	updated_at: string;
}

export interface Product {
	id: number;
	product_id: string | null;
	user_id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	stock: number;
	rating: number;
	tags: string[];
	image: string | null;
	images: ProductImage[];
	owner?: {
		id: number;
		name: string;
		email: string;
	};
	created_at: string;
	updated_at: string;
}

export interface PaginatedProducts {
	data: Product[];
	current_page: number;
	last_page: number;
	per_page: number;
	total: number;
}

export interface CreateProductData {
	product_id?: string;
	name: string;
	description: string;
	price: number;
	category: string;
	stock?: number;
	rating?: number;
	tags?: string[];
	image?: string;
	images?: File[];
}

export interface UpdateProductData extends Partial<CreateProductData> {
	delete_image_ids?: number[];
}
