<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TourPackage extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'duration',
        'price',
        'target_market',
        'destinations',
        'inclusions',
        'exclusions',
        'itinerary',
        'image_url',
        'is_featured',
        'booking_instructions',
    ];

    protected $casts = [
        'inclusions' => 'array',
        'exclusions' => 'array',
        'itinerary' => 'array',
        'is_featured' => 'boolean',
        'price' => 'decimal:2',
    ];

    /**
     * Get bookings associated with this package.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
