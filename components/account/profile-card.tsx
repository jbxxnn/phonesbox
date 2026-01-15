import { User } from "@supabase/supabase-js";
import { UserIcon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function ProfileCard({ user }: { user?: User | null }) {
    if (!user) return null;

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 h-full">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-900">Account Info</h3>
                <button className="text-sm text-blue-600 font-medium hover:underline">Edit</button>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
                        {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-medium text-slate-900">Member</p>
                        <p className="text-xs text-slate-500">Member since {new Date(user.created_at).getFullYear()}</p>
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <HugeiconsIcon icon={Mail01Icon} size={18} className="text-slate-400" />
                        <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <HugeiconsIcon icon={UserIcon} size={18} className="text-slate-400" />
                        <span>Client ID: {user.id.slice(0, 8)}...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
