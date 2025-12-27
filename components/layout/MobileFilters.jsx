"use client";

import CustomSelect from "./CustomSelect";
import { useFilters } from "@/providers/FiltersProvider";

export default function MobileFilters() {
  const { config, openDropdown } = useFilters();

  return (
    <div className="mt-1.5 space-y-1.5 lg:hidden">
      {config.map((f) =>
        openDropdown[f.key] ? (
          <label
            key={f.key}
            htmlFor={f.key}
            className="text-grey-500 flex items-center gap-2 text-sm whitespace-nowrap">
            <CustomSelect
              fullWidth
              id={f.key}
              value={f.value}
              options={f.options}
              setSelected={f.setValue}
            />
          </label>
        ) : null,
      )}
    </div>
  );
}
