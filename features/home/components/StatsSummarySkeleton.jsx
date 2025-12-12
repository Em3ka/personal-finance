export default function StatsSummarySkeleton({ rowCount = 3 }) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, i) => {
        const isDark = i === 0;

        return (
          <div
            key={i}
            className={`flex-1 space-y-3 rounded-xl p-6 ${
              isDark ? "bg-grey-900" : "bg-white"
            }`}>
            <div className="bg-grey-300/50 h-5 w-24 animate-pulse rounded-sm"></div>
            <div className="bg-grey-300/50 h-9.5 w-36 animate-pulse rounded-sm"></div>
          </div>
        );
      })}
    </>
  );
}
