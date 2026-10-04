<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\TourPackage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of bookings (Admin).
     */
    public function index(Request $request): JsonResponse
    {
        $query = Booking::with('tourPackage');

        if ($request->filled('status') && $request->status !== 'All') {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('booking_code', 'like', "%{$search}%")
                    ->orWhere('guest_name', 'like', "%{$search}%")
                    ->orWhere('guest_email', 'like', "%{$search}%")
                    ->orWhere('package_title', 'like', "%{$search}%");
            });
        }

        $bookings = $query->latest()->get();

        return response()->json($bookings);
    }

    /**
     * Store a newly created booking reservation (Public).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tour_package_id' => 'nullable|exists:tour_packages,id',
            'package_title' => 'required|string|max:255',
            'guest_name' => 'required|string|max:255',
            'guest_email' => 'required|email|max:255',
            'guest_phone' => 'required|string|max:50',
            'tour_date' => 'required|date|after_or_equal:today',
            'guests_count' => 'required|integer|min:1|max:100',
            'special_requests' => 'nullable|string|max:1000',
        ]);

        // Auto calculate price
        $unitPrice = 4999.00;
        if (! empty($validated['tour_package_id'])) {
            $pkg = TourPackage::find($validated['tour_package_id']);
            if ($pkg) {
                $unitPrice = (float) $pkg->price;
                $validated['package_title'] = $pkg->title;
            }
        }

        $totalPrice = $unitPrice * $validated['guests_count'];
        $validated['total_price'] = $totalPrice;

        // Generate unique booking code
        $validated['booking_code'] = 'OM-'.date('Y').'-'.strtoupper(substr(uniqid(), -5));
        $validated['status'] = 'Pending';

        $booking = Booking::create($validated);

        return response()->json([
            'message' => 'Thank you! Your Oriental Mindoro tour reservation has been received. Our tourism desk will verify your schedule shortly.',
            'booking' => $booking,
            'booking_code' => $booking->booking_code,
        ], 201);
    }

    /**
     * Display the specified booking.
     */
    public function show(Booking $booking): JsonResponse
    {
        return response()->json($booking->load('tourPackage'));
    }

    /**
     * Update the specified booking status or admin notes (Admin).
     */
    public function update(Request $request, Booking $booking): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Pending,Confirmed,Completed,Cancelled',
            'admin_notes' => 'nullable|string|max:1000',
            'tour_date' => 'nullable|date',
            'guests_count' => 'nullable|integer|min:1',
        ]);

        $booking->update($validated);

        return response()->json([
            'message' => 'Booking updated successfully.',
            'booking' => $booking,
        ]);
    }

    /**
     * Remove the specified booking from storage (Admin).
     */
    public function destroy(Booking $booking): JsonResponse
    {
        $booking->delete();

        return response()->json([
            'message' => 'Booking record removed successfully.',
        ]);
    }
}
