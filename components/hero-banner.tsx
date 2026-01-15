"use client";

import Link from "next/link";

export function HeroBanner() {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 px-5 md:px-0">
            {/* Left Card: Top Deals */}
            <div className="relative overflow-hidden col-span-1 md:col-span-2 rounded-xl h-[400px] md:h-[400px] p-8 pl-8 md:pl-32 flex flex-col justify-center items-start bg-gradient-to-r from-[#0046be] to-[#00c3e3]">
                <div className="relative z-10 font-bold leading-tight">
                    <span className="block text-[#fff200] text-4xl md:text-5xl font-light">Featured</span>
                    <span className="block text-[#fff200] text-5xl md:text-7xl">Top Deals</span>
                    <span className="block text-[#fff200] text-3xl md:text-5xl font-light">For New Users</span>
                </div>

                <Link
                    href="/shop"
                    className="relative z-10 mt-8 px-6 py-2 bg-white text-[#0046be] text-sm font-bold rounded-full hover:bg-gray-100 transition-colors"
                >
                    Shop now
                </Link>
            </div>

            {/* Right Card: Outlet Event */}
            <div className="relative overflow-hidden col-span-1 md:col-span-1 rounded-xl h-[350px] md:h-[400px] p-8 flex flex-col justify-center items-start bg-gradient-to-br from-[#0046be] via-[#6a0dad] to-[#d90429]">
                <div className="relative z-10">
                    <h2 className="text-[#fff200] text-5xl md:text-7xl font-medium leading-none mb-4">
                        Outlet<br />Deals
                    </h2>

                    <p className="text-white text-lg md:text-xl font-medium max-w-sm mb-6">
                        Save up to 50% on clearance, open-box and refurbished items
                    </p>

                    <p className="text-[#fff200] font-bold mb-8">
                        Limited time
                    </p>

                    <p className="text-white/80 text-xs mt-auto">
                        Valid while supplies last.<br />
                        Terms and conditions apply.
                    </p>
                </div>
            </div>
        </div>
    );
}
