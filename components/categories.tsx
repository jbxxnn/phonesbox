"use client";

import { Smartphone, Monitor, Headphones, Tablet, Speaker, Grid } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
    { label: "Mobile", icon: Smartphone },
    { label: "Headphone", icon: Headphones },
    { label: "Tablets", icon: Tablet },
    { label: "Laptop", icon: Monitor },
    { label: "Speakers", icon: Speaker },
    { label: "More", icon: Grid },
];

export function Categories() {
    return (
        <div className="grid grid-cols-4 gap-4 sm:flex sm:flex-wrap sm:justify-start">
            {categories.map((cat, i) => (
                <button
                    key={cat.label}
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 group-hover:shadow-md">
                        <cat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-slate-600 group-hover:text-foreground">
                        {cat.label}
                    </span>
                </button>
            ))}
        </div>
    );
}
