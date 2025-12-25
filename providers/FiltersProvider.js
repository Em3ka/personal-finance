"use client";

import { createContext, use, useState } from "react";
import { useUrlFilters } from "@/app/(app)/search-params";

const FiltersContext = createContext();

function FiltersProvider({ children, config = [] }) {
  const [{ sort, category }, setFilters] = useUrlFilters();
  const [openDropdown, setOpenDropdown] = useState({
    sort: false,
    category: false,
  });

  const filtersMap = {
    sort,
    category,
  };

  const value = {
    openDropdown,
    setOpenDropdown,
    config: config.map((item) => ({
      ...item,
      value: filtersMap[item.key] ?? item.options[0].value,
      setValue: (v) => setFilters({ [item.key]: v }),
    })),
  };

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

function useFilters() {
  const context = use(FiltersContext);
  if (!context) throw new Error("useFilters must be used within FiltersProvider");
  return context;
}

export { useFilters, FiltersProvider };
