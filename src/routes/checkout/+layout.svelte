<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';

	let isAuthenticated = false;

	authStore.subscribe(state => {
		isAuthenticated = state.isAuthenticated;
	});

	onMount(() => {
		if (!isAuthenticated) {
			goto('/auth');
		}
	});
</script>

{#if isAuthenticated}
	<slot />
{:else}
	<div class="loading-container">
		<p>Redirecting to login...</p>
	</div>
{/if}

<style>
	.loading-container {
		min-height: 50vh;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-light);
	}
</style>
