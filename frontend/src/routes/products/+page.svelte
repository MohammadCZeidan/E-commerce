<script lang="ts">
	import { onMount } from 'svelte';
	import { productService } from '$lib/api/products';
	import type { Product, PaginatedProducts } from '$lib/types/product';
	import { cartStore } from '$lib/stores/cart';
	import { authStore } from '$lib/stores/auth';

	let auth = $derived($authStore);
	let showMine = $state(false);

	let products: Product[] = $state([]);
	let loading = $state(true);
	let error = $state('');
	let currentPage = $state(1);
	let totalPages = $state(1);

	async function loadProducts(page = 1) {
		loading = true;
		error = '';
		try {
				let response;
				if (showMine && auth.isAuthenticated && ['seller','shop_owner','shop-owner','owner','admin'].includes(auth.user?.role)) {
					response = await productService.mine(page);
				} else {
					response = await productService.list(page);
				}
				products = response.data;
				currentPage = response.current_page;
				totalPages = response.last_page;
		} catch (err: any) {
			error = err.response?.data?.message || 'Failed to load products';
		} finally {
			loading = false;
		}
	}

	function addToCart(product: Product) {
		cartStore.addItem(product, 1);
		alert('Added to cart!');
	}

	onMount(() => {
		loadProducts();
	});
</script>

<section class="section">
	<div class="container products-page">
		<div class="products-header">
			<div>
				<p class="eyebrow">Shop</p>
				<h1>Curated finds, ready to ship</h1>
				<p class="muted">Discover pieces crafted for modern living and daily rituals.</p>
			</div>
			<div class="products-actions">
				<button class="btn btn-secondary">Filter</button>
				<button class="btn btn-ghost">Sort</button>
				{#if auth.isAuthenticated}
					{#if ['seller','shop_owner','shop-owner','owner','admin'].includes(auth.user?.role)}
						<a class="btn btn-primary" href="/seller/products/new">Add product</a>
					{/if}
				{/if}
			<button class="btn" onclick={() => { showMine = !showMine; loadProducts(); }}>
					{showMine ? 'Show all products' : 'My products'}
				</button>
			</div>
		</div>

		{#if loading}
			<div class="loading">Loading products...</div>
		{:else if error}
			<div class="error">{error}</div>
		{:else}
			<div class="products-grid">
				{#each products as product}
					<a class="product-card" href={`/products/${product.id}`}>
						<div class="media">
							{#if product.image}
								<img src={product.image} alt={product.name} />
							{:else if product.images.length > 0}
								<img src={`http://localhost:8000/storage/${product.images[0].path}`} alt={product.name} />
							{:else}
								<div class="no-image">No Image</div>
							{/if}
						</div>
						<div class="product-info">
							<div>
								<h3>{product.name}</h3>
								<p class="category">{product.category}</p>
								<p class="description">{product.description.slice(0, 90)}...</p>
							</div>
							<div class="product-footer">
								<span class="price">${Number(product.price ?? 0).toFixed(2)}</span>
								<span class="stock">Stock: {product.stock}</span>
							</div>
							<button
								class="btn btn-primary"
								onclick={(event) => {
									event.preventDefault();
									addToCart(product);
								}}
							>
								Add to cart
							</button>
						</div>
					</a>
				{/each}
			</div>

			{#if totalPages > 1}
				<div class="pagination">
					<button
						class="btn btn-secondary"
						disabled={currentPage === 1}
						onclick={() => loadProducts(currentPage - 1)}
					>
						Previous
					</button>
					<span>Page {currentPage} of {totalPages}</span>
					<button
						class="btn btn-secondary"
						disabled={currentPage === totalPages}
						onclick={() => loadProducts(currentPage + 1)}
					>
						Next
					</button>
				</div>
			{/if}
		{/if}
	</div>
</section>

<style>
	.products-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
		margin-bottom: 2.5rem;
	}

	.products-header h1 {
		font-family: 'Fraunces', serif;
		font-size: clamp(2rem, 3.5vw, 3rem);
		margin: 0.5rem 0 1rem;
	}

	.products-actions {
		display: flex;
		gap: 0.75rem;
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.75rem;
		margin-bottom: 2rem;
	}

	.product-card {
		background: #fff;
		border-radius: 1.5rem;
		border: 1px solid var(--border);
		overflow: hidden;
		box-shadow: var(--shadow);
		display: grid;
		text-decoration: none;
		color: inherit;
	}

	.product-card .media {
		height: 200px;
		background: var(--bg-soft);
	}

	.product-card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.no-image {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-muted);
	}

	.product-info {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		min-height: 230px;
	}

	.product-info h3 {
		font-size: 1.1rem;
		margin-bottom: 0.25rem;
	}

	.category {
		color: var(--text-muted);
		font-size: 0.85rem;
	}

	.description {
		color: var(--text-muted);
		font-size: 0.85rem;
	}

	.product-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: auto;
	}

	.price {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--primary);
	}

	.stock {
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	@media (max-width: 800px) {
		.products-header {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
