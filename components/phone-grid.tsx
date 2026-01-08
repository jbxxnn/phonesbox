import { Phone } from "@/lib/types";
import { PhoneCard } from "./phone-card";

export function PhoneGrid({ phones, currency, mobileLayout = 'grid' }: {
    phones: Phone[],
    currency?: string,
    mobileLayout?: 'grid' | 'slider'
}) {
    if (!phones || phones.length === 0) {
        return (
            <div className="text-center py-20">
                <h3 className="text-lg font-medium">No phones available at the moment.</h3>
                <p className="text-muted-foreground">Check back later for new listings.</p>
            </div>
        );
    }

    if (mobileLayout === 'slider') {
        return (
            <div className="flex -mx-5 px-5 overflow-x-auto snap-x snap-mandatory py-4 gap-4 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 sm:overflow-visible sm:px-0 sm:mx-0 sm:py-0">
                {phones.map((phone) => (
                    <div key={phone.id} className="min-w-[50%] w-[50%] snap-start sm:w-auto sm:min-w-0">
                        <PhoneCard phone={phone} currency={currency} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {phones.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} currency={currency} />
            ))}
        </div>
    );
}
