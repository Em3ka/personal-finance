import { use } from "react";
import { limitArray } from "@/utils/helpers";
import Chart from "@/components/layout/Chart";
import CardHeading from "@/components/layout/CardHeading";
import LabeledStat from "@/components/layout/LabeledStat";

export default function StatsBudgets({ data }) {
  const budgets = use(data);

  return (
    <article className="@container rounded-xl bg-white px-5 py-6 md:p-8">
      <CardHeading as="h2" url="/budgets" title="Budgets" urlLabel="See Details">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] @max-[380px]:grid-cols-1">
          <Chart data={budgets} />

          <ul className="grid grid-cols-2 gap-4 md:grid-cols-1 @max-[380px]:grid-cols-2">
            {limitArray(budgets).map((b) => (
              <LabeledStat
                key={b.id}
                text={b.category}
                value={b.maximum}
                color={b.theme}
              />
            ))}
          </ul>
        </div>
      </CardHeading>
    </article>
  );
}
