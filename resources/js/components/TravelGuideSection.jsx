import React, { useState, useRef } from 'react';
import { 
    Compass, 
    Ship, 
    Sun, 
    Luggage, 
    ShieldAlert, 
    HeartHandshake, 
    Leaf, 
    Wallet, 
    PhoneCall, 
    ChevronDown, 
    ChevronUp,
    Sparkles,
    CheckCircle,
    AlertTriangle,
    Clock,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { EMERGENCY_HOTLINES, TRAVEL_GUIDELINES } from '../data/mindoroData';

export default function TravelGuideSection() {
    const [openTab, setOpenTab] = useState('transit');

    const transitScrollRef = useRef(null);
    const etiquetteScrollRef = useRef(null);
    const budgetScrollRef = useRef(null);
    const hotlineScrollRef = useRef(null);

    const scrollRef = (ref, direction, amount = 280) => {
        if (ref.current) {
            const offset = direction === 'next' ? amount : -amount;
            ref.current.scrollBy({ left: offset, behavior: 'smooth' });
        }
    };

    const budgetBreakdown = [
        {
            tier: 'Backpacker / Solo Explorer',
            daily: '₱1,500 - ₱2,200',
            stay: 'Hostels / Native Cottages (₱500 - ₱900)',
            meals: 'Local eateries, Carinderias, fresh seafood grill (₱150 - ₱250/meal)',
            transit: 'Public jeepneys, shared tricycles, RORO ferry'
        },
        {
            tier: 'Mid-Range / Family Leisure',
            daily: '₱3,500 - ₱5,500',
            stay: 'Beachfront Resorts & Boutique City Hotels (₱2,200 - ₱4,000)',
            meals: 'Beach bistro dining, seafood boodle fights (₱400 - ₱700/meal)',
            transit: 'FastCat, private aircon vans, rented charter motorized banca'
        }
    ];

    return (
        <section id="guide" className="py-12 sm:py-20 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                        <Compass className="w-3.5 h-3.5 text-emerald-600" />
                        Practical Tourist Guide & Advisory
                    </div>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
                        Plan Your Visit to Oriental Mindoro
                    </h2>
                    <p className="mt-3 sm:mt-4 text-xs sm:text-lg text-slate-600 leading-relaxed">
                        Everything you need to know before you set sail: transportation routes from Batangas Port, weather considerations, cultural etiquette, packing tips, and emergency contacts.
                    </p>
                </div>

                {/* Guide Navigation Tabs */}
                <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 border-b border-slate-200 pb-3 sm:pb-4">
                    <button
                        onClick={() => setOpenTab('transit')}
                        className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                            openTab === 'transit'
                                ? 'bg-teal-600 text-white shadow-md'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                    >
                        <Ship className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Ferry & Transit Routes</span>
                    </button>

                    <button
                        onClick={() => setOpenTab('etiquette')}
                        className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                            openTab === 'etiquette'
                                ? 'bg-teal-600 text-white shadow-md'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                    >
                        <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Culture & Eco-Guidelines</span>
                    </button>

                    <button
                        onClick={() => setOpenTab('budget')}
                        className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                            openTab === 'budget'
                                ? 'bg-teal-600 text-white shadow-md'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                    >
                        <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Estimated Budget</span>
                    </button>

                    <button
                        onClick={() => setOpenTab('hotlines')}
                        className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                            openTab === 'hotlines'
                                ? 'bg-rose-600 text-white shadow-md'
                                : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                        }`}
                    >
                        <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Emergency Hotlines</span>
                    </button>
                </div>

                {/* Tab Contents */}
                <div className="mt-6 sm:mt-8">
                    {/* 1. Transit & Routes Tab */}
                    {openTab === 'transit' && (
                        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
                            {/* Best Time Banner */}
                            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
                                    <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-amber-900 text-sm sm:text-base font-display">
                                        {TRAVEL_GUIDELINES.bestTimeToVisit.title}
                                    </h4>
                                    <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-amber-800 leading-relaxed">
                                        {TRAVEL_GUIDELINES.bestTimeToVisit.details}
                                    </p>
                                </div>
                            </div>

                            {/* Routes List (Mobile: clean 1-col compact list, Desktop: 2-col grid) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                {TRAVEL_GUIDELINES.howToGetThere.map((route, idx) => (
                                    <div 
                                        key={idx} 
                                        className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition-colors flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-teal-700">Leg {idx + 1}</span>
                                                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 flex items-center gap-1 shadow-2xs">
                                                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600 shrink-0" />
                                                    <span>{route.time}</span>
                                                </span>
                                            </div>
                                            <h4 className="text-xs sm:text-base font-bold text-slate-900 font-display mt-1.5">{route.route}</h4>
                                            <p className="text-[10px] sm:text-xs font-semibold text-slate-600 mt-0.5">Vehicle: {route.mode}</p>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-slate-500 mt-2 pt-1.5 border-t border-slate-200">
                                            <strong>Estimated Fare:</strong> {route.cost}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 2. Culture & Eco Rules Tab */}
                    {openTab === 'etiquette' && (
                        <div className="space-y-3 animate-in fade-in duration-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-8">
                                {/* Eco Guidelines */}
                                <div className="bg-emerald-50/70 p-4 sm:p-8 rounded-xl sm:rounded-3xl border border-emerald-200/80">
                                    <h4 className="text-sm sm:text-lg font-bold text-emerald-950 font-display flex items-center gap-2">
                                        <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                                        <span>Ecological Preservation Rules</span>
                                    </h4>
                                    <ul className="mt-2.5 sm:mt-4 space-y-2 sm:space-y-3">
                                        {TRAVEL_GUIDELINES.ecoRules.map((rule, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-emerald-900 leading-relaxed">
                                                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                <span>{rule}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Packing Recommendations */}
                                <div className="bg-slate-50 p-4 sm:p-8 rounded-xl sm:rounded-3xl border border-slate-200">
                                    <h4 className="text-sm sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                                        <Luggage className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                                        <span>What to Bring (Packing Essentials)</span>
                                    </h4>
                                    <ul className="mt-2.5 sm:mt-4 space-y-2 sm:space-y-3">
                                        {TRAVEL_GUIDELINES.packingList.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. Budget Tab */}
                    {openTab === 'budget' && (
                        <div className="space-y-3 animate-in fade-in duration-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-6">
                                {budgetBreakdown.map((b, idx) => (
                                    <div key={idx} className="p-4 sm:p-8 rounded-xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
                                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                                            {b.tier}
                                        </span>
                                        <div className="text-xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2 sm:mt-4">
                                            {b.daily} <span className="text-[10px] sm:text-xs font-normal text-slate-500">/ day / person</span>
                                        </div>

                                        <div className="mt-3 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-2.5 sm:pt-4">
                                            <div>
                                                <span className="font-bold text-slate-800">Accommodation:</span>
                                                <p className="text-slate-600 mt-0.5">{b.stay}</p>
                                            </div>
                                            <div>
                                                <span className="font-bold text-slate-800">Food & Dining:</span>
                                                <p className="text-slate-600 mt-0.5">{b.meals}</p>
                                            </div>
                                            <div>
                                                <span className="font-bold text-slate-800">Transportation:</span>
                                                <p className="text-slate-600 mt-0.5">{b.transit}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 4. Hotlines Tab */}
                    {openTab === 'hotlines' && (
                        <div className="space-y-3 sm:space-y-4 animate-in fade-in duration-200">
                            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-900 flex items-center gap-2 sm:gap-3">
                                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 shrink-0" />
                                <span>Save these numbers prior to travel. In case of coastal typhoons or emergency coast guard warnings, dispatch centers provide real-time sea advisory bulletins.</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                                {EMERGENCY_HOTLINES.map((hotline, idx) => (
                                    <div key={idx} className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-300 transition-colors flex flex-col justify-between">
                                        <div className="flex items-center justify-between text-[10px] sm:text-xs font-semibold text-slate-500 mb-0.5">
                                            <span>{hotline.available}</span>
                                        </div>
                                        <h5 className="font-bold text-slate-900 text-[11px] sm:text-sm font-display truncate">{hotline.name}</h5>
                                        <p className="text-xs sm:text-base font-bold text-rose-600 font-mono mt-1.5 flex items-center gap-1">
                                            <PhoneCall className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                                            <span className="truncate">{hotline.number}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
