import Image from "next/image";
import { formatCurrency, formatDate, isExpense } from "@/utils/helpers";

export default function MobileTrnRow({ item }) {
  const { name, category, date, amount, avatar } = item;
  const isAmountExpense = isExpense(amount);

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        {avatar ? (
          <Image
            height={40}
            width={40}
            src={avatar}
            alt={`Picture of ${name}`}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="bg-grey-200 text-grey-500 flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium">
            {name[0].toUpperCase()}
          </div>
        )}

        <div>
          <p className="text-grey-900 text-sm font-bold">{name}</p>
          <p className="text-grey-500 text-xs">{category}</p>
        </div>
      </div>

      <div className="text-end">
        <p
          className={`text-sm font-bold ${
            isAmountExpense ? "text-grey-900" : "text-green-500"
          }`}>
          {isAmountExpense ? "-" : "+"}
          {formatCurrency(Math.abs(amount))}
        </p>
        <p className="text-grey-400 text-xs">{formatDate(date)}</p>
      </div>
    </div>
  );
}
