import { getPhone } from "@/lib/data";
import { getSiteSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/shop/product-gallery";
import { ResellerModal } from "@/components/shop/reseller-modal";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Truck, ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const phone = await getPhone(id);
    const settings = await getSiteSettings();

    if (!phone) {
        notFound();
    }

    const currency = settings?.site_currency || phone.currency || "USD";
    const discount = phone.compare_at_price ? Math.round(((phone.compare_at_price - phone.price) / phone.compare_at_price) * 100) : 0;

    return (
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 space-y-6 pb-32">
            {/* Breadcrumb / Back */}
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                    <Link href="/" className="hover:text-foreground">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-foreground">Shop</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium truncate max-w-[200px]">{phone.model}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Left: Gallery (Takes 7 cols) */}
                <div className="lg:col-span-7 space-y-8">
                    <ProductGallery
                        images={phone.images || []}
                        mainImage={phone.image_url}
                        title={`${phone.brand} ${phone.model}`}
                    />
                </div>

                {/* Right: Info Card (Takes 5 cols) - Dark Themed */}
                <div className="lg:col-span-5 relative">
                    {/* Sticky wrapper for desktop */}
                    <div className="sticky top-8 bg-charcoal text-white rounded-[5px] p-6 md:p-10 space-y-8">

                        {/* Header */}
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[0.9]">
                                {phone.brand}<br />
                                {phone.model}
                            </h1>

                            <div className="space-y-4">
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                    {phone.description || `Experience the perfect blend of innovation and reliability with the ${phone.brand} ${phone.model}. Verified by our experts.`}
                                </p>

                                <div className="flex items-center gap-2">
                                    <div className="flex text-amber-100">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium">Trusted by 1k+ customers</span>
                                </div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                            <span className="text-3xl font-bold text-white">
                                {formatPrice(phone.price, currency)}
                            </span>
                            {phone.compare_at_price && (
                                <>
                                    <span className="text-xl text-gray-500 line-through decoration-gray-500">
                                        {formatPrice(phone.compare_at_price, currency)}
                                    </span>
                                    <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
                                        {discount}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Selectors */}
                        <div className="space-y-6">
                            {/* Variant / Capacity */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                                    <span>Storage</span>
                                    <span className="text-white">{phone.variant}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {/* Since we don't have multiple variants linked, show current one as active + placeholders */}
                                    <button className="h-10 px-6 rounded-full border-2 border-white bg-white text-charcoal font-bold text-sm min-w-[3rem]">
                                        {phone.variant.replace(/\D/g, '') || "STD"}
                                    </button>
                                </div>
                            </div>

                            {/* Availability / Condition */}
                            <div className="space-y-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Condition</span>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium text-white">
                                        {phone.condition}
                                    </span>
                                    <span className={`inline-flex items-center px-4 py-2 rounded-full border border-white/20 ${phone.availability_status === 'in_stock' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-red-500/20 text-red-300'} text-sm font-medium`}>
                                        {phone.availability_status === 'in_stock' ? 'In Stock' : phone.availability_status.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>

                            {/* Colors */}
                            {phone.colors && phone.colors.length > 0 && (
                                <div className="space-y-3">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Color</span>
                                    <div className="flex gap-3">
                                        {phone.colors.map((c, i) => (
                                            <div key={i} className="group relative">
                                                <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-gray-200 cursor-help" title={c} />
                                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {c}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="space-y-4 pt-4">
                            <ResellerModal
                                phoneId={phone.id}
                                productName={`${phone.brand} ${phone.model}`}
                                trigger={
                                    <Button size="lg" className="w-full h-14 bg-[#ffeb3b] hover:bg-[#ffeb3b] text-black rounded-full font-bold text-base tracking-wide shadow-lg hover:shadow-orange-500/25 transition-all">
                                        Buy Now <span className="ml-2 text-xs font-normal opacity-70">(Best Prices)</span>
                                    </Button>
                                }
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 h-12 rounded-full border border-white/20 hover:bg-white/5 text-xs text-white uppercase font-bold tracking-wider transition-colors">
                                    <HelpCircle className="w-4 h-4" />
                                    Ask Question
                                </button>
                                <button className="flex items-center justify-center gap-2 h-12 rounded-full border border-white/20 hover:bg-white/5 text-xs text-white uppercase font-bold tracking-wider transition-colors">
                                    <ShieldCheck className="w-4 h-4" />
                                    Warranty
                                </button>
                            </div>
                        </div>

                        {/* Accordions */}
                        <div className="divide-y divide-white/10 pt-4">
                            <details className="group">
                                <summary className="flex items-center justify-between py-4 cursor-pointer list-none text-sm font-bold uppercase tracking-wider text-white hover:text-gray-300">
                                    <span>Technical Specs</span>
                                    <span className="transition-transform group-open:rotate-45 relative">
                                        <div className="w-4 h-0.5 bg-current absolute top-1/2 left-0 -translate-y-1/2" />
                                        <div className="h-4 w-0.5 bg-current absolute left-1/2 top-0 -translate-x-1/2" />
                                    </span>
                                </summary>
                                <div className="pb-4 text-gray-400 text-sm space-y-2">
                                    {phone.specs && Object.keys(phone.specs).length > 0 ? (
                                        Object.entries(phone.specs).map(([k, v]) => (
                                            <div key={k} className="flex justify-between border-b border-white/5 py-1">
                                                <span className="capitalize text-gray-500">{k.replace(/_/g, ' ')}</span>
                                                <span className="text-gray-300">{String(v)}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Standard specifications apply for this model.</p>
                                    )}
                                </div>
                            </details>

                            <details className="group">
                                <summary className="flex items-center justify-between py-4 cursor-pointer list-none text-sm font-bold uppercase tracking-wider text-white hover:text-gray-300">
                                    <span>Shipping Information</span>
                                    <span className="transition-transform group-open:rotate-45 relative">
                                        <div className="w-4 h-0.5 bg-current absolute top-1/2 left-0 -translate-y-1/2" />
                                        <div className="h-4 w-0.5 bg-current absolute left-1/2 top-0 -translate-x-1/2" />
                                    </span>
                                </summary>
                                <div className="pb-4 text-gray-400 text-sm">
                                    <p className="mb-2">Free shipping on all orders over $500.</p>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Standard Delivery: 2-4 Business Days</li>
                                        <li>Express Delivery: 1-2 Business Days</li>
                                    </ul>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="flex items-center justify-between py-4 cursor-pointer list-none text-sm font-bold uppercase tracking-wider text-white hover:text-gray-300">
                                    <span>Return Policy</span>
                                    <span className="transition-transform group-open:rotate-45 relative">
                                        <div className="w-4 h-0.5 bg-current absolute top-1/2 left-0 -translate-y-1/2" />
                                        <div className="h-4 w-0.5 bg-current absolute left-1/2 top-0 -translate-x-1/2" />
                                    </span>
                                </summary>
                                <div className="pb-4 text-gray-400 text-sm">
                                    <p>30-day return policy for all devices. Items must be in original condition.</p>
                                </div>
                            </details>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
