<?php

namespace App\Http\Controllers;

use App\Models\TourPackage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TourPackageController extends Controller
{
    /**
     * Display a listing of tour packages.
     */
    public function index(Request $request): JsonResponse
    {
        $query = TourPackage::query();

        if ($request->filled('featured')) {
            $query->where('is_featured', filter_var($request->featured, FILTER_VALIDATE_BOOLEAN));
        }

        $packages = $query->orderBy('price', 'asc')->get();

        return response()->json($packages);
    }

    /**
     * Display the specified tour package.
     */
    public function show(string $slugOrId): JsonResponse
    {
        $package = TourPackage::where('slug', $slugOrId)
            ->orWhere('id', $slugOrId)
            ->firstOrFail();

        return response()->json($package);
    }

    /**
     * Store a newly created package in storage (Admin).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'duration' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'target_market' => 'required|string|max:255',
            'destinations' => 'required|string',
            'inclusions' => 'required|array',
            'exclusions' => 'required|array',
            'itinerary' => 'required|array',
            'image_url' => 'required|string|url',
            'is_featured' => 'nullable|boolean',
            'booking_instructions' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['title']).'-'.rand(100, 999);
        $validated['is_featured'] = $validated['is_featured'] ?? true;

        $package = TourPackage::create($validated);

        return response()->json([
            'message' => 'Tour package created successfully.',
            'package' => $package,
        ], 201);
    }

    /**
     * Update the specified tour package (Admin).
     */
    public function update(Request $request, TourPackage $tourPackage): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'duration' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'target_market' => 'required|string|max:255',
            'destinations' => 'required|string',
            'inclusions' => 'required|array',
            'exclusions' => 'required|array',
            'itinerary' => 'required|array',
            'image_url' => 'required|string|url',
            'is_featured' => 'nullable|boolean',
            'booking_instructions' => 'nullable|string',
        ]);

        $tourPackage->update($validated);

        return response()->json([
            'message' => 'Tour package updated successfully.',
            'package' => $tourPackage,
        ]);
    }

    /**
     * Remove the specified package from storage (Admin).
     */
    public function destroy(TourPackage $tourPackage): JsonResponse
    {
        $tourPackage->delete();

        return response()->json([
            'message' => 'Tour package deleted successfully.',
        ]);
    }
}
