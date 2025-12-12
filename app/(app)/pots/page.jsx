import { Suspense } from "react";
import Pots from "@/features/pots/components/Pots";
import PotSkeleton from "@/features/pots/components/PotSkeleton";

export const metadata = {
  title: "Pots",
  description: "Manage your savings pots and track progress toward your financial goals.",
};

export default async function Page() {
  return (
    <Suspense fallback={<PotSkeleton />}>
      <Pots />
    </Suspense>
  );
}
