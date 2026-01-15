import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
    return (
        <footer className="hidden md:block bg-gradient-to-r from-blue-900 to-indigo-900 text-slate-200" style={{ background: "linear-gradient(to bottom, rgba(184, 212, 255, 1), rgba(204, 229, 255, 1))" }}>
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
        </footer>
    );
}
