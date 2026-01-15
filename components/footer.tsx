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
        </footer>
    );
}
