// Authentic local tourism metadata for Oriental Mindoro, Philippines

export const MUNICIPALITIES = [
    {
        name: 'Puerto Galera',
        tagline: 'The Diving Capital & UNESCO Biosphere Reserve',
        highlights: 'White Beach, Sabang Reef, Coral Garden, Talipanan Falls, Aninuan Beach',
        description: 'World-renowned coastal town featuring powdery beaches, over 30 premier dive sites in the Verde Island Passage, and vibrant night dining.',
        port: 'Balatero Port (FastCat, Montenegro, OceanJet from Batangas)',
        category: 'Coastal & Diving'
    },
    {
        name: 'Calapan City',
        tagline: 'The Vibrant Provincial Capital & Gateway',
        highlights: 'Calapan Mangrove Conservation Park, Mangyan Heritage Center, City Plaza, Suman sa Lihiya',
        description: 'The administrative, commercial, and culinary hub of Oriental Mindoro with rich heritage, coastal parks, and port facilities.',
        port: 'Calapan City Port (Largest RORO hub connecting to Batangas Port in 2 hrs)',
        category: 'Urban & Cultural Heritage'
    },
    {
        name: 'Naujan',
        tagline: 'The Home of the Ramsar Wetland Lake',
        highlights: 'Naujan Lake National Park, Simbad freshwater fish, Migratory Bird Sanctuary',
        description: 'Serene eco-tourism haven surrounding the 5th largest lake in the Philippines, famous for peaceful boat safaris and freshwater delicacies.',
        port: 'Accessible via Calapan highway (45 mins)',
        category: 'Eco-Tourism & Lakes'
    },
    {
        name: 'San Teodoro',
        tagline: 'The Cascade Gateway',
        highlights: 'Tamaraw Falls, Aras Cave, Botocan River',
        description: 'Mountain municipality boasting crystal-clear cold springs, rivers, and the iconic roadside Tamaraw twin waterfalls.',
        port: 'Along Western Nautical Highway between Puerto Galera and Calapan',
        category: 'Waterfalls & Rivers'
    },
    {
        name: 'Baco',
        tagline: 'The Foothills of Mt. Halcon',
        highlights: 'Mt. Halcon Trailhead, Lantuyang Mangyan Village, Alag River',
        description: 'Adventure central for seasoned mountaineers and home to the sacred guardian mountain of the Alangan Mangyan tribe.',
        port: '25 mins from Calapan City',
        category: 'Mountains & Trekking'
    },
    {
        name: 'Victoria',
        tagline: 'The Fruit Basket of Oriental Mindoro',
        highlights: 'Naujan Lake eastern shores, Rambutan & Lanzones Fruit Orchards, Duck Hatcheries',
        description: 'Bustling agricultural municipality renowned for annual harvest festivals, sweet tropical fruits, and scenic lake views.',
        port: 'Central Mindoro transit corridor',
        category: 'Agri-Tourism & Gastronomy'
    },
    {
        name: 'Pola',
        tagline: 'The Heritage Coastal Town',
        highlights: 'Bihiya Beach, Pola Bay, Century-old Heritage Houses',
        description: 'A quaint coastal municipality famous for picturesque bays, heritage streets, and peaceful fishing villages.',
        port: 'Scenic detour from nautical highway',
        category: 'Heritage & Quiet Beaches'
    },
    {
        name: 'Pinamalayan',
        tagline: 'The Rainbow City of Mindoro',
        highlights: 'Bahaghari Festival, Rainbow Heritage Plaza, Catuiran River',
        description: 'Famous for its vibrant Bahaghari (Rainbow) festival, radial city street layout, and thriving market culture.',
        port: 'Pinamalayan Port (Ferry to Marinduque)',
        category: 'Festivals & Culture'
    },
    {
        name: 'Gloria',
        tagline: 'The Bamboo & Rice Granary',
        highlights: 'Walang Langit Waterfalls, Agsalin Fish Sanctuary, Bamboo Crafts',
        description: 'Lush agricultural heartland with hidden waterfalls and flourishing marine protected sanctuaries.',
        port: 'Accessible via Southern Nautical Highway',
        category: 'Eco-Trails'
    },
    {
        name: 'Bongabong',
        tagline: 'The Organic Agriculture Haven',
        highlights: 'Kuta Shrine, Lisap River, Suguicay Island approach',
        description: 'Rich in pre-colonial history and organic farming, featuring historic Spanish forts and indigenous heritage trails.',
        port: 'Mid-southern highway hub',
        category: 'History & Agriculture'
    },
    {
        name: 'Roxas',
        tagline: 'The Southern Fastcraft Terminal',
        highlights: 'Dangay Port (Gateway to Caticlan / Boracay), San Rafael Cave, Hinagdan Cave',
        description: 'Strategic transit hub connecting Luzon to Visayas with frequent RORO and FastCraft links directly to Boracay / Caticlan.',
        port: 'Dangay Port (Direct ferry to Caticlan in 4-5 hrs)',
        category: 'Transportation & Caving'
    },
    {
        name: 'Mansalay',
        tagline: 'The Cradle of Mangyan Hanunuo Script',
        highlights: 'Buktot Beach, Indigenous Hanunuo Cultural Settlements, Ambahan Poetry Workshops',
        description: 'The cultural center of the Hanunuo Mangyan, where ancient Indic-derived script continues to be written on bamboo stalks.',
        port: 'Southern Mindoro',
        category: 'Indigenous Heritage'
    },
    {
        name: 'Bulalacao',
        tagline: 'The Untamed Virgin Islands of the South',
        highlights: 'Aslom Sandbar, Silad Island, Target Island, Buyayao Island, Pocanil Rock',
        description: 'Oriental Mindoro’s southern crown jewel featuring pristine sandbars, limestone sea caves, and untouched coral ecosystems.',
        port: 'Bulalacao Municipal Port',
        category: 'Island Hopping Paradise'
    }
];

