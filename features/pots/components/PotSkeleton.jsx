import SectionHeading from "@/components/layout/SectionHeading";

export default function PotSkeleton() {
  const CARD_COUNT = 2;

  return (
    <>
      <SectionHeading title="Pots">
        <div className="h-[52px] w-[138px] animate-pulse rounded-xl bg-gray-200" />
      </SectionHeading>

      <div className="grid-cards-comfy grid animate-pulse gap-6">
        {Array.from({ length: CARD_COUNT }).map((_, idx) => (
          <div key={idx} className="grid h-72 gap-8 rounded-xl bg-gray-200/50 p-6">
            {/* Title with dot  */}
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded-full bg-gray-300/80" />
                <div className="h-5 w-40 rounded bg-gray-300/80" />
              </div>
            </div>

            <div className="grid gap-3">
              {/* Total saving */}
              <div className="flex items-center justify-between">
                <div className="h-5 w-16 rounded bg-gray-300/80" />
                <div className="h-8 w-32 rounded bg-gray-300/80" />
              </div>

              {/* Progressbar */}
              <div className="h-2 w-full rounded bg-gray-300/80"></div>

              {/* Percentage & target  */}
              <div className="flex items-center justify-between">
                <div className="h-5 w-16 rounded bg-gray-300/80" />
                <div className="h-5 w-32 rounded bg-gray-300/80" />
              </div>
            </div>

            {/* Button placeholder */}
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="h-14 w-full rounded-lg bg-gray-300/80" />
              <div className="h-14 w-full rounded-lg bg-gray-300/80" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
