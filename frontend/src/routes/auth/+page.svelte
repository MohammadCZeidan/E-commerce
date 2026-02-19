<script lang="ts">
	import { authApi } from '$lib/api';
	import { authStore } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	let mode: 'login' | 'register' = 'login';
	let name = '';
	let email = '';
	let password = '';
	let role: 'buyer' | 'seller' = 'buyer';
	let error = '';
	let loading = false;

	async function handleSubmit() {
		error = '';
		loading = true;

		try {
			if (mode === 'register') {
				const response = await authApi.register({ name, email, password, role });
				authStore.login(response.token, response.user);
			goto(response.user.role === 'shop_owner' || response.user.role === 'seller' ? '/seller/products' : '/');
			} else {
				const response = await authApi.login(email, password);
				authStore.login(response.token, response.user);
			goto(response.user.role === 'shop_owner' || response.user.role === 'seller' ? '/seller/products' : '/');
			}
		} catch (err: any) {
			error = err.message || 'An error occurred';
		} finally {
			loading = false;
		}
	}

	function toggleMode() {
		mode = mode === 'login' ? 'register' : 'login';
		error = '';
	}
</script>

<div class="auth-container">
	<div class="auth-card">
		<h1>{mode === 'login' ? 'Sign In' : 'Create Account'}</h1>
		<p class="subtitle">
			{mode === 'login' 
				? 'Welcome back! Sign in to continue' 
				: 'Join us and start shopping or selling'}
		</p>

		<form on:submit|preventDefault={handleSubmit}>
			{#if mode === 'register'}
				<div class="form-group">
					<label for="name">Full Name</label>
					<input
						type="text"
						id="name"
						bind:value={name}
						required
						placeholder="Enter your name"
					/>
				</div>
			{/if}

			<div class="form-group">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					placeholder="Enter your email"
				/>
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					required
					placeholder="Enter your password"
					minlength="6"
				/>
			</div>

			{#if mode === 'register'}
				<div class="form-group">
					<label>I want to</label>
					<div class="role-selector">
						<label class="role-option">
							<input type="radio" bind:group={role} value="buyer" />
							<div class="role-card">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<path d="M9 2L6 6H3L6 20h12l3-14h-3l-3-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								<span>Buy Products</span>
							</div>
						</label>
						<label class="role-option">
							<input type="radio" bind:group={role} value="seller" />
							<div class="role-card">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<rect x="2" y="7" width="20" height="14" rx="2" stroke-width="2"/>
									<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke-width="2"/>
								</svg>
								<span>Sell Products</span>
							</div>
						</label>
					</div>
				</div>
			{/if}

			{#if error}
				<div class="error-message">{error}</div>
			{/if}

			<button type="submit" class="btn-primary" disabled={loading}>
				{loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
			</button>
		</form>

		<div class="auth-footer">
			{#if mode === 'login'}
				<p>Don't have an account? <button type="button" on:click={toggleMode}>Sign up</button></p>
			{:else}
				<p>Already have an account? <button type="button" on:click={toggleMode}>Sign in</button></p>
			{/if}
		</div>
	</div>
</div>

<style>
	.auth-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
	}

	.auth-card {
		background: white;
		border-radius: 12px;
		padding: 2.5rem;
		width: 100%;
		max-width: 480px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}

	h1 {
		font-size: 1.875rem;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 0.5rem;
		text-align: center;
	}

	.subtitle {
		text-align: center;
		color: var(--text-light);
		margin-bottom: 2rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		font-weight: 500;
		margin-bottom: 0.5rem;
		color: var(--text);
	}

	input[type="text"],
	input[type="email"],
	input[type="password"] {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 2px solid var(--border);
		border-radius: 8px;
		font-size: 1rem;
		transition: all 0.2s;
	}

	input:focus {
		outline: none;
		border-color: var(--primary);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
	}

	.role-selector {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 0.75rem;
	}

	.role-option input[type="radio"] {
		display: none;
	}

	.role-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1.25rem;
		border: 2px solid var(--border);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
		text-align: center;
	}

	.role-option input[type="radio"]:checked + .role-card {
		border-color: var(--primary);
		background: rgba(99, 102, 241, 0.05);
	}

	.role-card:hover {
		border-color: var(--primary);
	}

	.role-card svg {
		color: var(--primary);
	}

	.role-card span {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text);
	}

	.error-message {
		padding: 0.75rem 1rem;
		background: #fee;
		border: 1px solid #fcc;
		border-radius: 8px;
		color: #c00;
		margin-bottom: 1rem;
		font-size: 0.875rem;
	}

	.btn-primary {
		width: 100%;
		padding: 0.875rem;
		background: var(--primary);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-primary:hover:not(:disabled) {
		background: var(--primary-dark);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
	}

	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.auth-footer {
		margin-top: 1.5rem;
		text-align: center;
	}

	.auth-footer p {
		color: var(--text-light);
	}

	.auth-footer button {
		background: none;
		border: none;
		color: var(--primary);
		font-weight: 600;
		cursor: pointer;
		text-decoration: underline;
	}

	.auth-footer button:hover {
		color: var(--primary-dark);
	}

	@media (max-width: 640px) {
		.auth-card {
			padding: 2rem;
		}

		h1 {
			font-size: 1.5rem;
		}

		.role-selector {
			grid-template-columns: 1fr;
		}
	}
</style>
