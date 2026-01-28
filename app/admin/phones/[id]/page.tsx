"use client";

import { DealManager } from "@/components/admin/deal-manager";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { Loader2, Plus, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "@/lib/types";

export default function EditPhonePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [phone, setPhone] = useState<Phone | null>(null);

    // Form states
    const [imageUrls, setImageUrls] = useState<string[]>([""]);
    const [colorInput, setColorInput] = useState("");

    useEffect(() => {
        async function fetchPhone() {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("phones")
                .select("*")
                .eq("id", resolvedParams.id)
                .single();

            if (data) {
                const p = data as Phone;
                setPhone(p);
                // Initialize form state
                setImageUrls(p.images && p.images.length > 0 ? p.images : (p.image_url ? [p.image_url] : [""]));
                setColorInput(p.colors ? p.colors.join(", ") : "");
            }
            setFetching(false);
        }
        fetchPhone();
    }, [resolvedParams.id]);

    const addImageUrlField = () => setImageUrls([...imageUrls, ""]);
    const updateImageUrl = (index: number, value: string) => {
        const newUrls = [...imageUrls];
        newUrls[index] = value;
        setImageUrls(newUrls);
    };
    const removeImageUrl = (index: number) => {
        setImageUrls(imageUrls.filter((_, i) => i !== index));
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!phone) return;
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const supabase = createClient();

        // Process images
        const images = imageUrls.filter(url => url.trim() !== "");
        // Process colors
        const colors = colorInput.split(",").map(c => c.trim()).filter(c => c !== "");

        const phoneData = {
            brand: formData.get("brand"),
            model: formData.get("model"),
            variant: formData.get("variant"),
            condition: formData.get("condition"),
            price: parseFloat(formData.get("price") as string),
            compare_at_price: formData.get("compare_at_price") ? parseFloat(formData.get("compare_at_price") as string) : null,
            availability_status: formData.get("status"),
            image_url: images[0] || "",
            description: formData.get("description"),
            images: images,
            colors: colors,
            // Preserve existing specs for now as we don't have a UI for it yet
            specs: phone.specs || {},
        };

        const { error } = await supabase
            .from("phones")
            .update(phoneData)
            .eq("id", phone.id);

        if (error) {
            alert("Error updating phone: " + error.message);
        } else {
            router.push("/admin/phones");
            router.refresh();
        }
        setLoading(false);
    }

    async function handleDelete() {
        if (!phone || !confirm("Are you sure you want to delete this listing?")) return;

        setLoading(true);
        const supabase = createClient();
        const { error } = await supabase.from("phones").delete().eq("id", phone.id);

        if (error) {
            alert("Error deleting phone: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/phones");
            router.refresh();
        }
    }

    if (fetching) return <div className="p-8"><Loader2 className="animate-spin" /></div>;
    if (!phone) return <div className="p-8">Phone not found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-24">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Edit Phone</h1>
                    <p className="text-muted-foreground">Manage listing for {phone.model}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={handleDelete} disabled={loading}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Basic Info */}
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <h3 className="font-semibold text-lg">Basic Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Brand</Label>
                                    <Input name="brand" defaultValue={phone.brand} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Model</Label>
                                    <Input name="model" defaultValue={phone.model} required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Variant</Label>
                                    <Input name="variant" defaultValue={phone.variant} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Condition</Label>
                                    <Select name="condition" defaultValue={phone.condition}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="New">New</SelectItem>
                                            <SelectItem value="Refurbished">Refurbished</SelectItem>
                                            <SelectItem value="Used - Grade A">Used - Grade A</SelectItem>
                                            <SelectItem value="Used - Grade B">Used - Grade B</SelectItem>
                                            <SelectItem value="Used">Used</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Price (USD)</Label>
                                    <Input name="price" type="number" defaultValue={phone.price} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Compare At Price</Label>
                                    <Input name="compare_at_price" type="number" defaultValue={phone.compare_at_price || ""} placeholder="Optional" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select name="status" defaultValue={phone.availability_status}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="in_stock">In Stock</SelectItem>
                                        <SelectItem value="limited">Limited</SelectItem>
                                        <SelectItem value="request">Request Only</SelectItem>
                                        <SelectItem value="sold">Sold Out</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Colors (comma separated)</Label>
                                <Input
                                    value={colorInput}
                                    onChange={(e) => setColorInput(e.target.value)}
                                    placeholder="Blue, Graphite, Silver"
                                />
                            </div>
                        </CardContent>
                    </Card>



                    // ... existing imports ...

                    // Inside the component:

                    {/* Media & Details */}
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <h3 className="font-semibold text-lg">Details & Media</h3>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    name="description"
                                    defaultValue={phone.description || ""}
                                    placeholder="Detailed product description..."
                                    className="min-h-[120px]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Image URLs</Label>
                                <div className="space-y-2">
                                    {imageUrls.map((url, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <Input
                                                value={url}
                                                onChange={(e) => updateImageUrl(idx, e.target.value)}
                                                placeholder={idx === 0 ? "Main Image URL" : "Gallery Image URL"}
                                            />
                                            {imageUrls.length > 1 && (
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeImageUrl(idx)}>
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={addImageUrlField} className="w-full">
                                        <Plus className="w-4 h-4 mr-2" /> Add Image
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Deals Manager Section */}
                <DealManager phoneId={phone.id} />

                <div className="flex justify-end">
                    <Button type="submit" disabled={loading} size="lg" className="w-full md:w-auto">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Update Listing
                    </Button>
                </div>
            </form>
        </div>
    );
}
