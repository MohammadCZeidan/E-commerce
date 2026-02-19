import { writable } from 'svelte/store';
import type { CartItem, Product } from '$lib/types';
import { browser } from '$app/environment';

const STORAGE_KEY = 'shopping_cart';

// Load cart from localStorage
function loadCart(): CartItem[] {
	if (browser) {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch (e) {
				console.error('Failed to parse cart from storage:', e);
			}
		}
	}
	return [];
}

// Save cart to localStorage
function saveCart(items: CartItem[]) {
	if (browser) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	}
}

function createCartStore() {
	const { subscribe, set, update } = writable<CartItem[]>(loadCart());

	return {
		subscribe,
		
		addItem: (product: Product, quantity: number = 1) => {
			update(items => {
				const existingItem = items.find(item => item.product.id === product.id);
				
				if (existingItem) {
					// Update quantity if item already exists
					const newQuantity = existingItem.quantity + quantity;
					const maxQuantity = product.stock;
					existingItem.quantity = Math.min(newQuantity, maxQuantity);
					const updated = [...items];
					saveCart(updated);
					return updated;
				} else {
					// Add new item
					const updated = [...items, { product, quantity: Math.min(quantity, product.stock) }];
					saveCart(updated);
					return updated;
				}
			});
		},

		removeItem: (productId: string) => {
			update(items => {
				const updated = items.filter(item => item.product.id !== productId);
				saveCart(updated);
				return updated;
			});
		},

		updateQuantity: (productId: string, quantity: number) => {
			update(items => {
				const item = items.find(item => item.product.id === productId);
				if (item) {
					if (quantity <= 0) {
						// Remove item if quantity is 0 or less
						const updated = items.filter(i => i.product.id !== productId);
						saveCart(updated);
						return updated;
					} else {
						// Update quantity
						item.quantity = Math.min(quantity, item.product.stock);
						const updated = [...items];
						saveCart(updated);
						return updated;
					}
				}
				return items;
			});
		},

		clear: () => {
			set([]);
			saveCart([]);
		},

		getItemCount: (items: CartItem[]): number => {
			return items.reduce((total, item) => total + item.quantity, 0);
		},

		getTotal: (items: CartItem[]): number => {
			return items.reduce((total, item) => {
				return total + (item.product.price * item.quantity);
			}, 0);
		}
	};
}

export const cart = createCartStore();
