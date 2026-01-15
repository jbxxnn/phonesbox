"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { ArrowRight01Icon, SecurityCheckIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface OrderSummaryProps {
    currency?: string;
}

export function OrderSummary({ currency = 'USD' }: OrderSummaryProps) {
    const { cartTotal, cartCount } = useCart();

    const taxRate = 0.08; // Example tax rate
    const estimatedTax = cartTotal * taxRate;
    const finalTotal = cartTotal + estimatedTax;

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 sticky top-24">
            <h2 className="font-bold text-xl text-slate-900">Order Summary</h2>

            <div className="space-y-3 pt-2 text-sm">
                <div className="flex justify-between items-center text-slate-600">
                    <span>Original Price ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                    <span className="font-medium">{formatPrice(cartTotal, currency)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                    <span>Savings</span>
                    <span className="font-medium text-green-600">-$0.00</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                    <span>Store Pickup</span>
                    <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                    <span>Estimated Tax</span>
                    <span className="font-medium">{formatPrice(estimatedTax, currency)}</span>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
                <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-lg text-slate-900">Total</span>
                    <span className="font-bold text-2xl text-slate-900">{formatPrice(finalTotal, currency)}</span>
                </div>

                <button className="w-full bg-[#ffeb3b] text-black font-bold py-3.5 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 shadow-sm">
                    Checkout
                    <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <HugeiconsIcon icon={SecurityCheckIcon} size={16} className="text-green-600" />
                    <span>Secure Checkout</span>
                </div>
            </div>
        </div>
    );
}
