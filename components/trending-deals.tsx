"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "@/lib/types";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendingDealsProps {
    phones: Phone[];
    currency?: string;
}

const CATEGORIES = [
    "Cell Phones & Accessories",
    "Laptops & Computers",
    "PC Gaming",
    "Major Appliances",
    "Monitors",
    "Video Games & Virtual Reality"
];

export function TrendingDeals({ phones, currency = 'USD' }: TrendingDealsProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0,
        }).format(price);
    };

    // Take top 10 phones as "trending"
    const trendingPhones = phones.slice(0, 10);

    return (
        <div className="bg-white rounded-none md:rounded-xl p-6 space-y-6 shadow-none md:shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Trending deals</h2>
                <Link href="#" className="text-blue-600 font-medium text-sm hover:underline">
                    See more
                </Link>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                {CATEGORIES.map((cat, idx) => (
                    <button
                        key={cat}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors",
                            idx === 0
                                ? "border-blue-600 text-blue-600 bg-white"
                                : "border-slate-200 text-slate-700 hover:border-slate-300"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product List */}
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x">
                {trendingPhones.map((phone, idx) => (
                    <div
                        key={phone.id}
                        className="min-w-[200px] w-[200px] md:min-w-[220px] md:w-[220px] flex-none snap-start group relative"
                    >
                        {/* Rank Badge */}
                        <div className="absolute top-0 left-0 z-10 bg-blue-600 text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-tl-lg rounded-br-lg">
                            #{idx + 1}
                        </div>

                        {/* Heart Button */}
                        <button className="absolute top-0 right-0 z-10 p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white/50 backdrop-blur-sm rounded-full m-1">
                            <Heart className="w-5 h-5" />
                        </button>

                        <div className="space-y-3">
                            {/* Image */}
                            <div className="relative aspect-square bg-slate-50 rounded-lg overflow-hidden border border-slate-100 p-4 group-hover:border-slate-200 transition-colors">
                                {(phone.images?.[0] || phone.image_url) ? (
                                    <Image
                                        src={phone.images?.[0] || phone.image_url || ''}
                                        alt={phone.model}
                                        fill
                                        className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <span className="text-xs font-medium">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                                    {phone.brand}
                                </p>
                                <h3 className="text-sm font-medium text-slate-900 leading-tight line-clamp-2" title={phone.model}>
                                    {phone.model} - {phone.variant} - {phone.condition}
                                </h3>

                                <div className="pt-1">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-slate-900">
                                            {formatPrice(phone.price)}
                                        </span>
                                        {phone.compare_at_price && (
                                            <span className="text-xs text-slate-500 line-through decoration-slate-400">
                                                {formatPrice(phone.compare_at_price)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
