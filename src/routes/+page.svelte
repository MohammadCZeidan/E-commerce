<script lang="ts">
	import { products } from '$lib/data/products';
	import ProductCard from '$lib/components/ProductCard.svelte';

	// Get featured products (first 4 products)
	const featuredProducts = products.slice(0, 4);

	const categories = [
		{ name: 'Electronics', icon: '📱', href: '/auth' },
		{ name: 'Footwear', icon: '👟', href: '/auth' },
		{ name: 'Accessories', icon: '🎒', href: '/auth' },
		{ name: 'Home', icon: '🏠', href: '/auth' }
	];
</script>

<svelte:head>
	<title>ShopHub - Your Premium Online Store</title>
	<meta name="description" content="Discover premium quality products at amazing prices" />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="container hero-content">
		<h1 class="hero-title">Welcome to ShopHub</h1>
		<p class="hero-subtitle">Discover Premium Quality Products at Amazing Prices</p>
		<div class="hero-buttons">
			<a href="/auth" class="btn btn-primary">Shop Now</a>
			<a href="/auth" class="btn btn-secondary">Browse Collections</a>
		</div>
	</div>
</section>

<!-- Categories Section -->
<section class="categories-section">
	<div class="container">
		<h2 class="section-title">Shop by Category</h2>
		<div class="categories-grid">
			{#each categories as category}
				<a href={category.href} class="category-card">
					<div class="category-icon">{category.icon}</div>
					<h3>{category.name}</h3>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Featured Products Section -->
<section class="featured-section">
	<div class="container">
		<h2 class="section-title">Featured Products</h2>
		<div class="products-grid">
			{#each featuredProducts as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
		<div class="view-all">
			<a href="/auth" class="btn btn-outline">View All Products</a>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="features-section">
	<div class="container">
		<div class="features-grid">
			<div class="feature">
				<div class="feature-icon">🚚</div>
				<h3>Free Shipping</h3>
				<p>On orders over $50</p>
			</div>
			<div class="feature">
				<div class="feature-icon">🔒</div>
				<h3>Secure Payment</h3>
				<p>100% secure transactions</p>
			</div>
			<div class="feature">
				<div class="feature-icon">↩️</div>
				<h3>Easy Returns</h3>
				<p>30-day return policy</p>
			</div>
			<div class="feature">
				<div class="feature-icon">⭐</div>
				<h3>Quality Products</h3>
				<p>Carefully curated items</p>
			</div>
		</div>
	</div>
</section>

<style>
	/* Hero Section */
	.hero {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 6rem 0;
		text-align: center;
		margin-bottom: 4rem;
	}

	.hero-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.hero-title {
		font-size: 3.5rem;
		font-weight: 800;
		margin-bottom: 1rem;
		line-height: 1.2;
	}

	.hero-subtitle {
		font-size: 1.5rem;
		margin-bottom: 2rem;
		opacity: 0.95;
	}

	.hero-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		padding: 0.875rem 2rem;
		font-size: 1rem;
		font-weight: 600;
		border-radius: 8px;
		text-decoration: none;
		transition: all 0.3s ease;
		display: inline-block;
	}

	.btn-primary {
		background-color: white;
		color: #667eea;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}

	.btn-secondary {
		background-color: transparent;
		color: white;
		border: 2px solid white;
	}

	.btn-secondary:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.btn-outline {
		background-color: transparent;
		color: var(--primary);
		border: 2px solid var(--primary);
	}

	.btn-outline:hover {
		background-color: var(--primary);
		color: white;
	}

	/* Sections */
	.categories-section,
	.featured-section,
	.features-section {
		padding: 3rem 0;
	}

	.section-title {
		font-size: 2rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 2.5rem;
		color: var(--text);
	}

	/* Categories Grid */
	.categories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.category-card {
		background-color: var(--surface);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 2rem;
		text-align: center;
		text-decoration: none;
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.category-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow-lg);
		border-color: var(--primary);
	}

	.category-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.category-card h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text);
	}

	/* Products Grid */
	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.view-all {
		text-align: center;
		margin-top: 2rem;
	}

	/* Features Grid */
	.features-section {
		background-color: var(--surface);
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 2rem;
	}

	.feature {
		text-align: center;
	}

	.feature-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.feature h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: var(--text);
	}

	.feature p {
		color: var(--text-light);
		font-size: 0.875rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero {
			padding: 4rem 0;
		}

		.hero-title {
			font-size: 2.5rem;
		}

		.hero-subtitle {
			font-size: 1.125rem;
		}

		.section-title {
			font-size: 1.5rem;
		}

		.categories-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}

		.products-grid {
			grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
			gap: 1rem;
		}

		.features-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.hero-title {
			font-size: 2rem;
		}

		.categories-grid {
			grid-template-columns: 1fr;
		}

		.features-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
