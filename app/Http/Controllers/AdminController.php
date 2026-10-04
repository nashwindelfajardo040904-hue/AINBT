<?php

namespace App\Http\Controllers;

use App\Models\Attraction;
use App\Models\Booking;
use App\Models\Inquiry;
use App\Models\TourPackage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Get aggregate statistics and recent data for the admin dashboard.
     */
    public function dashboard(): JsonResponse
    {
        $totalBookings = Booking::count();
        $confirmedBookings = Booking::where('status', 'Confirmed')->count();
        $pendingBookings = Booking::where('status', 'Pending')->count();
        $completedBookings = Booking::where('status', 'Completed')->count();
        $cancelledBookings = Booking::where('status', 'Cancelled')->count();

        $totalRevenue = Booking::whereIn('status', ['Confirmed', 'Completed'])->sum('total_price');

        $totalInquiries = Inquiry::count();
        $newInquiries = Inquiry::where('status', 'New')->count();

        $totalAttractions = Attraction::count();
        $totalPackages = TourPackage::count();

        $recentBookings = Booking::latest()->take(6)->get();
        $recentInquiries = Inquiry::latest()->take(6)->get();

        // Municipalities distribution for attractions
        $attractionsByMunicipality = Attraction::selectRaw('municipality, count(*) as count')
            ->groupBy('municipality')
            ->get();

        return response()->json([
            'stats' => [
                'total_bookings' => $totalBookings,
                'confirmed_bookings' => $confirmedBookings,
                'pending_bookings' => $pendingBookings,
                'completed_bookings' => $completedBookings,
                'cancelled_bookings' => $cancelledBookings,
                'total_revenue' => (float) $totalRevenue,
                'total_inquiries' => $totalInquiries,
                'new_inquiries' => $newInquiries,
                'total_attractions' => $totalAttractions,
                'total_packages' => $totalPackages,
            ],
            'recent_bookings' => $recentBookings,
            'recent_inquiries' => $recentInquiries,
            'attractions_by_municipality' => $attractionsByMunicipality,
        ]);
    }

    /**
     * Update booking status and optional notes.
     */
    public function updateBookingStatus(Request $request, Booking $booking): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Pending,Confirmed,Completed,Cancelled',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        $booking->update($validated);

        return response()->json([
            'message' => 'Booking status updated successfully.',
            'booking' => $booking,
        ]);
    }

    /**
     * Update inquiry status and reply.
     */
    public function updateInquiryStatus(Request $request, Inquiry $inquiry): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:New,Replied,Archived',
            'admin_reply' => 'nullable|string|max:2000',
        ]);

        $inquiry->update($validated);

        return response()->json([
            'message' => 'Inquiry updated successfully.',
            'inquiry' => $inquiry,
        ]);
    }
}
