<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import CartSummary from '$lib/components/CartSummary.svelte';
	import { isValidEmail, isValidPhone, generateId } from '$lib/utils/helpers';
	import { goto } from '$app/navigation';

	let items = [];
	let loading = false;
	let errors: Record<string, string> = {};

	let form = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		state: '',
		zipCode: '',
		country: 'United States',
		cardNumber: '',
		cardName: '',
		expiryDate: '',
		cvv: ''
	};

	cart.subscribe(value => {
		items = value;
	});

	function validateForm() {
		errors = {};

		if (!form.firstName) errors.firstName = 'First name is required';
		if (!form.lastName) errors.lastName = 'Last name is required';
		if (!form.email || !isValidEmail(form.email)) errors.email = 'Valid email is required';
		if (!form.phone || !isValidPhone(form.phone)) errors.phone = 'Valid phone number is required';
		if (!form.address) errors.address = 'Address is required';
		if (!form.city) errors.city = 'City is required';
		if (!form.state) errors.state = 'State is required';
		if (!form.zipCode) errors.zipCode = 'ZIP code is required';
		if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length < 16) errors.cardNumber = 'Valid card number is required';
		if (!form.cardName) errors.cardName = 'Cardholder name is required';
		if (!form.expiryDate || !/\d{2}\/\d{2}/.test(form.expiryDate)) errors.expiryDate = 'Valid expiry date is required';
		if (!form.cvv || form.cvv.length < 3) errors.cvv = 'Valid CVV is required';

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit() {
		if (!validateForm()) return;
		if (items.length === 0) return;

		loading = true;

		// Simulate secure payment processing
		await new Promise(resolve => setTimeout(resolve, 1500));

		const orderId = generateId();
		cart.clear();
		loading = false;

		goto(`/checkout/success?order=${orderId}`);
	}
</script>

<svelte:head>
	<title>Checkout - ShopHub</title>
</svelte:head>

<div class="container">
	<div class="page-header">
		<h1>Secure Checkout</h1>
		<p>Complete your order with confidence</p>
	</div>

	{#if items.length > 0}
		<div class="checkout-layout">
			<form class="checkout-form" on:submit|preventDefault={handleSubmit}>
				<div class="section">
					<h3>Shipping Information</h3>
					<div class="grid">
						<div class="field">
							<label class="label">First Name</label>
							<input class={`input ${errors.firstName ? 'error' : ''}`} bind:value={form.firstName} />
							{#if errors.firstName}<span class="error-text">{errors.firstName}</span>{/if}
						</div>
						<div class="field">
							<label class="label">Last Name</label>
							<input class={`input ${errors.lastName ? 'error' : ''}`} bind:value={form.lastName} />
							{#if errors.lastName}<span class="error-text">{errors.lastName}</span>{/if}
						</div>
					</div>

					<div class="grid">
						<div class="field">
							<label class="label">Email</label>
							<input type="email" class={`input ${errors.email ? 'error' : ''}`} bind:value={form.email} />
							{#if errors.email}<span class="error-text">{errors.email}</span>{/if}
						</div>
						<div class="field">
							<label class="label">Phone</label>
							<input type="tel" class={`input ${errors.phone ? 'error' : ''}`} bind:value={form.phone} />
							{#if errors.phone}<span class="error-text">{errors.phone}</span>{/if}
						</div>
					</div>

					<div class="field">
						<label class="label">Address</label>
						<input class={`input ${errors.address ? 'error' : ''}`} bind:value={form.address} />
						{#if errors.address}<span class="error-text">{errors.address}</span>{/if}
					</div>

					<div class="grid">
						<div class="field">
							<label class="label">City</label>
							<input class={`input ${errors.city ? 'error' : ''}`} bind:value={form.city} />
							{#if errors.city}<span class="error-text">{errors.city}</span>{/if}
						</div>
						<div class="field">
							<label class="label">State</label>
							<input class={`input ${errors.state ? 'error' : ''}`} bind:value={form.state} />
							{#if errors.state}<span class="error-text">{errors.state}</span>{/if}
						</div>
						<div class="field">
							<label class="label">ZIP Code</label>
							<input class={`input ${errors.zipCode ? 'error' : ''}`} bind:value={form.zipCode} />
							{#if errors.zipCode}<span class="error-text">{errors.zipCode}</span>{/if}
						</div>
					</div>
				</div>

				<div class="section">
					<h3>Payment Details</h3>
					<p class="secure-note">
						🔒 Your payment is encrypted and securely processed
					</p>

					<div class="field">
						<label class="label">Card Number</label>
						<input class={`input ${errors.cardNumber ? 'error' : ''}`} bind:value={form.cardNumber} placeholder="1234 5678 9012 3456" />
						{#if errors.cardNumber}<span class="error-text">{errors.cardNumber}</span>{/if}
					</div>

					<div class="field">
						<label class="label">Cardholder Name</label>
						<input class={`input ${errors.cardName ? 'error' : ''}`} bind:value={form.cardName} />
						{#if errors.cardName}<span class="error-text">{errors.cardName}</span>{/if}
					</div>

					<div class="grid">
						<div class="field">
							<label class="label">Expiry Date</label>
							<input class={`input ${errors.expiryDate ? 'error' : ''}`} bind:value={form.expiryDate} placeholder="MM/YY" />
							{#if errors.expiryDate}<span class="error-text">{errors.expiryDate}</span>{/if}
						</div>
						<div class="field">
							<label class="label">CVV</label>
							<input type="password" class={`input ${errors.cvv ? 'error' : ''}`} bind:value={form.cvv} placeholder="123" />
							{#if errors.cvv}<span class="error-text">{errors.cvv}</span>{/if}
						</div>
					</div>
				</div>

				<button class="btn btn-primary btn-lg w-full" type="submit" disabled={loading}>
					{#if loading}
						Processing...
					{:else}
						Complete Order
					{/if}
				</button>
			</form>

			<CartSummary {items}>
				<div class="info">
					<p>Estimated delivery: 3-5 business days</p>
					<p>Free returns within 30 days</p>
				</div>
			</CartSummary>
		</div>
	{:else}
		<div class="empty-cart">
			<h3>Your cart is empty</h3>
			<p>Add items to proceed to checkout</p>
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

	.checkout-layout {
		display: grid;
		grid-template-columns: 1fr 320px;
		gap: 2rem;
	}

	.checkout-form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.section {
		background-color: var(--background);
		border-radius: var(--radius);
		padding: 1.5rem;
		box-shadow: var(--shadow);
		border: 1px solid var(--border);
	}

	.section h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.error-text {
		color: var(--danger);
		font-size: 0.75rem;
	}

	.secure-note {
		font-size: 0.875rem;
		color: var(--text-light);
		margin-bottom: 1rem;
	}

	.info {
		margin-top: 1rem;
		font-size: 0.875rem;
		color: var(--text-light);
	}

	.info p {
		margin-top: 0.5rem;
	}

	.empty-cart {
		text-align: center;
		padding: 4rem 2rem;
	}

	@media (max-width: 1024px) {
		.checkout-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
