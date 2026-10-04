import React, { useState } from 'react';
import { 
    Star, 
    Quote, 
    MessageSquarePlus, 
    X, 
    CheckCircle2, 
    Loader2,
    Sparkles
} from 'lucide-react';
import axios from 'axios';

export default function TestimonialsSection({ reviews, onNewReviewAdded }) {
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [authorName, setAuthorName] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState(5);
    const [destinationName, setDestinationName] = useState('Puerto Galera');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('/api/reviews', {
                author_name: authorName,
                location,
                rating,
                destination_name: destinationName,
                comment,
            });

            setSuccessMessage('Thank you for sharing your experience in Oriental Mindoro!');
            if (onNewReviewAdded) {
                onNewReviewAdded(res.data.review);
            }
            setTimeout(() => {
                setReviewModalOpen(false);
                setSuccessMessage('');
                setAuthorName('');
                setLocation('');
                setComment('');
            }, 1800);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 bg-slate-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            Tourist Experiences & Reviews
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                            What Travelers Say About Oriental Mindoro
                        </h2>
                    </div>

                    <button
                        onClick={() => setReviewModalOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0"
                    >
                        <MessageSquarePlus className="w-4 h-4 text-teal-600" />
                        <span>Leave a Review</span>
                    </button>
                </div>

                {/* Reviews Grid */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((rev) => (
                        <div 
                            key={rev.id}
                            className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                        >
                            <div className="space-y-3">
                                {/* Stars & Quote Icon */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-0.5 text-amber-400">
                                        {[...Array(rev.rating || 5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <Quote className="w-6 h-6 text-slate-200" />
                                </div>

                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                                    "{rev.comment}"
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-100 mt-4">
                                <h4 className="font-bold text-sm text-slate-900 font-display">{rev.author_name}</h4>
                                <p className="text-[11px] text-slate-400">{rev.location}</p>
                                <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 text-[10px] font-semibold">
                                    Visited {rev.destination_name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit Review Modal */}
            {reviewModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
                        <button
                            onClick={() => setReviewModalOpen(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <h3 className="text-xl font-bold font-display text-slate-900">
                            Share Your Oriental Mindoro Story
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 mb-4">
                            Your feedback helps other travelers plan their vacation.
                        </p>

                        {successMessage ? (
                            <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                                <p className="font-bold text-emerald-900 text-sm">{successMessage}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Your Name
                                    </label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="e.g. Maria Santos"
                                        value={authorName} 
                                        onChange={(e) => setAuthorName(e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                            Where are you from?
                                        </label>
                                        <input 
                                            type="text" 
                                            required 
                                            placeholder="e.g. Manila, Philippines"
                                            value={location} 
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                            Rating
                                        </label>
                                        <select 
                                            value={rating} 
                                            onChange={(e) => setRating(parseInt(e.target.value))}
                                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                                        >
                                            <option value={5}>⭐⭐⭐⭐⭐ (5/5 Outstanding)</option>
                                            <option value={4}>⭐⭐⭐⭐ (4/5 Very Good)</option>
                                            <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Destination / Tour Visited
                                    </label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="e.g. Bulalacao Sandbars or Tamaraw Falls"
                                        value={destinationName} 
                                        onChange={(e) => setDestinationName(e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Your Review & Experience
                                    </label>
                                    <textarea 
                                        required 
                                        rows="3"
                                        placeholder="What did you love most about the destination? Any advice for other travelers?"
                                        value={comment} 
                                        onChange={(e) => setComment(e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Submit Review</span>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
