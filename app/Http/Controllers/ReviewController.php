<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Get approved reviews for public display.
     */
    public function index(): JsonResponse
    {
        $reviews = Review::where('is_approved', true)
            ->latest()
            ->take(20)
            ->get();

        return response()->json($reviews);
    }

    /**
     * Submit a customer review.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'author_name' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'rating' => 'required|integer|min:1|max:5',
            'destination_name' => 'required|string|max:150',
            'comment' => 'required|string|max:1000',
        ]);

        $validated['is_approved'] = true; // Auto-approved for smooth demo experience

        $review = Review::create($validated);

        return response()->json([
            'message' => 'Thank you for your wonderful review of Oriental Mindoro!',
            'review' => $review,
        ], 201);
    }
}
