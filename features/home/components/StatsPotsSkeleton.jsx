import Image from "next/image";

export default function StatsPotsSkeleton() {
  return (
    <div className="rounded-xl bg-white px-5 py-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        {/* Title */}
        <div className="bg-grey-200 h-6 w-24 rounded text-xl font-bold">Pots</div>
      </div>

      <div className="grid gap-5 md:grid-cols-[1fr_1.2fr]">
        {/* Saved container */}
        <div className="bg-beige-100 grid grid-cols-[min-content_auto] items-center gap-x-5 rounded-xl p-4 max-md:gap-y-3">
          <div className="relative row-span-2 size-10">
            <Image src="/icon-pot.svg" fill alt="Pot icon" />
          </div>

          <div className="bg-grey-300/50 h-4 w-24 animate-pulse rounded" />
          <div className="bg-grey-300/50 h-8 w-32 animate-pulse rounded" />
        </div>

        {/* Top Pots Preview */}
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="bg-grey-300/50 h-4 w-24 animate-pulse rounded" />
              <div className="bg-grey-300/50 h-5 w-16 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