export const EMERGENCY_HOTLINES = [
    { name: 'Provincial Tourism Office (Calapan)', number: '(043) 288-7550 / +63 917 845 2210', available: '24/7 Tourist Desk' },
    { name: 'PDRRMO Disaster Response (Oriental Mindoro)', number: '(043) 288-7777 / 911', available: 'Emergency Hotline' },
    { name: 'Philippine Coast Guard - Southern Tagalog', number: '+63 929 678 3344 / (043) 288-5120', available: 'Maritime Search & Weather Clearance' },
    { name: 'Puerto Galera Municipal Tourism Desk', number: '+63 917 500 8920', available: 'Visitor Assistance' },
    { name: 'Oriental Mindoro Provincial Hospital (Calapan)', number: '(043) 288-2101 / +63 920 900 1122', available: 'Emergency Medical Center' },
    { name: 'PNP Oriental Mindoro Provincial Police Office', number: '+63 998 598 5689 / 117', available: 'Police Assistance' }
];

export const TRAVEL_GUIDELINES = {
    bestTimeToVisit: {
        title: 'Best Time to Visit (Dry Season)',
        details: 'The optimal window is from November to May when seas are calm, skies are clear, and island hopping conditions in Puerto Galera and Bulalacao are premier. Scuba diving visibility peaks in March to May.'
    },
    howToGetThere: [
        {
            route: 'Manila to Batangas Port',
            mode: 'Bus / Private Vehicle via SLEX & STAR Tollway',
            time: '2.0 - 2.5 Hours',
            cost: '₱250 - ₱300 per pax by aircon bus (JAM, JAC Liner, DLTB from Buendia/Cubao)'
        },
        {
            route: 'Batangas Port to Balatero Port (Puerto Galera)',
            mode: 'FastCat / Montenegro / OceanJet',
            time: '1.2 - 1.5 Hours',
            cost: '₱550 - ₱650 + ₱30 Batangas Terminal Fee + ₱120 Puerto Galera Environmental Fee'
        },
        {
            route: 'Batangas Port to Calapan City Port',
            mode: 'FastCraft or RORO Ferry (2GO, FastCat, Starlite)',
            time: '1.5 Hours (FastCat) or 2.5 Hours (RORO)',
            cost: '₱400 - ₱550 + ₱30 Terminal Fee'
        },
        {
            route: 'Calapan to Southern Municipalities (Bulalacao/Roxas)',
            mode: 'Air-conditioned Van or Public Bus',
            time: '3.0 - 3.5 Hours',
            cost: '₱250 - ₱350 per pax'
        }
    ],
    packingList: [
        'Lightweight, breathable cotton clothing and quick-dry swimwear',
        'Reef-safe sunscreen and eco-friendly insect repellent',
        'Dry bags for island-hopping and waterfall visits',
        'Sturdy trekking sandals or water shoes for rocky beaches and falls',
        'Cash in Philippine Pesos (ATMs are widespread in Calapan and Puerto Galera, but limited in remote islands)',
        'Waterproof camera or phone pouch for coral reef photography'
    ],
    ecoRules: [
        'Strict "Leave No Trace" policy: carry out all personal trash and single-use plastics.',
        'Never touch, step on, or collect corals, giant clams, starfish, or sea shells.',
        'Use only reef-friendly mineral sunscreen (zinc oxide/titanium dioxide) to protect delicate corals.',
        'Show utmost respect to indigenous Mangyan communities. Always ask permission before photographing individuals or sacred ancestral domains.',
        'Support local artisans by buying authentic Hanunuo woven nito baskets and Mangyan handicrafts directly.'
    ]
};

