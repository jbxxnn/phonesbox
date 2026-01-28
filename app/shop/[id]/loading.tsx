import { Skeleton } from "@/components/ui/skeleton";
import { ShopLayout } from "@/components/shop/shop-layout";

export default function Loading() {
    return (
        <ShopLayout>
            <div className="space-y-6 max-w-7xl mx-auto pb-20">
                <div className="w-32 h-6 bg-slate-100 rounded animate-pulse" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Gallery Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="aspect-square w-full rounded-lg" />
                        <div className="flex gap-2">
                            <Skeleton className="w-20 h-20 rounded-md" />
                            <Skeleton className="w-20 h-20 rounded-md" />
                            <Skeleton className="w-20 h-20 rounded-md" />
                        </div>
                    </div>

                    {/* Info Skeleton */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between mb-2">
                                <Skeleton className="w-24 h-4" />
                                <Skeleton className="w-20 h-6" />
                            </div>
                            <Skeleton className="w-3/4 h-10" />
                            <Skeleton className="w-1/2 h-6 mt-2" />
                        </div>

                        <div className="pb-6 border-b">
                            <Skeleton className="w-40 h-10" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-24 rounded-lg" />
                            <Skeleton className="h-24 rounded-lg" />
                        </div>

                        <div className="space-y-2">
                            <Skeleton className="w-32 h-6" />
                            <Skeleton className="w-full h-20" />
                        </div>

                        <div className="pt-6">
                            <Skeleton className="w-full h-14 rounded-md" />
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
