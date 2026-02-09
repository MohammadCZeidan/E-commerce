<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    Route::middleware('auth:api')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::middleware('auth:api')->group(function () {
    Route::get('/seller/products', [ProductController::class, 'mine'])->middleware('role:admin,shop_owner,seller');
    Route::post('/products', [ProductController::class, 'store'])->middleware('role:admin,shop_owner,seller');
    Route::put('/products/{product}', [ProductController::class, 'update'])->middleware('role:admin,shop_owner,seller');
    Route::patch('/products/{product}', [ProductController::class, 'update'])->middleware('role:admin,shop_owner,seller');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->middleware('role:admin,shop_owner,seller');
});
