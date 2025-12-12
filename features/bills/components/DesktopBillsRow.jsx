import { format } from "date-fns";
import { formatCurrency } from "@/utils/helpers";

import Image from "next/image";
import BillDueIcon from "@/assets/icon-bill-due.svg";
import BillPaidIcon from "@/assets/icon-bill-paid.svg";

export default function DesktopBillsRow({ item }) {
  const { name, avatar, amount, date, paid, showCaution } = item;

  return (
    <tr className="border-grey-200 hover:bg-grey-100/50 border-t">
      <th scope="row" className="flex items-center gap-4 px-6 py-4">
        {avatar ? (
          <Image
            src={avatar}
            alt={`Picture of ${name}`}
            height={32}
            width={32}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="bg-grey-900 text-grey-100 flex size-10 items-center justify-center rounded-full text-xs font-bold">
            {name[0].toUpperCase()}
          </div>
        )}
        <span className="text-grey-900 text-sm font-bold whitespace-nowrap">{name}</span>
      </th>

      <td className={`${paid ? "text-green-500" : "text-grey-500"} px-6 py-4 text-xs`}>
        <span className="flex items-center gap-2 whitespace-nowrap">
          Monthly - {format(date, "do")}
          {showCaution && <BillDueIcon role="img" aria-label="Bill due soon" />}
          {paid && <BillPaidIcon role="img" aria-label="Bill paid" />}
        </span>
      </td>

      <td className="px-6 py-4 text-right text-sm font-bold">
        {formatCurrency(Math.abs(amount))}
      </td>
    </tr>
  );
}
