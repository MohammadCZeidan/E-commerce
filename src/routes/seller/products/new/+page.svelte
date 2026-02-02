<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import { productApi } from '$lib/api';

	let user: any;
	let token: string | null = null;
	let loading = false;
	let error = '';

	// Form fields
	let name = '';
	let description = '';
	let price = '';
	let category = '';
	let stock = '';
	let tags = '';
	let selectedFiles: FileList | null = null;
	let previewUrls: string[] = [];

	authStore.subscribe(state => {
		user = state.user;
		token = state.token;
		
		if (!state.isAuthenticated) {
			goto('/auth');
		} else if (user?.role !== 'shop_owner' && user?.role !== 'admin') {
			goto('/');
		}
	});

	function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		selectedFiles = input.files;
		
		// Clear previous previews
		previewUrls.forEach(url => URL.revokeObjectURL(url));
		previewUrls = [];

		if (selectedFiles) {
			for (let i = 0; i < selectedFiles.length; i++) {
				const file = selectedFiles[i];
				if (file.type.startsWith('image/')) {
					previewUrls.push(URL.createObjectURL(file));
				}
			}
			previewUrls = previewUrls; // Trigger reactivity
		}
	}

	function removeImage(index: number) {
		if (!selectedFiles) return;
		
		const dt = new DataTransfer();
		for (let i = 0; i < selectedFiles.length; i++) {
			if (i !== index) {
				dt.items.add(selectedFiles[i]);
			}
		}
		
		selectedFiles = dt.files;
		URL.revokeObjectURL(previewUrls[index]);
		previewUrls.splice(index, 1);
		previewUrls = previewUrls;
	}

	async function handleSubmit() {
		if (!token) return;

		error = '';
		loading = true;

		try {
			const formData = new FormData();
			formData.append('name', name);
			formData.append('description', description);
			formData.append('price', price);
			formData.append('category', category);
			formData.append('stock', stock || '0');

			if (tags) {
				const tagArray = tags.split(',').map(t => t.trim()).filter(t => t);
				tagArray.forEach((tag, i) => {
					formData.append(`tags[${i}]`, tag);
				});
			}

			if (selectedFiles) {
				for (let i = 0; i < selectedFiles.length; i++) {
					formData.append('images[]', selectedFiles[i]);
				}
			}

			await productApi.create(token, formData);
			goto('/seller/products');
		} catch (err: any) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		return () => {
			// Cleanup preview URLs
			previewUrls.forEach(url => URL.revokeObjectURL(url));
		};
	});
</script>

