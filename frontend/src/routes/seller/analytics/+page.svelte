<script lang="ts">
	import { onMount } from 'svelte';
	import { sellerService } from '$lib/api/seller';
	import type { AnalyticsResponse } from '$lib/types/seller';

	let data: AnalyticsResponse | null = $state(null);
	let loading = $state(true);
	let error = $state('');

	async function loadAnalytics() {
		loading = true;
		error = '';
		try {
			data = await sellerService.getAnalytics();
		} catch (err: any) {
			error = err.response?.data?.message || 'Failed to load analytics';
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadAnalytics();
	});
</script>

<div class="analytics-page">
	<h1>Revenue & Analytics</h1>

	{#if loading}
		<div class="loading">Loading analytics...</div>
	{:else if error}
		<div class="error">{error}</div>
	{:else if data}
		<div class="stats-grid">
			<div class="stat-card card">
				<h3>Total Products</h3>
				<p class="stat-value">{data.summary.total_products}</p>
			</div>
			<div class="stat-card card">
				<h3>Total Stock</h3>
				<p class="stat-value">{data.summary.total_stock}</p>
			</div>
			<div class="stat-card card">
				<h3>Inventory Value</h3>
				<p class="stat-value">${data.summary.total_value.toFixed(2)}</p>
			</div>
			<div class="stat-card card">
				<h3>Avg Price</h3>
				<p class="stat-value">${data.summary.avg_price.toFixed(2)}</p>
			</div>
			<div class="stat-card card">
				<h3>Low Stock Items</h3>
				<p class="stat-value {data.summary.low_stock > 0 ? 'warning' : ''}">{data.summary.low_stock}</p>
			</div>
		</div>

		<div class="content-grid">
			<div class="card">
				<h2>Categories</h2>
				{#if data.categories.length === 0}
					<p class="empty">No categories</p>
				{:else}
					<div class="category-list">
						{#each data.categories as cat}
							<div class="category-item">
								<span class="category-name">{cat.category}</span>
								<span class="category-count">{cat.count} products</span>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="card">
				<h2>Recent Products</h2>
				{#if data.recent_products.length === 0}
					<p class="empty">No products</p>
				{:else}
					<div class="recent-list">
						{#each data.recent_products as product}
							<div class="recent-item">
								<div>
									<div class="product-name">{product.name}</div>
									<div class="product-meta">{product.category} • ${Number(product.price ?? 0).toFixed(2)}</div>
								</div>
								<span class="stock-badge">Stock: {product.stock}</span>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.analytics-page {
		padding: 1rem 0;
	}

	h1 {
		margin-bottom: 2rem;
	}

	h2 {
		font-size: 1.125rem;
		margin-bottom: 1.5rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		text-align: center;
	}

	.stat-card h3 {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: bold;
		color: var(--primary);
	}

	.stat-value.warning {
		color: var(--danger);
	}

	.content-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
	}

	.empty {
		text-align: center;
		color: var(--text-secondary);
		padding: 2rem;
	}

	.category-list, .recent-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.category-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		background: var(--bg-secondary);
		border-radius: 0.375rem;
	}

	.category-name {
		font-weight: 500;
	}

	.category-count {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.recent-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
	}

	.recent-item:last-child {
		border-bottom: none;
	}

	.product-name {
		font-weight: 500;
		margin-bottom: 0.25rem;
	}

	.product-meta {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.stock-badge {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		background: var(--bg-secondary);
		border-radius: 0.25rem;
	}
</style>
