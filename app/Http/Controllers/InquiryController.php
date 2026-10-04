<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    /**
     * Display a listing of inquiries (Admin).
     */
    public function index(Request $request): JsonResponse
    {
        $query = Inquiry::query();

        if ($request->filled('status') && $request->status !== 'All') {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $inquiries = $query->latest()->get();

        return response()->json($inquiries);
    }

    /**
     * Store a newly created contact inquiry (Public).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:3000',
        ]);

        $validated['status'] = 'New';

        $inquiry = Inquiry::create($validated);

        return response()->json([
            'message' => 'Maraming salamat! Your message has been sent to the Oriental Mindoro Provincial Tourism Information Desk.',
            'inquiry' => $inquiry,
        ], 201);
    }

    /**
     * Update inquiry status and admin response (Admin).
     */
    public function update(Request $request, Inquiry $inquiry): JsonResponse
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

    /**
     * Remove the specified inquiry (Admin).
     */
    public function destroy(Inquiry $inquiry): JsonResponse
    {
        $inquiry->delete();

        return response()->json([
            'message' => 'Inquiry removed successfully.',
        ]);
    }
}
