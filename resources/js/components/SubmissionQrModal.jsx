import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Download, Copy, Check, X, ExternalLink, Sparkles, Award } from 'lucide-react';
import QRCode from 'qrcode';

export default function SubmissionQrModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [siteUrl, setSiteUrl] = useState(window.location.origin || 'http://localhost:8000');
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateQr(siteUrl);
    }, [siteUrl]);

    const generateQr = async (text) => {
        try {
            const url = await QRCode.toDataURL(text, {
                width: 320,
                margin: 2,
                color: {
                    dark: '#0f172a',
                    light: '#ffffff'
                }
            });
            setQrDataUrl(url);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDownload = () => {
        if (!qrDataUrl) return;
        const link = document.createElement('a');
        link.download = `Mindoro-Horizons-Submission-QR.png`;
        link.href = qrDataUrl;
        link.click();
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(siteUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-md w-full p-4 sm:p-7 shadow-2xl border border-slate-200 text-center relative max-h-[92vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Academic Header Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1.5 sm:mb-2">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    Section X Submission Requirement
                </div>

                <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 font-display">
                    Final Exam Website QR Code
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                    Applied Business Tools & Technologies in Tourism (Final Examination)
                </p>

                {/* QR Code Canvas Frame */}
                <div className="mt-3 sm:mt-5 p-2.5 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200/90 inline-block shadow-inner">
                    {qrDataUrl ? (
                        <img 
                            src={qrDataUrl} 
                            alt="Website QR Code for Google Classroom Submission"
                            className="w-36 h-36 sm:w-52 sm:h-52 mx-auto rounded-xl shadow-xs"
                        />
                    ) : (
                        <div className="w-36 h-36 sm:w-52 sm:h-52 flex items-center justify-center text-slate-400 text-xs">
                            Generating QR Code...
                        </div>
                    )}
                </div>

                {/* Target URL with Editor & Copy */}
                <div className="mt-3 sm:mt-4 text-left">
                    <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Linked Website URL
                    </label>
                    <div className="flex items-center gap-2">
                        <input 
                            type="text"
                            value={siteUrl}
                            onChange={(e) => setSiteUrl(e.target.value)}
                            placeholder="http://localhost:8000"
                            className="flex-1 px-3 py-1.5 sm:py-2 text-xs rounded-xl border border-slate-300 font-mono bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                            onClick={handleCopyUrl}
                            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Copy link"
                        >
                            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 mt-1">
                        Scan with your smartphone camera to evaluate live on mobile.
                    </p>
                </div>

                {/* Action Download Button */}
                <div className="mt-4 sm:mt-6 flex flex-col gap-1.5 sm:gap-2">
                    <button
                        onClick={handleDownload}
                        className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        <span>Download QR Image (For Google Classroom)</span>
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full py-1.5 sm:py-2 rounded-xl text-slate-500 hover:text-slate-800 font-semibold text-xs transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
