import { use } from "react";
import { formatCurrency } from "@/utils/helpers";
import BillSummaryItem from "./BillSummaryItem";

export default function BillsSummary({ data }) {
  const { data: bills = [] } = use(data);

  const paidBills = bills.filter((t) => t.paid);
  const upcomingBills = bills.filter((t) => t.isDue);
  const dueSoonBills = bills.filter((t) => t.showCaution);

  const paidCount = paidBills.length;
  const upcomingCount = upcomingBills.length;
  const dueSoonCount = dueSoonBills.length;

  const paidTotal = formatCurrency(
    paidBills.reduce((acc, cur) => acc + Math.abs(cur.amount), 0),
  );

  const upcomingTotal = formatCurrency(
    upcomingBills.reduce((acc, cur) => acc + Math.abs(cur.amount), 0),
  );

  const dueSoonTotal = formatCurrency(
    dueSoonBills.reduce((acc, cur) => acc + Math.abs(cur.amount), 0),
  );

  const billList = [
    { title: "Paid Bills", text: `${paidCount} (${paidTotal})` },
    { title: "Total Upcoming", text: `${upcomingCount} (${upcomingTotal})` },
    {
      title: "Due Soon",
      text: `${dueSoonCount} (${dueSoonTotal})`,
      color: "text-red-500",
    },
  ];

  return (
    <article className="space-y-6 rounded-xl bg-white p-5">
      <h2 className="font-bold">Summary</h2>
      <ul className="divide-y">
        {billList.map((b) => (
          <li key={b.title} className="py-4 first:pt-0 last:pb-0">
            <BillSummaryItem title={b.title} text={b.text} color={b.color} />
          </li>
        ))}
      </ul>
    </article>
  );
}
