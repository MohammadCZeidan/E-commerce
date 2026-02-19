<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SellerDashboardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SellerDashboardController extends Controller
{
    public function __construct(private readonly SellerDashboardService $sellerDashboardService)
    {
    }

    public function orders(Request $request): JsonResponse
    {
        return response()->json(
            $this->sellerDashboardService->orders($request->user())
        );
    }

    public function analytics(Request $request): JsonResponse
    {
        return response()->json(
            $this->sellerDashboardService->analytics($request->user())
        );
    }
}
