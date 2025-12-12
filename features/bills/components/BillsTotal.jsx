import { use } from "react";
import { formatCurrency } from "@/utils/helpers";
import RecurringBillsIcon from "@/assets/icon-recurring-bills.svg";

export default function BillsTotal({ data }) {
  const { data: billsData } = use(data);
  const totalBill = billsData.reduce((acc, cur) => acc + Math.abs(cur.amount), 0);

  return (
    <article className="bg-grey-900 flex items-center gap-x-5 gap-y-8 rounded-xl px-5 py-6 md:flex-col md:items-start">
      <div className="flex size-10 items-center justify-center">
        <RecurringBillsIcon aria-hidden="true" />
      </div>

      <div className="space-y-3 text-white">
        <p className="text-sm">Total bills</p>
        <p className="text-[2rem] leading-tight font-bold">{formatCurrency(totalBill)}</p>
      </div>
    </article>
  );
}
