import React, { useState, useEffect } from 'react';
import { 
    X, 
    Calendar, 
    Users, 
    User, 
    Mail, 
    Phone, 
    FileText, 
    CheckCircle2, 
    Sparkles, 
    ShieldCheck, 
    Loader2,
    Copy,
    Check
} from 'lucide-react';
import axios from 'axios';

export default function BookingModal({ isOpen, onClose, selectedPackage, packages, onBookingSuccess }) {
    if (!isOpen) return null;

    const [packageId, setPackageId] = useState(selectedPackage?.id || (packages[0]?.id || ''));
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [guestPhone, setGuestPhone] = useState('');
    const [tourDate, setTourDate] = useState('');
    const [guestsCount, setGuestsCount] = useState(2);
    const [specialRequests, setSpecialRequests] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successBooking, setSuccessBooking] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (selectedPackage) {
            setPackageId(selectedPackage.id);
        }
    }, [selectedPackage]);

    const activePkg = packages.find(p => p.id === parseInt(packageId)) || selectedPackage || packages[0];
    const unitPrice = activePkg ? parseFloat(activePkg.price) : 4999;
    const totalPrice = unitPrice * guestsCount;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const payload = {
                tour_package_id: activePkg?.id || null,
                package_title: activePkg?.title || 'Custom Oriental Mindoro Tour',
                guest_name: guestName,
                guest_email: guestEmail,
                guest_phone: guestPhone,
                tour_date: tourDate,
                guests_count: guestsCount,
                special_requests: specialRequests,
            };

            const response = await axios.post('/api/bookings', payload);
            setSuccessBooking(response.data.booking);
            if (onBookingSuccess) {
                onBookingSuccess(response.data.booking);
            }
        } catch (err) {
            console.error(err);
            if (err.response?.data?.errors) {
                const firstErr = Object.values(err.response.data.errors)[0][0];
                setError(firstErr);
            } else {
                setError(err.response?.data?.message || 'Unable to submit booking. Please check your inputs.');
            }
        } finally {
            setLoading(false);
        }
    };

    const copyBookingCode = () => {
        if (successBooking) {
            navigator.clipboard.writeText(successBooking.booking_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full max-h-[90vh] sm:max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden m-2 sm:m-4">
                {/* Header Strip */}
                <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-4 sm:px-6 py-2.5 sm:py-3.5 text-white flex items-center justify-between shrink-0 shadow-sm">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-200" />
                        <h3 className="font-extrabold font-display text-sm sm:text-lg tracking-tight">
                            Reserve Your Oriental Mindoro Tour
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                    >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-3.5 sm:p-7 overflow-y-auto flex-1 space-y-3 sm:space-y-4">
                    {successBooking ? (
                        /* Success View */
                        <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>

                            <div>
                                <h4 className="text-2xl font-extrabold text-slate-900 font-display">
                                    Reservation Confirmed!
                                </h4>
                                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                                    Maraming Salamat! Your tour reservation has been logged in the Provincial Tourism Management System.
                                </p>
                            </div>

                            {/* Booking Reference Code Card */}
                            <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200/80 max-w-md mx-auto">
                                <span className="text-xs text-teal-700 font-semibold uppercase tracking-wider">Your Booking Reference Code</span>
                                <div className="mt-1 flex items-center justify-center gap-3">
                                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-900 tracking-wider">
                                        {successBooking.booking_code}
                                    </span>
                                    <button
                                        onClick={copyBookingCode}
                                        className="p-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                                        title="Copy booking code"
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                <p className="text-[11px] text-teal-800 mt-2">
                                    Status: <strong className="text-emerald-700 font-bold uppercase">{successBooking.status}</strong> • Total: <strong>₱{parseFloat(successBooking.total_price).toLocaleString()}</strong>
                                </p>
                            </div>

                            <div className="text-xs text-slate-500 text-left bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                                <p className="font-bold text-slate-700">What happens next?</p>
                                <p>1. A confirmation copy will be emailed to <strong>{successBooking.guest_email}</strong>.</p>
                                <p>2. A dedicated DOT-accredited coordinator will reach out via mobile (<strong>{successBooking.guest_phone}</strong>) regarding ferry dispatch and hotel check-in.</p>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                            >
                                Close & Return to Portal
                            </button>
                        </div>
                    ) : (
                        /* Booking Form */
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                                    {error}
                                </div>
                            )}

                            {/* Tour Package Selection */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Select Tour Package
                                </label>
                                <select
                                    value={packageId}
                                    onChange={(e) => setPackageId(e.target.value)}
                                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 cursor-pointer"
                                >
                                    {packages.map(p => (
                                        <option key={p.id} value={p.id}>
                                            {p.title} (₱{parseFloat(p.price).toLocaleString()} / pax)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Guests & Date Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                <div>
                                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                                        <span>Target Travel Date</span>
                                    </label>
                                    <input 
                                        type="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        value={tourDate}
                                        onChange={(e) => setTourDate(e.target.value)}
                                        className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
                                        <Users className="w-3.5 h-3.5 text-teal-600" />
                                        <span>Number of Guests</span>
                                    </label>
                                    <div className="flex items-center">
                                        <input 
                                            type="number"
                                            required
                                            min="1"
                                            max="50"
                                            value={guestsCount}
                                            onChange={(e) => setGuestsCount(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 font-semibold"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Personal Details */}
                            <div className="space-y-2 sm:space-y-3 pt-1">
                                <div>
                                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
                                        <User className="w-3.5 h-3.5 text-slate-500" />
                                        <span>Full Name (Primary Guest)</span>
                                    </label>
                                    <input 
                                        type="text"
                                        required
                                        placeholder="e.g. Maria Kristina Santos"
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                        className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
                                            <Mail className="w-3.5 h-3.5 text-slate-500" />
                                            <span>Email Address</span>
                                        </label>
                                        <input 
                                            type="email"
                                            required
                                            placeholder="kristina@gmail.com"
                                            value={guestEmail}
                                            onChange={(e) => setGuestEmail(e.target.value)}
                                            className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
                                            <Phone className="w-3.5 h-3.5 text-slate-500" />
                                            <span>Mobile / WhatsApp</span>
                                        </label>
                                        <input 
                                            type="tel"
                                            required
                                            placeholder="+63 917 123 4567"
                                            value={guestPhone}
                                            onChange={(e) => setGuestPhone(e.target.value)}
                                            className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
                                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                                        <span>Special Requests / Dietary Needs (Optional)</span>
                                    </label>
                                    <textarea
                                        rows="2"
                                        placeholder="e.g., Senior citizen in group, vegetarian meals, airport transfer inquiry..."
                                        value={specialRequests}
                                        onChange={(e) => setSpecialRequests(e.target.value)}
                                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Price Calculation Summary Box */}
                            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-teal-50/90 border border-teal-200/90 flex items-center justify-between">
                                <div>
                                    <p className="text-[11px] sm:text-xs text-teal-800 font-medium">
                                        Estimated ({guestsCount} × ₱{unitPrice.toLocaleString()}):
                                    </p>
                                    <div className="text-xl sm:text-2xl font-extrabold text-teal-900 font-display">
                                        ₱{totalPrice.toLocaleString()}
                                    </div>
                                </div>
                                <div className="text-right text-[10px] sm:text-[11px] text-teal-700 font-medium">
                                    <span className="inline-block px-2 py-0.5 rounded bg-teal-200/70 text-teal-900 font-bold mb-0.5 sm:mb-1">
                                        No Pre-Payment
                                    </span>
                                    <p className="hidden sm:block">Pay upon arrival verification</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2 flex items-center justify-end gap-2 sm:gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-3.5 h-3.5" />
                                            <span>Confirm Reservation</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
