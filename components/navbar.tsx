"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";

export function Navbar() {
    return (
        <header className="hidden md:block sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-bold text-2xl text-primary tracking-tight">
                    Phone<span className="text-foreground">Broker</span>
                </Link>

                {/* Navigation Links */}
                <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <Link href="#" className="hover:text-foreground transition-colors">
                        All Phones
                    </Link>
                    <Link href="#" className="hover:text-foreground transition-colors">
                        Sell with Us
                    </Link>
                    <Link href="#" className="hover:text-foreground transition-colors">
                        Support
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search phones..."
                            className="w-full h-9 rounded-full bg-slate-100 border-none pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/70"
                        />
                    </div>

                    <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
                        <ShoppingBag className="w-5 h-5 text-foreground" />
                        {/* Badge placeholder */}
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
                    </button>

                    <Link href="/admin" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <User className="w-5 h-5 text-foreground" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
