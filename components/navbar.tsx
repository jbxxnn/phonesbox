"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, MapPin, ChevronDown } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu02Icon, Search02Icon, ShoppingBasket02Icon, User03Icon } from '@hugeicons/core-free-icons';

export function Navbar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    return (
        <div className="hidden md:flex flex-col w-full bg-charcoal">
            {/* Main Header Row */}
            <header className="w-full">
                <div className="container mx-auto px-4 h-20 flex items-center gap-6">
                    {/* Logo */}
                    <Link href="/" className="font-bold text-3xl tracking-tight shrink-0 mr-2">
                        <span className="text-white">PHONE</span>
                        <span className="bg-punch_red text-platinum px-1 ml-0.5 rounded-sm text-sm align-top font-bold h-4 inline-flex items-center">BOX</span>
                    </Link>

                    {/* Menu Button */}
                    <button className="flex items-center text-platinum gap-2 text-lg font-medium hover:text-gray-300 transition-colors shrink-0">
                        <HugeiconsIcon
                            icon={Menu02Icon}
                            size={24}
                            color="currentColor"
                            strokeWidth={1.5}
                        />
                        Menu
                    </button>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-3xl relative">
                        <input
                            type="search"
                            placeholder="Search PhoneBox"
                            defaultValue={searchParams.get("q") || ""}
                            onChange={(e) => {
                                const term = e.target.value;
                                const params = new URLSearchParams(searchParams);
                                if (term) {
                                    params.set("q", term);
                                } else {
                                    params.delete("q");
                                }
                                replace(`${pathname}?${params.toString()}`);
                            }}
                            className="w-full h-10 rounded-full bg-[#edf2f4ff] text-black px-5 pr-12 text-base outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                        />
                        <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center rounded-r-full hover:bg-gray-100">
                            <HugeiconsIcon icon={Search02Icon} />
                        </button>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-8 ml-auto shrink-0 text-platinum">
                        <Link href="#" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                            <HugeiconsIcon
                                icon={User03Icon}
                                size={20}
                                color="currentColor"
                                strokeWidth={1.5}
                            />
                            <span className="font-medium text-sm hidden lg:inline">Account</span>
                        </Link>

                        <Link href="#" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                            <HugeiconsIcon
                                icon={ShoppingBasket02Icon}
                                size={20}
                                color="currentColor"
                                strokeWidth={1.5}
                            />
                            <span className="font-medium text-sm hidden lg:inline">Cart</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Secondary Navigation Row - Blue Separator/Bottom Bar Style */}
            <div className="bg-charcoal border-t border-white/10 w-full hidden md:block">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-2 text-xs text-white/90">
                        {/* Left Links */}
                        <div className="flex items-center gap-4 text-platinum hover:text-lavender_gray">
                            <Link href="/shop" className="hover:underline">Top Deals</Link>
                            <Link href="/shop" className="hover:underline">Deal of the Day</Link>
                            <Link href="/shop" className="hover:underline">Yes, Best Buy Sells That</Link>
                            <Link href="#" className="hover:underline">My Best Buy Memberships</Link>
                            <Link href="#" className="hover:underline">Credit Cards</Link>
                            <Link href="#" className="hover:underline">Gift Cards</Link>
                            <Link href="#" className="hover:underline">Gift Ideas</Link>
                        </div>

                        {/* Right Links */}
                        <div className="flex items-center gap-4">
                            <Link href="#" className="hover:underline hover:text-white">Recently Viewed</Link>
                            <Link href="#" className="hover:underline hover:text-white">Order Status</Link>
                            <Link href="#" className="hover:underline hover:text-white">Saved Items</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
