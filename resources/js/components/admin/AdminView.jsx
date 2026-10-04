import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, 
    CalendarCheck, 
    Palmtree, 
    Briefcase, 
    Inbox, 
    ArrowLeft, 
    TrendingUp, 
    Users, 
    DollarSign, 
    Clock, 
    CheckCircle2, 
    XCircle, 
    AlertCircle, 
    Plus, 
    Trash2, 
    Edit, 
    Eye, 
    Search, 
    Filter, 
    RefreshCw, 
    ShieldCheck, 
    Save, 
    X,
    LogOut,
    QrCode
} from 'lucide-react';
import axios from 'axios';

export default function AdminView({ onBackToSite, onLogout, onOpenQr, adminUser }) {
    const [currentTab, setCurrentTab] = useState('dashboard');
    const [dashboardData, setDashboardData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const [packages, setPackages] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return dateStr.split('T')[0];
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        } catch {
            return String(dateStr).split('T')[0];
        }
    };

    // Filter states
    const [bookingFilter, setBookingFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Modals
    const [editingBooking, setEditingBooking] = useState(null);
    const [editingInquiry, setEditingInquiry] = useState(null);
    const [attractionModalOpen, setAttractionModalOpen] = useState(false);
    const [newAttraction, setNewAttraction] = useState({
        name: '',
        municipality: 'Puerto Galera',
        category: 'Beach & Marine',
        description: '',
        price: 0,
        duration: 'Half Day',
        availability: 'Open Daily (8:00 AM - 5:00 PM)',
        image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        features: ['Licensed Tour Guide', 'Environmental Fee', 'Safety Life Vests'],
        highlights: 'Prime tourist location in Oriental Mindoro.',
        how_to_get_there: 'Accessible via local motorized tricycle or passenger van.',
    });

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [dashRes, bookRes, attrRes, pkgRes, inqRes] = await Promise.all([
                axios.get('/api/admin/dashboard'),
                axios.get('/api/admin/bookings'),
                axios.get('/api/attractions'),
                axios.get('/api/packages'),
                axios.get('/api/admin/inquiries'),
            ]);

            setDashboardData(dashRes.data);
            setBookings(bookRes.data);
            setAttractions(attrRes.data);
            setPackages(pkgRes.data);
            setInquiries(inqRes.data);
        } catch (err) {
            console.error('Error fetching admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    // Booking Status Update
    const handleUpdateBookingStatus = async (bookingId, status, notes = '') => {
        try {
            await axios.patch(`/api/admin/bookings/${bookingId}/status`, {
                status,
                admin_notes: notes,
            });
            setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status, admin_notes: notes } : b));
            if (editingBooking && editingBooking.id === bookingId) {
                setEditingBooking(prev => ({ ...prev, status, admin_notes: notes }));
            }
            fetchAllData();
        } catch (err) {
            console.error(err);
            alert('Failed to update booking status.');
        }
    };

    // Inquiry Status Update
    const handleUpdateInquiryStatus = async (inquiryId, status, reply = '') => {
        try {
            await axios.patch(`/api/admin/inquiries/${inquiryId}/status`, {
                status,
                admin_reply: reply,
            });
            setInquiries(prev => prev.map(i => i.id === inquiryId ? { ...i, status, admin_reply: reply } : i));
            setEditingInquiry(null);
            fetchAllData();
        } catch (err) {
            console.error(err);
            alert('Failed to update inquiry.');
        }
    };

    // Delete Attraction
    const handleDeleteAttraction = async (id) => {
        if (!window.confirm('Are you sure you want to remove this attraction?')) return;
        try {
            await axios.delete(`/api/admin/attractions/${id}`);
            setAttractions(prev => prev.filter(a => a.id !== id));
            fetchAllData();
        } catch (err) {
            console.error(err);
            alert('Failed to delete attraction.');
        }
    };

    // Create Attraction
    const handleCreateAttraction = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/admin/attractions', newAttraction);
            setAttractions(prev => [res.data.attraction, ...prev]);
            setAttractionModalOpen(false);
            setNewAttraction({
                name: '',
                municipality: 'Puerto Galera',
                category: 'Beach & Marine',
                description: '',
                price: 0,
                duration: 'Half Day',
                availability: 'Open Daily (8:00 AM - 5:00 PM)',
                image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
                features: ['Licensed Tour Guide', 'Environmental Fee'],
                highlights: '',
                how_to_get_there: '',
            });
            fetchAllData();
        } catch (err) {
            console.error(err);
            alert('Failed to add attraction. Please check required fields.');
        }
    };

    const filteredBookings = bookings.filter(b => {
        const matchesStatus = bookingFilter === 'All' || b.status === bookingFilter;
        const matchesSearch = !searchQuery || 
            b.booking_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.guest_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.package_title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const stats = dashboardData?.stats || {
        total_bookings: bookings.length,
        confirmed_bookings: bookings.filter(b => b.status === 'Confirmed').length,
        pending_bookings: bookings.filter(b => b.status === 'Pending').length,
        total_revenue: bookings.reduce((sum, b) => sum + (b.status === 'Confirmed' || b.status === 'Completed' ? parseFloat(b.total_price) : 0), 0),
        total_inquiries: inquiries.length,
        new_inquiries: inquiries.filter(i => i.status === 'New').length,
        total_attractions: attractions.length,
        total_packages: packages.length,
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
            {/* Top Bar */}
            <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBackToSite}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to Public Portal</span>
                    </button>

                    <div className="h-4 w-px bg-slate-800"></div>

                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-xs">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                            <span className="font-extrabold text-sm tracking-tight font-display text-white">
                                ORIENTAL MINDORO <span className="text-teal-400">ADMIN CONTROLLER</span>
                            </span>
                            <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                                Live Provincial Database
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchAllData}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Refresh data"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-teal-400' : ''}`} />
                    </button>
                    <div className="text-right text-xs hidden sm:block">
                        <p className="font-bold text-slate-200">{adminUser?.name || 'Nash Windel Fajardo'}</p>
                        <p className="text-[10px] text-slate-400">{adminUser?.email || 'nashwindelfajardo040904@gmail.com'}</p>
                    </div>
                    {onLogout && (
                        <button
                            onClick={onLogout}
                            className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span className="hidden md:inline">Sign Out</span>
                        </button>
                    )}
                </div>
            </header>

            {/* Admin Body Container */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 bg-slate-950/70 border-r border-slate-800 p-4 shrink-0 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-2">
                        Navigation Menu
                    </div>

                    <button
                        onClick={() => setCurrentTab('dashboard')}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2.5 transition-all ${
                            currentTab === 'dashboard'
                                ? 'bg-teal-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Analytics Dashboard</span>
                    </button>

                    <button
                        onClick={() => setCurrentTab('bookings')}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-between transition-all ${
                            currentTab === 'bookings'
                                ? 'bg-teal-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <CalendarCheck className="w-4 h-4" />
                            <span>Tour Bookings</span>
                        </div>
                        {stats.pending_bookings > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                                {stats.pending_bookings}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => setCurrentTab('attractions')}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-between transition-all ${
                            currentTab === 'attractions'
                                ? 'bg-teal-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <Palmtree className="w-4 h-4" />
                            <span>Attractions & Sights</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{attractions.length}</span>
                    </button>

                    <button
                        onClick={() => setCurrentTab('packages')}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-between transition-all ${
                            currentTab === 'packages'
                                ? 'bg-teal-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <Briefcase className="w-4 h-4" />
                            <span>Tour Packages</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{packages.length}</span>
                    </button>

                    <button
                        onClick={() => setCurrentTab('inquiries')}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-between transition-all ${
                            currentTab === 'inquiries'
                                ? 'bg-teal-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <Inbox className="w-4 h-4" />
                            <span>Inquiry Messages</span>
                        </div>
                        {stats.new_inquiries > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px]">
                                {stats.new_inquiries}
                            </span>
                        )}
                    </button>

                    <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
                            Tools & Submission
                        </div>
                        {onOpenQr && (
                            <button
                                onClick={onOpenQr}
                                className="w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                            >
                                <QrCode className="w-4 h-4 text-emerald-400" />
                                <span>Submission QR (Exam)</span>
                            </button>
                        )}
                        {onLogout && (
                            <button
                                onClick={onLogout}
                                className="w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all md:hidden"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </button>
                        )}
                    </div>
                </aside>

                {/* Main Content Workspace */}
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-65px)] space-y-6">
                    {/* TAB 1: ANALYTICS DASHBOARD */}
                    {currentTab === 'dashboard' && (
                        <div className="space-y-6 animate-in fade-in">
                            <div>
                                <h2 className="text-2xl font-extrabold text-white font-display">
                                    Tourism Operations & Metrics
                                </h2>
                                <p className="text-xs text-slate-400 mt-1">
                                    Real-time overview of visitor reservations, estimated revenue, and tourist inquiries across Oriental Mindoro.
                                </p>
                            </div>

                            {/* Stat KPI Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
                                    <div className="flex items-center justify-between text-slate-400 text-xs">
                                        <span>Total Bookings</span>
                                        <CalendarCheck className="w-4 h-4 text-teal-400" />
                                    </div>
                                    <div className="text-3xl font-extrabold text-white font-display mt-2">
                                        {stats.total_bookings}
                                    </div>
                                    <p className="text-[11px] text-teal-400 mt-1">
                                        {stats.confirmed_bookings} Confirmed • {stats.pending_bookings} Pending
                                    </p>
                                </div>

                                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
                                    <div className="flex items-center justify-between text-slate-400 text-xs">
                                        <span>Estimated Revenue</span>
                                        <DollarSign className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div className="text-3xl font-extrabold text-emerald-400 font-display mt-2">
                                        ₱{parseFloat(stats.total_revenue).toLocaleString()}
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-1">
                                        From confirmed & completed tours
                                    </p>
                                </div>

                                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
                                    <div className="flex items-center justify-between text-slate-400 text-xs">
                                        <span>Tourist Inquiries</span>
                                        <Inbox className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <div className="text-3xl font-extrabold text-cyan-300 font-display mt-2">
                                        {stats.total_inquiries}
                                    </div>
                                    <p className="text-[11px] text-cyan-400 mt-1">
                                        {stats.new_inquiries} Unread messages awaiting response
                                    </p>
                                </div>

                                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
                                    <div className="flex items-center justify-between text-slate-400 text-xs">
                                        <span>Active Sights & Tours</span>
                                        <Palmtree className="w-4 h-4 text-amber-400" />
                                    </div>
                                    <div className="text-3xl font-extrabold text-amber-300 font-display mt-2">
                                        {stats.total_attractions}
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-1">
                                        {stats.total_packages} Signature multi-day packages
                                    </p>
                                </div>
                            </div>

                            {/* Recent Bookings & Inquiries Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Recent Bookings */}
                                <div className="p-6 rounded-2xl bg-slate-800/70 border border-slate-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-sm text-white font-display flex items-center gap-2">
                                            <CalendarCheck className="w-4 h-4 text-teal-400" />
                                            <span>Recent Tour Reservations</span>
                                        </h3>
                                        <button
                                            onClick={() => setCurrentTab('bookings')}
                                            className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
                                        >
                                            View All
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {bookings.slice(0, 4).map(b => (
                                            <div key={b.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-xs font-bold text-teal-400">{b.booking_code}</span>
                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                                            b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                                                            b.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' :
                                                            b.status === 'Completed' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-rose-500/20 text-rose-400'
                                                        }`}>
                                                            {b.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs font-semibold text-slate-200 mt-0.5">{b.guest_name}</p>
                                                    <p className="text-[11px] text-slate-400">{b.package_title} • {b.guests_count} Guests</p>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-xs font-bold text-emerald-400 font-mono">
                                                        ₱{parseFloat(b.total_price).toLocaleString()}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{formatDate(b.tour_date)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Inquiries */}
                                <div className="p-6 rounded-2xl bg-slate-800/70 border border-slate-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-sm text-white font-display flex items-center gap-2">
                                            <Inbox className="w-4 h-4 text-cyan-400" />
                                            <span>Recent Tourist Inquiries</span>
                                        </h3>
                                        <button
                                            onClick={() => setCurrentTab('inquiries')}
                                            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                                        >
                                            View All
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {inquiries.slice(0, 4).map(inq => (
                                            <div key={inq.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-white">{inq.name}</span>
                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                                            inq.status === 'New' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'
                                                        }`}>
                                                            {inq.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs font-semibold text-slate-300 mt-0.5 truncate max-w-xs">{inq.subject}</p>
                                                    <p className="text-[11px] text-slate-400 truncate max-w-xs">{inq.email}</p>
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        setEditingInquiry(inq);
                                                        setCurrentTab('inquiries');
                                                    }}
                                                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-teal-400"
                                                >
                                                    Open
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: BOOKINGS MANAGER */}
                    {currentTab === 'bookings' && (
                        <div className="space-y-6 animate-in fade-in">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-extrabold text-white font-display">
                                        Tour Booking Management
                                    </h2>
                                    <p className="text-xs text-slate-400 mt-1">
                                        Review customer reservations, modify schedule statuses, and leave coordinator notes.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                                        <input 
                                            type="text"
                                            placeholder="Search by code, guest name..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal-500 w-48 sm:w-64"
                                        />
                                    </div>

                                    <select
                                        value={bookingFilter}
                                        onChange={(e) => setBookingFilter(e.target.value)}
                                        className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
                                    >
                                        <option value="All">All Statuses</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            {/* Bookings Table */}
                            <div className="bg-slate-800/70 rounded-2xl border border-slate-700 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs text-slate-300">
                                        <thead className="bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-700">
                                            <tr>
                                                <th className="p-4">Ref Code</th>
                                                <th className="p-4">Guest Details</th>
                                                <th className="p-4">Package</th>
                                                <th className="p-4">Tour Date</th>
                                                <th className="p-4">Total Fee</th>
                                                <th className="p-4">Status</th>
                                                <th className="p-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/60">
                                            {filteredBookings.map(b => (
                                                <tr key={b.id} className="hover:bg-slate-800/90 transition-colors">
                                                    <td className="p-4 font-mono font-bold text-teal-400 whitespace-nowrap">
                                                        {b.booking_code}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="font-bold text-white text-xs">{b.guest_name}</div>
                                                        <div className="text-[11px] text-slate-400">{b.guest_email} • {b.guest_phone}</div>
                                                    </td>
                                                    <td className="p-4 font-medium text-slate-200">
                                                        {b.package_title}
                                                        <div className="text-[10px] text-slate-400">{b.guests_count} guest(s)</div>
                                                    </td>
                                                    <td className="p-4 text-slate-300 whitespace-nowrap font-medium">
                                                        {formatDate(b.tour_date)}
                                                    </td>
                                                    <td className="p-4 font-mono font-bold text-emerald-400 whitespace-nowrap">
                                                        ₱{parseFloat(b.total_price).toLocaleString()}
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                                            b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                                            b.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                                            b.status === 'Completed' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 
                                                            'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                                        }`}>
                                                            {b.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right space-x-1">
                                                        <button
                                                            onClick={() => setEditingBooking(b)}
                                                            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-teal-300 transition-colors"
                                                            title="Edit status & notes"
                                                        >
                                                            <Edit className="w-3.5 h-3.5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 3: ATTRACTIONS MANAGER */}
                    {currentTab === 'attractions' && (
                        <div className="space-y-6 animate-in fade-in">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-extrabold text-white font-display">
                                        Attraction & Tourism Sights Management
                                    </h2>
                                    <p className="text-xs text-slate-400 mt-1">
                                        Add, modify, or remove destinations showcased across Oriental Mindoro.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setAttractionModalOpen(true)}
                                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add New Attraction</span>
                                </button>
                            </div>

                            {/* Attractions Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {attractions.map(attr => (
                                    <div key={attr.id} className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden flex flex-col justify-between">
                                        <div className="h-44 relative overflow-hidden bg-slate-900">
                                            <img src={attr.image_url} alt={attr.name} className="w-full h-full object-cover" />
                                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] font-bold text-white">
                                                {attr.municipality}
                                            </div>
                                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-600 text-[10px] font-bold text-white">
                                                {attr.price > 0 ? `₱${attr.price}` : 'Free'}
                                            </div>
                                        </div>

                                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                                            <div>
                                                <h4 className="font-bold text-sm text-white font-display">{attr.name}</h4>
                                                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{attr.description}</p>
                                            </div>

                                            <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                                                <span>{attr.availability}</span>
                                                <button
                                                    onClick={() => handleDeleteAttraction(attr.id)}
                                                    className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-colors"
                                                    title="Delete attraction"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB 4: TOUR PACKAGES */}
                    {currentTab === 'packages' && (
                        <div className="space-y-6 animate-in fade-in">
                            <div>
                                <h2 className="text-2xl font-extrabold text-white font-display">
                                    Tour Packages & Itineraries
                                </h2>
                                <p className="text-xs text-slate-400 mt-1">
                                    Signature travel packages meeting Section IV.4 academic requirements.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {packages.map(pkg => (
                                    <div key={pkg.id} className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-teal-400 uppercase">{pkg.duration}</span>
                                            <span className="text-base font-extrabold text-emerald-400 font-mono">
                                                ₱{parseFloat(pkg.price).toLocaleString()}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-white font-display">{pkg.title}</h3>
                                        <p className="text-xs text-slate-400 line-clamp-2">{pkg.destinations}</p>

                                        <div className="pt-2 border-t border-slate-700 space-y-1">
                                            <span className="text-[10px] uppercase font-bold text-slate-500">Inclusions ({pkg.inclusions.length}):</span>
                                            {pkg.inclusions.slice(0, 3).map((inc, i) => (
                                                <p key={i} className="text-xs text-slate-300 truncate">• {inc}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB 5: INQUIRIES */}
                    {currentTab === 'inquiries' && (
                        <div className="space-y-6 animate-in fade-in">
                            <div>
                                <h2 className="text-2xl font-extrabold text-white font-display">
                                    Tourist Inquiries & Contact Messages
                                </h2>
                                <p className="text-xs text-slate-400 mt-1">
                                    Direct messages received through the official contact section form.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {inquiries.map(inq => (
                                    <div key={inq.id} className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
                                            <div>
                                                <span className="text-xs font-semibold text-slate-400">From: </span>
                                                <strong className="text-white text-sm">{inq.name}</strong>
                                                <span className="text-xs text-slate-400 ml-2">({inq.email} • {inq.phone || 'No phone'})</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                    inq.status === 'New' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'
                                                }`}>
                                                    {inq.status}
                                                </span>
                                                <button
                                                    onClick={() => setEditingInquiry(inq)}
                                                    className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors"
                                                >
                                                    Reply / Update
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-sm text-teal-300">{inq.subject}</h4>
                                            <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                                                {inq.message}
                                            </p>
                                        </div>

                                        {inq.admin_reply && (
                                            <div className="p-3 rounded-xl bg-teal-950/60 border border-teal-800/80 text-xs text-teal-200">
                                                <strong>Provincial Officer Note:</strong> {inq.admin_reply}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Edit Booking Status Modal */}
            {editingBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-700 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-white text-base">Update Booking {editingBooking.booking_code}</h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {editingBooking.guest_name} • Tour: <span className="text-teal-400 font-semibold">{formatDate(editingBooking.tour_date)}</span>
                                </p>
                            </div>
                            <button onClick={() => setEditingBooking(null)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1">Status</label>
                            <select
                                value={editingBooking.status}
                                onChange={(e) => setEditingBooking({ ...editingBooking, status: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1">Admin Coordinator Notes</label>
                            <textarea
                                rows="3"
                                value={editingBooking.admin_notes || ''}
                                onChange={(e) => setEditingBooking({ ...editingBooking, admin_notes: e.target.value })}
                                placeholder="e.g. Payment verified, hotel assigned, guide dispatched..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                            ></textarea>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                onClick={() => setEditingBooking(null)}
                                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleUpdateBookingStatus(editingBooking.id, editingBooking.status, editingBooking.admin_notes)}
                                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reply Inquiry Modal */}
            {editingInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-700 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white text-base">Inquiry: {editingInquiry.subject}</h3>
                            <button onClick={() => setEditingInquiry(null)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="text-xs text-slate-400">
                            From: <strong className="text-white">{editingInquiry.name}</strong> ({editingInquiry.email})
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1">Status</label>
                            <select
                                value={editingInquiry.status}
                                onChange={(e) => setEditingInquiry({ ...editingInquiry, status: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                            >
                                <option value="New">New</option>
                                <option value="Replied">Replied</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1">Reply / Tourism Officer Notes</label>
                            <textarea
                                rows="3"
                                value={editingInquiry.admin_reply || ''}
                                onChange={(e) => setEditingInquiry({ ...editingInquiry, admin_reply: e.target.value })}
                                placeholder="Response sent to tourist or internal action taken..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                            ></textarea>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                onClick={() => setEditingInquiry(null)}
                                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleUpdateInquiryStatus(editingInquiry.id, editingInquiry.status, editingInquiry.admin_reply)}
                                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs"
                            >
                                Save Status
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Attraction Modal */}
            {attractionModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-slate-900 rounded-3xl max-w-xl w-full p-6 border border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white text-base">Add New Tourism Attraction</h3>
                            <button onClick={() => setAttractionModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateAttraction} className="space-y-3">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1">Attraction Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Talipanan Falls"
                                    value={newAttraction.name}
                                    onChange={(e) => setNewAttraction({ ...newAttraction, name: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">Municipality</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Puerto Galera"
                                        value={newAttraction.municipality}
                                        onChange={(e) => setNewAttraction({ ...newAttraction, municipality: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">Category</label>
                                    <select
                                        value={newAttraction.category}
                                        onChange={(e) => setNewAttraction({ ...newAttraction, category: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                                    >
                                        <option value="Beach & Marine">Beach & Marine</option>
                                        <option value="Eco-Tourism & Lakes">Eco-Tourism & Lakes</option>
                                        <option value="Waterfalls & Mountains">Waterfalls & Mountains</option>
                                        <option value="Cultural Heritage">Cultural Heritage</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1">Description</label>
                                <textarea
                                    rows="2"
                                    required
                                    value={newAttraction.description}
                                    onChange={(e) => setNewAttraction({ ...newAttraction, description: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">Price (₱)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={newAttraction.price}
                                        onChange={(e) => setNewAttraction({ ...newAttraction, price: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">Duration</label>
                                    <input
                                        type="text"
                                        value={newAttraction.duration}
                                        onChange={(e) => setNewAttraction({ ...newAttraction, duration: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    required
                                    value={newAttraction.image_url}
                                    onChange={(e) => setNewAttraction({ ...newAttraction, image_url: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setAttractionModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs"
                                >
                                    Save Attraction
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
