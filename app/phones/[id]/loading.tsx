import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 space-y-6 pb-32">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center space-x-2">
                <Skeleton className="w-12 h-4" />
                <span className="text-gray-300">/</span>
                <Skeleton className="w-12 h-4" />
                <span className="text-gray-300">/</span>
                <Skeleton className="w-32 h-4" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Left: Gallery Skeleton (Takes 7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                    <Skeleton className="w-full aspect-square md:aspect-[4/3] rounded-3xl" />
                    <div className="flex gap-4 overflow-hidden">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="w-24 h-24 rounded-lg flex-shrink-0" />
                        ))}
                    </div>
                </div>

                {/* Right: Info Card Skeleton (Takes 5 cols) */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-8 bg-white border border-gray-100 rounded-[5px] p-6 md:p-10 space-y-8 shadow-sm">

                        {/* Header Skeleton */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="w-3/4 h-10 md:h-12" />
                                <Skeleton className="w-1/2 h-10 md:h-12" />
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <Skeleton className="w-full h-4" />
                                    <Skeleton className="w-full h-4" />
                                    <Skeleton className="w-2/3 h-4" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Skeleton className="w-24 h-4" />
                                    <Skeleton className="w-32 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Price Skeleton */}
                        <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                            <Skeleton className="w-32 h-10" />
                            <Skeleton className="w-20 h-6" />
                        </div>

                        {/* Selectors Skeleton */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Skeleton className="w-20 h-4" />
                                <div className="flex gap-3">
                                    <Skeleton className="w-24 h-10 rounded-full" />
                                    <Skeleton className="w-24 h-10 rounded-full" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Skeleton className="w-20 h-4" />
                                <div className="flex gap-3">
                                    <Skeleton className="w-32 h-10 rounded-full" />
                                    <Skeleton className="w-32 h-10 rounded-full" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Skeleton className="w-16 h-4" />
                                <div className="flex gap-3">
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Actions Skeleton */}
                        <div className="pt-4 space-y-4">
                            <Skeleton className="w-full h-14 rounded-full" />
                            <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="h-12 rounded-full" />
                                <Skeleton className="h-12 rounded-full" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
