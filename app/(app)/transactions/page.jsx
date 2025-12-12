import { Suspense, use } from "react";
import { trnColumns } from "@/utils/constants";
import { loadFilters } from "../search-params";
import { getTransactions } from "@/lib/data-service";
import { FiltersProvider } from "@/providers/FiltersProvider";
import { filtersConfig } from "@/features/transactions/trnFiltersConfig";
import TableLayout from "@/components/layout/TableLayout";
import FiltersLayout from "@/components/layout/FiltersLayout";
import TableSkeleton from "@/components/layout/TableSkeleton";
import SectionHeading from "@/components/layout/SectionHeading";
import MobileTrnRow from "@/features/transactions/components/MobileTrnRow";
import DesktopTrnRow from "@/features/transactions/components/DesktopTrnRow";

export const metadata = {
  title: "Transactions",
  description: "Track your recent transactions and monitor your spending activity.",
};

export default function Page({ searchParams }) {
  const filters = use(loadFilters(searchParams));
  const trnData = getTransactions(filters);

  return (
    <>
      <SectionHeading title="Transactions" />
      <div className="grid gap-6 rounded-xl bg-white px-5 py-6 lg:p-8">
        <FiltersProvider config={filtersConfig}>
          <FiltersLayout />
        </FiltersProvider>

        <Suspense fallback={<TableSkeleton columns={trnColumns} />}>
          <TableLayout
            data={trnData}
            columns={trnColumns}
            MobileRow={MobileTrnRow}
            DesktopRow={DesktopTrnRow}
          />
        </Suspense>
      </div>
    </>
  );
}
