import { cn } from "@/utils/helpers";

export default function ActionButton({
  onClick,
  children,
  icon: Icon,
  className = "",
  type = "button",
  variant = "primary",
  iconPosition = "left",
  ...props
}) {
  const baseStyles =
    "p-4 rounded-lg font-bold cursor-pointer text-sm transition-color flex items-center justify-center gap-1 disabled:cursor-not-allowed disabled:opacity-50";

  const variantStyles = {
    primary: "bg-grey-900 hover:bg-grey-900/70 focus:bg-grey-900/70 text-white",
    danger: "bg-red-500 hover:bg-red-500/80 focus:bg-red-500/80 text-white",
    ghost:
      "bg-transparent hover:bg-grey-100 focus:bg-grey-100 text-grey-500 hover:text-grey-900",
    neutral:
      "bg-beige-100 hover:bg-white hover:border-beige-500 focus:border-beige-500 border-transparent border hover:border text-grey-900",
  };

  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], className)}>
      {Icon && iconPosition === "left" && <Icon className="size-4" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="size-4" />}
    </button>
  );
}
