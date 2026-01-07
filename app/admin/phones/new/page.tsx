"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function NewPhonePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const supabase = createClient();

        // We should probably optimize this with a Server Action, 
        // but client-side submission is okay for admin for now.

        const phoneData = {
            brand: formData.get("brand"),
            model: formData.get("model"),
            variant: formData.get("variant"),
            condition: formData.get("condition"),
            price: parseFloat(formData.get("price") as string),
            currency: "USD",
            availability_status: formData.get("status"),
            image_url: formData.get("image_url"),
        };

        const { error } = await supabase.from("phones").insert(phoneData);

        if (error) {
            alert("Error creating phone: " + error.message);
        } else {
            router.push("/admin/phones");
            router.refresh();
        }
        setLoading(false);
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Add New Phone</h1>
                <p className="text-muted-foreground">Create a new listing for the store.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-lg bg-card">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Brand</label>
                        <input name="brand" required placeholder="Apple" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Model</label>
                        <input name="model" required placeholder="iPhone 13" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Variant (RAM/Storage)</label>
                        <input name="variant" required placeholder="128GB" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Condition</label>
                        <select name="condition" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                            <option value="New">New</option>
                            <option value="Used - Grade A">Used - Grade A</option>
                            <option value="Used - Grade B">Used - Grade B</option>
                            <option value="Refurbished">Refurbished</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price (USD)</label>
                        <input name="price" type="number" required placeholder="999" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <select name="status" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                            <option value="in_stock">In Stock</option>
                            <option value="limited">Limited</option>
                            <option value="request">Request Only</option>
                            <option value="sold">Sold Out</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Image URL</label>
                    <input name="image_url" placeholder="https://..." className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Listing
                </button>
            </form>
        </div>
    );
}
