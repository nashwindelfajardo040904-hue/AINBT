import React, { useState, useRef } from 'react';
import { 
    MapPin, 
    Clock, 
    Tag, 
    Star, 
    Calendar, 
    Eye, 
    ArrowUpRight, 
    Check, 
    X,
    Filter,
    Navigation,
    Compass,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

export default function AttractionsSection({ 
    attractions, 
    selectedCategory, 
    setSelectedCategory, 
    onBookAttraction,
    searchQuery = '',
    onClearSearch
}) {
    const [selectedAttraction, setSelectedAttraction] = useState(null);
    const [activeMunicipality, setActiveMunicipality] = useState('All');
    const attractionScrollRef = useRef(null);

    const scrollAttractions = (direction) => {
        if (attractionScrollRef.current) {
            const offset = direction === 'next' ? 290 : -290;
            attractionScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
        }
    };

    const categories = ['All', 'Beach & Marine', 'Eco-Tourism & Lakes', 'Waterfalls & Mountains', 'Cultural Heritage'];
    
    // Unique list of municipalities present
    const municipalities = ['All', ...new Set(attractions.map(a => a.municipality))];

    // Filter attractions
    const filtered = attractions.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesMun = activeMunicipality === 'All' || item.municipality === activeMunicipality;
        const q = (searchQuery || '').trim().toLowerCase();
        const matchesSearch = !q || 
            item.name.toLowerCase().includes(q) || 
            item.municipality.toLowerCase().includes(q) || 
            (item.category && item.category.toLowerCase().includes(q)) ||
            (item.description && item.description.toLowerCase().includes(q));
        return matchesCategory && matchesMun && matchesSearch;
    });

    return (
        <section id="attractions" className="py-12 sm:py-20 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                        <Compass className="w-3.5 h-3.5 text-emerald-600" />
                        Destination Showcase
                    </div>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
                        Iconic Attractions of Oriental Mindoro
                    </h2>
                    <p className="mt-3 sm:mt-4 text-xs sm:text-lg text-slate-600 leading-relaxed">
                        Explore our top-rated natural wonders, coral marine sanctuaries, dramatic mountain cascades, and rich cultural museums.
                    </p>
                </div>

                {/* Filters Row */}
                <div className="mt-8 sm:mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl max-w-full overflow-x-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-teal-600 text-white shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Municipality Quick Select */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Filter className="w-4 h-4 text-slate-500 shrink-0" />
                        <select
                            value={activeMunicipality}
                            onChange={(e) => setActiveMunicipality(e.target.value)}
                            className="bg-slate-100 border border-slate-200/80 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full md:w-48 cursor-pointer"
                        >
                            <option value="All">All Municipalities</option>
                            {municipalities.filter(m => m !== 'All').map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Active Search / Filter Banner */}
                {searchQuery && (
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-teal-50 border border-teal-200/90 text-teal-900 animate-in fade-in">
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                            <span className="font-semibold text-slate-700">Filter applied:</span>
                            <span className="font-bold bg-teal-600 text-white px-3 py-1 rounded-full text-xs shadow-2xs">
                                "{searchQuery}"
                            </span>
                            <span className="text-teal-800 text-xs">
                                ({filtered.length} destination{filtered.length === 1 ? '' : 's'} matched)
                            </span>
                        </div>
                        {onClearSearch && (
                            <button
                                onClick={onClearSearch}
                                className="px-3 py-1 rounded-lg bg-white border border-teal-300 hover:bg-teal-100 text-teal-800 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                                <span>Clear Search</span>
                            </button>
                        )}
                    </div>
                )}

                {/* Attractions Grid (Mobile: vertical compact cards, 3 visible on screen; Desktop: 3-col grid) */}
                <div 
                    ref={attractionScrollRef}
                    className="mt-6 md:mt-10 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-8 pb-3 md:pb-0"
                >
                    {filtered.map((attraction) => (
                        <div 
                            key={attraction.id}
                            className="w-full bg-white rounded-xl md:rounded-3xl overflow-hidden border border-slate-200/80 hover:border-teal-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-row md:flex-col justify-between group"
                        >
                            {/* Card Image Container */}
                            <div className="relative w-28 sm:w-36 h-28 sm:h-36 md:h-60 md:w-full shrink-0 overflow-hidden bg-slate-100">
                                <img 
                                    src={attraction.image_url} 
                                    alt={attraction.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                                {/* Municipality Tag */}
                                <div className="absolute top-1.5 left-1.5 md:top-3 md:left-3 px-1.5 md:px-3 py-0.5 md:py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[9px] md:text-xs font-semibold flex items-center gap-1">
                                    <MapPin className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-teal-400" />
                                    <span className="truncate max-w-[70px] md:max-w-none">{attraction.municipality}</span>
                                </div>

                                {/* Mobile Rating Badge */}
                                <div className="absolute bottom-1.5 left-1.5 md:hidden flex items-center gap-0.5 text-[9px] font-bold text-amber-300 bg-slate-900/80 px-1.5 py-0.5 rounded backdrop-blur-sm">
                                    <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                                    <span>{attraction.rating || '4.8'}</span>
                                </div>

                                {/* Desktop Price Badge */}
                                <div className="hidden md:block absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold shadow-sm">
                                    {attraction.price > 0 ? `₱${parseFloat(attraction.price).toLocaleString()} / pax` : 'Free Admission'}
                                </div>

                                {/* Desktop Category & Rating Strip */}
                                <div className="hidden md:flex absolute bottom-3 left-3 right-3 items-center justify-between text-white">
                                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md">
                                        {attraction.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-slate-900/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                                        <span>{attraction.rating || '4.8'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-2.5 sm:p-3 md:p-6 flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between gap-1">
                                        <h3 className="text-xs sm:text-sm md:text-xl font-bold text-slate-900 font-display group-hover:text-teal-700 transition-colors truncate md:whitespace-normal">
                                            {attraction.name}
                                        </h3>
                                        <span className="text-[10px] sm:text-xs font-bold text-emerald-700 md:hidden shrink-0">
                                            {attraction.price > 0 ? `₱${parseFloat(attraction.price).toLocaleString()}` : 'Free'}
                                        </span>
                                    </div>

                                    <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs md:text-sm text-slate-600 line-clamp-2 md:line-clamp-3 leading-relaxed">
                                        {attraction.description}
                                    </p>
                                </div>

                                {/* Key Features Snippets (Desktop Only) */}
                                {attraction.features && attraction.features.length > 0 && (
                                    <div className="hidden md:block pt-2 border-t border-slate-100 space-y-1 sm:space-y-1.5">
                                        {attraction.features.slice(0, 2).map((feat, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                <span className="truncate">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Card Details Footer: Duration & Availability (Desktop Only) */}
                                <div className="hidden md:flex pt-2.5 sm:pt-3 border-t border-slate-100 items-center justify-between text-xs text-slate-500">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                        <span>{attraction.duration || 'Flexible'}</span>
                                    </div>
                                    <span className="text-emerald-700 font-medium">{attraction.availability}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-1.5 md:pt-2 flex md:grid md:grid-cols-2 gap-1.5 md:gap-2">
                                    <button
                                        onClick={() => setSelectedAttraction(attraction)}
                                        className="flex-1 py-1 md:py-2.5 px-2 md:px-3 rounded-lg md:rounded-xl border border-slate-300 hover:border-teal-600 text-slate-700 hover:text-teal-700 text-[10px] md:text-xs font-semibold flex items-center justify-center gap-1 md:gap-1.5 transition-colors cursor-pointer"
                                    >
                                        <Eye className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                        <span>Details</span>
                                    </button>
                                    <button
                                        onClick={() => onBookAttraction(attraction)}
                                        className="flex-1 py-1 md:py-2.5 px-2 md:px-3 rounded-lg md:rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-[10px] md:text-xs font-semibold flex items-center justify-center gap-1 md:gap-1.5 shadow-xs transition-colors cursor-pointer"
                                    >
                                        <span>Inquire</span>
                                        <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-slate-500">
                        <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <h4 className="text-lg font-bold text-slate-800">No attractions match this filter</h4>
                        <p className="text-sm text-slate-500 mt-1">Try switching categories or view all municipalities.</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('All');
                                setActiveMunicipality('All');
                            }}
                            className="mt-4 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Attraction Modal Detail View */}
            {selectedAttraction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[88vh] sm:max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative m-2 sm:m-4">
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedAttraction(null)}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/70 text-white flex items-center justify-center hover:bg-slate-900 transition-colors shadow-md"
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        {/* Modal Header Image */}
                        <div className="relative h-36 sm:h-64 w-full shrink-0">
                            <img 
                                src={selectedAttraction.image_url} 
                                alt={selectedAttraction.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"></div>
                            
                            <div className="absolute bottom-4 left-6 right-6 text-white">
                                <span className="px-2.5 py-0.5 rounded-md bg-teal-600 text-xs font-bold uppercase tracking-wider">
                                    {selectedAttraction.category}
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-extrabold font-display mt-1">
                                    {selectedAttraction.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-1">
                                    <MapPin className="w-4 h-4 text-teal-400" />
                                    <span>{selectedAttraction.municipality}, Oriental Mindoro</span>
                                </p>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-5 sm:p-7 space-y-5 overflow-y-auto flex-1">
                            {/* Quick Stats Pill Bar */}
                            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                                <div>
                                    <span className="text-xs text-slate-500 uppercase font-semibold">Standard Fee</span>
                                    <p className="text-base font-bold text-teal-700 mt-0.5">
                                        {selectedAttraction.price > 0 ? `₱${parseFloat(selectedAttraction.price).toLocaleString()}` : 'Free'}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500 uppercase font-semibold">Duration</span>
                                    <p className="text-base font-bold text-slate-800 mt-0.5">
                                        {selectedAttraction.duration || 'Flexible'}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500 uppercase font-semibold">Operating Hours</span>
                                    <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-1 truncate">
                                        {selectedAttraction.availability}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm font-display uppercase tracking-wider text-slate-500">About This Attraction</h4>
                                <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                                    {selectedAttraction.description}
                                </p>
                            </div>

                            {/* Highlights */}
                            {selectedAttraction.highlights && (
                                <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-100">
                                    <h4 className="font-bold text-teal-900 text-xs uppercase tracking-wider">Tourism Highlight</h4>
                                    <p className="mt-1 text-xs sm:text-sm text-teal-800">
                                        {selectedAttraction.highlights}
                                    </p>
                                </div>
                            )}

                            {/* Inclusions / Features */}
                            {selectedAttraction.features && (
                                <div>
                                    <h4 className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-2">Key Features & Inclusions</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                                        {selectedAttraction.features.map((feat, idx) => (
                                             <div key={idx} className="flex items-center gap-2">
                                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* How to Get There */}
                            {selectedAttraction.how_to_get_there && (
                                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                                    <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                                        <Navigation className="w-3.5 h-3.5 text-teal-600" />
                                        <span>How to Get There</span>
                                    </h4>
                                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                                        {selectedAttraction.how_to_get_there}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Modal Action CTA Footer */}
                        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/80 shrink-0 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setSelectedAttraction(null)}
                                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
                            >
                                Close
                            </button>

                            <button
                                onClick={() => {
                                    const attr = selectedAttraction;
                                    setSelectedAttraction(null);
                                    onBookAttraction(attr);
                                }}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
                            >
                                <Calendar className="w-4 h-4" />
                                <span>Book This Spot</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
