import { MobileNavbar } from "@/components/mobile-navbar";

export default function PhonesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Mobile Navbar serves as the header for mobile & desktop currently based on other files */}
            <MobileNavbar />

            {/* Main content wrapper without sidebar */}
            <main className="min-h-screen bg-[#f5f5f5]">
                {children}
            </main>
        </>
    );
}
