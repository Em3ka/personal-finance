import { use } from "react";
import { limitArray } from "@/utils/helpers";
import CardHeading from "@/components/layout/CardHeading";
import CardTrnItem from "@/components/layout/CardTrnItem";
import CardTrnList from "@/components/layout/CardTrnList";

export default function StatsTransactions({ data }) {
  const { data: transactions } = use(data);
  const hasTransactions = transactions?.length > 0;

  return (
    <article className="rounded-xl bg-white px-5 py-6 md:p-8">
      <CardHeading
        as="h2"
        urlLabel="View All"
        title="Transactions"
        url={hasTransactions ? "/transactions" : "#"}>
        <CardTrnList
          emptyMessage="No recent transactions."
          data={limitArray(transactions, 4)}
          render={(item) => <CardTrnItem data={item} />}
        />
      </CardHeading>
    </article>
  );
}
