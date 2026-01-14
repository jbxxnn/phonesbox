import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { Phone } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import Image from "next/image";

export function PhoneCard({ phone, currency }: { phone: Phone, currency?: string }) {
    const displayCurrency = currency || phone.currency;

    // Helper to get color for condition
    const getConditionStyle = (condition: string): React.CSSProperties | undefined => {
        const c = condition.toLowerCase().trim();
        if (c === 'new') return { backgroundColor: '#2563eb', color: 'white', borderColor: 'transparent' }; // blue-600
        if (c.includes('refurbished')) return { backgroundColor: '#16a34a', color: 'white', borderColor: 'transparent' }; // green-600
        if (c.includes('used') || c.includes('grade')) return { backgroundColor: '#ea580c', color: 'white', borderColor: 'transparent' }; // orange-600
        return undefined;
    };

    return (
        <Link href={`/phones/${phone.id}`} className="group block h-full">
            <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col p-4 transition-all hover:shadow-lg border border-transparent hover:border-slate-200">
                {/* Image Container */}
                <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                    {/* Heart Button */}
                    <button className="absolute top-2 right-2 z-10 p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-4 h-4" />
                    </button>

                    {/* Rank/Badge - Optional, reusing condition for now */}
                    <div className="absolute top-2 left-2 z-10">
                        <Badge
                            className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 shadow-sm"
                            style={getConditionStyle(phone.condition)}
                        >
                            {phone.condition}
                        </Badge>
                    </div>

                    {phone.images && phone.images.length > 0 ? (
                        <div className="relative w-full h-full p-4">
                            <Image
                                src={phone.images[0]}
                                alt={`${phone.brand} ${phone.model}`}
                                fill
                                className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    ) : phone.image_url ? (
                        <div className="relative w-full h-full p-4">
                            <img
                                src={phone.image_url}
                                alt={`${phone.brand} ${phone.model}`}
                                className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400">
                            <span className="text-xs">No Image</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col space-y-2">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                        {phone.brand}
                    </p>

                    <h3 className="font-medium text-slate-900 leading-tight line-clamp-2 min-h-[2.5rem]" title={`${phone.brand} ${phone.model}`}>
                        {phone.brand} {phone.model} {phone.storage ? `- ${phone.storage}` : ''}
                    </h3>

                    {/* Spacer to push price to bottom */}
                    <div className="flex-1" />

                    <div className="space-y-1 pt-2">
                        {phone.compare_at_price && (
                            <p className="text-[10px] font-bold text-slate-900">Winter Sale Deal</p>
                        )}

                        <div className="flex items-baseline flex-wrap gap-2">
                            <span className="text-lg font-bold text-slate-900">
                                {formatPrice(phone.price, displayCurrency)}
                            </span>
                            {phone.compare_at_price && (
                                <span className="text-xs text-slate-500 line-through decoration-slate-400">
                                    {formatPrice(phone.compare_at_price, displayCurrency)}
                                </span>
                            )}
                        </div>

                        {phone.availability_status !== 'in_stock' && (
                            <p className="text-xs text-amber-600 font-medium">
                                {phone.availability_status.replace('_', ' ')}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

