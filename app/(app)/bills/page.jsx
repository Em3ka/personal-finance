import { Suspense, use } from "react";
import { getBills } from "@/lib/data-service";
import { loadFilters } from "../search-params";
import { billsColumns } from "@/utils/constants";
import TableLayout from "@/components/layout/TableLayout";
import { FiltersProvider } from "@/providers/FiltersProvider";
import FiltersLayout from "@/components/layout/FiltersLayout";
import SectionHeading from "@/components/layout/SectionHeading";
import BillsTotal from "@/features/bills/components/BillsTotal";
import { filtersConfig } from "@/features/bills/billsFiltersConfig";
import BillsSummary from "@/features/bills/components/BillsSummary";
import MobileBillsRow from "@/features/bills/components/MobileBillsRow";
import DesktopBillsRow from "@/features/bills/components/DesktopBillsRow";
import BillsTotalSkeleton from "@/features/bills/components/BillsTotalSkeleton";
import BillsTableSkeleton from "@/features/bills/components/BillsTableSkeleton";
import BillsSummarySkeleton from "@/features/bills/components/BillsSummarySkeleton";

export const metadata = {
  title: "Recurring Bills",
  description:
    "View and manage all your recurring bills in one place. Track upcoming payments, due amounts, and spending patterns.",
};

export default function Page({ searchParams }) {
  const filters = use(loadFilters(searchParams));
  const bills = getBills(filters);

  return (
    <>
      <SectionHeading title="Recurring Bills" />

      <div className="4xl:grid-cols-[1fr_2fr] grid gap-6 self-start">
        <div className="grid gap-6 self-start md:grid-cols-2 lg:grid-cols-1">
          <Suspense fallback={<BillsTotalSkeleton />}>
            <BillsTotal data={bills} />
          </Suspense>

          <Suspense fallback={<BillsSummarySkeleton />}>
            <BillsSummary data={bills} />
          </Suspense>
        </div>

        <div className="grid grid-rows-[min-content_auto] gap-6 rounded-xl bg-white px-5 py-6 md:p-8">
          <FiltersProvider config={filtersConfig}>
            <FiltersLayout />
          </FiltersProvider>

          <Suspense fallback={<BillsTableSkeleton />}>
            <TableLayout
              data={bills}
              columns={billsColumns}
              MobileRow={MobileBillsRow}
              DesktopRow={DesktopBillsRow}
              emptyMessage="No recurring bills found."
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
