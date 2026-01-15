import Image from "next/image";
import Link from "next/link";
import { MinusSignIcon, PlusSignIcon, Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { CartItem as CartItemType, useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

interface CartItemProps {
    item: CartItemType;
    currency?: string;
}

export function CartItem({ item, currency = 'USD' }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();
    const displayCurrency = currency || item.currency;

    return (
        <div className="flex flex-col sm:flex-row gap-4 py-6 border-b border-slate-100 last:border-0">
            {/* Image */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-slate-50 rounded-lg p-2 border border-slate-100">
                {item.images?.[0] || item.image_url ? (
                    <Image
                        src={item.images?.[0] || item.image_url || ''}
                        alt={item.model}
                        fill
                        className="object-contain mix-blend-multiply"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <span className="text-xs">No Image</span>
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start gap-2">
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{item.brand}</p>
                            <Link href={`/phones/${item.id}`} className="font-medium text-slate-900 hover:text-blue-600 transition-colors line-clamp-2">
                                {item.model}
                            </Link>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-600 transition-colors p-1"
                            aria-label="Remove item"
                        >
                            <HugeiconsIcon icon={Delete02Icon} size={20} />
                        </button>
                    </div>

                    <div className="mt-1 text-sm text-slate-500">
                        <p>{item.condition} • {item.storage || '128GB'} • {item.selectedColor || 'Black'}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-8">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-full flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600"
                        >
                            <HugeiconsIcon icon={MinusSignIcon} size={14} />
                        </button>
                        <span className="w-8 h-full flex items-center justify-center font-medium text-sm text-slate-900 border-x border-slate-200">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-slate-50 text-slate-600"
                        >
                            <HugeiconsIcon icon={PlusSignIcon} size={14} />
                        </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                        <p className="font-bold text-lg text-slate-900">
                            {formatPrice(item.price * item.quantity, displayCurrency)}
                        </p>
                        {item.quantity > 1 && (
                            <p className="text-xs text-slate-400">
                                {formatPrice(item.price, displayCurrency)} each
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
