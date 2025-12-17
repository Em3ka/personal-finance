import { statsVariant } from "@/utils/constants";
import { cn, formatCurrency } from "@/utils/helpers";

export default function PotStats({
  amount,
  target,
  children,
  type = "default",
  isExceeded = false,
}) {
  const MAX_PERCENTAGE = 100;

  const safeAmount = Math.max(amount, 0);
  const percentage =
    target > 0
      ? Math.min((safeAmount / target) * MAX_PERCENTAGE, MAX_PERCENTAGE).toFixed(2)
      : "0.00";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-grey-500 text-sm">{statsVariant[type].text}</span>
        <span className="text-grey-900 text-3xl font-bold">
          {formatCurrency(safeAmount)}
        </span>
      </div>
      {children}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            `${statsVariant[type].color} text-xs font-bold`,
            isExceeded && "text-red-500",
          )}>
          {isExceeded ? "0%" : `${percentage}%`}
        </span>
        <span className="text-grey-500 text-xs">
          Target of {formatCurrency(target, { minimumFractionDigits: 0 })}
        </span>
      </div>
    </div>
  );
}
