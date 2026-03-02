export interface Order {
	id: number;
	order_number: string;
	status: 'pending' | 'fulfilled' | 'cancelled';
	total: number;
	items_count: number;
	buyer_name: string;
	created_at: string;
}

export interface OrderStats {
	total_orders: number;
	pending: number;
	fulfilled: number;
	revenue: number;
}

export interface OrdersResponse {
	data: Order[];
	stats: OrderStats;
}

export interface AnalyticsSummary {
	total_products: number;
	total_stock: number;
	total_value: number;
	avg_price: number;
	low_stock: number;
}

export interface CategoryData {
	category: string;
	count: number;
}

export interface AnalyticsResponse {
	summary: AnalyticsSummary;
	categories: CategoryData[];
	recent_products: any[];
}
