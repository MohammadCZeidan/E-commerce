<script lang="ts">
	import type { CartItem } from '$lib/types';
	import { formatPrice } from '$lib/utils/helpers';

	export let items: CartItem[] = [];
	
	const shippingRate = 9.99;
	const taxRate = 0.08;

	$: subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
	$: shipping = items.length > 0 ? shippingRate : 0;
	$: tax = subtotal * taxRate;
	$: total = subtotal + shipping + tax;
</script>

<div class="summary card">
	<h3>Order Summary</h3>
	
	<div class="line">
		<span>Subtotal</span>
		<span>{formatPrice(subtotal)}</span>
	</div>
	
	<div class="line">
		<span>Shipping</span>
		<span>{items.length > 0 ? formatPrice(shipping) : 'Free'}</span>
	</div>
	
	<div class="line">
		<span>Tax</span>
		<span>{formatPrice(tax)}</span>
	</div>
	
	<div class="divider"></div>
	
	<div class="line total">
		<span>Total</span>
		<span>{formatPrice(total)}</span>
	</div>

	<slot />
</div>

<style>
	.summary {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		position: sticky;
		top: 90px;
	}

	.summary h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.875rem;
	}

	.line.total {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--text);
	}

	.divider {
		height: 1px;
		background-color: var(--border);
		margin: 0.5rem 0;
	}

	@media (max-width: 1024px) {
		.summary {
			position: static;
		}
	}
</style>
