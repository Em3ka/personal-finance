import { use } from "react";
import { formatCurrency } from "@/utils/helpers";
import CardHeading from "@/components/layout/CardHeading";

export default function StatsBills({ data }) {
  const { data: bills = [] } = use(data);

  const paidBills = bills.filter((t) => t.paid);
  const upcomingBills = bills.filter((t) => t.isDue);
  const dueSoonBills = bills.filter((t) => t.showCaution);

  const paidTotal = paidBills.reduce((acc, cur) => acc + Math.abs(cur.amount), 0);
  const upcomingTotal = upcomingBills.reduce((acc, cur) => acc + Math.abs(cur.amount), 0);
  const dueSoonTotal = dueSoonBills.reduce((acc, cur) => acc + Math.abs(cur.amount), 0);

  const billList = [
    { title: "Paid Bills", text: paidTotal, color: "#277c78" }, // green-500
    { title: "Total Upcoming", text: upcomingTotal, color: "#f2ccab" }, // yellow-500
    { title: "Due Soon", text: dueSoonTotal, color: "#83cad8" }, // cyan-500
  ];

  const allZero = paidTotal === 0 && upcomingTotal === 0 && dueSoonTotal === 0;

  return (
    <article className="rounded-xl bg-white px-5 py-6 md:p-8">
      <CardHeading
        as="h2"
        urlLabel="See Details"
        title="Recurring Bills"
        url={allZero ? "#" : "/bills"}>
        <ul className="space-y-3">
          {billList.map((b) => (
            <li
              key={b.title}
              className="bg-beige-100 flex items-center justify-between rounded-lg border-l-4 px-4 py-5"
              style={{ borderColor: b.color }}>
              <span className="text-grey-500 text-sm">{b.title}</span>
              <span className="text-sm font-bold text-gray-900">
                {formatCurrency(b.text)}
              </span>
            </li>
          ))}
        </ul>
      </CardHeading>
    </article>
  );
}
