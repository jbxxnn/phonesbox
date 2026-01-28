"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Deal {
    id: string;
    store_name: string;
    price: number;
    url: string;
    active: boolean;
}

interface ResellerModalProps {
    phoneId: string;
    trigger?: React.ReactNode;
    productName?: string;
}

export function ResellerModal({ phoneId, trigger, productName }: ResellerModalProps) {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        if (open) {
            const fetchDeals = async () => {
                setLoading(true);
                const { data } = await supabase
                    .from("phone_deals")
                    .select("*")
                    .eq("phone_id", phoneId)
                    .eq("active", true)
                    .order("price", { ascending: true });

                if (data) setDeals(data);
                setLoading(false);
            };

            fetchDeals();
        }
    }, [open, phoneId]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button size="lg" className="w-full">Buy Now</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white text-black p-0 overflow-hidden gap-0 border-0 rounded-xl">
                <DialogHeader className="p-6 pb-2 bg-zinc-50 border-b">
                    <div className="flex items-center gap-2 mb-1">
                        <ShoppingBag className="w-5 h-5 text-indigo-600" />
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Best Prices For</span>
                    </div>
                    <DialogTitle className="text-xl font-bold text-zinc-900">{productName || "Product"} Deals</DialogTitle>
                </DialogHeader>

                <div className="p-2 bg-white max-h-[60vh] overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
                        </div>
                    ) : deals.length === 0 ? (
                        <div className="text-center py-12 px-6">
                            <p className="text-zinc-500 mb-4">No deals currently available for this model.</p>
                            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
                        </div>
                    ) : (
                        <div className="space-y-1 p-2">
                            {deals.map((deal) => (
                                <div
                                    key={deal.id}
                                    className="group flex items-center justify-between p-4 rounded-lg border border-zinc-100 bg-white hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold uppercase text-zinc-500 group-hover:bg-white group-hover:text-indigo-600 group-hover:shadow-sm transition-colors">
                                            {deal.store_name.substring(0, 1)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-zinc-900">{deal.store_name}</h4>
                                            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                                In Stock
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="font-bold text-lg text-zinc-900">
                                                {deal.price.toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                })}
                                            </div>
                                        </div>
                                        <Button asChild size="sm" className="bg-zinc-900 text-white hover:bg-indigo-600 transition-colors">
                                            <a href={deal.url} target="_blank" rel="noopener noreferrer">
                                                Visit <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="p-4 bg-zinc-50 text-center text-xs text-muted-foreground border-t">
                    Prices and availability are subject to change.
                </div>
            </DialogContent>
        </Dialog>
    );
}
