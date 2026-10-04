<?php

namespace App\Http\Controllers;

use App\Models\Attraction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AttractionController extends Controller
{
    /**
     * Display a listing of attractions with optional search and filters.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Attraction::query();

        if ($request->filled('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        if ($request->filled('municipality') && $request->municipality !== 'All') {
            $query->where('municipality', $request->municipality);
        }

        if ($request->filled('featured')) {
            $query->where('is_featured', filter_var($request->featured, FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('municipality', 'like', "%{$search}%");
            });
        }

        $attractions = $query->orderBy('is_featured', 'desc')
            ->orderBy('name', 'asc')
            ->get();

        return response()->json($attractions);
    }

    /**
     * Display a single attraction by slug or ID.
     */
    public function show(string $slugOrId): JsonResponse
    {
        $attraction = Attraction::where('slug', $slugOrId)
            ->orWhere('id', $slugOrId)
            ->firstOrFail();

        return response()->json($attraction);
    }

    /**
     * Store a newly created attraction in storage (Admin).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'municipality' => 'required|string|max:100',
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'price' => 'nullable|numeric|min:0',
            'duration' => 'nullable|string|max:100',
            'availability' => 'nullable|string|max:100',
            'image_url' => 'required|string|url',
            'gallery' => 'nullable|array',
            'highlights' => 'nullable|string',
            'how_to_get_there' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']).'-'.rand(100, 999);
        $validated['price'] = $validated['price'] ?? 0;
        $validated['availability'] = $validated['availability'] ?? 'Open Daily';

        $attraction = Attraction::create($validated);

        return response()->json([
            'message' => 'Attraction created successfully.',
            'attraction' => $attraction,
        ], 201);
    }

    /**
     * Update the specified attraction in storage (Admin).
     */
    public function update(Request $request, Attraction $attraction): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'municipality' => 'required|string|max:100',
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'price' => 'nullable|numeric|min:0',
            'duration' => 'nullable|string|max:100',
            'availability' => 'nullable|string|max:100',
            'image_url' => 'required|string|url',
            'gallery' => 'nullable|array',
            'highlights' => 'nullable|string',
            'how_to_get_there' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
        ]);

        $attraction->update($validated);

        return response()->json([
            'message' => 'Attraction updated successfully.',
            'attraction' => $attraction,
        ]);
    }

    /**
     * Remove the specified attraction from storage (Admin).
     */
    public function destroy(Attraction $attraction): JsonResponse
    {
        $attraction->delete();

        return response()->json([
            'message' => 'Attraction deleted successfully.',
        ]);
    }
}
