import React, { useState } from 'react';
import { 
    MapPin, 
    Navigation, 
    Ship, 
    Clock, 
    Sparkles, 
    Compass, 
    Info, 
    Utensils, 
    ArrowRight 
} from 'lucide-react';
import { MUNICIPALITIES } from '../data/mindoroData';

export default function InteractiveMapSection({ onSelectMunicipality }) {
    const [activeMun, setActiveMun] = useState(MUNICIPALITIES[0]);

    return (
        <section id="map" className="py-10 sm:py-20 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
                        <Navigation className="w-3.5 h-3.5 text-teal-600" />
                        Interactive Provincial Destination Map
                    </div>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
                        Explore Oriental Mindoro’s 15 Hubs
                    </h2>
                    <p className="mt-2 sm:mt-4 text-xs sm:text-lg text-slate-600 leading-relaxed">
                        Click on any municipality from the northern dive waters of Puerto Galera to the southern pristine sandbars of Bulalacao to reveal travel guides, ports, and highlights.
                    </p>
                </div>

                {/* Mobile Quick Town Selector */}
                <div className="mt-6 block lg:hidden">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        <span>Select Municipal Hub ({MUNICIPALITIES.length} Towns):</span>
                    </label>
                    <select
                        value={activeMun.name}
                        onChange={(e) => {
                            const found = MUNICIPALITIES.find(m => m.name === e.target.value);
                            if (found) setActiveMun(found);
                        }}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer shadow-xs"
                    >
                        {MUNICIPALITIES.map(m => (
                            <option key={m.name} value={m.name}>
                                {m.name} — {m.category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 2-Column: Municipal Hub Selector + Interactive Detail View */}
                <div className="mt-4 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                    {/* Municipal List Selector (Desktop Only: Left 5 Cols) */}
                    <div className="hidden lg:block lg:col-span-5 bg-slate-50 p-4 rounded-3xl border border-slate-200/90 shadow-sm max-h-[600px] overflow-y-auto space-y-2">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-1">
                            Select a Municipality ({MUNICIPALITIES.length} Hubs)
                        </p>

                        {MUNICIPALITIES.map((mun) => {
                            const isSelected = activeMun.name === mun.name;
                            return (
                                <button
                                    key={mun.name}
                                    onClick={() => setActiveMun(mun)}
                                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center justify-between group ${
                                        isSelected
                                            ? 'bg-teal-600 text-white shadow-md'
                                            : 'bg-white hover:bg-teal-50/70 text-slate-800 border border-slate-200/70'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                                            isSelected ? 'bg-white/20 text-white' : 'bg-teal-100 text-teal-700'
                                        }`}>
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm tracking-tight">{mun.name}</h4>
                                            <p className={`text-[11px] truncate max-w-[200px] ${
                                                isSelected ? 'text-teal-100' : 'text-slate-500'
                                            }`}>
                                                {mun.tagline}
                                            </p>
                                        </div>
                                    </div>

                                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        {mun.category}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Interactive Municipal Display Hub (Right 7 Cols) */}
                    <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-700">
                        {/* Decorative Background Graphics */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 space-y-6">
                            {/* Title & Tagline */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-2">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>Municipality of {activeMun.name}</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                                        {activeMun.name}
                                    </h3>
                                    <p className="text-sm text-slate-300 mt-1 italic">
                                        "{activeMun.tagline}"
                                    </p>
                                </div>

                                <div className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md text-xs font-bold text-emerald-400 self-start sm:self-auto">
                                    {activeMun.category}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h5 className="text-xs font-bold uppercase tracking-wider text-teal-400">Overview</h5>
                                <p className="mt-1.5 text-sm sm:text-base text-slate-200 leading-relaxed">
                                    {activeMun.description}
                                </p>
                            </div>

                            {/* Top Attractions Highlights */}
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                                <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 mb-1.5">
                                    <Sparkles className="w-4 h-4 text-cyan-400" />
                                    <span>Must-Visit Sights & Activities</span>
                                </h5>
                                <p className="text-sm font-semibold text-white">
                                    {activeMun.highlights}
                                </p>
                            </div>

                            {/* Port & Access Route */}
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5 mb-1.5">
                                    <Ship className="w-4 h-4 text-emerald-400" />
                                    <span>Port & Transit Corridor</span>
                                </h5>
                                <p className="text-xs sm:text-sm text-slate-200">
                                    {activeMun.port}
                                </p>
                            </div>

                            {/* Action to Filter by this town */}
                            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <p className="text-xs text-slate-400">
                                    Provincial District • Oriental Mindoro, Philippines
                                </p>

                                <button
                                    onClick={() => onSelectMunicipality(activeMun.name)}
                                    className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 hover:scale-105 active:scale-95 shadow-md shadow-teal-500/20"
                                >
                                    <span>View Attractions in {activeMun.name}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
