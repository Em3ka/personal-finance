"use client";

import Filters from "./Filters";
import { debounce } from "nuqs";
import { useTransition } from "react";
import SearchInput from "@/components/ui/SearchInput";
import { useUrlFilters } from "@/app/(app)/search-params";
import MobileFilters from "./MobileFilters";

export default function FiltersLayout() {
  const [{ search }, setFilters] = useUrlFilters();
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    startTransition(async () => {
      await setFilters(
        { search: e.target.value },
        { limitUrlUpdates: e.target.value ? debounce(250) : undefined },
      );
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-6">
        <SearchInput
          value={search}
          isLoading={isPending}
          onChange={handleChange}
          placeholder="Search transaction"
        />
        <Filters />
      </div>

      <MobileFilters />
    </div>
  );
}
