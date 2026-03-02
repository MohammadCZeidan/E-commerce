<script lang="ts">
	import { authStore } from '$lib/stores/auth';

	let auth = $derived($authStore);

	async function handleLogout() {
		await authStore.logout();
	}
</script>

<section class="section">
	<div class="container account-page">
		<div class="account-header">
			<div>
				<p class="eyebrow">Account</p>
				<h1>Your Lumen Lane profile</h1>
				<p class="muted">Manage your details, orders, and saved picks.</p>
			</div>
			<a class="btn btn-ghost" href="/products">Shop products</a>
		</div>

		{#if auth.isAuthenticated && auth.user}
			<div class="account-grid">
				<div class="card">
					<h2>Profile</h2>
					<div class="profile-row">
						<span>Name</span>
						<strong>{auth.user.name}</strong>
					</div>
					<div class="profile-row">
						<span>Email</span>
						<strong>{auth.user.email}</strong>
					</div>
					<div class="profile-row">
						<span>Role</span>
						<strong>{auth.user.role}</strong>
					</div>
					<button class="btn btn-secondary" onclick={handleLogout}>Log out</button>
				</div>

				<div class="card">
					<h2>Recent orders</h2>
					<div class="order-item">
						<div>
							<strong>Order #LL-1023</strong>
							<p class="muted">3 items - Processing</p>
						</div>
						<span>$212.00</span>
					</div>
					<div class="order-item">
						<div>
							<strong>Order #LL-0988</strong>
							<p class="muted">2 items - Delivered</p>
						</div>
						<span>$128.00</span>
					</div>
					<p class="muted">Order history sync is coming next.</p>
				</div>
			</div>
		{:else}
			<div class="card empty-state">
				<h2>Sign in to view your account</h2>
				<p class="muted">Log in to track orders and manage your profile.</p>
				<a class="btn btn-primary" href="/auth">Go to login</a>
			</div>
		{/if}
	</div>
</section>

<style>
	.account-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.account-header h1 {
		font-family: 'Fraunces', serif;
		font-size: clamp(2rem, 3vw, 2.75rem);
		margin: 0.5rem 0 0.75rem;
	}

	.account-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 2rem;
	}

	.card h2 {
		margin-bottom: 1rem;
	}

	.profile-row {
		display: flex;
		justify-content: space-between;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
	}

	.profile-row span {
		color: var(--text-muted);
	}

	.order-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
	}

	.empty-state {
		text-align: center;
	}

	@media (max-width: 800px) {
		.account-header {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
