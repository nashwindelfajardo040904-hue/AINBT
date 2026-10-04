import React, { useState, useEffect } from 'react';
import { 
    Compass, 
    Palmtree, 
    Calendar, 
    Image as ImageIcon, 
    MapPin, 
    Info, 
    Phone, 
    ShieldCheck, 
    QrCode, 
    Menu, 
    X,
    Sparkles
} from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenQr, currentTab, setCurrentTab, user, onOpenAdmin }) {
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
        { id: 'about', label: 'About Mindoro', icon: Info },
        { id: 'attractions', label: 'Attractions', icon: Palmtree },
        { id: 'packages', label: 'Tour Packages', icon: Calendar },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon },
        { id: 'guide', label: 'Travel Guide', icon: MapPin },
        { id: 'contact', label: 'Contact & Hotlines', icon: Phone },
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
            scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80' : 'bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-transparent py-4 text-white'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Brand Logo */}
                    <div 
                        onClick={() => handleNavClick('home')}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-emerald-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/30 group-hover:scale-105 transition-transform duration-300">
                            <Compass className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <span className={`text-xl font-extrabold tracking-tight font-display flex items-center gap-1.5 ${
                                scrolled ? 'text-slate-900' : 'text-white'
                            }`}>
                                MINDORO <span className="text-teal-500">HORIZONS</span>
                            </span>
                            <p className={`text-[10px] tracking-wider uppercase font-semibold ${
                                scrolled ? 'text-slate-500' : 'text-slate-300'
                            }`}>
                                Oriental Mindoro • Philippines
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                                        scrolled 
                                            ? 'text-slate-600 hover:text-teal-700 hover:bg-teal-50' 
                                            : 'text-slate-100 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    <Icon className="w-4 h-4 opacity-75" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Action Buttons */}
                    <div className="hidden sm:flex items-center gap-2.5">
                        {/* QR Code Submission Button (Exam Requirement) */}
                        <button
                            onClick={onOpenQr}
                            title="Generate QR code for exam submission"
                            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                scrolled
                                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300/80'
                                    : 'bg-white/15 text-white hover:bg-white/25 border border-white/20 backdrop-blur-sm'
                            }`}
                        >
                            <QrCode className="w-4 h-4 text-emerald-500" />
                            <span className="hidden md:inline">Submission QR</span>
                        </button>

                        {/* Admin Portal Button */}
                        <button
                            onClick={onOpenAdmin}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                scrolled
                                    ? 'bg-slate-800 text-white hover:bg-slate-900 shadow-sm'
                                    : 'bg-slate-900/80 text-teal-300 hover:bg-slate-900 border border-teal-500/30 backdrop-blur-sm'
                            }`}
                        >
                            <ShieldCheck className="w-4 h-4 text-teal-400" />
                            <span>Admin Portal</span>
                            {user && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
                        </button>

                        {/* Primary Book CTA */}
                        <button
                            onClick={() => onOpenBooking()}
                            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-white shadow-md shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Book Now</span>
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            onClick={onOpenQr}
                            className={`p-2 rounded-lg ${scrolled ? 'text-slate-700' : 'text-white'}`}
                            title="QR Code"
                        >
                            <QrCode className="w-5 h-5 text-emerald-400" />
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`p-2 rounded-lg transition-colors ${
                                scrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                            }`}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-2xl text-slate-800 animate-in slide-in-from-top duration-200">
                    <div className="flex flex-col gap-1 pt-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-teal-50 hover:text-teal-700 flex items-center gap-2.5 transition-colors"
                                >
                                    <Icon className="w-4 h-4 text-teal-600" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                        <button
                            onClick={() => {
                                setMobileMenuOpen(false);
                                onOpenBooking();
                            }}
                            className="w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md flex items-center justify-center gap-2"
                        >
                            <Sparkles className="w-4 h-4" />
                            Book a Tour Package
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    onOpenQr();
                                }}
                                className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-1.5"
                            >
                                <QrCode className="w-4 h-4 text-emerald-600" />
                                Submission QR
                            </button>

                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    onOpenAdmin();
                                }}
                                className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center gap-1.5"
                            >
                                <ShieldCheck className="w-4 h-4 text-teal-400" />
                                Admin Panel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
