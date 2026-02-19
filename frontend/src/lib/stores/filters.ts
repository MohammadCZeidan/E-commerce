import { writable } from 'svelte/store';
import type { ProductFilters } from '$lib/types';

export const filters = writable<ProductFilters>({
	category: undefined,
	minPrice: undefined,
	maxPrice: undefined,
	search: '',
	sortBy: undefined
});
