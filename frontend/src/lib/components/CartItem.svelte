<script lang="ts">
	import type { CartItem } from '$lib/types';
	import { cart } from '$lib/stores/cart';
	import { formatPrice } from '$lib/utils/helpers';

	export let item: CartItem;

	function increment() {
		cart.updateQuantity(item.product.id, item.quantity + 1);
	}

	function decrement() {
		cart.updateQuantity(item.product.id, item.quantity - 1);
	}

	function remove() {
		cart.removeItem(item.product.id);
	}
</script>

<div class="cart-item">
	<div class="image">
		<img src={item.product.image} alt={item.product.name} />
	</div>
	
	<div class="details">
		<div class="header">
			<h3>{item.product.name}</h3>
			<button class="remove" on:click={remove}>Remove</button>
		</div>
		<p class="description">{item.product.description}</p>
		<div class="meta">
			<span class="price">{formatPrice(item.product.price)}</span>
			<span class="stock">In stock: {item.product.stock}</span>
		</div>
	</div>
	
	<div class="quantity">
		<button class="qty-btn" on:click={decrement} disabled={item.quantity <= 1}>−</button>
		<span class="qty">{item.quantity}</span>
		<button class="qty-btn" on:click={increment} disabled={item.quantity >= item.product.stock}>+</button>
	</div>
	
	<div class="total">
		{formatPrice(item.product.price * item.quantity)}
	</div>
</div>

<style>
	.cart-item {
		display: grid;
		grid-template-columns: 80px 1fr auto auto;
		gap: 1rem;
		align-items: center;
		padding: 1.25rem;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background-color: var(--background);
	}

	.image {
		width: 80px;
		height: 80px;
		border-radius: var(--radius);
		overflow: hidden;
		background-color: var(--surface);
	}

	.image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.details {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.header h3 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text);
	}

	.remove {
		background: none;
		border: none;
		color: var(--danger);
		font-size: 0.875rem;
		cursor: pointer;
		padding: 0;
	}

	.remove:hover {
		text-decoration: underline;
	}

	.description {
		font-size: 0.875rem;
		color: var(--text-light);
		line-height: 1.4;
	}

	.meta {
		display: flex;
		gap: 1rem;
		align-items: center;
		font-size: 0.875rem;
	}

	.price {
		font-weight: 600;
	}

	.stock {
		color: var(--text-light);
	}

	.quantity {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.qty-btn {
		width: 32px;
		height: 32px;
		border-radius: 6px;
		border: 1px solid var(--border);
		background-color: var(--background);
		cursor: pointer;
		font-weight: 600;
		transition: var(--transition);
	}

	.qty-btn:hover:not(:disabled) {
		border-color: var(--primary);
		color: var(--primary);
	}

	.qty-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.qty {
		min-width: 24px;
		text-align: center;
		font-weight: 600;
	}

	.total {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--text);
	}

	@media (max-width: 768px) {
		.cart-item {
			grid-template-columns: 80px 1fr;
			grid-template-areas:
				"image details"
				"quantity total";
		}

		.image {
			grid-area: image;
		}

		.details {
			grid-area: details;
		}

		.quantity {
			grid-area: quantity;
			justify-content: flex-start;
		}

		.total {
			grid-area: total;
			justify-self: end;
		}
	}
</style>
