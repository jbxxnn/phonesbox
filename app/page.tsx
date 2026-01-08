import { getPhones } from "@/lib/data";
import { StoreDashboard } from "@/components/store-dashboard";

export default async function Home() {
  const phones = await getPhones();

  return (
    <main>
      <StoreDashboard initialPhones={phones} />
    </main>
  );
}

