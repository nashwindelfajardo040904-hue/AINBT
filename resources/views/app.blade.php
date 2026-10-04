<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>MINDORO HORIZONS | Official Tourism & Tour Operator Portal - Oriental Mindoro, Philippines</title>
    <meta name="description" content="Explore Oriental Mindoro: Discover Puerto Galera white beaches & diving, Tamaraw Falls, Naujan Lake eco-safari, Bulalacao virgin sandbars, and indigenous Mangyan cultural heritage.">
    <meta name="keywords" content="Oriental Mindoro, Puerto Galera, White Beach, Bulalacao, Tamaraw Falls, Naujan Lake, Mount Halcon, Mangyan Heritage, Tourism Philippines">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- Vite React & CSS -->
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-slate-50 text-slate-800 antialiased font-sans selection:bg-teal-600 selection:text-white min-h-screen overflow-x-hidden">
    <div id="root" class="overflow-x-hidden min-h-screen"></div>
</body>
</html>
