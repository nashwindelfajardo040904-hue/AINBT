<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tour_packages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('duration'); // e.g. "3 Days / 2 Nights"
            $table->decimal('price', 10, 2);
            $table->string('target_market');
            $table->text('destinations');
            $table->json('inclusions');
            $table->json('exclusions');
            $table->json('itinerary'); // array of day schedules
            $table->string('image_url');
            $table->boolean('is_featured')->default(true);
            $table->text('booking_instructions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tour_packages');
    }
};
