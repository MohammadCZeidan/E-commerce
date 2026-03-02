<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import { page } from '$app/stores';
	
	let itemCount = 0;
	
	// Subscribe to cart to get item count
	cart.subscribe(items => {
		itemCount = items.reduce((total, item) => total + item.quantity, 0);
	});
</script>

<header class="header">
	<div class="container">
		<nav class="nav">
			<a href="/" class="logo">
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
					<rect width="32" height="32" rx="8" fill="currentColor"/>
					<path d="M10 12h12M10 16h12M10 20h8" stroke="white" stroke-width="2" stroke-linecap="round"/>
				</svg>
				<span>ShopHub</span>
			</a>
			
			<div class="nav-links">
				<a href="/" class:active={$page.url.pathname === '/'}>
					Products
				</a>
				<a href="/cart" class="cart-link" class:active={$page.url.pathname === '/cart'}>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
						<path d="M3 3h2l.4 2M7 13h10l4-8H6.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					Cart
					{#if itemCount > 0}
						<span class="cart-badge">{itemCount}</span>
					{/if}
				</a>
			</div>
		</nav>
	</div>
</header>

<style>
	.header {
		background-color: var(--background);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 50;
		box-shadow: var(--shadow);
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 64px;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--primary);
		text-decoration: none;
		transition: var(--transition);
	}

	.logo:hover {
		opacity: 0.8;
	}

	.logo svg {
		color: var(--primary);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-links a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 500;
		color: var(--text);
		text-decoration: none;
		transition: var(--transition);
		position: relative;
	}

	.nav-links a:hover {
		color: var(--primary);
	}

	.nav-links a.active {
		color: var(--primary);
	}

	.cart-link {
		position: relative;
	}

	.cart-badge {
		position: absolute;
		top: -8px;
		right: -12px;
		background-color: var(--danger);
		color: white;
		font-size: 0.625rem;
		font-weight: 700;
		padding: 0.125rem 0.375rem;
		border-radius: 9999px;
		min-width: 18px;
		text-align: center;
	}

	@media (max-width: 640px) {
		.nav-links {
			gap: 1rem;
		}

		.logo span {
			display: none;
		}
	}
</style>
