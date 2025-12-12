import { formatCurrency, slugify } from "@/utils/helpers";
import Heading from "@/components/layout/Heading";
import CardHeading from "@/components/layout/CardHeading";
import CardTrnList from "@/components/layout/CardTrnList";
import LabeledStat from "@/components/layout/LabeledStat";
import Progressbar from "@/components/layout/Progressbar";
import CardTrnItem from "@/components/layout/CardTrnItem";
import OverflowMenu from "@/components/layout/OverflowMenu";

export default function BudgetCard({
  theme,
  onEdit,
  category,
  onDelete,
  maxAmount,
  spentAmount,
  transactions,
}) {
  const url = slugify(`/transactions?c=${transactions[0]?.category}`);
  const maxBudget = maxAmount ? formatCurrency(maxAmount) : "$0.00";
  const remainingAmount = maxAmount - spentAmount;

  return (
    <article className="space-y-5 rounded-xl bg-white px-5 py-6 lg:p-8">
      <Heading as="h2" title={category} color={theme}>
        <OverflowMenu
          content={[
            { title: "Edit Budget", onClick: onEdit },
            { title: "Delete Budget", onClick: onDelete },
          ]}
        />
      </Heading>

      <div className="space-y-4">
        <span className="text-grey-500 text-sm">Maximum of {maxBudget}</span>
        <Progressbar size="large" theme={theme} min={spentAmount} maximum={maxAmount} />

        <div className="flex">
          <LabeledStat text="Spent" value={spentAmount} color={theme} />
          <LabeledStat text="Remaining" value={remainingAmount} />
        </div>

        <CardHeading
          as="h3"
          title="Latest Spending"
          url={transactions.length > 0 ? url : ""}
          wrapperClassName="bg-beige-100 rounded-xl p-4 px-4 md:p-5">
          {transactions.length > 0 ? (
            <CardTrnList
              data={transactions}
              render={(item) => <CardTrnItem data={item} />}
            />
          ) : (
            <div className="text-grey-500 py-6 text-center font-semibold">
              No transactions found
            </div>
          )}
        </CardHeading>
      </div>
    </article>
  );
}
