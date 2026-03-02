<?php

declare(strict_types=1);

namespace App\Http\Requests\Product;

use App\Validation\ProductValidation;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ProductValidation::storeRules();
    }
}
