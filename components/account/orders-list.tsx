import { PackageIcon } from "lucide-react";
import Link from "next/link";

export function OrdersList() {
    // Mock empty state for now
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-900">Recent Orders</h3>
                <Link href="/account/orders" className="text-sm text-blue-600 font-medium hover:underline">
                    View all orders
                </Link>
            </div>

            <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                    <PackageIcon className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                    <h4 className="font-medium text-slate-900">No recent orders</h4>
                    <p className="text-sm text-slate-500 mt-1">When you place an order, it will appear here.</p>
                </div>
                <Link
                    href="/shop"
                    className="mt-4 px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        </div>
    );
}
