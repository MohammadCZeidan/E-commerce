<script lang="ts">
	import type { Product } from '$lib/types';
	import { cart } from '$lib/stores/cart';
	import { formatPrice } from '$lib/utils/helpers';

	export let product: Product;
	
	let addingToCart = false;

	function handleAddToCart() {
		addingToCart = true;
		cart.addItem(product);
		
		// Reset button state after animation
		setTimeout(() => {
			addingToCart = false;
		}, 1000);
	}
</script>

<div class="product-card">
	<div class="image-container">
		<img src={product.image} alt={product.name} />
		{#if product.stock < 10}
			<span class="stock-badge">Only {product.stock} left</span>
		{/if}
	</div>
	
	<div class="content">
		<div class="category">
			{product.category}
		</div>
		
		<h3 class="title">{product.name}</h3>
		
		<p class="description">{product.description}</p>
		
		<div class="rating">
			{#each Array(5) as _, i}
				<svg 
					class="star" 
					class:filled={i < Math.floor(product.rating)}
					width="16" 
					height="16" 
					viewBox="0 0 20 20" 
					fill="currentColor"
				>
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			{/each}
			<span class="rating-text">{product.rating}</span>
		</div>
		
		<div class="footer">
			<div class="price">{formatPrice(product.price)}</div>
			<button 
				class="btn btn-primary btn-sm" 
				on:click={handleAddToCart}
				class:adding={addingToCart}
				disabled={product.stock === 0}
			>
				{#if addingToCart}
					Added! ✓
				{:else if product.stock === 0}
					Out of Stock
				{:else}
					Add to Cart
				{/if}
			</button>
		</div>
	</div>
</div>

<style>
	.product-card {
		background-color: var(--background);
		border-radius: var(--radius);
		overflow: hidden;
		box-shadow: var(--shadow);
		border: 1px solid var(--border);
		transition: var(--transition);
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.product-card:hover {
		box-shadow: var(--shadow-lg);
		transform: translateY(-2px);
	}

	.image-container {
		position: relative;
		width: 100%;
		padding-top: 75%; /* 4:3 aspect ratio */
		overflow: hidden;
		background-color: var(--surface);
	}

	.image-container img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.stock-badge {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		background-color: var(--warning);
		color: white;
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.25rem 0.625rem;
		border-radius: var(--radius);
	}

	.content {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		flex: 1;
	}

	.category {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text);
		line-height: 1.4;
	}

	.description {
		font-size: 0.875rem;
		color: var(--text-light);
		line-height: 1.5;
		flex: 1;
	}

	.rating {
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	.star {
		color: #d1d5db;
	}

	.star.filled {
		color: #fbbf24;
	}

	.rating-text {
		font-size: 0.875rem;
		color: var(--text-light);
		margin-left: 0.25rem;
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 0.75rem;
		border-top: 1px solid var(--border);
	}

	.price {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text);
	}

	button.adding {
		background-color: var(--success);
	}

	button:disabled {
		background-color: var(--secondary);
		cursor: not-allowed;
		opacity: 0.6;
	}
</style>
