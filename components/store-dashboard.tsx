"use client";

import { useState, useEffect } from "react";
import { Phone } from "@/lib/types";
import { PhoneGrid } from "@/components/phone-grid";
import { HeroBanner } from "@/components/hero-banner";
import { Categories } from "@/components/categories";
// import { Search, ShoppingBag, Camera } from "lucide-react"; // Icons retired with inline header
import Link from "next/link";
import { MobileNavbar } from "./mobile-navbar";
import { useSearchParams, usePathname, useRouter } from "next/navigation";


import { TrendingDeals } from "./trending-deals";
import { TopDeals } from "./top-deals";
import { RecommendedForYou } from "./recommended-for-you";

export function StoreDashboard({
    initialPhones,
    currency
}: {
    initialPhones: Phone[],
    currency?: string
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Sync local state with URL param
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q")?.toString() || "");
    const [priceFilter, setPriceFilter] = useState<string>("all");

    // Dynamic price config based on currency
    const isNGN = currency === 'NGN';
    const thresholds = isNGN
        ? { budget: 500000, premium: 1000000, labelBudget: '500k', labelPremium: '1m' }
        : { budget: 500, premium: 1000, labelBudget: '500', labelPremium: '1000' };

    const PRICE_RANGES = [
        { id: 'all', label: 'All' },
        { id: 'budget', label: `Budget (<${thresholds.labelBudget})` },
        { id: 'mid', label: `Mid-Range (${thresholds.labelBudget}-${thresholds.labelPremium})` },
        { id: 'premium', label: `Premium (${thresholds.labelPremium}+)` },
    ];

    // Update local state when URL changes (e.g. from desktop navbar)
    useEffect(() => {
        setSearchQuery(searchParams.get("q")?.toString() || "");
    }, [searchParams]);

    const handleSearch = (term: string) => {
        setSearchQuery(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const filteredPhones = initialPhones.filter(phone =>
        phone.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-24 space-y-8 pt-[110px] md:pt-0">
            {/* Mobile Header with Search */}
            {/* Mobile Navbar */}
            <MobileNavbar />

            <div className="px-0 md:container md:mx-auto md:px-4 space-y-8 pt-2 md:pt-4 min-h-[50vh]">

                {/* Hero & Categories - Hidden when searching */}
                {!searchQuery && (
                    <>
                        <section className="space-y-8">
                            <HeroBanner />
                            <TrendingDeals phones={initialPhones} currency={currency} />
                            <TopDeals phones={initialPhones} currency={currency} />
                            <RecommendedForYou phones={initialPhones} currency={currency} />
                        </section>
                    </>
                )}

                <div className="h-10" />


            </div>
        </div>
    );
}