export const FAQ_LIST = [
    {
        q: 'Do I need a passport or special permit to visit Oriental Mindoro?',
        a: 'No passport is needed for domestic travelers from anywhere in the Philippines. You only need a valid government-issued ID for port ticketing and hotel registration. Foreign tourists require standard Philippine tourist visas.'
    },
    {
        q: 'How frequently do ferries depart from Batangas Port to Oriental Mindoro?',
        a: 'Ferries and FastCraft operate virtually round-the-clock! Trips to Calapan City depart almost hourly (24/7) with FastCat, Montenegro, and Starlite. Trips to Balatero Port (Puerto Galera) depart every 1 to 2 hours between 5:00 AM and 5:30 PM.'
    },
    {
        q: 'What makes Oriental Mindoro’s scuba diving so renowned globally?',
        a: 'Puerto Galera sits along the Verde Island Passage, formally recognized by marine scientists as the "Center of the Center of Marine Shorefish Biodiversity on Earth." You will encounter thriving coral pinnacles, pygmy seahorses, sea turtles, and over 300 species of coral.'
    },
    {
        q: 'Can tourists visit the indigenous Mangyan villages?',
        a: 'Yes! Cultural education is encouraged at designated sites such as the Mangyan Heritage Center in Calapan and cultural villages in Puerto Galera and Mansalay. We urge visitors to practice respectful tourism, support local weavers, and observe tribal protocols.'
    },
    {
        q: 'Are ATMs and digital payments (GCash, Maya, Cards) accepted?',
        a: 'In Calapan City and Puerto Galera, credit cards and GCash are widely accepted in resorts, dive shops, and restaurants. For off-the-beaten-path areas like Bulalacao and Naujan lake tours, having sufficient Philippine Peso cash is highly recommended.'
    },
    {
        q: 'How does your tour booking and reservation process work?',
        a: 'You can submit a booking reservation directly through this website. You will receive an instant unique reference code (e.g. OM-2026-XXXX). Our provincial tour coordinator will verify availability and send confirmation instructions via email/SMS.'
    }
];
