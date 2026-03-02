<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import { productService } from '$lib/api/products';
	import { cartStore } from '$lib/stores/cart';
	import type { Product } from '$lib/types/product';

	let product = $state<Product | null>(null);
	let loading = $state(true);
	let error = $state('');

	const getImage = (item: Product) => {
		if (item.image) return item.image;
		if (item.images && item.images.length > 0) {
			return `http://localhost:8000/storage/${item.images[0].path}`;
		}
		return '';
	};

	async function loadProduct() {
		loading = true;
		error = '';
		try {
			const id = Number(get(page).params.id);
			product = await productService.get(id);
		} catch (err: any) {
			error = err.response?.data?.message || 'Failed to load product';
		} finally {
			loading = false;
		}
	}

	function addToCart(item: Product) {
		cartStore.addItem(item, 1);
		alert('Added to cart!');
	}

	onMount(() => {
		loadProduct();
	});
</script>

<section class="section">
	<div class="container product-detail">
		{#if loading}
			<div class="loading">Loading product...</div>
		{:else if error}
			<div class="error">{error}</div>
		{:else if product}
			<div class="product-hero">
				<div class="product-media">
					{#if getImage(product)}
						<img src={getImage(product)} alt={product.name} />
					{:else}
						<div class="no-image">No Image</div>
					{/if}
				</div>
				<div class="product-info">
					<p class="eyebrow">{product.category}</p>
					<h1>{product.name}</h1>
					<p class="muted">{product.description}</p>
					<div class="price-row">
						<span class="price">${product.price.toFixed(2)}</span>
						<span class="stock">Stock: {product.stock}</span>
					</div>
					<div class="actions">
						<button class="btn btn-primary" onclick={() => addToCart(product)}>
							Add to cart
						</button>
						<a class="btn btn-secondary" href="/cart">Go to cart</a>
					</div>
					<div class="details card">
						<h3>Details</h3>
						<ul>
							<li>Crafted by independent makers.</li>
							<li>Ships in 48 hours from fulfillment.</li>
							<li>30-day returns with pre-paid label.</li>
						</ul>
					</div>
				</div>
			</div>
		{:else}
			<div class="error">Product not found.</div>
		{/if}
	</div>
</section>

<style>
	.product-hero {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2.5rem;
		align-items: start;
	}

	.product-media {
		background: var(--bg-soft);
		border-radius: 1.75rem;
		overflow: hidden;
		border: 1px solid var(--border);
		box-shadow: var(--shadow);
	}

	.product-media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		min-height: 320px;
	}

	.no-image {
		min-height: 320px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-muted);
	}

	.product-info h1 {
		font-family: 'Fraunces', serif;
		font-size: clamp(2rem, 3.5vw, 3rem);
		margin: 0.75rem 0 1rem;
	}

	.price-row {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		margin: 1.5rem 0;
	}

	.price {
		font-size: 2rem;
		font-weight: 700;
		color: var(--primary);
	}

	.stock {
		color: var(--text-muted);
		font-size: 0.95rem;
	}

	.actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 2rem;
	}

	.details {
		background: #fff;
		border-radius: 1.25rem;
		padding: 1.5rem;
	}

	.details ul {
		margin-top: 0.75rem;
		padding-left: 1.2rem;
		color: var(--text-muted);
	}
</style>
