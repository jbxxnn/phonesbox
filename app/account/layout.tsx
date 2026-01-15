import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MobileNavbar } from "@/components/mobile-navbar";
import { AccountSidebar } from "@/components/account/account-sidebar";

export default async function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login?next=/account");
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <MobileNavbar />

            <div className="container mx-auto px-4 py-8 pb-24 pt-[110px] md:pt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <AccountSidebar />

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
