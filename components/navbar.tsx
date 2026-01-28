"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, MapPin, ChevronDown } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu02Icon, Search01Icon, Search02Icon, ShoppingBasket02Icon, User03Icon } from '@hugeicons/core-free-icons';



export function Navbar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    return (
        <div className="flex flex-col w-full bg-charcoal hidden md:flex">
            {/* Main Header Row */}
            <header className="w-full">
                <div className="container mx-auto px-4 h-[88px] flex items-center justify-between gap-8">
                    {/* Logo and Menu */}
                    <div className="flex items-center gap-6 shrink-0">
                        {/* Logo */}
                        <Link href="/" className="font-bold text-3xl tracking-tight shrink-0 mr-2">
                            <span className="text-white">PHONE</span>
                            <span className="bg-[#ffeb3b] text-black px-1 ml-0.5 rounded-sm text-sm align-top font-bold h-4 inline-flex items-center">BOX</span>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl relative">
                        <div className="flex relative items-center w-full h-11 bg-white rounded overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search for anything"
                                className="w-full h-full px-4 text-base outline-none text-slate-900 placeholder:text-slate-500"
                                onChange={(e) => {
                                    const params = new URLSearchParams(searchParams);
                                    if (e.target.value) {
                                        params.set("q", e.target.value);
                                    } else {
                                        params.delete("q");
                                    }
                                    replace(`${pathname}?${params.toString()}`);
                                }}
                                defaultValue={searchParams.get("q")?.toString()}
                            />
                            <button className="h-full px-4 bg-white text-slate-500 hover:bg-slate-50 transition-colors">
                                <HugeiconsIcon icon={Search01Icon} size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Right Side Icons */}

                </div>
            </header>

            {/* Secondary Navigation Row - Blue Separator/Bottom Bar Style */}
            <div className="bg-charcoal border-t border-white/10 w-full hidden md:block">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-2 text-xs text-white/90">
                        {/* Left Links */}
                        <div className="flex items-center gap-4 text-platinum hover:text-lavender_gray">
                            <Link href="/shop" className="hover:underline">All Phones</Link>
                            <Link href="/shop?brand=Samsung" className="hover:underline">Samsung</Link>
                            <Link href="/shop?brand=Apple" className="hover:underline">Apple</Link>
                            <Link href="/shop?brand=Google" className="hover:underline">Google</Link>
                            <Link href="/shop?brand=Xiaomi" className="hover:underline">Xiaomi</Link>
                            <Link href="/shop?brand=OnePlus" className="hover:underline">OnePlus</Link>
                            <Link href="/shop?brand=Realme" className="hover:underline">Realme</Link>
                            <Link href="/shop?brand=Oppo" className="hover:underline">Oppo</Link>
                        </div>

                        {/* Right Links */}
                        <div className="flex items-center gap-4">
                            <Link href="/shop" className="hover:underline hover:text-white">Recently Viewed</Link>
                            <Link href="/shop" className="hover:underline hover:text-white">Order Status</Link>
                            <Link href="/shop" className="hover:underline hover:text-white">Saved Items</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
