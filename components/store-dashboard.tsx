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

            <div className="px-5 md:container md:mx-auto md:px-4 space-y-8 pt-2 md:pt-8 min-h-[50vh]">

                {/* Hero & Categories - Hidden when searching */}
                {!searchQuery && (
                    <>
                        <section className="space-y-8">
                            <HeroBanner />
                            <TrendingDeals phones={initialPhones} currency={currency} />
                            <TopDeals phones={initialPhones} currency={currency} />
                        </section>
                    </>
                )}

                <div className="h-10" />

                {/* Flash Deals / Latest Listings */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg" style={{ background: 'linear-gradient(to left, #90adecff, #f79a69ff)', color: 'white', padding: '5px 10px', borderRadius: '30px' }}>
                            {searchQuery ? `Results for "${searchQuery}"` : "Flash Deals for You"}
                        </h3>
                        {!searchQuery && (
                            <Link href="#" className="bg-white px-2 py-1 rounded-full border border-blue-600 text-xs font-semibold text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 shrink-0" style={{ border: '0.5px solid blue' }}>See All</Link>
                        )}
                    </div>

                    <PhoneGrid phones={filteredPhones} currency={currency} />

                    {/* No Results State */}
                    {searchQuery && filteredPhones.length === 0 && (
                        <div className="text-center py-10 text-muted-foreground">
                            <p>No phones found matching your search.</p>
                            <button
                                onClick={() => handleSearch("")}
                                className="text-blue-600 hover:underline mt-2 text-sm"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </section>

                {/* Latest Phones (New Condition Only) - Hidden when searching */}
                {!searchQuery && (
                    <>
                        <section className="space-y-4 py-8 px-4 rounded-lg"
                            style={{ background: 'linear-gradient(to left, #d3dceeff, #c4d4f5ff)' }}
                        >
                            <div
                                className="flex items-center justify-between gap-2 py-2 p-4 text-white"
                            >
                                <h3 className="font-bold text-lg shrink-0" style={{ background: 'linear-gradient(to left, #90adecff, #f79a69ff)', color: 'white', padding: '5px 10px', borderRadius: '30px' }}>New items for You</h3>
                                <div className="h-px bg-white/50 flex-1 mx-2" />
                                <Link href="#" className="bg-white px-2 py-1 rounded-full border border-blue-600 text-xs font-semibold text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 shrink-0" style={{ border: '0.5px solid blue' }}>See All</Link>
                            </div>
                            <PhoneGrid phones={initialPhones.filter(p => p.condition.toLowerCase() === 'new')} currency={currency} mobileColumns={1} />
                        </section>


                        <div className="h-12" />

                        {/* Shop by Price */}
                        <section className="space-y-6">
                            <div className="flex flex-row items-center justify-between gap-4">
                                <h3 className="font-bold text-lg shrink-0 text-center sm:text-left" style={{ background: 'linear-gradient(to left, #90adecff, #f79a69ff)', color: 'white', padding: '5px 10px', borderRadius: '30px', width: '150px' }}>Shop by Price</h3>
                                <div className="flex p-1 bg-slate-100 rounded-full overflow-x-auto gap-2 border border-slate-200 flex-1 min-w-0 w-auto">
                                    {PRICE_RANGES.map((range) => (
                                        <button
                                            key={range.id}
                                            onClick={() => setPriceFilter(range.id)}
                                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${priceFilter === range.id
                                                ? 'bg-white text-blue-600 shadow-sm border border-blue'
                                                : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <PhoneGrid
                                phones={initialPhones.filter(phone => {
                                    if (priceFilter === 'budget') return phone.price < thresholds.budget;
                                    if (priceFilter === 'mid') return phone.price >= thresholds.budget && phone.price <= thresholds.premium;
                                    if (priceFilter === 'premium') return phone.price > thresholds.premium;
                                    return true;
                                })}
                                currency={currency}
                                mobileLayout="slider"
                            />
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}
