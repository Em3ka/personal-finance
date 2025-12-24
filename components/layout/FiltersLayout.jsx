"use client";

import { debounce } from "nuqs";
import { useTransition } from "react";
import Filters from "@/components/layout/Filters";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import SearchInput from "@/components/ui/SearchInput";
import { useUrlFilters } from "@/app/(app)/search-params";
import MobileFilters from "@/components/layout/MobileFilters";

export default function FiltersLayout() {
  const [{ search }, setFilters] = useUrlFilters();
  const [isPending, startTransition] = useTransition();
  const isMobile = useMediaQuery("(max-width: 64rem)");

  function handleChange(e) {
    startTransition(async () => {
      await setFilters(
        { search: e.target.value },
        { limitUrlUpdates: e.target.value ? debounce(250) : undefined },
      );
    });
  }

  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <SearchInput
          value={search}
          fullWidth={isMobile}
          isLoading={isPending}
          onChange={handleChange}
          placeholder="Search transaction"
        />
        <Filters />
      </div>
      <MobileFilters />
    </>
  );
}
