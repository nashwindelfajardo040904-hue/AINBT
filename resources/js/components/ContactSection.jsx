import React, { useState } from 'react';
import { 
    Phone, 
    Mail, 
    MapPin, 
    Clock, 
    Send, 
    Sparkles, 
    CheckCircle2, 
    Loader2, 
    Globe,
    Share2,
    MessageCircle
} from 'lucide-react';
import axios from 'axios';

export default function ContactSection() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('/api/inquiries', {
                name,
                email,
                phone,
                subject,
                message,
            });

            setSuccessMessage(response.data.message || 'Your inquiry has been submitted successfully.');
            setName('');
            setEmail('');
            setPhone('');
            setSubject('');
            setMessage('');
        } catch (err) {
            console.error(err);
            setErrorMessage(err.response?.data?.message || 'Failed to submit inquiry. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-slate-900 text-white relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
                        <Phone className="w-3.5 h-3.5" />
                        Inquiries & Provincial Tourism Desk
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
                        Connect with Oriental Mindoro
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                        Have custom tour requirements, group expedition queries, or institutional research requests? Our provincial information officers are ready to assist you.
                    </p>
                </div>

                {/* 2-Column: Office Info & Working Inquiry Form */}
                <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Office Details (Left 5 Cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-6">
                            <h3 className="text-xl font-bold font-display text-white">
                                Provincial Tourism Information Office
                            </h3>

                            <div className="space-y-4 text-sm text-slate-300">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white">Physical Address:</span>
                                        <p className="text-xs text-slate-300 mt-0.5">
                                            Provincial Capitol Complex, Barangay Camilmil, Calapan City, 5200 Oriental Mindoro, Philippines
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white">Hotlines:</span>
                                        <p className="text-xs text-slate-300 mt-0.5">
                                            (043) 288-7550 • +63 917 845 2210 (Tourist Assistance)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white">Official Email:</span>
                                        <p className="text-xs text-slate-300 mt-0.5">
                                            tourism@orientalmindoro.gov.ph / info@mindorohorizons.ph
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white">Office Hours:</span>
                                        <p className="text-xs text-slate-300 mt-0.5">
                                            Monday - Friday: 8:00 AM – 5:00 PM (Emergency Desk 24/7)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="pt-4 border-t border-white/10">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Follow Provincial Tourism</span>
                                <div className="flex items-center gap-3 mt-3">
                                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-teal-600 text-white flex items-center justify-center transition-colors" title="Facebook">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-teal-600 text-white flex items-center justify-center transition-colors" title="Instagram">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                    </a>
                                    <a href="https://x.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-teal-600 text-white flex items-center justify-center transition-colors" title="X (Twitter)">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                    </a>
                                    <a href="https://orientalmindoro.gov.ph" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-teal-600 text-white flex items-center justify-center transition-colors" title="Official Provincial Website">
                                        <Globe className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Working Inquiry Form (Right 7 Cols) */}
                    <div className="lg:col-span-7 bg-white p-8 rounded-3xl text-slate-900 shadow-xl border border-slate-100">
                        <h3 className="text-2xl font-bold font-display text-slate-900">
                            Send Us an Inquiry
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
                            Fill out the inquiry form below and our staff will respond within 24 business hours.
                        </p>

                        {successMessage && (
                            <div className="mb-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                <span>{successMessage}</span>
                            </div>
                        )}

                        {errorMessage && (
                            <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Your Full Name
                                    </label>
                                    <input 
                                        type="text"
                                        required
                                        placeholder="e.g. Juan Dela Cruz"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Email Address
                                    </label>
                                    <input 
                                        type="email"
                                        required
                                        placeholder="juan@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Contact Number / WhatsApp
                                    </label>
                                    <input 
                                        type="tel"
                                        placeholder="+63 917 123 4567"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Subject / Topic
                                    </label>
                                    <input 
                                        type="text"
                                        required
                                        placeholder="e.g. Group Dive Tour in Puerto Galera"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                    Your Message / Inquiry Details
                                </label>
                                <textarea
                                    required
                                    rows="4"
                                    placeholder="Tell us about your planned travel dates, number of people, preferred destinations, or any specific questions..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>Send Inquiry</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
