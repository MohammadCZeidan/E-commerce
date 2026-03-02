<script lang="ts">
	import { onMount } from 'svelte';
	import { sellerService } from '$lib/api/seller';
	import type { OrdersResponse } from '$lib/types/seller';

	let data: OrdersResponse | null = $state(null);
	let loading = $state(true);
	let error = $state('');

	async function loadOrders() {
		loading = true;
		error = '';
		try {
			data = await sellerService.getOrders();
		} catch (err: any) {
			error = err.response?.data?.message || 'Failed to load orders';
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadOrders();
	});
</script>

<div class="orders-page">
	<h1>Orders</h1>

	{#if loading}
		<div class="loading">Loading orders...</div>
	{:else if error}
		<div class="error">{error}</div>
	{:else if data}
		<div class="stats-grid">
			<div class="stat-card card">
				<h3>Total Orders</h3>
				<p class="stat-value">{data.stats.total_orders}</p>
			</div>
			<div class="stat-card card">
				<h3>Pending</h3>
				<p class="stat-value">{data.stats.pending}</p>
			</div>
			<div class="stat-card card">
				<h3>Fulfilled</h3>
				<p class="stat-value">{data.stats.fulfilled}</p>
			</div>
			<div class="stat-card card">
				<h3>Revenue</h3>
				<p class="stat-value">${data.stats.revenue.toFixed(2)}</p>
			</div>
		</div>

		{#if data.data.length === 0}
			<div class="card empty">
				<p>No orders yet</p>
			</div>
		{:else}
			<div class="orders-table">
				<table>
					<thead>
						<tr>
							<th>Order #</th>
							<th>Buyer</th>
							<th>Items</th>
							<th>Total</th>
							<th>Status</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{#each data.data as order}
							<tr>
								<td>{order.order_number}</td>
								<td>{order.buyer_name}</td>
								<td>{order.items_count}</td>
								<td>${order.total.toFixed(2)}</td>
								<td>
									<span class="status status-{order.status}">{order.status}</span>
								</td>
								<td>{new Date(order.created_at).toLocaleDateString()}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	{/if}
</div>

<style>
	.orders-page {
		padding: 1rem 0;
	}

	h1 {
		margin-bottom: 2rem;
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

	.empty {
		text-align: center;
		padding: 3rem;
		color: var(--text-secondary);
	}

	.orders-table {
		background: white;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		overflow: hidden;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th, td {
		padding: 1rem;
		text-align: left;
		border-bottom: 1px solid var(--border);
	}

	th {
		background: var(--bg-secondary);
		font-weight: 600;
		font-size: 0.875rem;
	}

	.status {
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.status-pending {
		background: #fef3c7;
		color: #92400e;
	}

	.status-fulfilled {
		background: #d1fae5;
		color: #065f46;
	}

	.status-cancelled {
		background: #fee2e2;
		color: #991b1b;
	}
</style>
