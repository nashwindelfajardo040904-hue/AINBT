import React from 'react';
import { 
    Shield, 
    Compass, 
    Heart, 
    Sparkles, 
    Globe, 
    Target, 
    CheckCircle2, 
    Leaf,
    Users
} from 'lucide-react';

export default function AboutSection() {
    const highlights = [
        {
            title: 'Mina de Oro Heritage',
            desc: 'Historically hailed by early Spanish and pre-colonial Chinese traders as "Mina de Oro" (Mine of Gold) due to its abundance of precious minerals, lush fertile plains, and pristine natural waterways.',
            icon: Globe
        },
        {
            title: 'Verde Island Passage Gateway',
            desc: 'Flanked by the Verde Island Passage to the north—recognized by global marine scientists as the global epicenter of shorefish biodiversity, teeming with over 300 coral species.',
            icon: Leaf
        },
        {
            title: 'Indigenous Mangyan Culture',
            desc: 'Sanctuary of the eight indigenous Mangyan tribes who preserve ancient traditions, including the UNESCO Memory of the World inscribed Hanunuo Surat Mangyan bamboo script.',
            icon: Users
        },
        {
            title: 'Eco-Tourism & Conservation',
            desc: 'Home of the critically endangered Tamaraw (Mindoro Dwarf Buffalo) and Naujan Lake National Park, an internationally recognized Ramsar wetland site.',
            icon: Shield
        }
    ];

    const targetMarkets = [
        'Scuba Divers, Snorkelers & Marine Enthusiasts (Verde Island Passage)',
        'Eco-Adventurers & Mountain Trekkers (Mt. Halcon, Waterfalls & Lakes)',
        'Cultural & Academic Researchers (Mangyan Heritage & Pre-Spanish Script)',
        'Families, Weekend Vacationers & Friends (White Beach & Coastal Resorts)',
        'Island Hopping Backpackers & Solivagant Explorers (Bulalacao Archipelago)'
    ];

    return (
        <section id="about" className="py-20 bg-slate-100/70 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        About The Destination
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
                        The Emerald Province of Mindoro
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                        Discover the province of Oriental Mindoro—a land blessed with misty mountain summits, fertile agricultural river valleys, mystical lakes, and world-class sapphire coastal seas.
                    </p>
                </div>

                {/* 2-Column Grid: Narrative and Visual Cards */}
                <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* Left Column: Background, Vision & Mission */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80">
                            <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                                <Compass className="w-5 h-5 text-teal-600" />
                                <span>Provincial Background & Significance</span>
                            </h3>
                            <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
                                Located 140 kilometers south of Manila across the Batangas Bay, Oriental Mindoro occupies the eastern half of Mindoro Island. With <strong>14 progressive municipalities and 1 component city (Calapan)</strong>, the province bridges Luzon to the Visayas archipelago via the Strong Republic Nautical Highway.
                            </p>
                            <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
                                From the vibrant resort atmosphere of Puerto Galera to the tranquil, undiscovered virgin sandbars of Bulalacao, Oriental Mindoro delivers a balanced blend of adrenaline, relaxation, gastronomic richness, and cultural soul.
                            </p>
                        </div>

                        {/* Vision & Mission Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-2xl border border-teal-100">
                                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold mb-3 shadow-md shadow-teal-600/20">
                                    <Target className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-slate-900 text-base font-display">Our Tourism Vision</h4>
                                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                                    To establish Oriental Mindoro as a premier, sustainable, and climate-resilient eco-cultural tourism haven in Southeast Asia that empowers indigenous communities and champions environmental conservation.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white shadow-md">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold mb-3 shadow-md shadow-emerald-500/20">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-white text-base font-display">Our Tourism Mission</h4>
                                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                                    Deliver world-class visitor hospitality, protect our pristine marine and mountain sanctuaries, preserve Mangyan cultural heritage, and facilitate inclusive economic growth across all 15 municipalities.
                                </p>
                            </div>
                        </div>

                        {/* Target Markets */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                            <h4 className="font-bold text-slate-900 text-sm font-display mb-3 uppercase tracking-wider text-teal-800">
                                Who We Welcome (Target Tourism Markets)
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                                {targetMarkets.map((market, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>{market}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: 4 Characteristic Feature Cards */}
                    <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                        {highlights.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div 
                                    key={idx}
                                    className="p-5 rounded-2xl bg-white hover:bg-teal-50/50 border border-slate-200/80 hover:border-teal-300/80 transition-all duration-300 shadow-xs hover:shadow-md group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-11 h-11 rounded-xl bg-teal-100 group-hover:bg-teal-600 text-teal-700 group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-200">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm sm:text-base font-display group-hover:text-teal-900 transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
