"use client";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectSeparator,
} from "@/components/ui/Select";
import { Fragment } from "react";
import { cn } from "@/utils/helpers";

export default function CustomSelect({
  id,
  value,
  render,
  setSelected,
  options = [],
  fullWidth = false,
  ...props
}) {
  return (
    <Select value={value} onValueChange={setSelected} {...props}>
      <SelectTrigger
        id={id}
        size="h-full"
        className={cn(
          "border-beige-500 focus:border-beige-500 text-grey-900 px-5 py-3",
          fullWidth ? "w-full" : "w-45",
        )}>
        <SelectValue>
          {(() => {
            const selected = options.find((opt) => opt.value === value);
            if (!selected) return <span className="text-grey-300">Select option</span>;

            return (
              <div className="flex items-center gap-3">
                {selected.value.startsWith("#") && (
                  <span
                    style={{ backgroundColor: selected.value }}
                    className="size-4 rounded-full"
                  />
                )}
                {selected.name}
              </div>
            );
          })()}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {options.length > 0
          ? options.map((option, i) => (
              <Fragment key={option.value}>
                {render ? (
                  render(option)
                ) : (
                  <SelectItem
                    value={option.value}
                    className="text-grey-900 px-5 py-3 text-sm">
                    {option.name}
                  </SelectItem>
                )}
                {i < options.length - 1 && <SelectSeparator className="bg-grey-100" />}
              </Fragment>
            ))
          : render?.()}
      </SelectContent>
    </Select>
  );
}
