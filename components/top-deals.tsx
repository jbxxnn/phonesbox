"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "@/lib/types";
import { Heart } from "lucide-react";

interface TopDealsProps {
    phones: Phone[];
    currency?: string;
}

export function TopDeals({ phones, currency = 'USD' }: TopDealsProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2,
        }).format(price);
    };

    // Filter or sort phones to find "Top Deals"
    // Ideally we look for items with high discount (compare_at_price - price)
    // For now, let's just take a slice of phones that have a compare_at_price or simulate it
    const dealPhones = phones
        .filter(p => !p.compare_at_price || p.compare_at_price > p.price) // Sanity check
        .slice(0, 8); // Take top 8

    return (
        <div className="bg-white rounded-none md:rounded-xl shadow-none md:shadow-sm overflow-hidden p-6">
            <div className="flex flex-col md:flex-row gap-6">

                {/* Banner Section */}
                {/* Mobile: Full width top banner */}
                {/* Desktop: Fixed width left sidebar */}
                <div className="">
                    <div className="bg-charcoal p-2">
                        <div className="
                    w-full md:w-[240px] md:min-w-[240px] md:h-auto
                    bg-gradient-to-br from-punch_red to-space_indigo
                    text-white rounded-none p-4
                    flex flex-col justify-center items-start md:items-center text-center
                    relative overflow-hidden
                    min-h-[20px] md:min-h-[250px]
                ">
                            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-2">
                                <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase leading-none text-yellow-300 drop-shadow-sm">
                                    Top <span className="font-light">Deals</span>
                                </h2>

                                {/* Desktop "See all" button hidden on mobile for this layout position, 
                            or we can keep it if it fits. The mockup shows it inside the box on desktop. */}

                            </div>

                            {/* Decorative circles/overlay could go here to match image noise/gradient style more closely */}
                        </div>
                    </div>
                    <div className="hidden md:block mt-4 w-full text-center">
                        <Link
                            href="/deals"
                            className="block w-full py-3 bg-white text-blue-700 font-bold text-sm border border-blue-700 rounded-full hover:bg-space_indigo hover:text-white hover:border hover:border-space_indigo transition-colors"
                        >
                            See all Top Deals
                        </Link>
                    </div>
                </div>

                {/* Products Slider */}
                <div className="flex-1 overflow-x-auto no-scrollbar">
                    <div className="flex gap-4 pb-4 px-0 md:px-1 min-w-min">
                        {dealPhones.map((phone) => {
                            const comparePrice = phone.compare_at_price || phone.price * 1.2; // Fallback for demo if missing
                            const savings = comparePrice - phone.price;

                            return (
                                <div
                                    key={phone.id}
                                    className="min-w-[180px] w-[180px] md:min-w-[220px] md:w-[220px] flex-none group rounded-xl bg-white relative"
                                >
                                    {/* Save Badge */}
                                    <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded">
                                        Save {formatPrice(savings).replace(/\.00$/, '')}
                                    </div>

                                    {/* Heart Button */}
                                    <button className="absolute top-3 right-3 z-10 p-1.5 text-slate-400 hover:text-blue-600 transition-colors bg-white rounded-full border border-slate-100 shadow-sm">
                                        <Heart className="w-4 h-4" />
                                    </button>

                                    {/* Image */}
                                    <div className="relative aspect-square mb-3 mt-0">
                                        {(phone.images?.[0] || phone.image_url) ? (
                                            <Image
                                                src={phone.images?.[0] || phone.image_url || ''}
                                                alt={phone.model}
                                                fill
                                                className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50 rounded-lg">
                                                <span className="text-xs font-medium">No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-1">
                                        <h3 className="text-sm text-slate-900 font-medium leading-tight line-clamp-2 mb-2">
                                            {phone.brand} {phone.model} {phone.storage}
                                        </h3>
                                        <div className="space-y-0.5">
                                            <div className="text-lg font-bold text-slate-900">
                                                {formatPrice(phone.price)}
                                            </div>
                                            <div className="text-xs text-slate-400 line-through">
                                                {formatPrice(comparePrice)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

            {/* Mobile "See all" - only visible on mobile at bottom */}
            <div className="md:hidden mt-2">
                <Link
                    href="/deals"
                    className="flex text-blue-700 font-bold text-base hover:underline items-center gap-1"
                >
                    See all Top Deals
                </Link>
            </div>
        </div>
    );
}
