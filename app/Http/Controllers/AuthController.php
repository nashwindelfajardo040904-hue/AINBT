<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Authenticate an admin user and issue an API token.
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials do not match our records.'],
            ]);
        }

        return response()->json([
            'message' => 'Logged in successfully.',
            'token' => $user->createToken('admin-portal')->plainTextToken,
            'user' => $user,
        ]);
    }

    /**
     * Get the currently authenticated admin user.
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
            'authenticated' => true,
        ]);
    }

    /**
     * Revoke the current admin token.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }
}
