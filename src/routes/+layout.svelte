<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
</script>

<div class="app">
	<Header />
	<main class="main">
		<slot />
	</main>
	<footer class="footer">
		<div class="container">
			<p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
		</div>
	</footer>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.main {
		flex: 1;
		padding: 2rem 0;
	}

	.footer {
		background-color: var(--surface);
		border-top: 1px solid var(--border);
		padding: 2rem 0;
		margin-top: 4rem;
	}

	.footer p {
		text-align: center;
		color: var(--text-light);
		font-size: 0.875rem;
	}
</style>
