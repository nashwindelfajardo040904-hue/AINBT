<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    protected $fillable = [
        'booking_code',
        'tour_package_id',
        'package_title',
        'guest_name',
        'guest_email',
        'guest_phone',
        'tour_date',
        'guests_count',
        'special_requests',
        'total_price',
        'status',
        'admin_notes',
    ];

    protected $casts = [
        'tour_date' => 'date',
        'guests_count' => 'integer',
        'total_price' => 'decimal:2',
    ];

    /**
     * Get the tour package associated with this booking.
     */
    public function tourPackage(): BelongsTo
    {
        return $this->belongsTo(TourPackage::class);
    }
}
