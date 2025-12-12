"use client";

import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  PaginationEllipsis,
  PaginationPrevious,
} from "../ui/Pagination";
import { cn } from "@/utils/helpers";
import { useUrlFilters } from "@/app/(app)/search-params";

export default function PaginationLayout({ data }) {
  const [_, setFilters] = useUrlFilters();

  if (!data) return null;

  const { totalPages, currentPage } = data;
  const curPage = currentPage || 1;

  function goTo(p, e) {
    e.preventDefault();
    setFilters({ page: p });
  }

  function getPages() {
    const pages = [];

    // Always show first page if we're beyond page 2
    if (curPage > 2) pages.push(1);

    // Left ellipsis if needed
    if (curPage > 3) pages.push("left");

    // Sliding window: current page ± 1
    const start = Math.max(1, curPage - 1);
    const end = Math.min(totalPages, curPage + 1);

    for (let p = start; p <= end; p++) pages.push(p);

    // Right ellipsis if needed
    if (curPage < totalPages - 2) pages.push("right");

    // Always show last page if we're not near it
    if (curPage < totalPages - 1) pages.push(totalPages);

    return pages;
  }

  const pages = getPages();

  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        {/* Prev */}
        <PaginationItem>
          {curPage > 1 && (
            <PaginationPrevious
              href="#"
              onClick={(e) => goTo(curPage - 1, e)}
              className="border-beige-500 hover:bg-beige-500 border hover:text-white"
            />
          )}
        </PaginationItem>

        {/* Page Numbers */}
        <PaginationItem>
          <PaginationContent>
            {pages.map((p, i) => {
              if (p === "left" || p === "right") {
                return (
                  <PaginationItem key={p + i}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => goTo(p, e)}
                    isActive={p === curPage}
                    className={cn(
                      "border transition-colors",
                      p === curPage
                        ? "bg-grey-900 border-grey-900 text-white"
                        : "border-beige-500 hover:bg-beige-500 hover:text-white",
                    )}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </PaginationContent>
        </PaginationItem>

        {/* Next */}
        <PaginationItem>
          {curPage < totalPages && (
            <PaginationNext
              href="#"
              onClick={(e) => goTo(curPage + 1, e)}
              className="border-beige-500 hover:bg-beige-500 border hover:text-white"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
