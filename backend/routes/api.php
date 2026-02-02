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
    Route::post('/products', [ProductController::class, 'store'])->middleware('role:admin,shop_owner');
    Route::put('/products/{product}', [ProductController::class, 'update'])->middleware('role:admin,shop_owner');
    Route::patch('/products/{product}', [ProductController::class, 'update'])->middleware('role:admin,shop_owner');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->middleware('role:admin,shop_owner');
});
