<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import CartItem from '$lib/components/CartItem.svelte';
	import CartSummary from '$lib/components/CartSummary.svelte';
	import { goto } from '$app/navigation';

	let items = [];

	cart.subscribe(value => {
		items = value;
	});

	function handleCheckout() {
		goto('/checkout');
	}
</script>

<svelte:head>
	<title>Your Cart - ShopHub</title>
</svelte:head>

<div class="container">
	<div class="page-header">
		<h1>Shopping Cart</h1>
		<p>Review your items before checkout</p>
	</div>

	{#if items.length > 0}
		<div class="cart-layout">
			<div class="items">
				{#each items as item (item.product.id)}
					<CartItem {item} />
				{/each}
			</div>
			
			<CartSummary {items}>
				<button class="btn btn-primary btn-lg" on:click={handleCheckout}>
					Proceed to Checkout
				</button>
				<button class="btn btn-secondary" on:click={() => goto('/')}>Continue Shopping</button>
			</CartSummary>
		</div>
	{:else}
		<div class="empty-cart">
			<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path d="M3 3h2l.4 2M7 13h10l4-8H6.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<circle cx="9" cy="19" r="1.5"/>
				<circle cx="17" cy="19" r="1.5"/>
			</svg>
			<h3>Your cart is empty</h3>
			<p>Add some items to get started</p>
			<button class="btn btn-primary" on:click={() => goto('/')}>Browse Products</button>
		</div>
	{/if}
</div>

<style>
	.page-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.page-header h1 {
		font-size: 2.25rem;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 0.5rem;
	}

	.page-header p {
		color: var(--text-light);
	}

	.cart-layout {
		display: grid;
		grid-template-columns: 1fr 320px;
		gap: 2rem;
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.empty-cart {
		text-align: center;
		padding: 4rem 2rem;
		color: var(--text-light);
	}

	.empty-cart svg {
		margin: 0 auto 1.5rem;
		color: var(--text-light);
	}

	.empty-cart h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text);
		margin-bottom: 0.5rem;
	}

	.empty-cart button {
		margin-top: 1.5rem;
	}

	@media (max-width: 1024px) {
		.cart-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
