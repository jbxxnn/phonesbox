"use client";

import { useState, useEffect } from "react";
import { Phone } from "@/lib/types";
import { PhoneGrid } from "@/components/phone-grid";
import { HeroBanner } from "@/components/hero-banner";
import { Categories } from "@/components/categories";
import { Search, ShoppingBag, Camera } from "lucide-react";
import Link from "next/link";
import { Navbar } from "./navbar";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function StoreDashboard({
    initialPhones
}: {
    initialPhones: Phone[]
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Sync local state with URL param
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q")?.toString() || "");

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
        <div className="min-h-screen pb-24 md:pb-12 space-y-8">
            {/* Mobile Header with Search */}
            <div className="md:hidden sticky top-0 z-40 bg-background/10 backdrop-blur-md px-5 py-3 flex items-center gap-4 border-b">
                <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
                    <ShoppingBag className="w-5 h-5 text-foreground" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white"></span>
                </button>
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search phones..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full h-10 bg-white rounded-full pl-10 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-muted-foreground"
                    />
                    {searchQuery ? (
                        <button
                            onClick={() => handleSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200"
                        >
                            <span className="sr-only">Clear</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-muted-foreground"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    ) : (
                        <Camera className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    )}
                </div>
                <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors md:hidden">
                    {/* Placeholder for user/menu */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                        JD
                    </div>
                </button>
            </div>

            <div className="px-5 md:container md:mx-auto md:px-4 space-y-8 pt-2 md:pt-8 min-h-[50vh]">

                {/* Hero & Categories - Hidden when searching */}
                {!searchQuery && (
                    <>
                        <section>
                            <HeroBanner />
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-lg">Categories</h3>
                            </div>
                            <Categories />
                        </section>
                    </>
                )}

                {/* Flash Deals / Latest Listings */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">
                            {searchQuery ? `Results for "${searchQuery}"` : "Flash Deals for You"}
                        </h3>
                        {!searchQuery && (
                            <Link href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">See All</Link>
                        )}
                    </div>

                    <PhoneGrid phones={filteredPhones} />

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
            </div>
        </div>
    );
}
