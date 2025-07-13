<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Routes d'authentification
Route::prefix('auth')->group(function () {
    Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [App\Http\Controllers\AuthController::class, 'logout']);
        Route::get('user', [App\Http\Controllers\AuthController::class, 'user']);
    });
});

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    
    // Gestion des utilisateurs
    Route::apiResource('users', App\Http\Controllers\UserController::class);
    
    // Gestion des médecins
    Route::get('doctors', [App\Http\Controllers\DoctorController::class, 'index']);
    Route::get('doctors/{id}', [App\Http\Controllers\DoctorController::class, 'show']);
    Route::get('doctors/{id}/availability', [App\Http\Controllers\DoctorController::class, 'availability']);
    
    // Gestion des rendez-vous
    Route::apiResource('appointments', App\Http\Controllers\AppointmentController::class);
    
    // Spécialités médicales
    Route::get('specialties', [App\Http\Controllers\SpecialtyController::class, 'index']);
    
    // Disponibilités
    Route::get('availability/{doctorId}/{date}', [App\Http\Controllers\AvailabilityController::class, 'getSlots']);
});

// Routes publiques
Route::get('specialties/public', [App\Http\Controllers\SpecialtyController::class, 'publicIndex']);
Route::get('doctors/public', [App\Http\Controllers\DoctorController::class, 'publicIndex']);