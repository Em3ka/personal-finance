"use client";

import Image from "next/image";
import { Fragment } from "react";
import CustomSelect from "./CustomSelect";
import { useFilters } from "@/providers/FiltersProvider";

export default function Filters() {
  const { config, setOpenDropdown } = useFilters();

  function handleToggle(key) {
    setOpenDropdown((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <>
      {/* --- Filter_bar (Desktop) --- */}
      <div className="hidden items-center gap-6 lg:flex">
        {config.map((f) => (
          <Fragment key={f.key}>
            <label htmlFor={f.key} className="text-grey-500 text-sm whitespace-nowrap">
              {f.label}
            </label>

            <CustomSelect
              id={f.key}
              value={f.value}
              options={f.options}
              setSelected={f.setValue}
            />
          </Fragment>
        ))}
      </div>

      {/* --- Filter_bar toggles (Mobile) --- */}
      <div className="flex items-center justify-center gap-6 lg:hidden">
        {config.map((f) => {
          return (
            <button
              key={f.key}
              aria-label={f.label}
              className="relative size-6"
              onClick={() => handleToggle(f.key)}>
              <Image fill src={f.icon} alt={f.label} />
            </button>
          );
        })}
      </div>
    </>
  );
}
