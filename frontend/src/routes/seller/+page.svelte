<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { productService } from '$lib/api/products';
	import { authStore } from '$lib/stores/auth';

	let stats = $state({
		totalProducts: 0,
		totalRevenue: 0,
		totalOrders: 0
	});

	let recentProducts = $state([]);
	let loading = $state(true);
	let error = $state('');

	let auth = $derived($authStore);

	async function loadDashboardData() {
		loading = true;
		error = '';
		try {
			// Load seller's products
			const productsResponse = await productService.mine();
			const products = productsResponse.data || [];
			
			stats.totalProducts = products.length;

			// Show 3 recent products
			recentProducts = products.slice(0, 3);

			// TODO: Load orders and revenue data when those endpoints are available
			// For now, mock data
			stats.totalRevenue = 2400;
			stats.totalOrders = 12;
		} catch (err: any) {
			error = err.message || 'Failed to load dashboard data';
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadDashboardData();
	});
</script>

<section class="section">
	<div class="dashboard-container">
		<div class="dashboard-header">
			<div>
				<h1>Welcome, {auth.user?.name}!</h1>
				<p class="muted">Here's your seller dashboard overview.</p>
			</div>
			<a class="btn btn-primary" href="/seller/products/new">Add New Product</a>
		</div>

		{#if loading}
			<div class="loading">Loading dashboard...</div>
		{:else if error}
			<div class="error">{error}</div>
		{:else}
			<div class="stats-grid">
				<div class="stat-card">
					<div class="stat-value">{stats.totalProducts}</div>
					<div class="stat-label">Products</div>
					<a href="/seller/products" class="stat-link">View all →</a>
				</div>
				<div class="stat-card">
					<div class="stat-value">${stats.totalRevenue.toFixed(2)}</div>
					<div class="stat-label">Revenue</div>
					<a href="/seller/analytics" class="stat-link">Details →</a>
				</div>
				<div class="stat-card">
					<div class="stat-value">{stats.totalOrders}</div>
					<div class="stat-label">Orders</div>
					<a href="/seller/orders" class="stat-link">View all →</a>
				</div>
			</div>

			{#if recentProducts.length > 0}
				<div class="recent-products">
					<h2>Recent Products</h2>
					<div class="products-list">
						{#each recentProducts as product}
							<div class="product-row">
								<div class="product-info">
									<h3>{product.name}</h3>
									<p class="muted">${Number(product.price ?? 0).toFixed(2)} • Stock: {product.stock}</p>
								</div>
								<div class="product-actions">
									<a class="btn btn-secondary btn-sm" href={`/seller/products/${product.id}/edit`}>Edit</a>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<div class="empty-state">
					<p>You haven't created any products yet.</p>
					<a class="btn btn-primary" href="/seller/products/new">Create Your First Product</a>
				</div>
			{/if}
		{/if}
	</div>
</section>

<style>
	.dashboard-container {
		max-width: 1200px;
	}

	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		gap: 1rem;
	}

	.dashboard-header h1 {
		margin: 0;
		font-size: clamp(1.5rem, 3vw, 2.5rem);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		background: white;
		border: 1px solid var(--border);
		border-radius: 1rem;
		padding: 1.5rem;
		text-align: center;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--primary);
		margin-bottom: 0.5rem;
	}

	.stat-label {
		color: var(--text-muted);
		font-size: 0.875rem;
		margin-bottom: 1rem;
	}

	.stat-link {
		display: inline-block;
		color: var(--primary);
		font-size: 0.875rem;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s;
	}

	.stat-link:hover {
		color: var(--primary-dark);
	}

	.recent-products {
		background: white;
		border: 1px solid var(--border);
		border-radius: 1rem;
		padding: 1.5rem;
	}

	.recent-products h2 {
		margin: 0 0 1rem 0;
		font-size: 1.25rem;
	}

	.products-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.product-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		gap: 1rem;
	}

	.product-info h3 {
		margin: 0 0 0.25rem 0;
		font-size: 1rem;
	}

	.product-info p {
		margin: 0;
		font-size: 0.875rem;
	}

	.product-actions {
		display: flex;
		gap: 0.5rem;
	}

	.btn-sm {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
	}

	.empty-state {
		text-align: center;
		padding: 3rem 1.5rem;
		background: white;
		border: 1px solid var(--border);
		border-radius: 1rem;
	}

	.empty-state p {
		color: var(--text-muted);
		margin-bottom: 1.5rem;
	}
