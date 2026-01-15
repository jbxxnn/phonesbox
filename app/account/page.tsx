import { createClient } from "@/lib/supabase/server";
import { OrdersList } from "@/components/account/orders-list";
import { ProfileCard } from "@/components/account/profile-card";
import { FavouriteIcon, ShoppingBag03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default async function AccountPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-slate-900">
                    Hello, {user?.email?.split('@')[0]}!
                </h1>
                <p className="text-slate-500">
                    Welcome back to your account dashboard.
                </p>
            </div>

            {/* Quick Stats / Actions */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-600 text-white p-6 rounded-xl flex flex-col justify-between h-[120px] shadow-sm hover:opacity-95 transition-opacity cursor-pointer">
                    <HugeiconsIcon icon={ShoppingBag03Icon} size={24} className="w-8 h-8 opacity-80" />
                    <div>
                        <span className="font-bold text-2xl block">0</span>
                        <span className="text-sm font-medium opacity-90">Open Orders</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between h-[120px] shadow-sm hover:border-slate-300 transition-colors cursor-pointer">
                    <HugeiconsIcon icon={FavouriteIcon} size={24} className="w-8 h-8 text-slate-400" />
                    <div>
                        <span className="font-bold text-2xl text-slate-900 block">0</span>
                        <span className="text-sm font-medium text-slate-500">Saved Items</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Orders List - Takes up 2/3 */}
                <div className="lg:col-span-2">
                    <OrdersList />
                </div>

                {/* Profile Card - Takes up 1/3 */}
                <div className="lg:col-span-1">
                    <ProfileCard user={user} />
                </div>
            </div>
        </div>
    );
}
