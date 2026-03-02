<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(private readonly ProductService $productService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            return response()->json($this->productService->index());
        } catch (\Throwable $e) {
            // Log and surface error for development debugging
            \Log::error('ProductController@index error: ' . $e->getMessage());
            return response()->json([
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    /**
     * Display a listing of the authenticated seller's products.
     */
    public function mine(Request $request): JsonResponse
    {
        try {
            return response()->json($this->productService->mine($request->user()));
        } catch (\Throwable $e) {
            \Log::error('ProductController@mine error: ' . $e->getMessage());
            return response()->json([
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = $this->productService->store(
            $request->user(),
            $request->validated(),
            $request->file('images', [])
        );

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): JsonResponse
    {
        return response()->json($this->productService->show($product));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product): JsonResponse
    {
        try {
            $product = $this->productService->update(
                $request->user(),
                $product,
                $request->validated(),
                $request->file('images', [])
            );
        } catch (AuthorizationException) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): JsonResponse
    {
        try {
            $this->productService->destroy(request()->user(), $product);
        } catch (AuthorizationException) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return response()->json(['message' => 'Deleted']);
    }
}
