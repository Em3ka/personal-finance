import Image from "next/image";
import { formatCurrency, formatDate, isExpense } from "@/utils/helpers";

export default function CardTrnItem({ data }) {
  const { avatar, name, date, amount } = data;
  const isAmountExpense = isExpense(amount);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          className="hidden rounded-full lg:block"
          width={32}
          height={32}
          src={avatar}
          alt={name}
        />
        <span className="text-xs font-bold">{name}</span>
      </div>

      <div className="grid text-end">
        <span
          className={`text-xs font-bold ${isAmountExpense ? "text-grey-900" : "text-green-500"}`}>
          {isAmountExpense ? "-" : "+"}
          {formatCurrency(Math.abs(amount))}
        </span>
        <span className="text-grey-500 text-xs">{formatDate(date)}</span>
      </div>
    </div>
  );
}
