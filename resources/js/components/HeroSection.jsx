import React, { useState, useEffect, useRef } from 'react';
import { 
    Search, 
    MapPin, 
    Sparkles, 
    ArrowRight, 
    Compass, 
    CalendarCheck,
    X,
    Palmtree,
    Star
} from 'lucide-react';

export default function HeroSection({ onOpenBooking, onSearch, onSelectCategory, attractions = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMun, setSelectedMun] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const searchContainerRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter and smartly rank suggestions
    const getFilteredSuggestions = () => {
        if (!attractions || attractions.length === 0) return [];

        const term = searchTerm.trim().toLowerCase();
        let list = [...attractions];

        // Filter by municipality if chosen
        if (selectedMun) {
            list = list.filter(a => a.municipality?.toLowerCase() === selectedMun.toLowerCase());
        }

        if (!term) {
            // Default choices when clicked with empty input
            return list.slice(0, 6);
        }

        // Rank choices:
        // Score 1: Name starts with search term (e.g. 'W' -> 'White Beach' gets top score)
        // Score 2: Any word in name starts with search term
        // Score 3: Municipality starts with search term
        // Score 4: Name contains search term
        // Score 5: Category or description contains search term
        const scored = [];

        list.forEach(item => {
            const nameLower = (item.name || '').toLowerCase();
            const munLower = (item.municipality || '').toLowerCase();
            const catLower = (item.category || '').toLowerCase();

            let score = 999;

            if (nameLower.startsWith(term)) {
                score = 1;
            } else {
                const words = nameLower.split(/\s+/);
                if (words.some(w => w.startsWith(term))) {
                    score = 2;
                } else if (munLower.startsWith(term)) {
                    score = 3;
                } else if (nameLower.includes(term)) {
                    score = 4;
                } else if (catLower.includes(term)) {
                    score = 5;
                }
            }

            if (score <= 5) {
                scored.push({ item, score });
            }
        });

        // Sort ascending by score, then alphabetically
        scored.sort((a, b) => {
            if (a.score !== b.score) return a.score - b.score;
            return a.item.name.localeCompare(b.item.name);
        });

        return scored.map(s => s.item);
    };

    const suggestions = getFilteredSuggestions();

    const handleSelectSuggestion = (attraction) => {
        setSearchTerm(attraction.name);
        if (attraction.municipality) {
            setSelectedMun(attraction.municipality);
        }
        setIsDropdownOpen(false);
        onSearch({ searchTerm: attraction.name, municipality: attraction.municipality });
        const el = document.getElementById('attractions');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setIsDropdownOpen(false);
        onSearch({ searchTerm, municipality: selectedMun });
        const el = document.getElementById('attractions');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handleKeyDown = (e) => {
        if (!isDropdownOpen || suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
            e.preventDefault();
            handleSelectSuggestion(suggestions[highlightedIndex]);
        } else if (e.key === 'Escape') {
            setIsDropdownOpen(false);
        }
    };

    const quickBadges = [
        { label: 'All Sights', cat: 'All' },
        { label: 'Beaches & Diving', cat: 'Beach & Marine' },
        { label: 'Lakes & Eco-Parks', cat: 'Eco-Tourism & Lakes' },
        { label: 'Waterfalls & Peaks', cat: 'Waterfalls & Mountains' },
        { label: 'Mangyan Heritage', cat: 'Cultural Heritage' },
    ];

    // Helper to highlight matching letters
    const highlightMatch = (text, query) => {
        if (!query) return text;
        const q = query.trim();
        const index = text.toLowerCase().indexOf(q.toLowerCase());
        if (index === -1) return text;
        return (
            <>
                {text.slice(0, index)}
                <strong className="text-teal-600 font-extrabold">{text.slice(index, index + q.length)}</strong>
                {text.slice(index + q.length)}
            </>
        );
    };

    return (
        <section id="home" className="relative min-h-0 sm:min-h-[92vh] flex items-center justify-center pt-20 sm:pt-24 pb-8 sm:pb-16 overflow-hidden">
            {/* Background Image & Glowing Accent Orbs (Clipped inside overflow-hidden background) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img 
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85" 
                    alt="Oriental Mindoro Coastline"
                    className="w-full h-full object-cover object-center transform scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-teal-950/70"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>

                {/* Glowing Accent Orbs */}
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-20 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 text-center text-white mt-2 sm:mt-6 w-full">
                {/* Destination Tag */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold tracking-wide uppercase text-teal-300 mb-3 sm:mb-6 shadow-inner animate-in fade-in duration-500">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Oriental Mindoro Tourism Portal</span>
                </div>

                {/* Primary Headline */}
                <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-white max-w-5xl mx-auto leading-tight drop-shadow-md">
                    Where Emerald Mountains <br className="hidden sm:inline" />
                    Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400">Sapphire Seas</span>
                </h1>

                {/* Tagline / Subtitle */}
                <p className="mt-2.5 sm:mt-6 text-xs sm:text-lg md:text-xl text-slate-200/90 max-w-3xl mx-auto leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                    Experience the gateway to paradise in Oriental Mindoro. From the world-class dive waters of Puerto Galera and serene Naujan Lake, to the pristine virgin sandbars of Bulalacao and living Mangyan cultural heritage.
                </p>

                {/* Quick Interactive Search Bar with Live Recommendations */}
                <div ref={searchContainerRef} className="mt-5 sm:mt-8 max-w-3xl mx-auto relative z-40 w-full">
                    {/* Search Input Bar & Attached Dropdown Container */}
                    <div className="relative">
                        <form 
                            onSubmit={handleSearchSubmit}
                            className="p-1.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/60 flex flex-col sm:flex-row gap-2 sm:gap-2.5 items-center text-slate-800"
                        >
                            {/* Search Text Input */}
                            <div className="flex-1 w-full flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-50 rounded-lg sm:rounded-xl border border-slate-200/80 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
                                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0" />
                                <input 
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setIsDropdownOpen(true);
                                        setHighlightedIndex(-1);
                                    }}
                                    onFocus={() => setIsDropdownOpen(true)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search destinations (e.g. White Beach, Tamaraw...)"
                                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearchTerm('');
                                            onSearch({ searchTerm: '', municipality: selectedMun });
                                        }}
                                        className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
                                        title="Clear search"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            {/* Municipality Select */}
                            <div className="w-full sm:w-56 flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-50 rounded-lg sm:rounded-xl border border-slate-200/80">
                                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                                <select 
                                    value={selectedMun}
                                    onChange={(e) => {
                                        setSelectedMun(e.target.value);
                                        onSearch({ searchTerm, municipality: e.target.value });
                                    }}
                                    className="w-full bg-transparent text-xs sm:text-sm text-slate-700 focus:outline-none cursor-pointer"
                                >
                                    <option value="">All Municipalities</option>
                                    <option value="Puerto Galera">Puerto Galera</option>
                                    <option value="Calapan City">Calapan City</option>
                                    <option value="Naujan">Naujan</option>
                                    <option value="San Teodoro">San Teodoro</option>
                                    <option value="Bulalacao">Bulalacao</option>
                                    <option value="Baco">Baco</option>
                                    <option value="Mansalay">Mansalay</option>
                                </select>
                            </div>

                            {/* Explore CTA Button */}
                            <button 
                                type="submit"
                                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-teal-700/30 flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0 cursor-pointer"
                            >
                                <span>Explore</span>
                                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                        </form>

                        {/* Suggestions Dropdown (Directly under search bar, zero gap, floating on top of everything) */}
                        {isDropdownOpen && (
                            <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-50 text-left text-slate-800 animate-in fade-in slide-in-from-top-1 duration-150">
                                <div className="px-3.5 py-2 sm:py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <span>{searchTerm ? `Matches (${suggestions.length})` : 'Popular Destinations'}</span>
                                    {searchTerm && <span className="text-[10px] text-teal-600 font-semibold">Sorted</span>}
                                </div>

                                <div className="max-h-56 sm:max-h-72 overflow-y-auto divide-y divide-slate-100">
                                    {suggestions.length > 0 ? (
                                        suggestions.map((item, index) => {
                                            const isHighlighted = highlightedIndex === index;
                                            return (
                                                <div
                                                    key={item.id || index}
                                                    onClick={() => handleSelectSuggestion(item)}
                                                    onMouseEnter={() => setHighlightedIndex(index)}
                                                    className={`px-3 sm:px-4 py-2 sm:py-3 cursor-pointer flex items-center justify-between transition-colors ${
                                                        isHighlighted ? 'bg-teal-50/90 text-teal-900' : 'hover:bg-slate-50'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                                                            <Palmtree className="w-3.5 h-3.5" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                                                {highlightMatch(item.name, searchTerm)}
                                                            </h4>
                                                            <p className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                                                                <MapPin className="w-2.5 h-2.5 text-teal-600 shrink-0" />
                                                                <span className="truncate">{highlightMatch(item.municipality, searchTerm)}</span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 shrink-0">
                                                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] sm:text-[10px] font-semibold hidden sm:inline-block">
                                                            {item.category}
                                                        </span>
                                                        <ArrowRight className="w-3.5 h-3.5 text-teal-600 opacity-60" />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="px-4 py-6 text-center text-xs text-slate-500">
                                            <p className="font-semibold text-slate-700">No destinations found for "{searchTerm}"</p>
                                            <p className="mt-1 text-slate-400">Try "White Beach", "Tamaraw", or "Naujan".</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 1. Popular Badges Row (Mobile: wrap neatly within screen width, no horizontal scroll) */}
                    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mt-2.5 sm:mt-4 text-xs relative z-10 py-1 px-1 max-w-full">
                        <span className="text-slate-300 font-medium mr-1 shrink-0 text-[10px] sm:text-xs">Popular:</span>
                        {quickBadges.map((badge, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    onSelectCategory(badge.cat);
                                    const el = document.getElementById('attractions');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all backdrop-blur-sm text-[10px] sm:text-xs cursor-pointer"
                            >
                                {badge.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Horizontal 2-Button Action Row (Mobile: 1 row side-by-side, no overflow) */}
                <div className="mt-4 sm:mt-8 flex flex-row items-center justify-center gap-2 sm:gap-4 w-full max-w-md mx-auto relative z-10 px-1">
                    <button
                        onClick={() => onOpenBooking()}
                        className="flex-1 sm:flex-initial px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 hover:from-teal-400 hover:to-emerald-400 text-white shadow-xl shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 sm:gap-2 truncate cursor-pointer"
                    >
                        <CalendarCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0" />
                        <span className="truncate">Book a Tour</span>
                    </button>

                    <button
                        onClick={() => {
                            const el = document.getElementById('packages');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex-1 sm:flex-initial px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 sm:gap-2 truncate cursor-pointer"
                    >
                        <Compass className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-teal-300 shrink-0" />
                        <span className="truncate">View Itineraries</span>
                    </button>
                </div>

                {/* 3. Metrics Strip (4 columns grid, fits 100% on phone screen without sliding!) */}
                <div className="mt-4 sm:mt-14 pt-3 sm:pt-8 border-t border-white/15 grid grid-cols-4 gap-1 sm:gap-6 text-center py-1 px-1 relative z-10 w-full max-w-4xl mx-auto">
                    <div className="p-1 sm:p-3 rounded-lg sm:rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10">
                        <div className="text-sm sm:text-3xl font-extrabold font-display text-teal-300">15</div>
                        <p className="text-[8px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-0.5 sm:mt-1 truncate">Municipalities</p>
                    </div>

                    <div className="p-1 sm:p-3 rounded-lg sm:rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10">
                        <div className="text-sm sm:text-3xl font-extrabold font-display text-emerald-300">30+</div>
                        <p className="text-[8px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-0.5 sm:mt-1 truncate">Dive Sites</p>
                    </div>

                    <div className="p-1 sm:p-3 rounded-lg sm:rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10">
                        <div className="text-sm sm:text-3xl font-extrabold font-display text-cyan-300">5th</div>
                        <p className="text-[8px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-0.5 sm:mt-1 truncate">Largest Lake</p>
                    </div>

                    <div className="p-1 sm:p-3 rounded-lg sm:rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10">
                        <div className="text-sm sm:text-3xl font-extrabold font-display text-amber-300">UNESCO</div>
                        <p className="text-[8px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-0.5 sm:mt-1 truncate">Reserve</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
