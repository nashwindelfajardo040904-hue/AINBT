import React, { useState } from 'react';
import { 
    Image as ImageIcon, 
    Sparkles, 
    Maximize2, 
    X, 
    ChevronLeft, 
    ChevronRight,
    MapPin
} from 'lucide-react';

export default function GallerySection() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const photos = [
        {
            id: 1,
            title: 'White Beach Sunset Horizon',
            location: 'Puerto Galera',
            category: 'Beaches',
            url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            caption: 'Fiery tropical sunset casting warm hues over White Beach resort coastline.',
            credit: 'Mindoro Horizons Media'
        },
        {
            id: 2,
            title: 'Tamaraw Falls Cascade Basin',
            location: 'San Teodoro',
            category: 'Waterfalls',
            url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
            caption: 'Natural cold spring swimming pools fed by the 423-foot twin cascades.',
            credit: 'Provincial Tourism Office'
        },
        {
            id: 3,
            title: 'Dawn Over Naujan Lake Sanctuary',
            location: 'Naujan / Victoria',
            category: 'Lakes & Eco',
            url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
            caption: 'Ramsar wetland sanctuary reflecting morning skies and migratory waterfowl habitat.',
            credit: 'Biodiversity Management Bureau'
        },
        {
            id: 4,
            title: 'Aslom Crescent Sandbar',
            location: 'Bulalacao',
            category: 'Beaches',
            url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
            caption: 'Powdery curved sandbar surrounded by sapphire and emerald coral lagoons.',
            credit: 'Bulalacao Tourism Council'
        },
        {
            id: 5,
            title: 'Verde Island Passage Coral Pinnacles',
            location: 'Puerto Galera (Sabang)',
            category: 'Marine Life',
            url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
            caption: 'Pristine underwater sea turtle feeding along vibrant soft coral walls.',
            credit: 'PADI Dive Center Mindoro'
        },
        {
            id: 6,
            title: 'Hanunuo Mangyan Heritage Craft',
            location: 'Calapan & Mansalay',
            category: 'Culture',
            url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
            caption: 'Authentic intricate handwoven nito crafts and ancient Ambahan poem bamboo scripts.',
            credit: 'Mangyan Heritage Center'
        },
        {
            id: 7,
            title: 'Calapan Mangrove Canopy Walkway',
            location: 'Calapan City',
            category: 'Lakes & Eco',
            url: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1200&q=80',
            caption: '1-kilometer raised bamboo trail through century-old protected bakawan forests.',
            credit: 'City Environment & Natural Resources Office'
        },
        {
            id: 8,
            title: 'Misty Halcon Mountain Ridges',
            location: 'Baco',
            category: 'Mountains',
            url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
            caption: 'Dramatic ridges and cloud forests of Mt. Halcon, the 2,586m crown of Mindoro.',
            credit: 'Halcon Mountaineers Alliance'
        },
        {
            id: 9,
            title: 'Golden Mindoro Banana Chips & Delicacies',
            location: 'Victoria & Calapan',
            category: 'Culture',
            url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
            caption: 'Traditional artisan delicacies, freshly harvested tropical fruits, and native coffee.',
            credit: 'DTI Oriental Mindoro'
        }
    ];

    const filterCategories = ['All', 'Beaches', 'Waterfalls', 'Lakes & Eco', 'Marine Life', 'Culture', 'Mountains'];

    const filteredPhotos = activeFilter === 'All' 
        ? photos 
        : photos.filter(p => p.category === activeFilter);

    return (
        <section id="gallery" className="py-20 bg-slate-100/60 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
                        <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
                        Visual Tourism Showcase
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
                        Postcards from Oriental Mindoro
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                        Immerse yourself in breathtaking captures of our sapphire waters, tranquil lake reflections, living indigenous traditions, and dramatic tropical mountains.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                    {filterCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                                activeFilter === cat
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Photo Grid */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPhotos.map((photo) => (
                        <div
                            key={photo.id}
                            onClick={() => setSelectedPhoto(photo)}
                            className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200"
                        >
                            <img 
                                src={photo.url} 
                                alt={photo.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

                            {/* Hover Expansion Icon */}
                            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 className="w-4 h-4" />
                            </div>

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4 px-2.5 py-0.5 rounded-md bg-teal-600 text-white text-[11px] font-bold">
                                {photo.category}
                            </div>

                            {/* Bottom Caption Overlay */}
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <p className="text-xs text-teal-300 font-semibold flex items-center gap-1 mb-0.5">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>{photo.location}</span>
                                </p>
                                <h4 className="text-base font-bold font-display group-hover:text-teal-200 transition-colors">
                                    {photo.title}
                                </h4>
                                <p className="text-xs text-slate-300 line-clamp-1 mt-1">
                                    {photo.caption}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedPhoto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="max-h-[70vh] w-full flex items-center justify-center bg-black">
                            <img 
                                src={selectedPhoto.url} 
                                alt={selectedPhoto.title}
                                className="max-h-[70vh] w-full object-contain"
                            />
                        </div>

                        {/* Modal Footer Caption */}
                        <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded bg-teal-600 text-xs font-bold uppercase">
                                        {selectedPhoto.category}
                                    </span>
                                    <span className="text-xs text-teal-400 font-medium flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {selectedPhoto.location}, Oriental Mindoro
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold font-display mt-1 text-white">
                                    {selectedPhoto.title}
                                </h3>
                                <p className="text-xs text-slate-300 mt-1">
                                    {selectedPhoto.caption}
                                </p>
                            </div>

                            <div className="text-right text-[11px] text-slate-400 shrink-0">
                                <span>Photo Credit:</span>
                                <p className="font-semibold text-slate-200">{selectedPhoto.credit}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
