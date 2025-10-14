<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\WatchlistController;

// Public rute
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected rute
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return response()->json($request->user(), 200);
    });

    // CRUD za filmove i žanrove
    Route::apiResource('movies', MovieController::class);
    Route::apiResource('genres', GenreController::class);
    Route::apiResource('watchlists', WatchlistController::class);

    // Reviews rute sa movieId
    Route::get('/movies/{movie}/reviews', [ReviewController::class, 'index']);
    Route::post('/movies/{movie}/reviews', [ReviewController::class, 'store']);
    Route::get('/reviews/{review}', [ReviewController::class, 'show']);
    Route::put('/reviews/{review}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);
});
