import { cn } from "@/utils/helpers";
import { CheckIcon } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";

export default function SelectThemeItem({
  value,
  color,
  trailingText,
  disabled,
  children,
  ...props
}) {
  return (
    <SelectPrimitive.Item
      value={value}
      disabled={disabled}
      className="data-highlighted:bg-accent data-highlighted:text-accent-foreground flex w-full cursor-default items-center justify-between rounded-sm py-3 pr-8 pl-5 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50"
      {...props}>
      <div className="flex items-center gap-3">
        <span style={{ backgroundColor: color }} className="size-4 rounded-full" />
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </div>

      {trailingText && (
        <span className={cn("text-sm", disabled ? "text-grey-900" : "text-grey-500")}>
          {trailingText}
        </span>
      )}

      <span className="absolute right-5 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}
