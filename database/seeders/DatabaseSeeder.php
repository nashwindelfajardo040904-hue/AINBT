<?php

namespace Database\Seeders;

use App\Models\Attraction;
use App\Models\Booking;
use App\Models\Inquiry;
use App\Models\Review;
use App\Models\TourPackage;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin User
        $adminEmail = env('ADMIN_EMAIL', 'nashwindelfajardo040904@gmail.com');

        User::where('email', 'admin@orientalmindoro.gov.ph')
            ->where('email', '!=', $adminEmail)
            ->delete();

        User::updateOrCreate(
            ['email' => $adminEmail],
            [
                'name' => 'Nash Windel Fajardo',
                'password' => Hash::make(env('ADMIN_PASSWORD', 'Mindoro@Nash2026!')),
            ]
        );

        if (Attraction::query()->exists()) {
            return;
        }

        // 2. Attractions
        $attractions = [
            [
                'name' => 'White Beach Puerto Galera',
                'slug' => 'white-beach-puerto-galera',
                'municipality' => 'Puerto Galera',
                'category' => 'Beach & Marine',
                'description' => 'A world-famous crescent stretch of powdery white sand known for lively beachside dining, fire dancers at dusk, water sports, and crystalline turquoise waters facing the Verde Island Passage.',
                'features' => ['Powdery White Sand Beach', 'Water Sports (Parasailing, Jet Ski, Banana Boat)', 'Vibrant Sunset Beach Bars & Dining', 'Souvenir Stalls & Mangyan Crafts'],
                'price' => 120.00,
                'duration' => 'Full Day',
                'availability' => 'Open 24/7 (Water sports 8:00 AM - 5:00 PM)',
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
                ],
                'rating' => '4.9',
                'highlights' => 'Prime sunset view, UNESCO Biosphere Reserve zone, accessible via Balatero Port.',
                'how_to_get_there' => 'Ride a FastCat or Montenegro RORO from Batangas Port to Balatero Port (1.5 hours), then a 15-minute tricycle ride to White Beach.',
                'is_featured' => true,
            ],
            [
                'name' => 'Tamaraw Falls',
                'slug' => 'tamaraw-falls-san-teodoro',
                'municipality' => 'San Teodoro',
                'category' => 'Waterfalls & Mountains',
                'description' => 'A dramatic 423-foot twin cascading waterfall alongside the Western Nautical Highway. Natural spring-fed pools at the base offer refreshing mountain swimming surrounded by pristine rainforest.',
                'features' => ['423-foot Twin Cascades', 'Natural Spring Swimming Basins', 'Picnic Huts & Viewing Bridge', 'Fresh Mountain Spring Water'],
                'price' => 50.00,
                'duration' => '2 - 3 Hours',
                'availability' => 'Open Daily (7:00 AM - 5:00 PM)',
                'image_url' => 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
                ],
                'rating' => '4.8',
                'highlights' => 'Named after the endemic Dwarf Water Buffalo (Bubalus mindorensis) found only in Mindoro.',
                'how_to_get_there' => 'Located along the highway between Puerto Galera and Calapan City; 30 minutes by passenger jeepney or private van from Puerto Galera.',
                'is_featured' => true,
            ],
            [
                'name' => 'Naujan Lake National Park',
                'slug' => 'naujan-lake-national-park',
                'municipality' => 'Naujan',
                'category' => 'Eco-Tourism & Lakes',
                'description' => 'The fifth largest lake in the Philippines and a Ramsar Wetland of International Importance. A haven for migratory wild ducks, herons, and endemic freshwater fish like the indigenous Simbad.',
                'features' => ['Ramsar International Wetland Site', 'Eco-Boat Safari & Bird Watching', 'Tilapia & Simbad Fish Culinary Stops', 'Scenic Mountain Reflections'],
                'price' => 150.00,
                'duration' => 'Half Day (4 Hours)',
                'availability' => 'Open Daily (6:00 AM - 5:00 PM)',
                'image_url' => 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                ],
                'rating' => '4.7',
                'highlights' => 'Prime sanctuary for bird photographers and eco-tourists exploring tranquil freshwater ecosystems.',
                'how_to_get_there' => 'From Calapan Grand Central Terminal, take a Naujan jeepney (45 mins), then ride a local tricycle to the lakeside boardwalk and boat dispatch.',
                'is_featured' => true,
            ],
            [
                'name' => 'Bulalacao Virgin Islands',
                'slug' => 'bulalacao-virgin-islands',
                'municipality' => 'Bulalacao',
                'category' => 'Beach & Marine',
                'description' => 'An unspoiled archipelago in southern Oriental Mindoro with powdery white sandbars, secret sea caves, and vibrant coral gardens. Highlights include Aslom Island, Silad, and Target Island.',
                'features' => ['Curved Crescent Sandbars (Aslom)', 'Limestone Cliffs & Sea Caves', 'Snorkeling in Giant Clam Reefs', 'Raw Island Camping Experiences'],
                'price' => 1800.00,
                'duration' => 'Full Day (6 - 8 Hours)',
                'availability' => 'Open Daily (Weather Permitting, 6:00 AM - 4:00 PM)',
                'image_url' => 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1510414842594-a61752d5ab5a?auto=format&fit=crop&w=800&q=80',
                ],
                'rating' => '4.9',
                'highlights' => 'Nicknamed the "Unspoiled El Nido of Mindoro" with minimal commercialization.',
                'how_to_get_there' => 'Ride an air-conditioned van from Calapan Central Terminal to Bulalacao Port (3.5 hours), then register at the Municipal Tourism Office for boat charter.',
                'is_featured' => true,
            ],
            [
                'name' => 'Mangyan Heritage Center',
                'slug' => 'mangyan-heritage-center-calapan',
                'municipality' => 'Calapan City',
                'category' => 'Cultural Heritage',
                'description' => 'A cultural treasure trove dedicated to the eight indigenous Mangyan tribes of Mindoro Island. Features ancient Surat Mangyan bamboo scripts (UNESCO Memory of the World), nito baskets, and living tradition exhibits.',
                'features' => ['UNESCO Memory of the World Scripts', 'Handwoven Nito Crafts & Beadwork', 'Mangyan Poetry (Ambahan) Archive', 'Guided Cultural Lectures'],
                'price' => 75.00,
                'duration' => '2 Hours',
                'availability' => 'Monday to Saturday (8:00 AM - 5:00 PM)',
                'image_url' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
                ],
                'rating' => '4.9',
                'highlights' => 'Learn the authentic Ambahan poetry inscribed in Hanunuo Mangyan bamboo slats.',
                'how_to_get_there' => 'Situated along Gov. Infantado St. in Calapan City proper; 10 minutes from Calapan Port by tricycle.',
                'is_featured' => false,
            ],
            [
                'name' => 'Sabang Reef & Coral Garden Diving',
                'slug' => 'sabang-reef-coral-garden-puerto-galera',
                'municipality' => 'Puerto Galera',
                'category' => 'Beach & Marine',
                'description' => 'Nestled in the Verde Island Passage—hailed by marine biologists as the center of global shorefish biodiversity. Boasts over 30 world-class dive sites, deep drop-offs, and thriving sea turtle populations.',
                'features' => ['Verde Island Passage Epicenter', 'PADI / SSI Certified Scuba Diving', 'Giant Clams & Sea Turtle Encounters', 'Underwater Photography Paradises'],
                'price' => 1500.00,
                'duration' => '3 - 4 Hours',
                'availability' => 'Open Daily (7:00 AM - 4:00 PM)',
                'image_url' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
                ],
                'rating' => '5.0',
                'highlights' => 'Consistently ranked among the top 10 dive havens across the Indo-Pacific region.',
                'how_to_get_there' => '10-minute motorized tricycle or speed boat ride from Puerto Galera town proper to Sabang pier.',
                'is_featured' => true,
            ],
            [
                'name' => 'Calapan Mangrove Conservation Park',
                'slug' => 'calapan-mangrove-conservation-park',
                'municipality' => 'Calapan City',
                'category' => 'Eco-Tourism & Lakes',
                'description' => 'A protected coastal sanctuary featuring a 1-kilometer elevated bamboo boardwalk winding through majestic century-old bakawan trees. Offers bird watching observation decks and environmental education.',
                'features' => ['1km Raised Bamboo Eco-Boardwalk', 'Bird Watching Tower & Canopy View', 'Mangrove Seedling Planting Program', 'Educational Ecological Signages'],
                'price' => 40.00,
                'duration' => '1 - 2 Hours',
                'availability' => 'Open Daily (6:30 AM - 5:30 PM)',
                'image_url' => 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1200&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=800&q=80',
                ],
                'rating' => '4.6',
                'highlights' => 'Vital natural storm surge shield for Calapan and breeding ground for coastal crab and fish.',
                'how_to_get_there' => 'Barangay Suqui, Calapan City; 15 minutes by tricycle from Calapan City Hall.',
                'is_featured' => false,
            ],
            [
                'name' => 'Mount Halcon (Gawad Halcon)',
                'slug' => 'mount-halcon-baco',
                'municipality' => 'Baco',
                'category' => 'Waterfalls & Mountains',
                'description' => 'Towering at 2,586 meters above sea level, Mt. Halcon is the crown of Mindoro and one of the most revered mountain climbs in the Philippines, adorned with mossy cloud forests, river crossings, and sweeping ridges.',
                'features' => ['2,586m Peak (3rd Most Difficult PH Climb)', 'Mossy Cloud Forests & Pitcher Plants', 'Indigenous Alangan Mangyan Trail Guides', 'Panoramic Views of Verde Island Passage'],
                'price' => 2500.00,
                'duration' => '3 - 4 Days',
                'availability' => 'Seasonally Open (Permit Required, Nov - May)',
                'image_url' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
                ],
                'rating' => '4.9',
                'highlights' => 'Sacred mountain of the Alangan Mangyan; strictly regulated eco-tourism to preserve biodiversity.',
                'how_to_get_there' => 'Register with Baco Municipal Tourism Office; trailhead jump-off is in Barangay Bayanan, Baco.',
                'is_featured' => false,
            ],
        ];

        foreach ($attractions as $data) {
            Attraction::updateOrCreate(['slug' => $data['slug']], $data);
        }

        // 3. Tour Packages (At least 3 required by Section IV.4)
        $packages = [
            [
                'title' => 'Puerto Galera Coastal, Dive & Waterfalls Escape',
                'slug' => 'puerto-galera-coastal-dive-waterfalls-escape',
                'duration' => '3 Days / 2 Nights',
                'price' => 4999.00,
                'target_market' => 'Beach enthusiasts, couples, snorkelers, friend groups, and vacationing families.',
                'destinations' => 'Puerto Galera, White Beach, Coral Garden, Tamaraw Falls, Aninuan Falls',
                'inclusions' => [
                    '2 Nights Air-Conditioned Beachfront Resort Stay in Puerto Galera',
                    'Round-trip Balatero Port to Resort Transfers',
                    'Private Island Hopping Boat with Snorkel & Life Vest Gear',
                    'Tamaraw Falls & Inland Jeepney Tour with Refreshment',
                    'Daily Resort Breakfast & 1 Seafood Boodle Lunch',
                    'DOT-Accredited Tour Guide and Municipal Environmental Fees',
                ],
                'exclusions' => [
                    'Batangas Port to Puerto Galera Ferry Ticket (approx. ₱350 - ₱600)',
                    'Dinner meals and personal alcoholic drinks',
                    'Optional Scuba Diving Upgrade (₱1,500/dive with gear)',
                    'Personal travel insurance',
                ],
                'itinerary' => [
                    [
                        'day' => 1,
                        'title' => 'Arrival & Inland Waterfall Safari',
                        'schedule' => [
                            '08:30 AM' => 'Ferry arrival at Balatero Port; greeted by local tour coordinator',
                            '09:30 AM' => 'Check-in and refresh at White Beach resort',
                            '11:30 AM' => 'Welcome Filipino lunch at beachside bistro',
                            '01:30 PM' => 'Scenic jeepney tour to Tamaraw Falls; swim in natural cold spring basins',
                            '04:30 PM' => 'Return to White Beach; relax and watch the sunset',
                            '07:00 PM' => 'Dinner at leisure along the vibrant beachfront boardwalk',
                        ],
                    ],
                    [
                        'day' => 2,
                        'title' => 'Coral Garden & Marine Sanctuary Snorkeling',
                        'schedule' => [
                            '07:30 AM' => 'Resort breakfast buffet',
                            '08:30 AM' => 'Board private banca for Coral Garden & Giant Clam Sanctuary',
                            '10:30 AM' => 'Snorkeling at San Antonio Island underwater reef',
                            '12:30 PM' => 'Fresh grilled seafood boodle fight on secluded cove beach',
                            '03:00 PM' => 'Visit Aninuan Beach & Mangyan Village craft shop',
                            '06:30 PM' => 'Sunset beach cocktails and live acoustic music',
                        ],
                    ],
                    [
                        'day' => 3,
                        'title' => 'Mindoro Flavors & Balatero Departure',
                        'schedule' => [
                            '08:00 AM' => 'Breakfast and leisurely beach walk',
                            '09:30 AM' => 'Souvenir shopping: native Mangyan nito baskets & homemade banana chips',
                            '11:00 AM' => 'Resort check-out',
                            '12:00 PM' => 'Private transfer to Balatero Port for return ferry to Batangas',
                        ],
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                'is_featured' => true,
                'booking_instructions' => 'Book at least 48 hours prior to travel date. 50% deposit required to confirm resort reservation.',
            ],
            [
                'title' => 'Naujan Lake Eco-Safari & Mangrove Heritage Trail',
                'slug' => 'naujan-lake-eco-safari-mangrove-heritage-trail',
                'duration' => '2 Days / 1 Night',
                'price' => 3499.00,
                'target_market' => 'Eco-tourists, educators, bird watchers, photographers, and culture advocates.',
                'destinations' => 'Calapan City, Naujan Lake National Park, Mangyan Heritage Center, Calapan Mangrove Park',
                'inclusions' => [
                    '1 Night Boutique Hotel Stay in Calapan City',
                    'Private Air-Conditioned Van Transport throughout the entire itinerary',
                    'Motorized Lake Safari Boat with wildlife spotter in Naujan Lake',
                    'Mangyan Heritage Center Museum Admission & Cultural Briefer',
                    'Traditional Mindoro Suman sa Lihiya morning snack & farm-to-table lunch',
                    'Calapan Mangrove Boardwalk Tour & Seedling Planting kit',
                    'Accredited Eco-Tourism Guide',
                ],
                'exclusions' => [
                    'Ferry passage from Batangas to Calapan Port',
                    'Dinner on Day 1',
                    'Personal souvenir and handwoven purchases',
                ],
                'itinerary' => [
                    [
                        'day' => 1,
                        'title' => 'Mangyan Heritage & Calapan Mangrove Canopy',
                        'schedule' => [
                            '08:00 AM' => 'Meet & greet at Calapan City Port',
                            '09:00 AM' => 'Mangyan Heritage Center: observe pre-Spanish Surat Mangyan scripts',
                            '11:00 AM' => 'Heritage Plaza walk and taste Calapan Suman sa Lihiya with coco jam',
                            '12:30 PM' => 'Local dining featuring Mindoro native chicken & Sinigang',
                            '02:30 PM' => 'Calapan Mangrove Park: walk along the 1km bamboo canopy boardwalk',
                            '04:30 PM' => 'Check-in at Calapan City hotel; rest and recharge',
                            '07:00 PM' => 'Dinner exploration around Calapan night food park',
                        ],
                    ],
                    [
                        'day' => 2,
                        'title' => 'Naujan Lake Bird Safari & Lakeside Gastronomy',
                        'schedule' => [
                            '06:00 AM' => 'Early breakfast and checkout',
                            '06:45 AM' => 'Scenic drive to Naujan Lake National Park',
                            '07:30 AM' => 'Board eco-safari banca for migratory bird watching & wetland observation',
                            '11:00 AM' => 'Fresh lakeside lunch featuring Naujan Tilapia & endemic freshwater fish',
                            '01:30 PM' => 'Stop by local processing center for Mindoro banana chips & calamay',
                            '03:30 PM' => 'Drop-off at Calapan City Port for fast craft return to Batangas',
                        ],
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
                'is_featured' => true,
                'booking_instructions' => 'Bring binoculars and comfortable walking shoes. Lake boat permits are scheduled with the municipal desk.',
            ],
            [
                'title' => 'Bulalacao Virgin Islands & Southern Horizon Safari',
                'slug' => 'bulalacao-virgin-islands-southern-horizon-safari',
                'duration' => '3 Days / 2 Nights',
                'price' => 6899.00,
                'target_market' => 'Adventure backpackers, island lovers, off-grid explorers, and diving enthusiasts.',
                'destinations' => 'Bulalacao Archipelago, Aslom Sandbar, Silad Island, Target Island, Buyayao Island',
                'inclusions' => [
                    '2 Nights Beachfront Eco-Cottage / Homestay in Bulalacao',
                    'Full-Day Exclusive Island Hopping Boat with Captain & Crew',
                    'Sumptuous Grilled Seafood Boodle Feast on Aslom Sandbar',
                    'Complete Snorkel Equipment, Life Vests, and Underwater Spotter',
                    'Bulalacao Municipal Ecological Fees & Terminal Assistance',
                    'Sunset Baywalk orientation tour',
                ],
                'exclusions' => [
                    'Land transfers between Calapan and Bulalacao (regular passenger vans available)',
                    'Personal toiletries and sunscreen (please use reef-safe sunblock)',
                    'Day 1 and Day 3 dinners',
                ],
                'itinerary' => [
                    [
                        'day' => 1,
                        'title' => 'Gateway to Southern Mindoro & Sunset Baywalk',
                        'schedule' => [
                            '09:00 AM' => 'Scenic drive from Calapan to Bulalacao passing coastal mountain vistas',
                            '01:00 PM' => 'Arrival in Bulalacao; check-in at beachfront eco-resort',
                            '03:00 PM' => 'Registration and briefing at Bulalacao Tourism Center',
                            '05:00 PM' => 'Sunset walk along Bulalacao Baywalk; seafood dinner at local diner',
                        ],
                    ],
                    [
                        'day' => 2,
                        'title' => 'Epic Virgin Islands Island-Hopping Adventure',
                        'schedule' => [
                            '07:00 AM' => 'Early breakfast',
                            '08:00 AM' => 'Set sail to Aslom Island; stroll along the pristine curved sandbar',
                            '10:30 AM' => 'Cruise to Silad Island: cave exploration and cliffside coral snorkeling',
                            '12:30 PM' => 'Fresh grilled lobster, tuna, and ensaladang latô boodle fight on the beach',
                            '02:30 PM' => 'Target Island: swim through crystal clear lagoons with starfish',
                            '05:30 PM' => 'Return to mainland Bulalacao; bonfire and stargazing under pristine skies',
                        ],
                    ],
                    [
                        'day' => 3,
                        'title' => 'Buyayao Island Nature Walk & Farewell',
                        'schedule' => [
                            '07:30 AM' => 'Breakfast with local Mindoro Barako coffee',
                            '09:00 AM' => 'Visit Buyayao Island trail & buy authentic dried fish & honey from local producers',
                            '11:30 AM' => 'Check-out from resort',
                            '01:00 PM' => 'Board northbound van back to Calapan or onward ferry to Caticlan/Boracay',
                        ],
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
                'is_featured' => true,
                'booking_instructions' => 'Weather dependent. Southern island charters require advance registration with Coast Guard and tourism dispatch.',
            ],
        ];

        foreach ($packages as $pkg) {
            TourPackage::updateOrCreate(['slug' => $pkg['slug']], $pkg);
        }

        // 4. Sample Bookings (For immediate Admin Dashboard demonstration)
        $p1 = TourPackage::where('slug', 'puerto-galera-coastal-dive-waterfalls-escape')->first();
        $p2 = TourPackage::where('slug', 'naujan-lake-eco-safari-mangrove-heritage-trail')->first();
        $p3 = TourPackage::where('slug', 'bulalacao-virgin-islands-southern-horizon-safari')->first();

        $bookings = [
            [
                'booking_code' => 'OM-2026-8812',
                'tour_package_id' => $p1 ? $p1->id : null,
                'package_title' => 'Puerto Galera Coastal, Dive & Waterfalls Escape',
                'guest_name' => 'Maria Kristina Cruz',
                'guest_email' => 'kristina.cruz@gmail.com',
                'guest_phone' => '+63 917 555 4321',
                'tour_date' => now()->addDays(5)->format('Y-m-d'),
                'guests_count' => 3,
                'special_requests' => 'Kindly prepare 2 vegetarian meals during the island lunch.',
                'total_price' => 14997.00,
                'status' => 'Confirmed',
                'admin_notes' => 'Payment received via GCash/Bank Transfer. Hotel rooms assigned.',
            ],
            [
                'booking_code' => 'OM-2026-8943',
                'tour_package_id' => $p2 ? $p2->id : null,
                'package_title' => 'Naujan Lake Eco-Safari & Mangrove Heritage Trail',
                'guest_name' => 'Prof. Raymond Del Rosario',
                'guest_email' => 'rdelrosario@dlsu.edu.ph',
                'guest_phone' => '+63 928 888 1234',
                'tour_date' => now()->addDays(12)->format('Y-m-d'),
                'guests_count' => 6,
                'special_requests' => 'University biology group field study. Please assign a senior bird watcher.',
                'total_price' => 20994.00,
                'status' => 'Pending',
                'admin_notes' => 'Awaiting confirmation of van schedule from Calapan transport hub.',
            ],
            [
                'booking_code' => 'OM-2026-9021',
                'tour_package_id' => $p3 ? $p3->id : null,
                'package_title' => 'Bulalacao Virgin Islands & Southern Horizon Safari',
                'guest_name' => 'Alexander Von Berg',
                'guest_email' => 'alex.vonberg@traveler.de',
                'guest_phone' => '+49 170 1234567',
                'tour_date' => now()->addDays(20)->format('Y-m-d'),
                'guests_count' => 2,
                'special_requests' => 'Need English-speaking boat guide and drone filming permit.',
                'total_price' => 13798.00,
                'status' => 'Confirmed',
                'admin_notes' => 'Coast Guard registration submitted for Bulalacao boat charter.',
            ],
            [
                'booking_code' => 'OM-2026-7650',
                'tour_package_id' => $p1 ? $p1->id : null,
                'package_title' => 'Puerto Galera Coastal, Dive & Waterfalls Escape',
                'guest_name' => 'Janice Villafuerte',
                'guest_email' => 'janice.v@yahoo.com',
                'guest_phone' => '+63 905 111 8877',
                'tour_date' => now()->subDays(3)->format('Y-m-d'),
                'guests_count' => 4,
                'special_requests' => 'Family with 1 senior citizen (ground floor room preferred).',
                'total_price' => 19996.00,
                'status' => 'Completed',
                'admin_notes' => 'Tour concluded smoothly. Guest submitted a 5-star review.',
            ],
        ];

        foreach ($bookings as $b) {
            Booking::updateOrCreate(['booking_code' => $b['booking_code']], $b);
        }

        // 5. Sample Inquiries
        $inquiries = [
            [
                'name' => 'Samantha Lee',
                'email' => 'slee@wanderlust.com',
                'phone' => '+63 917 222 9911',
                'subject' => 'Group discount for 15 persons in Puerto Galera',
                'message' => 'Hello! We are organizing a company team building in Puerto Galera this coming November. Do you offer custom packages with private beachfront dinners and team activities?',
                'status' => 'New',
                'admin_reply' => null,
            ],
            [
                'name' => 'Carlos Mendoza',
                'email' => 'carlos.mendoza@gmail.com',
                'phone' => '+63 920 333 4455',
                'subject' => 'Permit requirements for Mt. Halcon climb',
                'message' => 'Good day. We are a mountaineering club from Laguna planning to climb Mt. Halcon next month. What are the medical certificate requirements and guide fees for Baco jump-off?',
                'status' => 'Replied',
                'admin_reply' => 'Medical certificate of fitness is mandatory. Municipal fee is ₱2,500 inclusive of indigenous Alangan Mangyan guide & porter. Email sent with application forms.',
            ],
            [
                'name' => 'Dr. Eleanor Vance',
                'email' => 'evance@oxford.ac.uk',
                'phone' => '+44 7911 123456',
                'subject' => 'Mangyan Heritage archive research access',
                'message' => 'I am a linguistics researcher visiting the Philippines in December. May I schedule access to the Hanunuo bamboo script collections at the Mangyan Heritage Center?',
                'status' => 'New',
                'admin_reply' => null,
            ],
        ];

        foreach ($inquiries as $inq) {
            Inquiry::create($inq);
        }

        // 6. Testimonials & Reviews
        $reviews = [
            [
                'author_name' => 'Chloe & Daniel Tan',
                'location' => 'Singapore',
                'rating' => 5,
                'destination_name' => 'Bulalacao Virgin Islands',
                'comment' => 'Aslom sandbar was the highlight of our 2-week Philippine trip! Uncrowded, completely pristine, and the boodle fight seafood was unbelievably fresh. Mindoro Horizons made the logistics so effortless.',
                'is_approved' => true,
            ],
            [
                'author_name' => 'Marc Kevin Bautista',
                'location' => 'Quezon City, Philippines',
                'rating' => 5,
                'destination_name' => 'White Beach & Coral Garden',
                'comment' => 'Only 2 hours from Batangas port and you are already in paradise! Snorkeling with giant clams in Puerto Galera was world-class. Our tour guide was extremely knowledgeable and hospitable.',
                'is_approved' => true,
            ],
            [
                'author_name' => 'Hannah Schultze',
                'location' => 'Munich, Germany',
                'rating' => 5,
                'destination_name' => 'Naujan Lake National Park',
                'comment' => 'The bird watching safari at Naujan Lake was so peaceful and magical at dawn. Seeing hundreds of migratory wild ducks against the morning mist of Mt. Halcon is an image I will never forget.',
                'is_approved' => true,
            ],
            [
                'author_name' => 'Atty. Jose Mari Santos',
                'location' => 'Makati City, Philippines',
                'rating' => 5,
                'destination_name' => 'Mangyan Heritage Center',
                'comment' => 'A deeply touching cultural experience. Reading the Ambahan poetry inscribed on bamboo slats made me proud of our Filipino indigenous heritage. Truly a must-visit in Calapan.',
                'is_approved' => true,
            ],
        ];

        foreach ($reviews as $rev) {
            Review::create($rev);
        }
    }
}
