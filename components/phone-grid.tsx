import { Phone } from "@/lib/types";
import { PhoneCard } from "./phone-card";

export function PhoneGrid({ phones }: { phones: Phone[] }) {
    if (!phones || phones.length === 0) {
        return (
            <div className="text-center py-20">
                <h3 className="text-lg font-medium">No phones available at the moment.</h3>
                <p className="text-muted-foreground">Check back later for new listings.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {phones.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} />
            ))}
        </div>
    );
}
