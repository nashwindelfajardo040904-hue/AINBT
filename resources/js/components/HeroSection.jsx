import React, { useState } from 'react';
import { 
    Search, 
    MapPin, 
    Sparkles, 
    ArrowRight, 
    Compass, 
    ShieldCheck, 
    Waves, 
    Mountain, 
    Award,
    CalendarCheck
} from 'lucide-react';

export default function HeroSection({ onOpenBooking, onSearch, onSelectCategory }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMun, setSelectedMun] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch({ searchTerm, municipality: selectedMun });
        const el = document.getElementById('attractions');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const quickBadges = [
        { label: 'All Sights', cat: 'All' },
        { label: 'Beaches & Diving', cat: 'Beach & Marine' },
        { label: 'Lakes & Eco-Parks', cat: 'Eco-Tourism & Lakes' },
        { label: 'Waterfalls & Peaks', cat: 'Waterfalls & Mountains' },
        { label: 'Mangyan Heritage', cat: 'Cultural Heritage' },
    ];

    return (
        <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
            {/* Background Image with Rich Coastal Gradient */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85" 
                    alt="Oriental Mindoro Coastline"
                    className="w-full h-full object-cover object-center transform scale-105 animate-pulse duration-[8000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-teal-950/70"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
            </div>

            {/* Glowing Accent Orbs */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-6">
                {/* Government & Destination Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide uppercase text-teal-300 mb-6 shadow-inner animate-in fade-in duration-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Official Tourism & Tour Portal • Province of Oriental Mindoro</span>
                </div>

                {/* Primary Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-white max-w-5xl mx-auto leading-tight drop-shadow-md">
                    Where Emerald Mountains <br className="hidden sm:inline" />
                    Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400">Sapphire Seas</span>
                </h1>

                {/* Tagline / Subtitle */}
                <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-200/90 max-w-3xl mx-auto leading-relaxed font-normal">
                    Experience the gateway to paradise in Oriental Mindoro. From the world-class dive waters of Puerto Galera and serene Naujan Lake, to the pristine virgin sandbars of Bulalacao and living Mangyan cultural heritage.
                </p>

                {/* Quick Interactive Search Bar */}
                <div className="mt-8 max-w-3xl mx-auto">
                    <form 
                        onSubmit={handleSearchSubmit}
                        className="p-2 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/40 flex flex-col sm:flex-row gap-2.5 items-center text-slate-800"
                    >
                        <div className="flex-1 w-full flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80">
                            <Search className="w-5 h-5 text-teal-600 shrink-0" />
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search destinations (e.g., White Beach, Tamaraw Falls, Bulalacao)..."
                                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                            />
                        </div>

                        <div className="w-full sm:w-56 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80">
                            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                            <select 
                                value={selectedMun}
                                onChange={(e) => setSelectedMun(e.target.value)}
                                className="w-full bg-transparent text-sm text-slate-700 focus:outline-none cursor-pointer"
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

                        <button 
                            type="submit"
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-sm tracking-wide shadow-md shadow-teal-700/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            <span>Explore</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Quick Category Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                        <span className="text-slate-300 font-medium mr-1">Popular:</span>
                        {quickBadges.map((badge, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    onSelectCategory(badge.cat);
                                    const el = document.getElementById('attractions');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all backdrop-blur-sm"
                            >
                                {badge.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <button
                        onClick={() => onOpenBooking()}
                        className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 hover:from-teal-400 hover:to-emerald-400 text-white shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <CalendarCheck className="w-5 h-5" />
                        <span>Book a Tour Package</span>
                    </button>

                    <button
                        onClick={() => {
                            const el = document.getElementById('packages');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <Compass className="w-5 h-5 text-teal-300" />
                        <span>View Sample Itineraries</span>
                    </button>
                </div>

                {/* Key Metrics / Credibility Strip */}
                <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10">
                        <div className="text-2xl sm:text-3xl font-extrabold font-display text-teal-300">15</div>
                        <p className="text-xs text-slate-300 uppercase tracking-wider font-semibold mt-1">Municipalities & City</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10">
                        <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-300">30+</div>
                        <p className="text-xs text-slate-300 uppercase tracking-wider font-semibold mt-1">World-Class Dive Sites</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10">
                        <div className="text-2xl sm:text-3xl font-extrabold font-display text-cyan-300">5th Largest</div>
                        <p className="text-xs text-slate-300 uppercase tracking-wider font-semibold mt-1">Lake in the Philippines</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10">
                        <div className="text-2xl sm:text-3xl font-extrabold font-display text-amber-300">UNESCO</div>
                        <p className="text-xs text-slate-300 uppercase tracking-wider font-semibold mt-1">Biosphere Reserve</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
