import React, { useState } from 'react';
import { 
    Calendar, 
    Clock, 
    Users, 
    CheckCircle2, 
    XCircle, 
    ChevronDown, 
    ChevronUp, 
    ArrowRight, 
    MapPin, 
    Sparkles,
    FileText
} from 'lucide-react';

export default function PackagesSection({ packages, onSelectPackage }) {
    const [expandedPackage, setExpandedPackage] = useState(packages[0]?.id || 1);
    const [activeTabDay, setActiveTabDay] = useState({});

    const toggleExpand = (id) => {
        setExpandedPackage(expandedPackage === id ? null : id);
    };

    return (
        <section id="packages" className="py-20 bg-slate-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                        Curated Tour Packages & Itineraries
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
                        Signature Mindoro Experiences
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                        Handcrafted multi-day packages designed by accredited local tourism specialists. Includes full transport, licensed tour guides, accommodations, and ecological permits.
                    </p>
                </div>

                {/* Packages List */}
                <div className="mt-14 space-y-8">
                    {packages.map((pkg, index) => {
                        const isExpanded = expandedPackage === pkg.id;
                        const selectedDay = activeTabDay[pkg.id] || 1;

                        return (
                            <div 
                                key={pkg.id}
                                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                {/* Package Card Summary Row */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
                                    {/* Thumbnail Image */}
                                    <div className="lg:col-span-4 relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100">
                                        <img 
                                            src={pkg.image_url} 
                                            alt={pkg.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5 text-teal-400" />
                                            <span>{pkg.duration}</span>
                                        </div>

                                        <div className="absolute bottom-3 left-3 right-3 p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-900 text-xs">
                                            <p className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Target Market</p>
                                            <p className="font-bold truncate text-slate-800">{pkg.target_market}</p>
                                        </div>
                                    </div>

                                    {/* Middle Details */}
                                    <div className="lg:col-span-5 space-y-4">
                                        <div className="inline-block px-3 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold">
                                            Package #{index + 1}
                                        </div>

                                        <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                                            {pkg.title}
                                        </h3>

                                        <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                                            <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span><strong>Destinations:</strong> {pkg.destinations}</span>
                                        </div>

                                        {/* Inclusions Highlights */}
                                        <div className="space-y-1.5 pt-2 border-t border-slate-100">
                                            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Top Inclusions:</p>
                                            {pkg.inclusions.slice(0, 3).map((inc, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                    <span className="truncate">{inc}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right Pricing & Actions */}
                                    <div className="lg:col-span-3 flex flex-col justify-between items-start lg:items-end lg:text-right border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 space-y-4">
                                        <div>
                                            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Estimated Package Rate</span>
                                            <div className="text-3xl sm:text-4xl font-extrabold text-teal-700 font-display mt-0.5">
                                                ₱{parseFloat(pkg.price).toLocaleString()}
                                            </div>
                                            <span className="text-xs text-slate-500 font-medium">per guest • all-in taxes</span>
                                        </div>

                                        <div className="w-full flex flex-col gap-2">
                                            <button
                                                onClick={() => onSelectPackage(pkg)}
                                                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                            >
                                                <span>Book This Package</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => toggleExpand(pkg.id)}
                                                className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                                            >
                                                <span>{isExpanded ? 'Hide Daily Itinerary' : 'View Full Itinerary'}</span>
                                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Itinerary & Full Breakdown Drawer */}
                                {isExpanded && (
                                    <div className="bg-slate-50/80 border-t border-slate-200/80 p-6 sm:p-8 animate-in slide-in-from-top-4 duration-300">
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                            {/* Digital Itinerary Timeline (Left 7 Cols) */}
                                            <div className="lg:col-span-7 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-extrabold text-slate-900 text-base font-display flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-teal-600" />
                                                        <span>Day-by-Day Suggested Itinerary</span>
                                                    </h4>

                                                    {/* Day Selector Tabs */}
                                                    <div className="flex items-center gap-1.5">
                                                        {pkg.itinerary.map((dayItem) => (
                                                            <button
                                                                key={dayItem.day}
                                                                onClick={() => setActiveTabDay(prev => ({ ...prev, [pkg.id]: dayItem.day }))}
                                                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                                                    selectedDay === dayItem.day
                                                                        ? 'bg-teal-600 text-white shadow-xs'
                                                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                Day {dayItem.day}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Selected Day Schedule Display */}
                                                {pkg.itinerary.filter(d => d.day === selectedDay).map((dayData) => (
                                                    <div key={dayData.day} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                                                        <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase mb-2">
                                                            Day {dayData.day}: {dayData.title}
                                                        </div>

                                                        <div className="mt-4 space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                                                            {Object.entries(dayData.schedule).map(([time, activity], actIdx) => (
                                                                <div key={actIdx} className="relative flex items-start gap-4 pl-8">
                                                                    <div className="absolute left-2 top-1.5 w-2.5 h-2.5 rounded-full bg-teal-600 ring-4 ring-white"></div>
                                                                    <div>
                                                                        <span className="text-xs font-bold text-teal-700 font-mono tracking-wide">{time}</span>
                                                                        <p className="text-xs sm:text-sm text-slate-700 mt-0.5">{activity}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Booking Instructions Note */}
                                                {pkg.booking_instructions && (
                                                    <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
                                                        <strong>Booking Notice:</strong> {pkg.booking_instructions}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Inclusions & Exclusions Column (Right 5 Cols) */}
                                            <div className="lg:col-span-5 space-y-6">
                                                {/* Full Inclusions */}
                                                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                                                    <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-3">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                        <span>Package Inclusions</span>
                                                    </h5>
                                                    <ul className="space-y-2 text-xs text-slate-600">
                                                        {pkg.inclusions.map((item, idx) => (
                                                            <li key={idx} className="flex items-start gap-2">
                                                                <span className="text-emerald-500 font-bold">•</span>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Full Exclusions */}
                                                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                                                    <h5 className="font-bold text-xs uppercase tracking-wider text-rose-800 flex items-center gap-1.5 mb-3">
                                                        <XCircle className="w-4 h-4 text-rose-500" />
                                                        <span>Package Exclusions</span>
                                                    </h5>
                                                    <ul className="space-y-2 text-xs text-slate-600">
                                                        {pkg.exclusions.map((item, idx) => (
                                                            <li key={idx} className="flex items-start gap-2">
                                                                <span className="text-rose-400 font-bold">•</span>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
