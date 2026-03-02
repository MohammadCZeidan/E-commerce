import type { Product, PaginatedProducts, CreateProductData, UpdateProductData } from '$lib/types/product';
import { apiClient } from './client';

export const productService = {
	async list(page = 1): Promise<PaginatedProducts> {
		try {
			const response = await apiClient.get<PaginatedProducts>(`/products?page=${page}`);
			return response.data;
		} catch (err: any) {
			// surface backend error message where possible
			const msg = err.response?.data?.message || err.message || 'Failed to fetch products';
			throw new Error(msg);
		}
	},

	async mine(page = 1): Promise<PaginatedProducts> {
		const response = await apiClient.get<PaginatedProducts>(`/seller/products?page=${page}`);
		return response.data;
	},

	async get(id: number): Promise<Product> {
		const response = await apiClient.get<Product>(`/products/${id}`);
		return response.data;
	},

	async create(data: CreateProductData): Promise<Product> {
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			if (key === 'images' && Array.isArray(value)) {
				value.forEach((file) => formData.append('images[]', file));
			} else if (key === 'tags' && Array.isArray(value)) {
				value.forEach((tag, index) => formData.append(`tags[${index}]`, tag));
			} else if (value !== undefined && value !== null) {
				formData.append(key, value.toString());
			}
		});

		const response = await apiClient.post<Product>('/products', formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		});
		return response.data;
	},

	async update(id: number, data: UpdateProductData): Promise<Product> {
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			if (key === 'images' && Array.isArray(value)) {
				value.forEach((file) => formData.append('images[]', file));
			} else if (key === 'tags' && Array.isArray(value)) {
				value.forEach((tag, index) => formData.append(`tags[${index}]`, tag));
			} else if (key === 'delete_image_ids' && Array.isArray(value)) {
				value.forEach((imgId, index) => formData.append(`delete_image_ids[${index}]`, imgId.toString()));
			} else if (value !== undefined && value !== null) {
				formData.append(key, value.toString());
			}
		});

		// Laravel expects _method=PUT for file uploads
		formData.append('_method', 'PUT');

		const response = await apiClient.post<Product>(`/products/${id}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		});
		return response.data;
	},

	async delete(id: number): Promise<void> {
		await apiClient.delete(`/products/${id}`);
	}
};
