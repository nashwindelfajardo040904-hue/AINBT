import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

// Public Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import AttractionsSection from './components/AttractionsSection';
import PackagesSection from './components/PackagesSection';
import InteractiveMapSection from './components/InteractiveMapSection';
import GallerySection from './components/GallerySection';
import TravelGuideSection from './components/TravelGuideSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import SubmissionQrModal from './components/SubmissionQrModal';

// Admin Components
import AdminView from './components/admin/AdminView';

// Icons & Banner
import { Sparkles, Tag, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';

export default function App() {
    const [attractions, setAttractions] = useState([]);
    const [packages, setPackages] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Navigation & View States
    const [currentTab, setCurrentTab] = useState('home');
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isQrOpen, setIsQrOpen] = useState(false);
    const [selectedPackageForBooking, setSelectedPackageForBooking] = useState(null);

    // Filters
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Authenticated user state
    const [user, setUser] = useState({ name: 'Provincial Tourism Officer', role: 'admin' });

    // Initial Data Fetch
    const fetchData = async () => {
        try {
            const [attrRes, pkgRes, revRes] = await Promise.all([
                axios.get('/api/attractions'),
                axios.get('/api/packages'),
                axios.get('/api/reviews'),
            ]);
            setAttractions(attrRes.data);
            setPackages(pkgRes.data);
            setReviews(revRes.data);
        } catch (err) {
            console.error('Failed to load initial data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // Check if current URL hash or query is #admin
        if (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin') {
            setIsAdminOpen(true);
        }
    }, []);

    // Handlers
    const handleOpenBooking = (pkg = null) => {
        setSelectedPackageForBooking(pkg || packages[0]);
        setIsBookingOpen(true);
    };

    const handleBookAttraction = (attraction) => {
        // Find matching package or use first
        setSelectedPackageForBooking(packages[0]);
        setIsBookingOpen(true);
    };

    const handleSearch = ({ searchTerm, municipality }) => {
        if (municipality) {
            setSelectedCategory('All');
        }
    };

    const handleSelectMunicipality = (munName) => {
        const el = document.getElementById('attractions');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // If Admin View is active, render the dedicated Admin Portal
    if (isAdminOpen) {
        return <AdminView onBackToSite={() => setIsAdminOpen(false)} />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-teal-600 selection:text-white font-sans antialiased text-slate-800">
            {/* Top Promotional Marketing Bar (Section VI: Promotional offer) */}
            <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-900 text-white py-2 px-4 text-xs">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                    <div className="flex items-center justify-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-extrabold uppercase text-[10px]">
                            Summer 2026 Promo
                        </span>
                        <span className="text-slate-200">
                            Book any 3D2N Puerto Galera or Bulalacao Package and get <strong>₱500 OFF</strong> per guest!
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => handleOpenBooking()}
                            className="font-bold text-teal-300 hover:text-white flex items-center gap-1 transition-colors underline underline-offset-4"
                        >
                            <span>Claim Discount</span>
                            <ArrowRight className="w-3 h-3" />
                        </button>

                        <span className="hidden md:inline text-slate-500">|</span>

                        <span className="hidden md:flex items-center gap-1 text-slate-300">
                            <PhoneCall className="w-3 h-3 text-teal-400" />
                            <span>Hotline: (043) 288-7550</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation Header */}
            <Navbar 
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                onOpenBooking={() => handleOpenBooking()}
                onOpenQr={() => setIsQrOpen(true)}
                onOpenAdmin={() => setIsAdminOpen(true)}
                user={user}
            />

            {/* Main Sections */}
            <main className="flex-1">
                {/* 1. Home / Hero Section */}
                <HeroSection 
                    onOpenBooking={() => handleOpenBooking()}
                    onSearch={handleSearch}
                    onSelectCategory={(cat) => setSelectedCategory(cat)}
                />

                {/* 2. About Oriental Mindoro Section */}
                <AboutSection />

                {/* 3. Major Attractions Showcase */}
                <AttractionsSection 
                    attractions={attractions}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    onBookAttraction={handleBookAttraction}
                />

                {/* 4. Tour Packages & Daily Itineraries */}
                <PackagesSection 
                    packages={packages}
                    onSelectPackage={(pkg) => handleOpenBooking(pkg)}
                />

                {/* 5. Interactive Provincial Hub Map */}
                <InteractiveMapSection 
                    onSelectMunicipality={handleSelectMunicipality}
                />

                {/* 6. Postcard Photo Gallery */}
                <GallerySection />

                {/* 7. Travel Guide, Ferry Logistics & Budget */}
                <TravelGuideSection />

                {/* 8. Customer Reviews & Testimonials */}
                <TestimonialsSection 
                    reviews={reviews}
                    onNewReviewAdded={(newRev) => setReviews(prev => [newRev, ...prev])}
                />

                {/* 9. FAQs Accordion */}
                <FaqSection />

                {/* 10. Contact Desk & Inquiries Form */}
                <ContactSection />
            </main>

            {/* Consistent Footer */}
            <Footer 
                onOpenAdmin={() => setIsAdminOpen(true)}
                onOpenQr={() => setIsQrOpen(true)}
                onOpenBooking={() => handleOpenBooking()}
            />

            {/* Booking & Reservation Modal */}
            <BookingModal 
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                selectedPackage={selectedPackageForBooking}
                packages={packages}
                onBookingSuccess={(booking) => {
                    // Update data if needed
                }}
            />

            {/* Academic Final Submission QR Code Modal (Section X) */}
            <SubmissionQrModal 
                isOpen={isQrOpen}
                onClose={() => setIsQrOpen(false)}
            />
        </div>
    );
}

// Mount the React Application
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}
