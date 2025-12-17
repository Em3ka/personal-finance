import { Suspense } from "react";
import StatsPots from "@/features/home/components/StatsPots";
import StatsBills from "@/features/home/components/StatsBills";
import SectionHeading from "@/components/layout/SectionHeading";
import StatsBudgets from "@/features/home/components/StatsBudgets";
import StatsSummary from "@/features/home/components/StatsSummary";
import StatsTransactions from "@/features/home/components/StatsTransactions";
import StatsPotsSkeleton from "@/features/home/components/StatsPotsSkeleton";
import StatsBillsSkeleton from "@/features/home/components/StatsBillsSkeleton";
import StatsSummarySkeleton from "@/features/home/components/StatsSummarySkeleton";
import StatsBudgetsSkeleton from "@/features/home/components/StatsBudgetsSkeleton";
import {
  getPots,
  getBills,
  getBudgets,
  getTransactions,
  getCurrentBalance,
} from "@/lib/data-service";
import StatsTransactionsSkeleton from "@/features/home/components/StatsTransactionsSkeleton";

export const metadata = {
  title: "Dashboard",
  description:
    "View a quick overview of your finances with summaries of spending, budgets, bills, pots, and recent transactions.",
};

export default function Page() {
  const pots = getPots();
  const bills = getBills();
  const budgets = getBudgets();
  const transactions = getTransactions();
  const currentBalance = getCurrentBalance();

  return (
    <>
      <SectionHeading title="Overview" />
      <div className="space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:gap-6">
          <Suspense fallback={<StatsSummarySkeleton />}>
            <StatsSummary data={{ transactions, currentBalance }} />
          </Suspense>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <Suspense fallback={<StatsPotsSkeleton />}>
              <StatsPots data={pots} />
            </Suspense>

            <Suspense fallback={<StatsTransactionsSkeleton />}>
              <StatsTransactions data={transactions} />
            </Suspense>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<StatsBudgetsSkeleton />}>
              <StatsBudgets data={budgets} />
            </Suspense>

            <Suspense fallback={<StatsBillsSkeleton />}>
              <StatsBills data={bills} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