<div class="page-container">
	<div class="container">
		<div class="page-header">
			<a href="/seller/products" class="back-link">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				Back to Products
			</a>
			<h1>Add New Product</h1>
		</div>

		<form on:submit|preventDefault={handleSubmit} class="product-form">
			{#if error}
				<div class="error-message">{error}</div>
			{/if}

			<div class="form-section">
				<h2>Basic Information</h2>
				
				<div class="form-group">
					<label for="name">Product Name *</label>
					<input
						type="text"
						id="name"
						bind:value={name}
						required
						placeholder="e.g., Wireless Headphones"
					/>
				</div>

				<div class="form-group">
					<label for="description">Description *</label>
					<textarea
						id="description"
						bind:value={description}
						required
						rows="4"
						placeholder="Describe your product..."
					></textarea>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label for="price">Price (USD) *</label>
						<input
							type="number"
							id="price"
							bind:value={price}
							required
							step="0.01"
							min="0"
							placeholder="0.00"
						/>
					</div>

					<div class="form-group">
						<label for="category">Category *</label>
						<input
							type="text"
							id="category"
							bind:value={category}
							required
							placeholder="e.g., Electronics"
						/>
					</div>

					<div class="form-group">
						<label for="stock">Stock Quantity *</label>
						<input
							type="number"
							id="stock"
							bind:value={stock}
							min="0"
							placeholder="0"
						/>
					</div>
				</div>

				<div class="form-group">
					<label for="tags">Tags (comma-separated)</label>
					<input
						type="text"
						id="tags"
						bind:value={tags}
						placeholder="e.g., wireless, bluetooth, audio"
					/>
				</div>
			</div>

			<div class="form-section">
				<h2>Product Images</h2>
				<p class="section-description">Upload multiple photos of your product (max 5MB each)</p>

				<div class="file-upload">
					<input
						type="file"
						id="images"
						accept="image/*"
						multiple
						on:change={handleFileSelect}
					/>
					<label for="images" class="file-upload-label">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
							<circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
							<path d="m21 15-5-5L5 21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
						<span>Click to upload images</span>
						<span class="file-hint">PNG, JPG up to 5MB</span>
					</label>
				</div>

				{#if previewUrls.length > 0}
					<div class="image-previews">
						{#each previewUrls as url, i}
							<div class="preview-item">
								<img src={url} alt="Preview {i + 1}" />
								<button
									type="button"
									class="remove-btn"
									on:click={() => removeImage(i)}
								>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
										<line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round"/>
										<line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round"/>
									</svg>
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="form-actions">
				<a href="/seller/products" class="btn-secondary">Cancel</a>
				<button type="submit" class="btn-primary" disabled={loading}>
					{loading ? 'Creating...' : 'Create Product'}
				</button>
			</div>
		</form>
	</div>
</div>

<style>
	.page-container {
		min-height: 100vh;
		background: var(--background);
		padding: 2rem 0;
	}

	.page-header {
		margin-bottom: 2rem;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--text-light);
		text-decoration: none;
		margin-bottom: 1rem;
		transition: color 0.2s;
	}

	.back-link:hover {
		color: var(--primary);
	}

	h1 {
		font-size: 2rem;
		font-weight: 700;
		color: var(--text);
	}

	.product-form {
		background: white;
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.form-section {
		margin-bottom: 2.5rem;
	}

	.form-section:last-of-type {
		margin-bottom: 2rem;
	}

	.form-section h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text);
		margin-bottom: 0.5rem;
	}

	.section-description {
		color: var(--text-light);
		font-size: 0.875rem;
		margin-bottom: 1rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	label {
		display: block;
		font-weight: 500;
		margin-bottom: 0.5rem;
		color: var(--text);
		font-size: 0.875rem;
	}

	input[type="text"],
	input[type="number"],
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid var(--border);
		border-radius: 8px;
		font-size: 1rem;
		transition: all 0.2s;
		font-family: inherit;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--primary);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
	}

	.file-upload {
		margin-bottom: 1.5rem;
	}

	.file-upload input[type="file"] {
		display: none;
	}

	.file-upload-label {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 2rem;
		border: 2px dashed var(--border);
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.2s;
		text-align: center;
	}

	.file-upload-label:hover {
		border-color: var(--primary);
		background: rgba(99, 102, 241, 0.02);
	}

	.file-upload-label svg {
		color: var(--text-light);
	}

	.file-upload-label span:first-of-type {
		font-weight: 500;
		color: var(--text);
	}

	.file-hint {
		font-size: 0.875rem;
		color: var(--text-light);
	}

	.image-previews {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 1rem;
	}

	.preview-item {
		position: relative;
		aspect-ratio: 1;
		border-radius: 8px;
		overflow: hidden;
		border: 2px solid var(--border);
	}

	.preview-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.remove-btn {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background: rgba(0, 0, 0, 0.7);
		color: white;
		border: none;
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s;
	}

	.remove-btn:hover {
		background: rgba(220, 38, 38, 0.9);
	}

	.error-message {
		padding: 1rem;
		background: #fee;
		border: 1px solid #fcc;
		border-radius: 8px;
		color: #c00;
		margin-bottom: 1.5rem;
	}

	.form-actions {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border);
	}

	.btn-primary,
	.btn-secondary {
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		text-decoration: none;
		border: none;
		font-size: 1rem;
	}

	.btn-primary {
		background: var(--primary);
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		background: var(--primary-dark);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
	}

	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn-secondary {
		background: var(--background);
		color: var(--text);
		border: 1px solid var(--border);
		display: inline-block;
	}

	.btn-secondary:hover {
		background: var(--border);
	}

	@media (max-width: 768px) {
		.product-form {
			padding: 1.5rem;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.image-previews {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		}

		.form-actions {
			flex-direction: column-reverse;
		}

		.btn-primary,
		.btn-secondary {
			width: 100%;
		}
	}
</style>
