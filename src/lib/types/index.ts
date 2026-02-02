// Product related types
export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	stock: number;
	rating: number;
	tags: string[];
}

// Cart types
export interface CartItem {
	product: Product;
	quantity: number;
}

export interface Cart {
	items: CartItem[];
	total: number;
}

// Checkout types
export interface ShippingAddress {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

export interface PaymentInfo {
	cardNumber: string;
	cardName: string;
	expiryDate: string;
	cvv: string;
}

export interface Order {
	id: string;
	items: CartItem[];
	shippingAddress: ShippingAddress;
	total: number;
	status: 'pending' | 'processing' | 'shipped' | 'delivered';
	createdAt: Date;
}

// Filter types
export interface ProductFilters {
	category?: string;
	minPrice?: number;
	maxPrice?: number;
	search?: string;
	sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating';
}
