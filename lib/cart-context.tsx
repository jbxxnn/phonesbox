"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Phone } from "@/lib/types";

export type CartItem = Phone & {
    quantity: number;
    selectedColor?: string;
    selectedStorage?: string;
};

interface CartContextType {
    items: CartItem[];
    addToCart: (phone: Phone) => void;
    removeFromCart: (phoneId: string) => void;
    updateQuantity: (phoneId: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("phone-store-cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever items change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("phone-store-cart", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addToCart = (phone: Phone) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === phone.id);
            if (existingItem) {
                return currentItems.map(item =>
                    item.id === phone.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentItems, { ...phone, quantity: 1 }];
        });
        // Optionally open cart or show toast
    };

    const removeFromCart = (phoneId: string) => {
        setItems(currentItems => currentItems.filter(item => item.id !== phoneId));
    };

    const updateQuantity = (phoneId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems(currentItems =>
            currentItems.map(item =>
                item.id === phoneId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
