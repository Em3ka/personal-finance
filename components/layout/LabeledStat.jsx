import { formatCurrency } from "@/utils/helpers";

export default function LabeledStat({ value, text, color = "#f8f5f1" }) {
  const formattedValue = value > 0 ? formatCurrency(value) : "$0";

  return (
    <div className="flex flex-1 items-center gap-4">
      <span
        style={{ backgroundColor: color }}
        className="inline-block h-full w-1 rounded-sm"></span>

      <div className="grid gap-1">
        <span className="text-grey-500 text-xs whitespace-nowrap">{text}</span>
        <span className="text-sm font-bold">{formattedValue}</span>
      </div>
    </div>
  );
}
