<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AttractionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TourPackageController;
use Illuminate\Support\Facades\Route;

// Public Tourism Endpoints
Route::get('/attractions', [AttractionController::class, 'index']);
Route::get('/attractions/{slugOrId}', [AttractionController::class, 'show']);

Route::get('/packages', [TourPackageController::class, 'index']);
Route::get('/packages/{slugOrId}', [TourPackageController::class, 'show']);

Route::post('/bookings', [BookingController::class, 'store']);
Route::post('/inquiries', [InquiryController::class, 'store']);

Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/reviews', [ReviewController::class, 'store']);

// Authentication Endpoints
Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});

// Admin Management Endpoints (authenticated)
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);

    // Booking Operations
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/{booking}', [BookingController::class, 'show']);
    Route::patch('/bookings/{booking}/status', [AdminController::class, 'updateBookingStatus']);
    Route::put('/bookings/{booking}', [BookingController::class, 'update']);
    Route::delete('/bookings/{booking}', [BookingController::class, 'destroy']);

    // Inquiry Operations
    Route::get('/inquiries', [InquiryController::class, 'index']);
    Route::patch('/inquiries/{inquiry}/status', [AdminController::class, 'updateInquiryStatus']);
    Route::delete('/inquiries/{inquiry}', [InquiryController::class, 'destroy']);

    // Attraction CRUD
    Route::post('/attractions', [AttractionController::class, 'store']);
    Route::put('/attractions/{attraction}', [AttractionController::class, 'update']);
    Route::delete('/attractions/{attraction}', [AttractionController::class, 'destroy']);

    // Tour Package CRUD
    Route::post('/packages', [TourPackageController::class, 'store']);
    Route::put('/packages/{tourPackage}', [TourPackageController::class, 'update']);
    Route::delete('/packages/{tourPackage}', [TourPackageController::class, 'destroy']);
});
