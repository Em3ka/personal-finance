import { cn } from "@/utils/helpers";
import SectionHeading from "@/components/layout/SectionHeading";

export default function BudgetsSkeleton() {
  const CARD_COUNT = 2;
  const ROW_COUNT = 4;

  return (
    <>
      <SectionHeading title="Budgets">
        <div className="h-[52px] w-[168px] animate-pulse rounded-xl bg-gray-200" />
      </SectionHeading>

      <div className="grid animate-pulse gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* Summary (Left) */}
        <div className="grid gap-8 self-start rounded-xl bg-gray-200/50 p-8">
          {/* Chart Placeholder */}
          <div className="size-60 justify-self-center rounded-full bg-gray-300/80" />

          {/* Spending Summary Title */}
          <div className="h-6 w-40 rounded bg-gray-300/80" />

          {/* 4 Summary Rows */}
          <div className="grid gap-4">
            {Array.from({ length: ROW_COUNT }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex justify-between border-t border-gray-300/80",
                  i === 0 ? "border-t-0 pt-0" : "pt-3",
                )}>
                <div className="h-4 w-32 rounded bg-gray-300/80" />
                <div className="h-4 w-20 rounded bg-gray-300/80" />
              </div>
            ))}
          </div>
        </div>

        {/* Budget Cards (Right) */}
        <div className="space-y-5">
          {Array.from({ length: CARD_COUNT }).map((_, idx) => (
            <div key={idx} className="space-y-4 rounded-xl bg-gray-200/50 p-8">
              {/* Title with dot */}
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-full bg-gray-300/80" />
                  <div className="h-5 w-40 rounded bg-gray-300/80" />
                </div>
              </div>

              {/* Maximum spend */}
              <div className="h-3.5 w-48 rounded bg-gray-300/80" />

              {/* Progressbar */}
              <div className="h-7 w-full rounded bg-gray-300/80" />

              {/* Stats: Spent / Remaining */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-20 rounded bg-gray-300/80" />
                  <div className="h-4 w-14 rounded bg-gray-300/80" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-20 rounded bg-gray-300/80" />
                  <div className="h-4 w-14 rounded bg-gray-300/80" />
                </div>
              </div>

              {/* 3 Spending rows */}
              <div className="flex justify-between">
                <div className="h-5 w-48 rounded bg-gray-300/80" />
                <div className="h-5 w-16 rounded bg-gray-300/80" />
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center justify-between border-t border-gray-300/80",
                    i === 0 ? "border-t-0 pt-0" : "pt-3",
                  )}>
                  <div className="flex items-center gap-4">
                    <div className="hidden size-10 rounded-full bg-gray-300/80 xl:block"></div>
                    <div className="h-4 w-32 rounded bg-gray-300/80" />
                  </div>
                  <div className="h-4 w-12 rounded bg-gray-300/80" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
