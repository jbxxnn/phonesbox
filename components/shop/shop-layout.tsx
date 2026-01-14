import { ReactNode } from "react";
import { FilterSidebar } from "./filter-sidebar";
import { MobileNavbar } from "@/components/mobile-navbar";

export function ShopLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <MobileNavbar />
            <div className="container mx-auto px-4 py-8 pb-24 pt-[110px] md:pt-8 min-h-screen">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <FilterSidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
