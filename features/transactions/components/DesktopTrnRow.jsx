import Image from "next/image";
import { formatCurrency, formatDate, isExpense } from "@/utils/helpers";

export default function DesktopTrnRow({ item }) {
  const { name, category, date, amount, avatar } = item;
  const isAmountExpense = isExpense(amount);

  return (
    <tr className="border-grey-200 hover:bg-grey-100/50 border-t">
      <th scope="row" className="flex items-center gap-4 px-6 py-4">
        {avatar ? (
          <Image
            src={avatar}
            alt={`Avatar of ${name}`}
            height={40}
            width={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="bg-grey-900 text-grey-100 flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold">
            {name[0].toUpperCase()}
          </div>
        )}
        <span className="text-grey-900 text-sm font-bold whitespace-nowrap">{name}</span>
      </th>

      <td className="text-grey-500 px-6 py-4 text-xs whitespace-nowrap">{category}</td>
      <td className="text-grey-500 px-6 py-4 text-xs">{formatDate(date)}</td>

      <td
        className={`px-6 py-4 text-end text-sm font-bold ${
          isAmountExpense ? "text-grey-900" : "text-green-500"
        }`}>
        {isAmountExpense ? "-" : "+"}
        {formatCurrency(Math.abs(amount))}
      </td>
    </tr>
  );
}
