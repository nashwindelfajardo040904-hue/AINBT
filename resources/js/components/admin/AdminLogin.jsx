import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function AdminLogin({ onLoginSuccess, onBackToSite, onCancel }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleBack = onCancel || onBackToSite;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            });

            const { token, user } = response.data;
            if (token) {
                localStorage.setItem('mindoro_admin_token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }

            if (onLoginSuccess) {
                onLoginSuccess(token, user);
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.response?.status === 429) {
                setError('Too many login attempts. Please wait 1 minute before trying again.');
            } else if (err.response?.data?.errors?.email) {
                setError(err.response.data.errors.email[0]);
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Invalid administrator email or password.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 text-slate-100 relative overflow-hidden font-sans">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Back Button */}
            {handleBack && (
                <button
                    onClick={handleBack}
                    className="absolute top-6 left-6 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 border border-slate-800 transition-colors shadow-sm cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Website</span>
                </button>
            )}

            {/* Login Card */}
            <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-teal-500/25 mb-4">
                        <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h2 className="text-2xl font-extrabold font-display text-white tracking-tight">
                        Admin Portal Login
                    </h2>
                    <p className="text-xs text-slate-400 mt-1.5">
                        Oriental Mindoro Tourism Management System
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Administrator Email
                        </label>
                        <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nashwindelfajardo040904@gmail.com"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Authenticating...</span>
                            </>
                        ) : (
                            <span>Sign In to Admin Portal</span>
                        )}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                    <p className="text-[11px] text-slate-500">
                        Protected area • Authorized tourism administrators only
                    </p>
                </div>
            </div>
        </div>
    );
}
