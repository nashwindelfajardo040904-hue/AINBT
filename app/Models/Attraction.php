<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attraction extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'municipality',
        'category',
        'description',
        'features',
        'price',
        'duration',
        'availability',
        'image_url',
        'gallery',
        'rating',
        'highlights',
        'how_to_get_there',
        'is_featured',
    ];

    protected $casts = [
        'features' => 'array',
        'gallery' => 'array',
        'is_featured' => 'boolean',
        'price' => 'decimal:2',
    ];
}
