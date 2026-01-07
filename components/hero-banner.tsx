import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroBanner() {
    return (
        <div className="relative w-full aspect-[2/1] sm:aspect-[3/1] bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden shadow-lg p-6 sm:p-10 text-white flex flex-col justify-center items-start">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />

            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-20 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl" />

            <div className="relative z-10 max-w-[60%] space-y-2 sm:space-y-4">
                <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
                    iPhone 16 Pro
                </h2>
                <p className="text-sm sm:text-base text-blue-100 font-medium">
                    Extraordinary Visual & Exceptional Power
                </p>

                <Link
                    href="#"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-full text-xs sm:text-sm font-bold mt-2 shadow-sm hover:scale-105 transition-transform"
                >
                    Shop Now
                </Link>
            </div>

            {/* Image Placeholder - In real app, separate image or background image */}
            <div className="absolute right-[-20px] bottom-[-20px] sm:right-10 sm:bottom-[-40px] w-40 h-48 sm:w-60 sm:h-72 bg-gradient-to-br from-slate-200 to-slate-400 rounded-lg shadow-2xl skew-x-[-5deg] rotate-[-5deg] opacity-90 hidden sm:block">
                {/* Placeholder for phone image */}
            </div>
        </div>
    );
}
