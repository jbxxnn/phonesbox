"use client";

import { useState } from "react";
import { Phone } from "@/lib/types";
import { PhoneCard } from "@/components/phone-card";
import { cn } from "@/lib/utils";

interface RecommendedForYouProps {
    phones: Phone[];
    currency?: string;
}

export function RecommendedForYou({ phones, currency = 'USD' }: RecommendedForYouProps) {
    const [activeFilter, setActiveFilter] = useState("all");

    const isNGN = currency === 'NGN';
    const thresholds = isNGN
        ? { budget: 500000, premium: 1000000, labelBudget: '500k', labelPremium: '1m' }
        : { budget: 500, premium: 1000, labelBudget: '$500', labelPremium: '$1000' };

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'budget', label: `Under ${thresholds.labelBudget}` },
        { id: 'mid', label: `${thresholds.labelBudget} - ${thresholds.labelPremium}` },
        { id: 'premium', label: `${thresholds.labelPremium}+` },
    ];

    const filteredPhones = phones.filter(phone => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'budget') return phone.price < thresholds.budget;
        if (activeFilter === 'mid') return phone.price >= thresholds.budget && phone.price < thresholds.premium;
        if (activeFilter === 'premium') return phone.price >= thresholds.premium;
        return true;
    }).slice(0, 8); // Limit to 8 items for a clean grid

    return (
        <div className="bg-white rounded-xl p-6 space-y-6 shadow-sm">
            <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Recommended for you</h2>
                <p className="text-sm text-slate-500">Inspired by your shopping history</p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors",
                            activeFilter === filter.id
                                ? "border-blue-600 text-blue-600 bg-blue-50"
                                : "border-slate-200 text-slate-700 hover:border-slate-300"
                        )}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredPhones.map(phone => (
                    <PhoneCard key={phone.id} phone={phone} currency={currency} />
                ))}
            </div>

            {filteredPhones.length === 0 && (
                <div className="py-12 text-center text-slate-500 text-sm">
                    No items found in this price range.
                </div>
            )}
        </div>
    );
}
