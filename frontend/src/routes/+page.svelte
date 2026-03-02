<script lang="ts">
	import { products } from '$lib/data/products';
	import { filters } from '$lib/stores/filters';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import ProductFilters from '$lib/components/ProductFilters.svelte';
	import type { Product } from '$lib/types';

	let filteredProducts: Product[] = [];

	// Apply filters and sorting
	filters.subscribe(f => {
		let result = [...products];

		// Apply search filter
		if (f.search) {
			const searchLower = f.search.toLowerCase();
			result = result.filter(p => 
				p.name.toLowerCase().includes(searchLower) ||
				p.description.toLowerCase().includes(searchLower) ||
				p.category.toLowerCase().includes(searchLower) ||
				p.tags.some(tag => tag.toLowerCase().includes(searchLower))
			);
		}

		// Apply category filter
		if (f.category) {
			result = result.filter(p => p.category === f.category);
		}

		// Apply price filters
		if (f.minPrice !== undefined) {
			result = result.filter(p => p.price >= f.minPrice!);
		}
		if (f.maxPrice !== undefined) {
			result = result.filter(p => p.price <= f.maxPrice!);
		}

		// Apply sorting
		if (f.sortBy) {
			switch (f.sortBy) {
				case 'price-asc':
					result.sort((a, b) => a.price - b.price);
					break;
				case 'price-desc':
					result.sort((a, b) => b.price - a.price);
					break;
				case 'name-asc':
					result.sort((a, b) => a.name.localeCompare(b.name));
					break;
				case 'name-desc':
					result.sort((a, b) => b.name.localeCompare(a.name));
					break;
				case 'rating':
					result.sort((a, b) => b.rating - a.rating);
					break;
			}
		}

		filteredProducts = result;
	});
</script>

<svelte:head>
	<title>ShopHub - Premium Products</title>
	<meta name="description" content="Discover amazing products at great prices" />
</svelte:head>

<div class="container">
	<div class="hero">
		<h1>Discover Amazing Products</h1>
		<p>Quality items curated just for you</p>
	</div>

	<ProductFilters />

	{#if filteredProducts.length > 0}
		<div class="products-grid">
			{#each filteredProducts as product (product.id)}
				<div class="animate-fade-in">
					<ProductCard {product} />
				</div>
			{/each}
		</div>
	{:else}
		<div class="empty-state">
			<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<circle cx="11" cy="11" r="8" stroke-width="2"/>
				<path d="m21 21-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
			</svg>
			<h3>No products found</h3>
			<p>Try adjusting your filters or search terms</p>
		</div>
	{/if}
</div>

<style>
	.hero {
		text-align: center;
		margin-bottom: 3rem;
		padding: 2rem 0;
	}

	.hero h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 0.5rem;
	}

	.hero p {
		font-size: 1.125rem;
		color: var(--text-light);
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		color: var(--text-light);
	}

	.empty-state svg {
		margin: 0 auto 1.5rem;
		color: var(--text-light);
	}

	.empty-state h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text);
		margin-bottom: 0.5rem;
	}

	@media (max-width: 768px) {
		.hero h1 {
			font-size: 2rem;
		}

		.hero p {
			font-size: 1rem;
		}

		.products-grid {
			grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
			gap: 1rem;
		}
	}
</style>
