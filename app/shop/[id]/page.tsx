import { getPhone } from "@/lib/data";
import { getSiteSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/shop/product-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Truck } from "lucide-react";
import Link from "next/link";
import { ShopLayout } from "@/components/shop/shop-layout";

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

    return (
        <ShopLayout>
            <div className="space-y-6 max-w-7xl mx-auto pb-20">
                {/* Breadcrumb / Back */}
                <Link href="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Shop
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left: Gallery */}
                    <div>
                        <ProductGallery
                            images={phone.images || []}
                            mainImage={phone.image_url}
                            title={`${phone.brand} ${phone.model}`}
                        />
                    </div>

                    {/* Right: Info */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{phone.brand}</span>
                                <Badge variant={phone.availability_status === 'in_stock' ? 'default' : 'secondary'}>
                                    {phone.availability_status === 'in_stock' ? 'In Stock' : phone.availability_status}
                                </Badge>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                                {phone.brand} {phone.model}
                            </h1>
                            <div className="mt-2 text-lg text-slate-600">
                                {phone.variant}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-4 border-b pb-6">
                            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                                {formatPrice(phone.price, currency)}
                            </span>
                            {phone.compare_at_price && (
                                <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground line-through">
                                        {formatPrice(phone.compare_at_price, currency)}
                                    </span>
                                    <span className="text-xs font-bold text-green-600">
                                        Save {formatPrice(phone.compare_at_price - phone.price, currency)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Key Features / Condition */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="bg-slate-50 border-none shadow-sm">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-full shadow-sm">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase">Condition</p>
                                        <p className="font-semibold">{phone.condition}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-50 border-none shadow-sm">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-full shadow-sm">
                                        <Truck className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase">Delivery</p>
                                        <p className="font-semibold">2-4 Days</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Description */}
                        {phone.description && (
                            <div className="prose prose-slate max-w-none text-slate-600">
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">About this device</h3>
                                <p className="whitespace-pre-wrap">{phone.description}</p>
                            </div>
                        )}

                        {/* Specs */}
                        {phone.specs && Object.keys(phone.specs).length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-slate-900">Technical Specifications</h3>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                    {Object.entries(phone.specs).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-2 border-b border-slate-100">
                                            <span className="text-slate-500 capitalize">{key.replace(/_/g, ' ')}</span>
                                            <span className="font-medium text-slate-900">{String(value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Colors if available */}
                        {phone.colors && phone.colors.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-slate-900">Available Colors</h3>
                                <div className="flex gap-2">
                                    {phone.colors.map(color => (
                                        <Badge key={color} variant="outline" className="px-3 py-1">
                                            {color}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="pt-6">
                            <Button size="lg" className="w-full text-lg h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-200">
                                Buy Now Via Agent
                            </Button>
                            <p className="mt-3 text-xs text-center text-muted-foreground">
                                Secure concierge purchase. We verify the device before you pay.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
