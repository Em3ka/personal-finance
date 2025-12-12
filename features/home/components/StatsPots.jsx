import { use } from "react";
import Image from "next/image";
import { formatCurrency, limitArray } from "@/utils/helpers";
import CardHeading from "@/components/layout/CardHeading";
import LabeledStat from "@/components/layout/LabeledStat";

export default function StatsPots({ data }) {
  const pots = use(data);
  const saved = pots.reduce((acc, cur) => acc + cur.total, 0);

  return (
    <article className="rounded-xl bg-white px-5 py-6 md:p-8">
      <CardHeading title="Pots" as="h2" url="/pots" urlLabel="See Details">
        <div className="grid gap-5 md:grid-cols-[1fr_1.2fr]">
          <div className="bg-beige-100 grid grid-cols-[min-content_auto] items-center gap-x-5 rounded-xl p-4">
            <div className="relative row-span-2 size-10">
              <Image src="/icon-pot.svg" fill alt="Pot icon" />
            </div>

            <span className="text-grey-500 text-sm">Total Saved</span>
            <span className="text-grey-900 text-[32px] font-bold">
              {formatCurrency(saved, { minimumFractionDigits: 0 })}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {limitArray(pots).map((p) => (
              <LabeledStat key={p.id} text={p.name} value={p.total} color={p.theme} />
            ))}
          </div>
        </div>
      </CardHeading>
    </article>
  );
}
