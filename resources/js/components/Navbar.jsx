import React, { useState, useEffect } from 'react';
import { 
    Compass, 
    Palmtree, 
    Calendar, 
    Image as ImageIcon, 
    MapPin, 
    Info, 
    Phone, 
    Menu, 
    X,
    Sparkles
} from 'lucide-react';

export default function Navbar({ onOpenBooking, currentTab, setCurrentTab }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Home', icon: Compass },
        { id: 'about', label: 'About', icon: Info },
        { id: 'attractions', label: 'Attractions', icon: Palmtree },
        { id: 'packages', label: 'Tour Packages', icon: Calendar },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon },
        { id: 'guide', label: 'Travel Guide', icon: MapPin },
        { id: 'contact', label: 'Contact', icon: Phone },
    ];

    const handleNavClick = (id) => {
        setCurrentTab(id);
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200/80' : 'bg-gradient-to-b from-slate-950/85 via-slate-900/50 to-transparent py-3 text-white'
        }`}>
            {/* Full-width container: logo in the very left corner with minimal padding */}
            <div className="w-full px-2 sm:px-4 lg:px-6">
                <div className="flex items-center justify-between gap-2">
                    {/* Brand Logo - Aligned to far left */}
                    <div 
                        onClick={() => handleNavClick('home')}
                        className="flex items-center gap-2.5 cursor-pointer group shrink-0"
                    >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-emerald-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/30 group-hover:scale-105 transition-transform duration-300">
                            <Compass className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                        </div>
                        <div>
                            <span className={`text-lg sm:text-xl font-extrabold tracking-tight font-display flex items-center gap-1 leading-tight ${
                                scrolled ? 'text-slate-900' : 'text-white'
                            }`}>
                                MINDORO <span className="text-teal-500">HORIZONS</span>
                            </span>
                            <p className={`text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold ${
                                scrolled ? 'text-slate-500' : 'text-slate-300'
                            }`}>
                                Oriental Mindoro • Philippines
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex items-center gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                                        isActive
                                            ? 'bg-teal-600 text-white shadow-xs'
                                            : scrolled 
                                                ? 'text-slate-700 hover:text-teal-700 hover:bg-teal-50' 
                                                : 'text-slate-200 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    <Icon className="w-4 h-4 opacity-80" />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Right-Side Actions */}
                    <div className="flex items-center gap-2">
                        {/* Primary Book CTA */}
                        <button
                            onClick={() => onOpenBooking()}
                            className="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-white shadow-md shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 shrink-0"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Book Now</span>
                        </button>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle navigation menu"
                            className={`p-2 rounded-xl transition-colors xl:hidden ${
                                scrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                            }`}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile / Tablet Drawer Menu */}
            {mobileMenuOpen && (
                <div className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-2xl text-slate-800 animate-in slide-in-from-top duration-200">
                    <div className="flex flex-col gap-1 pt-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
                                        isActive
                                            ? 'bg-teal-600 text-white'
                                            : 'hover:bg-teal-50 hover:text-teal-700 text-slate-700'
                                    }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-teal-600'}`} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                        <button
                            onClick={() => {
                                setMobileMenuOpen(false);
                                onOpenBooking();
                            }}
                            className="w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md flex items-center justify-center gap-2"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Book a Tour Package</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
