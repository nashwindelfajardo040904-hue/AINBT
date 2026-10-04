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
import AdminLogin from './components/admin/AdminLogin';
import AdminView from './components/admin/AdminView';

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

    // Filters & Search
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchFilter, setSearchFilter] = useState('');

    // Admin Auth State
    const [adminToken, setAdminToken] = useState(() => localStorage.getItem('mindoro_admin_token') || null);
    const [adminUser, setAdminUser] = useState(null);

    // Initial Data Fetch & Auth Verification
    useEffect(() => {
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

        fetchData();

        // Verify token if present
        if (adminToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
            axios.get('/api/auth/me')
                .then(res => {
                    setAdminUser(res.data.user);
                })
                .catch(() => {
                    // Invalid/expired token
                    localStorage.removeItem('mindoro_admin_token');
                    delete axios.defaults.headers.common['Authorization'];
                    setAdminToken(null);
                    setAdminUser(null);
                });
        }

        const checkAdminUrl = () => {
            if (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin') {
                setIsAdminOpen(true);
            }
        };

        checkAdminUrl();
        window.addEventListener('hashchange', checkAdminUrl);
        window.addEventListener('popstate', checkAdminUrl);

        return () => {
            window.removeEventListener('hashchange', checkAdminUrl);
            window.removeEventListener('popstate', checkAdminUrl);
        };
    }, [adminToken]);

    // Handlers
    const handleOpenBooking = (pkg = null) => {
        setSelectedPackageForBooking(pkg || packages[0]);
        setIsBookingOpen(true);
    };

    const handleBookAttraction = (attraction) => {
        setSelectedPackageForBooking(packages[0]);
        setIsBookingOpen(true);
    };

    const handleSearch = ({ searchTerm, municipality }) => {
        if (searchTerm) {
            setSearchFilter(searchTerm);
        }
        if (municipality && municipality !== 'All') {
            setSelectedCategory('All');
        }
        const el = document.getElementById('attractions');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSelectMunicipality = (munName) => {
        setSearchFilter(munName);
        const el = document.getElementById('attractions');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout');
        } catch (e) {
            // Ignore logout network error
        }
        localStorage.removeItem('mindoro_admin_token');
        delete axios.defaults.headers.common['Authorization'];
        setAdminToken(null);
        setAdminUser(null);
        setIsAdminOpen(false);
        if (window.location.pathname.startsWith('/admin')) {
            window.history.pushState(null, '', '/');
        } else {
            window.location.hash = '';
        }
    };

    const handleCloseAdmin = () => {
        setIsAdminOpen(false);
        if (window.location.pathname.startsWith('/admin')) {
            window.history.pushState(null, '', '/');
        } else {
            window.location.hash = '';
        }
    };

    // If Admin View is active:
    // If not authenticated, render AdminLogin
    // If authenticated, render AdminView
    if (isAdminOpen) {
        if (!adminToken) {
            return (
                <AdminLogin 
                    onLoginSuccess={(token, loggedUser) => {
                        localStorage.setItem('mindoro_admin_token', token);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        setAdminToken(token);
                        setAdminUser(loggedUser);
                    }}
                    onCancel={handleCloseAdmin}
                />
            );
        }

        return (
            <AdminView 
                user={adminUser}
                onLogout={handleLogout}
                onBackToSite={handleCloseAdmin}
                onOpenQr={() => setIsQrOpen(true)}
            />
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-teal-600 selection:text-white font-sans antialiased text-slate-800">
            {/* Navigation Header */}
            <Navbar 
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                onOpenBooking={() => handleOpenBooking()}
                onOpenQr={() => setIsQrOpen(true)}
                onOpenAdmin={() => setIsAdminOpen(true)}
                user={adminUser}
            />

            {/* Main Sections */}
            <main className="flex-1">
                {/* 1. Home / Hero Section with Live Filterable Search */}
                <HeroSection 
                    attractions={attractions}
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
                    searchQuery={searchFilter}
                    onClearSearch={() => setSearchFilter('')}
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
                    // booking success callback
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
