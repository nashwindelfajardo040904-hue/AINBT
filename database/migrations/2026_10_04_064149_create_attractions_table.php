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
        Schema::create('attractions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('municipality');
            $table->string('category');
            $table->text('description');
            $table->json('features')->nullable();
            $table->decimal('price', 10, 2)->default(0.00);
            $table->string('duration')->nullable();
            $table->string('availability')->default('Open Daily');
            $table->string('image_url');
            $table->json('gallery')->nullable();
            $table->string('rating')->default('4.8');
            $table->text('highlights')->nullable();
            $table->text('how_to_get_there')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attractions');
    }
};
