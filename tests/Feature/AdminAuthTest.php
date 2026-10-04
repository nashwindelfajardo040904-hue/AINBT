<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_login_with_valid_credentials_and_receives_token(): void
    {
        $user = User::factory()->create([
            'email' => 'nashwindelfajardo040904@gmail.com',
            'password' => Hash::make('Mindoro@Nash2026!'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'nashwindelfajardo040904@gmail.com',
            'password' => 'Mindoro@Nash2026!',
        ]);

        $response->assertOk()
            ->assertJsonStructure([
                'message',
                'token',
                'user' => ['id', 'name', 'email'],
            ]);
    }

    public function test_login_fails_with_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'nashwindelfajardo040904@gmail.com',
            'password' => Hash::make('Mindoro@Nash2026!'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'nashwindelfajardo040904@gmail.com',
            'password' => 'WrongPassword123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_unauthenticated_request_to_admin_route_is_rejected(): void
    {
        $response = $this->getJson('/api/admin/dashboard');

        $response->assertStatus(401);
    }

    public function test_authenticated_request_with_token_can_access_admin_dashboard(): void
    {
        $user = User::factory()->create([
            'email' => 'nashwindelfajardo040904@gmail.com',
        ]);

        $token = $user->createToken('admin-test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/admin/dashboard');

        $response->assertOk()
            ->assertJsonStructure([
                'stats',
                'recent_bookings',
                'recent_inquiries',
            ]);
    }
}
