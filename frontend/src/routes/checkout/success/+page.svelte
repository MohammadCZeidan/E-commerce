<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { formatDate } from '$lib/utils/helpers';

	$: orderId = $page.url.searchParams.get('order');
	const orderDate = new Date();
</script>

<svelte:head>
	<title>Order Confirmed - ShopHub</title>
</svelte:head>

<div class="container">
	<div class="success-card">
		<div class="icon">✓</div>
		<h1>Order Confirmed</h1>
		<p>Thank you for your purchase! Your order has been successfully placed.</p>

		<div class="details">
			<div class="detail">
				<span>Order ID</span>
				<strong>{orderId}</strong>
			</div>
			<div class="detail">
				<span>Order Date</span>
				<strong>{formatDate(orderDate)}</strong>
			</div>
			<div class="detail">
				<span>Status</span>
				<strong class="status">Processing</strong>
			</div>
		</div>

		<div class="actions">
			<button class="btn btn-primary" on:click={() => goto('/')}>Continue Shopping</button>
			<button class="btn btn-secondary" on:click={() => goto('/cart')}>View Cart</button>
		</div>
	</div>
</div>

<style>
	.success-card {
		max-width: 600px;
		margin: 4rem auto;
		text-align: center;
		background-color: var(--background);
		border-radius: var(--radius);
		padding: 3rem;
		box-shadow: var(--shadow-lg);
		border: 1px solid var(--border);
	}

	.icon {
		width: 64px;
		height: 64px;
		background-color: var(--success);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		font-weight: 700;
		margin: 0 auto 1.5rem;
	}

	.success-card h1 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
	}

	.success-card p {
		color: var(--text-light);
		margin-bottom: 2rem;
	}

	.details {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		background-color: var(--surface);
		border-radius: var(--radius);
		margin-bottom: 2rem;
	}

	.detail {
		display: flex;
		justify-content: space-between;
		font-size: 0.875rem;
	}

	.detail span {
		color: var(--text-light);
	}

	.status {
		color: var(--primary);
	}

	.actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>
