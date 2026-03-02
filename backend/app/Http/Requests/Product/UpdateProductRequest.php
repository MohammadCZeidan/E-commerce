<?php

declare(strict_types=1);

namespace App\Http\Requests\Product;

use App\Models\Product;
use App\Validation\ProductValidation;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $product = $this->route('product');
        if (!$product instanceof Product) {
            $product = Product::findOrFail($product);
        }

        return ProductValidation::updateRules($product);
    }
}
