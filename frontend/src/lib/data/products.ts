import type { Product } from '$lib/types';

// Mock product data - in a real app, this would come from an API
export const products: Product[] = [
	{
		id: 'prod-001',
		name: 'Wireless Headphones',
		description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Perfect for music lovers and professionals.',
		price: 199.99,
		image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
		category: 'Electronics',
		stock: 45,
		rating: 4.5,
		tags: ['audio', 'wireless', 'premium']
	},
	{
		id: 'prod-002',
		name: 'Smart Watch Pro',
		description: 'Feature-packed smartwatch with health tracking, GPS, and 7-day battery. Stay connected on the go.',
		price: 349.99,
		image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
		category: 'Electronics',
		stock: 32,
		rating: 4.7,
		tags: ['wearable', 'fitness', 'smart']
	},
	{
		id: 'prod-003',
		name: 'Designer Backpack',
		description: 'Stylish and durable backpack with laptop compartment. Ideal for work, travel, or everyday use.',
		price: 89.99,
		image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
		category: 'Accessories',
		stock: 78,
		rating: 4.3,
		tags: ['bag', 'travel', 'everyday']
	},
	{
		id: 'prod-004',
		name: 'Running Shoes',
		description: 'Lightweight running shoes with superior cushioning and breathable mesh. Engineered for performance.',
		price: 129.99,
		image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
		category: 'Footwear',
		stock: 56,
		rating: 4.6,
		tags: ['sports', 'running', 'comfort']
	},
	{
		id: 'prod-005',
		name: 'Yoga Mat Premium',
		description: 'Extra thick yoga mat with superior grip and cushioning. Eco-friendly and non-slip.',
		price: 49.99,
		image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
		category: 'Sports',
		stock: 120,
		rating: 4.4,
		tags: ['yoga', 'fitness', 'eco-friendly']
	},
	{
		id: 'prod-006',
		name: 'Coffee Maker Deluxe',
		description: 'Programmable coffee maker with thermal carafe. Brew the perfect cup every morning.',
		price: 159.99,
		image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
		category: 'Home',
		stock: 28,
		rating: 4.2,
		tags: ['kitchen', 'coffee', 'appliance']
	},
	{
		id: 'prod-007',
		name: 'Leather Wallet',
		description: 'Genuine leather wallet with RFID protection. Slim design with multiple card slots.',
		price: 59.99,
		image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
		category: 'Accessories',
		stock: 95,
		rating: 4.5,
		tags: ['leather', 'wallet', 'rfid']
	},
	{
		id: 'prod-008',
		name: 'Portable Speaker',
		description: 'Waterproof Bluetooth speaker with 360-degree sound. Perfect for outdoor adventures.',
		price: 79.99,
		image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
		category: 'Electronics',
		stock: 67,
		rating: 4.4,
		tags: ['audio', 'portable', 'waterproof']
	},
	{
		id: 'prod-009',
		name: 'Sunglasses Classic',
		description: 'Polarized sunglasses with UV400 protection. Timeless style meets modern technology.',
		price: 119.99,
		image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
		category: 'Accessories',
		stock: 143,
		rating: 4.3,
		tags: ['sunglasses', 'uv-protection', 'fashion']
	},
	{
		id: 'prod-010',
		name: 'Desk Lamp LED',
		description: 'Adjustable LED desk lamp with multiple brightness levels. Eye-friendly lighting for work and study.',
		price: 44.99,
		image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
		category: 'Home',
		stock: 82,
		rating: 4.1,
		tags: ['lighting', 'desk', 'led']
	},
	{
		id: 'prod-011',
		name: 'Stainless Steel Water Bottle',
		description: 'Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.',
		price: 34.99,
		image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
		category: 'Sports',
		stock: 156,
		rating: 4.6,
		tags: ['hydration', 'insulated', 'eco-friendly']
	},
	{
		id: 'prod-012',
		name: 'Gaming Mouse',
		description: 'Ergonomic gaming mouse with customizable RGB lighting and programmable buttons.',
		price: 69.99,
		image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
		category: 'Electronics',
		stock: 91,
		rating: 4.7,
		tags: ['gaming', 'rgb', 'ergonomic']
	}
];

export const categories = [...new Set(products.map(p => p.category))];
