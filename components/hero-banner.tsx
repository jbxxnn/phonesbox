"use client";

import Link from "next/link";

export function HeroBanner() {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 px-5 md:px-0">
            {/* Left Card: Top Deals */}
            <div className="relative overflow-hidden rounded-xl h-[300px] md:h-[400px] p-8 flex flex-col justify-center items-start bg-gradient-to-r from-[#0046be] to-[#00c3e3]">
                <div className="relative z-10 font-bold leading-tight">
                    <span className="block text-[#fff200] text-4xl md:text-5xl font-light">Featured</span>
                    <span className="block text-[#fff200] text-5xl md:text-7xl">Top Deals</span>
                    <span className="block text-[#fff200] text-3xl md:text-5xl font-light">for the New Year</span>
                </div>

                <Link
                    href="#"
                    className="relative z-10 mt-8 px-6 py-2 bg-white text-[#0046be] text-sm font-bold rounded-md hover:bg-gray-100 transition-colors"
                >
                    Shop now
                </Link>
            </div>

            {/* Right Card: Outlet Event */}
            <div className="relative overflow-hidden rounded-xl h-[300px] md:h-[400px] p-8 flex flex-col justify-center items-start bg-gradient-to-br from-[#0046be] via-[#6a0dad] to-[#d90429]">
                <div className="relative z-10">
                    <h2 className="text-[#fff200] text-5xl md:text-7xl font-medium leading-none mb-4">
                        Outlet<br />Event
                    </h2>

                    <p className="text-white text-lg md:text-xl font-medium max-w-sm mb-6">
                        Save up to 50% on clearance, open-box and refurbished items
                    </p>

                    <p className="text-[#fff200] font-bold mb-8">
                        Limited time
                    </p>

                    <p className="text-white/80 text-xs mt-auto">
                        Ends 1/19/26. Online and in store.<br />
                        Minimum savings is 5%. Exclusions apply.
                    </p>
                </div>
            </div>
        </div>
    );
}
