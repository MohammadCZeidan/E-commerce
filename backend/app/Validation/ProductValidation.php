<?php

declare(strict_types=1);

namespace App\Validation;

use App\Models\Product;
use Illuminate\Validation\Rule;

class ProductValidation
{
    public static function storeRules(): array
    {
        return [
            'product_id' => ['nullable', 'string', 'max:255', 'unique:products,product_id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'category' => ['required', 'string', 'max:255'],
            'stock' => ['nullable', 'integer', 'min:0'],
            'rating' => ['nullable', 'numeric', 'min:0', 'max:5'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string'],
            'image' => ['nullable', 'string', 'max:255'],
            'images' => ['nullable', 'array'],
            'images.*' => ['file', 'image', 'max:5120'],
        ];
    }

    public static function updateRules(Product $product): array
    {
        return [
            'product_id' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
                Rule::unique('products', 'product_id')->ignore($product->id),
            ],
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'category' => ['sometimes', 'string', 'max:255'],
            'stock' => ['sometimes', 'integer', 'min:0'],
            'rating' => ['sometimes', 'numeric', 'min:0', 'max:5'],
            'tags' => ['sometimes', 'array'],
            'tags.*' => ['string'],
            'image' => ['nullable', 'string', 'max:255'],
            'images' => ['nullable', 'array'],
            'images.*' => ['file', 'image', 'max:5120'],
            'delete_image_ids' => ['nullable', 'array'],
            'delete_image_ids.*' => ['integer'],
        ];
    }
}
