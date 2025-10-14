<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Public rute
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected rute (za korisnike koji šalju Bearer token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Ruta koja vraća trenutno ulogovanog korisnika
    Route::get('/user', function (Request $request) {
        return response()->json($request->user(), 200);
    });
});
