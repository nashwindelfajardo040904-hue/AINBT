import React from 'react';
import { 
    Compass, 
    MapPin, 
    Phone, 
    Mail, 
    Globe, 
    ShieldCheck, 
    QrCode, 
    Heart 
} from 'lucide-react';

export default function Footer({ onOpenAdmin, onOpenQr, onOpenBooking }) {
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
                    {/* Brand Info (Cols 1-4) */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/30">
                                <Compass className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-xl font-extrabold tracking-tight font-display text-white">
                                    MINDORO <span className="text-teal-400">HORIZONS</span>
                                </span>
                                <p className="text-[10px] tracking-wider uppercase font-semibold text-slate-400">
                                    Province of Oriental Mindoro • Philippines
                                </p>
                            </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            Official digital destination portal for Oriental Mindoro, promoting sustainable eco-tourism, pristine coral diving in the Verde Island Passage, and the living heritage of our local communities.
                        </p>

                        <div className="pt-1 text-xs text-slate-400 space-y-1">
                            <p><strong className="text-slate-200">Developer:</strong> Nash Windel Fajardo</p>
                            <p><strong className="text-slate-200">Address:</strong> Mangahan, Balite, Calapan City</p>
                            <p><strong className="text-slate-200">Phone:</strong> 0945 240 3583</p>
                        </div>

                        {/* Social Links: FB, Instagram, Gmail */}
                        <div className="pt-2 flex items-center gap-2.5">
                            {/* Facebook */}
                            <a 
                                href="https://www.facebook.com/nash.windel.fajardo.2024" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-colors" 
                                title="Facebook: Nash Windel Fajardo"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>

                            {/* Instagram */}
                            <a 
                                href="https://www.instagram.com/nashwindel" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-600 hover:to-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors" 
                                title="Instagram: @nashwindel"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>

                            {/* Gmail */}
                            <a 
                                href="mailto:nashwindelfajardo040904@gmail.com" 
                                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors" 
                                title="Gmail: nashwindelfajardo040904@gmail.com"
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links (Cols 5-7) */}
                    <div className="lg:col-span-3 space-y-3">
                        <h4 className="font-bold text-white text-sm font-display uppercase tracking-wider">
                            Explore Destinations
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                            <li>
                                <button onClick={() => scrollToSection('attractions')} className="hover:text-teal-400 transition-colors">
                                    White Beach & Puerto Galera Diving
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('attractions')} className="hover:text-teal-400 transition-colors">
                                    Tamaraw Twin Waterfalls
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('attractions')} className="hover:text-teal-400 transition-colors">
                                    Naujan Lake National Park & Wetlands
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('attractions')} className="hover:text-teal-400 transition-colors">
                                    Bulalacao Virgin Island Sandbars
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('attractions')} className="hover:text-teal-400 transition-colors">
                                    Mangyan Heritage Center & Crafts
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Practical Planning Links (Cols 8-9) */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="font-bold text-white text-sm font-display uppercase tracking-wider">
                            Travel Logistics
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                            <li>
                                <button onClick={() => scrollToSection('guide')} className="hover:text-teal-400 transition-colors">
                                    Ferry Schedules from Batangas
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('packages')} className="hover:text-teal-400 transition-colors">
                                    Sample 3D2N Itineraries
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('gallery')} className="hover:text-teal-400 transition-colors">
                                    Photo Gallery & Lightbox
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('guide')} className="hover:text-teal-400 transition-colors">
                                    Environmental Guidelines
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollToSection('guide')} className="hover:text-teal-400 transition-colors">
                                    Emergency Provincial Hotlines
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Academic Examination Badges (Cols 10-12) */}
                    <div className="lg:col-span-3 space-y-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                        <h4 className="font-bold text-teal-400 text-xs uppercase tracking-wider font-display">
                            Academic Project Portal
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Applied Business Tools and Technologies in Tourism (Final Examination Project).
                        </p>
                        <div className="pt-2 flex flex-col gap-2">
                            <button
                                onClick={onOpenQr}
                                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                            >
                                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Exam QR Code (Section X)</span>
                            </button>

                            <button
                                onClick={onOpenAdmin}
                                className="w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                            >
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Open Admin Controller</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Legal, Disclaimer & Copyright */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>
                        © {new Date().getFullYear()} Mindoro Horizons • Developed by <strong className="text-slate-400">Nash Windel Fajardo</strong>. All rights reserved.
                    </p>
                    <p className="text-center sm:text-right">
                        Mangahan, Balite, Calapan City, Oriental Mindoro • 0945 240 3583
                    </p>
                </div>
            </div>
        </footer>
    );
}
