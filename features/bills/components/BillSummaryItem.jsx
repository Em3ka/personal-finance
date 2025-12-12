export default function BillSummaryItem({ title, text, color }) {
  const appliedColor = color || "text-grey-500";
  const appliedColorBold = color || "text-grey-900";

  return (
    <div className="flex justify-between">
      <span className={`${appliedColor} text-xs`}>{title}</span>
      <span className={`${appliedColorBold} text-xs font-bold`}>{text}</span>
    </div>
  );
}
