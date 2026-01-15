"use client";

import { useCart } from "@/lib/cart-context";
import { CartItem } from "@/components/cart/cart-item";
import { OrderSummary } from "@/components/cart/order-summary";
import Link from "next/link";
import { ShoppingBag03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function CartPage() {
    const { items } = useCart();
    // In a real app, currency might come from context or props if injected
    const currency = items.length > 0 ? items[0].currency : 'USD';

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-[110px] md:pt-0">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <HugeiconsIcon icon={ShoppingBag03Icon} size={40} className="text-slate-300" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
                <p className="text-slate-500 mb-8 max-w-sm">
                    Looks like you haven't added anything to your cart yet. Browse our products to find some great deals!
                </p>
                <Link
                    href="/shop"
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 pb-24 pt-[110px] md:pt-8 min-h-screen" style={{ height: "100vh" }}>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items List */}
                <div className="flex-1">
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-2">
                            <h2 className="font-bold text-lg text-slate-900">Items ({items.reduce((acc, i) => acc + i.quantity, 0)})</h2>
                        </div>

                        <div>
                            {items.map((item) => (
                                <CartItem key={item.id} item={item} currency={currency} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-[380px] shrink-0">
                    <OrderSummary currency={currency} />
                </div>
            </div>
        </div>
    );
}
