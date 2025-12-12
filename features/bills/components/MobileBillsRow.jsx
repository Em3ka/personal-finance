import Image from "next/image";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/helpers";
import BillDueIcon from "@/assets/icon-bill-due.svg";
import BillPaidIcon from "@/assets/icon-bill-paid.svg";

export default function MobileBillsRow({ item }) {
  const { name, avatar, amount, date, paid, showCaution } = item;

  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <div className="mb-2 flex items-center gap-4">
        {avatar ? (
          <Image
            src={avatar}
            alt={`Picture of ${name}`}
            height={32}
            width={32}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="bg-grey-900 text-grey-100 flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold">
            {name[0].toUpperCase()}
          </div>
        )}
        <span className="text-sm font-bold">{name}</span>
      </div>

      <div className="flex justify-between">
        <span
          className={`${paid ? "text-green-500" : "text-grey-500"} flex items-center gap-2 text-xs`}>
          Monthly - {format(date, "do")}
          {showCaution && <BillDueIcon role="img" aria-label="Bill due soon" />}
          {paid && <BillPaidIcon role="img" aria-label="Bill paid" />}
        </span>

        <span className="text-sm font-bold">
          {formatCurrency(Math.abs(amount))}
        </span>
      </div>
    </div>
  );
}
