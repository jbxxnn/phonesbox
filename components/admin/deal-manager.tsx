"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Trash, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Deal {
    id: string;
    store_name: string;
    price: number;
    url: string;
    active: boolean;
}

export function DealManager({ phoneId }: { phoneId: string }) {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    // New Deal State
    const [newStore, setNewStore] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newUrl, setNewUrl] = useState("");

    const supabase = createClient();

    const fetchDeals = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("phone_deals")
            .select("*")
            .eq("phone_id", phoneId)
            .order("price", { ascending: true });

        if (data) setDeals(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchDeals();
    }, [phoneId]);

    const handleAdd = async () => {
        if (!newStore || !newPrice) return;
        setAdding(true);

        const { error } = await supabase.from("phone_deals").insert({
            phone_id: phoneId,
            store_name: newStore,
            price: parseFloat(newPrice),
            url: newUrl,
            active: true
        });

        if (error) {
            alert("Error adding deal: " + error.message);
        } else {
            setNewStore("");
            setNewPrice("");
            setNewUrl("");
            fetchDeals();
        }
        setAdding(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this deal?")) return;

        const { error } = await supabase.from("phone_deals").delete().eq("id", id);
        if (!error) fetchDeals();
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Reseller Deals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Add New Deal */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border-b pb-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Store Name</label>
                        <Input
                            placeholder="e.g. Amazon"
                            value={newStore}
                            onChange={e => setNewStore(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Price</label>
                        <Input
                            type="number"
                            placeholder="0.00"
                            value={newPrice}
                            onChange={e => setNewPrice(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Link URL</label>
                        <Input
                            placeholder="https://..."
                            value={newUrl}
                            onChange={e => setNewUrl(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleAdd} disabled={adding} className="w-full">
                        {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4 mr-2" /> Add Deal</>}
                    </Button>
                </div>

                {/* List of Deals */}
                <div className="space-y-2">
                    {loading ? (
                        <div className="flex justify-center py-4"><Loader2 className="animate-spin text-muted-foreground" /></div>
                    ) : deals.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground text-sm">No active deals found.</div>
                    ) : (
                        deals.map((deal) => (
                            <div key={deal.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded bg-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                                        {deal.store_name.substring(0, 2)}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{deal.store_name}</div>
                                        <a href={deal.url} target="_blank" className="text-xs text-blue-600 hover:underline flex items-center">
                                            {deal.url ? 'View Link' : 'No Link'} <ExternalLink className="w-3 h-3 ml-1" />
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="outline" className="text-base px-3">
                                        {deal.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </Badge>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80" onClick={() => handleDelete(deal.id)}>
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </CardContent>
        </Card>
    );
}
