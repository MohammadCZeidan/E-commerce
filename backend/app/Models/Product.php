<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProductImage;
use App\Models\User;

class Product extends Model
{
    protected $fillable = [
        'product_id',
        'user_id',
        'name',
        'description',
        'price',
        'image',
        'category',
        'stock',
        'rating',
        'tags',
    ];

    protected $casts = [
        'tags' => 'array',
        'price' => 'decimal:2',
        'rating' => 'decimal:1',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
