<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import { productApi } from '$lib/api';
	import type { Product } from '$lib/types';

	let products: Product[] = [];
	let loading = true;
	let error = '';
	let user: any;
	let token: string | null = null;

	authorStore.subscribe(state => {
		user = state.user;
		token = state.token;
		
		if (!state.isAuthenticated) {
			goto('/auth');
		} else if (user?.role !== 'shop_owner' && user?.role !== 'seller' && user?.role !== 'admin') {
			goto('/');
		}
	});

	onMount(async () => {
		await loadProducts();
	});

	async function loadProducts() {
		if (!token) return;
		
		loading = true;
		try {
			const response = await productApi.getMine(token);
			products = response.data;
		} catch (err: any) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	async function deleteProduct(id: number) {
		if (!confirm('Are you sure you want to delete this product?') || !token) return;

		try {
			await productApi.delete(token, id);
			products = products.filter(p => p.id !== id);
		} catch (err: any) {
			alert(err.message);
		}
	}

	function handleLogout() {
		authStore.logout();
		goto('/auth');
	}
</script>

<div class="seller-dashboard">
	<header class="dashboard-header">
		<div class="container">
			<div class="header-content">
				<div>
					<h1>My Products</h1>
					<p>Welcome back, {user?.name}</p>
				</div>
				<div class="header-actions">
					<a href="/seller/products/new" class="btn-primary">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<line x1="12" y1="5" x2="12" y2="19" stroke-width="2" stroke-linecap="round"/>
							<line x1="5" y1="12" x2="19" y2="12" stroke-width="2" stroke-linecap="round"/>
						</svg>
						Add Product
					</a>
					<button on:click={handleLogout} class="btn-secondary">Logout</button>
				</div>
			</div>
		</div>
	</header>

	<main class="container">
		{#if loading}
			<div class="loading">Loading your products...</div>
		{:else if error}
			<div class="error-box">{error}</div>
		{:else if products.length === 0}
			<div class="empty-state">
				<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<rect x="2" y="7" width="20" height="14" rx="2" stroke-width="2"/>
					<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke-width="2"/>
				</svg>
				<h3>No products yet</h3>
				<p>Start by adding your first product to your shop</p>
				<a href="/seller/products/new" class="btn-primary">Add Your First Product</a>
			</div>
		{:else}
			<div class="products-grid">
				{#each products as product}
					<div class="product-card">
						<div class="product-image">
							{#if product.images && product.images.length > 0}
								<img src={product.images[0].url} alt={product.name} />
							{:else if product.image}
								<img src={product.image} alt={product.name} />
							{:else}
								<div class="no-image">No image</div>
							{/if}
						</div>
						<div class="product-info">
							<h3>{product.name}</h3>
							<p class="category">{product.category}</p>
							<p class="price">${product.price.toFixed(2)}</p>
							<p class="stock">Stock: {product.stock}</p>
							{#if product.images && product.images.length > 0}
								<p class="images-count">{product.images.length} photo{product.images.length !== 1 ? 's' : ''}</p>
							{/if}
						</div>
						<div class="product-actions">
							<a href="/seller/products/{product.id}/edit" class="btn-edit">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke-width="2" stroke-linecap="round"/>
									<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								Edit
							</a>
							<button on:click={() => deleteProduct(product.id)} class="btn-delete">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								Delete
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</main>
</div>

<style>
	.seller-dashboard {
		min-height: 100vh;
		background: var(--background);
	}

	.dashboard-header {
		background: white;
		border-bottom: 1px solid var(--border);
		padding: 1.5rem 0;
		margin-bottom: 2rem;
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.header-content h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 0.25rem;
	}

	.header-content p {
		color: var(--text-light);
	}

	.header-actions {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.btn-primary,
	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1.25rem;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		text-decoration: none;
		border: none;
		font-size: 0.875rem;
	}

	.btn-primary {
		background: var(--primary);
		color: white;
	}

	.btn-primary:hover {
		background: var(--primary-dark);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
	}

	.btn-secondary {
		background: var(--background);
		color: var(--text);
		border: 1px solid var(--border);
	}

	.btn-secondary:hover {
		background: var(--border);
	}

	.loading {
		text-align: center;
		padding: 4rem 2rem;
		color: var(--text-light);
	}

	.error-box {
		padding: 1rem;
		background: #fee;
		border: 1px solid #fcc;
		border-radius: 8px;
		color: #c00;
		margin-bottom: 2rem;
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
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

	.empty-state p {
		color: var(--text-light);
		margin-bottom: 1.5rem;
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.product-card {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid var(--border);
		transition: all 0.2s;
	}

	.product-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		transform: translateY(-2px);
	}

	.product-image {
		aspect-ratio: 4/3;
		overflow: hidden;
		background: var(--background);
	}

	.product-image img {
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
		color: var(--text-light);
		font-size: 0.875rem;
	}

	.product-info {
		padding: 1rem;
	}

	.product-info h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text);
		margin-bottom: 0.5rem;
	}

	.category {
		font-size: 0.875rem;
		color: var(--text-light);
		margin-bottom: 0.5rem;
	}

	.price {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--primary);
		margin-bottom: 0.25rem;
	}

	.stock {
		font-size: 0.875rem;
		color: var(--text-light);
	}

	.images-count {
		font-size: 0.75rem;
		color: var(--primary);
		margin-top: 0.5rem;
		font-weight: 500;
	}

	.product-actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border-top: 1px solid var(--border);
	}

	.btn-edit,
	.btn-delete {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.75rem;
		border: none;
		background: none;
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.2s;
		text-decoration: none;
	}

	.btn-edit {
		color: var(--primary);
		border-right: 1px solid var(--border);
	}

	.btn-edit:hover {
		background: rgba(99, 102, 241, 0.05);
	}

	.btn-delete {
		color: #dc2626;
	}

	.btn-delete:hover {
		background: rgba(220, 38, 38, 0.05);
	}

	@media (max-width: 768px) {
		.header-content {
			flex-direction: column;
			align-items: flex-start;
		}

		.header-actions {
			width: 100%;
		}

		.products-grid {
			grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		}
	}
</style>
