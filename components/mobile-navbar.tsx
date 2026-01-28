"use client";

import Link from "next/link";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu02Icon, Search02Icon, ShoppingBasket02Icon } from '@hugeicons/core-free-icons';


const CATEGORIES = [
    { id: 'all', label: 'All Phones' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'apple', label: 'Apple' },
    { id: 'google', label: 'Google' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'deals', label: 'Top Deals' },
];

export function MobileNavbar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q")?.toString() || "");


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

    return (
        <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-charcoal text-white shadow-md">
            {/* Top Row: Menu, Logo, Search, Cart */}
            <div className="flex items-center justify-between p-3 gap-3">
                {/* Left: Menu & Logo */}
                <div className="flex items-center gap-3 shrink-0">
                    <button className="text-white">
                        <HugeiconsIcon icon={Menu02Icon} size={24} />
                    </button>
                    <Link href="/" className="font-bold text-xl tracking-tight flex items-center">
                        <span className="text-white" style={{ fontSize: '1.25rem' }}>P</span>
                        <span className="bg-[#ffeb3b] text-black px-1 ml-0.5 rounded-sm text-[0.6rem] font-bold h-4 flex items-center leading-none self-start mt-1">BOX</span>
                    </Link>
                </div>

                {/* Center: Search Bar (Visible on mobile as wide as possible) */}
                <div className="flex-1 h-9 mx-1">
                    <div className="relative w-full h-9">
                        <input
                            type="text"
                            placeholder="Search for items..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full h-full rounded-md bg-white text-black pl-3 pr-8 text-base outline-none placeholder:text-gray-500"
                        />
                        <div className="absolute right-0 top-0 h-full w-8 flex items-center justify-center">
                            <HugeiconsIcon icon={Search02Icon} size={24} />
                        </div>
                    </div>
                </div>


            </div>

            {/* Bottom Row: Categories Slider */}
            <div className="bg-charcoal overflow-x-auto no-scrollbar">
                <div className="flex items-center px-4 py-3 gap-6 text-sm font-medium whitespace-nowrap">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.id}
                            href={cat.id === 'all' ? '/' : `/shop?brand=${cat.id}`}
                            className="text-white/90 hover:text-white"
                        >
                            {cat.label}
                        </Link>
                    ))}

                </div>
            </div>
        </div>
    );
}
