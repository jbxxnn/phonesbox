
import { getPhones } from "@/lib/data";
import { PhoneGrid } from "@/components/phone-grid";
import { HeroBanner } from "@/components/hero-banner";
import { Categories } from "@/components/categories";
import { Search, ShoppingBag, Camera } from "lucide-react";
import Link from "next/link";

import { Suspense } from "react";

// ... existing imports ...

async function LatestPhones() {
  const phones = await getPhones();
  return <PhoneGrid phones={phones} />;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background pb-24 md:pb-12">
      {/* ... keeping header ... */}
      <div className="md:hidden sticky top-0 z-40 bg-background/80 backdrop-blur-md px-5 py-3 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <div className="w-full h-10 bg-slate-100 rounded-full flex items-center px-10 text-sm text-muted-foreground">
            Search
          </div>
          <Camera className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-100/50 hover:bg-slate-100 transition-colors">
          <ShoppingBag className="w-5 h-5 text-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white"></span>
        </button>
      </div>

      <div className="px-5 md:container md:mx-auto md:px-4 space-y-8 pt-2 md:pt-8">
        {/* Hero Section */}
        <section>
          <HeroBanner />
        </section>

        {/* Categories */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Categories</h3>
          </div>
          <Categories />
        </section>

        {/* Flash Deals / Latest Listings */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Flash Deals for You</h3>
            <Link href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">See All</Link>
          </div>

          <Suspense fallback={<div className="h-64 flex items-center justify-center text-muted-foreground">Loading deals...</div>}>
            <LatestPhones />
          </Suspense>
        </section>
      </div>
    </main>
  );
}

