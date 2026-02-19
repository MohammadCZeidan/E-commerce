<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    public function index(int $perPage = 12): LengthAwarePaginator
    {
        return Product::with(['images', 'owner'])->latest()->paginate($perPage);
    }

    public function mine(User $user, int $perPage = 12): LengthAwarePaginator
    {
        $query = Product::with(['images', 'owner'])->latest();
        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        return $query->paginate($perPage);
    }

    public function show(Product $product): Product
    {
        return $product->load(['images', 'owner']);
    }

    public function store(User $user, array $data, array $imageFiles = []): Product
    {
        $product = Product::create([
            'product_id' => $data['product_id'] ?? null,
            'user_id' => $user->id,
            'name' => $data['name'],
            'description' => $data['description'],
            'price' => $data['price'],
            'category' => $data['category'],
            'stock' => $data['stock'] ?? 0,
            'rating' => $data['rating'] ?? 0,
            'tags' => $data['tags'] ?? [],
            'image' => $data['image'] ?? null,
        ]);

        $this->storeImages($product, $imageFiles);

        return $product->load(['images', 'owner']);
    }

    public function update(User $user, Product $product, array $data, array $imageFiles = []): Product
    {
        if ($user->role !== 'admin' && $product->user_id !== $user->id) {
            throw new AuthorizationException('Forbidden');
        }

        $product->fill($data);
        $product->save();

        if (!empty($data['delete_image_ids'])) {
            $imagesToDelete = $product->images()->whereIn('id', $data['delete_image_ids'])->get();
            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image->path);
                $image->delete();
            }
        }

        $this->storeImages($product, $imageFiles);

        return $product->load(['images', 'owner']);
    }

    public function destroy(User $user, Product $product): void
    {
        if ($user->role !== 'admin' && $product->user_id !== $user->id) {
            throw new AuthorizationException('Forbidden');
        }

        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->path);
            $image->delete();
        }

        $product->delete();
    }

    private function storeImages(Product $product, array $imageFiles): void
    {
        if (empty($imageFiles)) {
            return;
        }

        foreach ($imageFiles as $file) {
            $path = $file->store('products', 'public');
            ProductImage::create([
                'product_id' => $product->id,
                'path' => $path,
            ]);
        }
    }
}
