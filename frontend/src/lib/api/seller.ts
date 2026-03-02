import type { OrdersResponse, AnalyticsResponse } from '$lib/types/seller';
import { apiClient } from './client';

export const sellerService = {
	async getOrders(): Promise<OrdersResponse> {
		const response = await apiClient.get<OrdersResponse>('/seller/orders');
		return response.data;
	},

	async getAnalytics(): Promise<AnalyticsResponse> {
		const response = await apiClient.get<AnalyticsResponse>('/seller/analytics');
		return response.data;
	}
};
