import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Overview of your store performance.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-col space-y-1.5">
                        <h3 className="font-semibold leading-none tracking-tight">Total Phones</h3>
                    </div>
                    <div className="p-0 pt-4">
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">+0 from last month</p>
                    </div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-col space-y-1.5">
                        <h3 className="font-semibold leading-none tracking-tight">Pending Inquiries</h3>
                    </div>
                    <div className="p-0 pt-4">
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">+0 since last hour</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
