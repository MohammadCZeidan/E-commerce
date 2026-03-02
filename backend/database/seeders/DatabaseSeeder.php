<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ]);

        $seller = User::factory()->create([
            'name' => 'Seller One',
            'email' => 'seller@example.com',
            'role' => 'seller',
        ]);

        $shopOwner = User::factory()->create([
            'name' => 'Shop Owner',
            'email' => 'owner@example.com',
            'role' => 'shop_owner',
        ]);

        $buyer = User::factory()->create([
            'name' => 'Buyer One',
            'email' => 'buyer@example.com',
            'role' => 'buyer',
        ]);

        $products = collect([
            [
                'product_id' => 'SKU-HEADPHONE',
                'name' => 'Studio Headphones',
                'description' => 'Closed-back headphones with deep bass and crisp detail.',
                'price' => 149.99,
                'category' => 'Audio',
                'stock' => 18,
                'rating' => 4.6,
                'tags' => ['audio', 'headphones', 'studio'],
                'user_id' => $seller->id,
            ],
            [
                'product_id' => 'SKU-LAMP',
                'name' => 'Minimal Desk Lamp',
                'description' => 'Warm LED lamp with adjustable neck and touch dimmer.',
                'price' => 59.00,
                'category' => 'Home',
                'stock' => 24,
                'rating' => 4.2,
                'tags' => ['home', 'lighting', 'desk'],
                'user_id' => $seller->id,
            ],
            [
                'product_id' => 'SKU-BACKPACK',
                'name' => 'Urban Backpack',
                'description' => 'Water-resistant backpack with laptop sleeve.',
                'price' => 89.50,
                'category' => 'Accessories',
                'stock' => 32,
                'rating' => 4.4,
                'tags' => ['bags', 'travel', 'lifestyle'],
                'user_id' => $shopOwner->id,
            ],
            [
                'product_id' => 'SKU-COFFEE',
                'name' => 'Single Origin Coffee',
                'description' => 'Medium roast beans with notes of chocolate and citrus.',
                'price' => 18.75,
                'category' => 'Grocery',
                'stock' => 60,
                'rating' => 4.8,
                'tags' => ['coffee', 'grocery'],
                'user_id' => $shopOwner->id,
            ],
        ])->map(fn ($data) => Product::create($data));

        for ($i = 0; $i < 6; $i++) {
            $products->push(Product::create([
                'product_id' => 'SKU-' . Str::upper(Str::random(6)),
                'name' => fake()->words(2, true),
                'description' => fake()->sentence(12),
                'price' => fake()->randomFloat(2, 12, 220),
                'category' => fake()->randomElement(['Audio', 'Home', 'Accessories', 'Grocery', 'Fitness']),
                'stock' => fake()->numberBetween(3, 45),
                'rating' => fake()->randomFloat(1, 3.5, 5),
                'tags' => fake()->randomElements(['new', 'popular', 'eco', 'premium', 'bundle'], 2),
                'user_id' => fake()->randomElement([$seller->id, $shopOwner->id]),
            ]));
        }

        $statuses = ['pending', 'fulfilled', 'shipped'];

        for ($i = 0; $i < 6; $i++) {
            $createdAt = now()->subDays(fake()->numberBetween(0, 14));
            $order = Order::create([
                'order_number' => 'ORD-' . Str::upper(Str::random(8)),
                'buyer_id' => $buyer->id,
                'status' => $statuses[array_rand($statuses)],
                'subtotal' => 0,
                'tax' => 0,
                'shipping' => 0,
                'total' => 0,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);

            $items = $products->random(fake()->numberBetween(1, 3));
            $items = $items instanceof \Illuminate\Support\Collection ? $items : collect([$items]);

            $subtotal = 0;
            $items->each(function ($product) use ($order, $createdAt, &$subtotal) {
                $quantity = fake()->numberBetween(1, 3);
                $lineTotal = $quantity * $product->price;
                $subtotal += $lineTotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'seller_id' => $product->user_id,
                    'quantity' => $quantity,
                    'unit_price' => $product->price,
                    'total' => $lineTotal,
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]);
            });

            $order->update([
                'subtotal' => $subtotal,
                'total' => $subtotal,
            ]);
        }
    }
}
