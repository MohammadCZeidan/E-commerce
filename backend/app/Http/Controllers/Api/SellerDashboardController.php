<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SellerDashboardController extends Controller
{
    public function orders(Request $request)
    {
        $user = $request->user();

        $ordersQuery = OrderItem::query()
            ->select(
                'orders.id',
                'orders.order_number',
                'orders.status',
                'orders.created_at',
                DB::raw('SUM(order_items.total) as total'),
                DB::raw('SUM(order_items.quantity) as items_count'),
                'buyers.name as buyer_name'
            )
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->leftJoin('users as buyers', 'buyers.id', '=', 'orders.buyer_id')
            ->groupBy('orders.id', 'orders.order_number', 'orders.status', 'orders.created_at', 'buyers.name')
            ->orderByDesc('orders.created_at');

        if ($user->role !== 'admin') {
            $ordersQuery->where('order_items.seller_id', $user->id);
        }

        $orders = $ordersQuery->get();

        $stats = [
            'total_orders' => $orders->count(),
            'pending' => $orders->where('status', 'pending')->count(),
            'fulfilled' => $orders->where('status', 'fulfilled')->count(),
            'revenue' => (float) $orders->sum('total'),
        ];

        return response()->json([
            'data' => $orders,
            'stats' => $stats,
        ]);
    }

    public function analytics(Request $request)
    {
        $user = $request->user();

        $baseQuery = Product::query();
        if ($user->role !== 'admin') {
            $baseQuery->where('user_id', $user->id);
        }

        $totalProducts = (clone $baseQuery)->count();
        $totalStock = (clone $baseQuery)->sum('stock');
        $totalValue = (clone $baseQuery)->select(DB::raw('SUM(price * stock) as total_value'))->value('total_value') ?? 0;
        $avgPrice = (clone $baseQuery)->avg('price') ?? 0;
        $lowStock = (clone $baseQuery)->where('stock', '<', 5)->count();

        $categories = (clone $baseQuery)
            ->select('category', DB::raw('COUNT(*) as count'))
            ->groupBy('category')
            ->orderByDesc('count')
            ->limit(8)
            ->get();

        $recentProducts = (clone $baseQuery)
            ->latest()
            ->limit(5)
            ->get(['id', 'name', 'price', 'stock', 'category', 'image', 'created_at']);

        return response()->json([
            'summary' => [
                'total_products' => $totalProducts,
                'total_stock' => $totalStock,
                'total_value' => (float) $totalValue,
                'avg_price' => (float) $avgPrice,
                'low_stock' => $lowStock,
            ],
            'categories' => $categories,
            'recent_products' => $recentProducts,
        ]);
    }
}
