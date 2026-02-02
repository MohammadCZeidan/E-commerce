<script lang="ts">
	import { filters } from '$lib/stores/filters';
	import { categories } from '$lib/data/products';

	let searchInput = '';
	let selectedCategory = '';
	let sortBy = '';

	function handleSearchInput(e: Event) {
		const target = e.target as HTMLInputElement;
		searchInput = target.value;
		updateFilters();
	}

	function handleCategoryChange(category: string) {
		selectedCategory = category === selectedCategory ? '' : category;
		updateFilters();
	}

	function handleSortChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		sortBy = target.value;
		updateFilters();
	}

	function updateFilters() {
		filters.update(f => ({
			...f,
			search: searchInput,
			category: selectedCategory || undefined,
			sortBy: sortBy as any || undefined
		}));
	}

	function clearFilters() {
		searchInput = '';
		selectedCategory = '';
		sortBy = '';
		filters.set({
			search: '',
			category: undefined,
			minPrice: undefined,
			maxPrice: undefined,
			sortBy: undefined
		});
	}
</script>

<div class="filters">
	<div class="search-section">
		<div class="search-box">
			<svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
				<path d="M8 16a8 8 0 100-16 8 8 0 000 16zM18 18l-4.35-4.35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			<input
				type="text"
				class="input search-input"
				placeholder="Search products..."
				value={searchInput}
				on:input={handleSearchInput}
			/>
		</div>
	</div>

	<div class="filter-section">
		<div class="categories">
			<h4>Categories</h4>
			<div class="category-buttons">
				{#each categories as category}
					<button
						class="category-btn"
						class:active={selectedCategory === category}
						on:click={() => handleCategoryChange(category)}
					>
						{category}
					</button>
				{/each}
			</div>
		</div>

		<div class="sort-section">
			<label for="sort" class="label">Sort by</label>
			<select id="sort" class="input" value={sortBy} on:change={handleSortChange}>
				<option value="">Default</option>
				<option value="price-asc">Price: Low to High</option>
				<option value="price-desc">Price: High to Low</option>
				<option value="name-asc">Name: A to Z</option>
				<option value="name-desc">Name: Z to A</option>
				<option value="rating">Highest Rated</option>
			</select>
		</div>

		{#if searchInput || selectedCategory || sortBy}
			<button class="btn btn-secondary btn-sm" on:click={clearFilters}>
				Clear Filters
			</button>
		{/if}
	</div>
</div>

<style>
	.filters {
		background-color: var(--background);
		border-radius: var(--radius);
		padding: 1.5rem;
		box-shadow: var(--shadow);
		border: 1px solid var(--border);
		margin-bottom: 2rem;
	}

	.search-section {
		margin-bottom: 1.5rem;
	}

	.search-box {
		position: relative;
		max-width: 500px;
	}

	.search-icon {
		position: absolute;
		left: 0.875rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--text-light);
		pointer-events: none;
	}

	.search-input {
		padding-left: 2.75rem;
	}

	.filter-section {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		align-items: flex-end;
	}

	.categories {
		flex: 1;
		min-width: 250px;
	}

	.categories h4 {
		font-size: 0.875rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		color: var(--text);
	}

	.category-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.category-btn {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		border: 1px solid var(--border);
		background-color: var(--background);
		color: var(--text);
		border-radius: 9999px;
		cursor: pointer;
		transition: var(--transition);
	}

	.category-btn:hover {
		border-color: var(--primary);
		color: var(--primary);
	}

	.category-btn.active {
		background-color: var(--primary);
		border-color: var(--primary);
		color: white;
	}

	.sort-section {
		min-width: 200px;
	}

	@media (max-width: 768px) {
		.filter-section {
			flex-direction: column;
			align-items: stretch;
		}

		.categories,
		.sort-section {
			width: 100%;
		}
	}
</style>
