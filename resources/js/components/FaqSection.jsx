import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { FAQ_LIST } from '../data/mindoroData';

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-white relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
                        <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                        Frequently Asked Questions
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
                        Traveler Assistance & FAQs
                    </h2>
                    <p className="mt-3 text-slate-600 text-sm sm:text-base">
                        Get quick answers to the most common queries regarding ferry schedules, diving, environmental fees, and provincial logistics.
                    </p>
                </div>

                {/* FAQ Accordion List */}
                <div className="mt-12 space-y-4">
                    {FAQ_LIST.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div 
                                key={idx}
                                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                                    isOpen 
                                        ? 'bg-teal-50/50 border-teal-300 shadow-sm' 
                                        : 'bg-white border-slate-200 hover:border-slate-300'
                                }`}
                            >
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 transition-colors"
                                >
                                    <span className="font-bold text-slate-900 text-sm sm:text-base font-display">
                                        {faq.q}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                        isOpen ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-teal-100/80 pt-3 animate-in fade-in">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
