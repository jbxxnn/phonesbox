"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    UserIcon,
    ShoppingBag03Icon,
    FavouriteIcon,
    Settings02Icon,
    Logout03Icon
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const NAV_ITEMS = [
    { title: "Overview", href: "/account", icon: UserIcon },
    { title: "Orders & Purchases", href: "/account/orders", icon: ShoppingBag03Icon },
    { title: "Saved Items", href: "/account/saved", icon: FavouriteIcon },
    { title: "Account Settings", href: "/account/settings", icon: Settings02Icon },
];

export function AccountSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full lg:w-64 shrink-0 space-y-8">
            {/* User Hello - Mobile only maybe? Or stick to simple nav */}
            <div className="hidden lg:block space-y-1 px-4">
                <h3 className="font-bold text-lg">My Account</h3>
                <p className="text-sm text-muted-foreground">Manage your orders and profile</p>
            </div>

            <nav className="flex overflow-x-auto lg:flex-col lg:overflow-x-visible items-center lg:items-stretch gap-2 lg:gap-1 p-1 lg:p-0">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                                isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <HugeiconsIcon icon={item.icon} size={20} className={isActive ? "text-blue-700" : "text-slate-400"} />
                            {item.title}
                        </Link>
                    );
                })}

                <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-2 md:mt-4">
                    <HugeiconsIcon icon={Logout03Icon} size={20} />
                    Sign Out
                </button>
            </nav>
        </aside>
    );
}
