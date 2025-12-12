import { formatCurrency } from "@/utils/helpers";

export default function Stats({ label, value, color = "light" }) {
  const themes = {
    light: {
      label: "text-grey-500 text-sm block",
      value: "text-[32px] leading-tight font-bold text-grey-900",
      background: "bg-white",
    },
    dark: {
      label: "text-white text-sm block",
      value: "text-[32px] leading-tight font-bold text-white",
      background: "bg-grey-900",
    },
  };

  const style = themes[color];

  return (
    <div className={`flex-1 space-y-3 rounded-xl p-6 ${style.background}`}>
      <span className={style.label}>{label}</span>
      <span className={style.value}>{formatCurrency(value)}</span>
    </div>
  );
}
