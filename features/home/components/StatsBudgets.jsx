import { use } from "react";
import { limitArray } from "@/utils/helpers";
import Chart from "@/components/layout/Chart";
import CardHeading from "@/components/layout/CardHeading";
import LabeledStat from "@/components/layout/LabeledStat";
import InlineEmpty from "@/components/layout/InlineEmpty";

export default function StatsBudgets({ data }) {
  const budgets = use(data);

  const hasBudgets = budgets.length > 0;
  const urlLabel = hasBudgets ? "See Details" : "Create a Budget";

  return (
    <article className="@container rounded-xl bg-white px-5 py-6 md:p-8">
      <CardHeading as="h2" url="/budgets" title="Budgets" urlLabel={urlLabel}>
        <div className="grid gap-4 md:grid-cols-[1fr_auto] @max-[23.75rem]:grid-cols-1">
          {hasBudgets ? (
            <div className="grid gap-4 md:grid-cols-[1fr_auto] @max-[23.75rem]:grid-cols-1">
              <Chart data={budgets} />

              <ul className="grid grid-cols-2 gap-4 md:grid-cols-1 @max-[23.75rem]:grid-cols-2">
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
          ) : (
            <InlineEmpty message="No budgets created yet." />
          )}
        </div>
      </CardHeading>
    </article>
  );
}
