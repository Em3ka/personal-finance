import { categoryOptions, sortOptions } from "@/utils/constants";

export const filtersConfig = [
  {
    key: "sort",
    label: "Sort By",
    icon: "/icon-sort-mobile.svg",
    options: sortOptions,
  },
  {
    key: "category",
    label: "Category",
    icon: "/icon-filter-mobile.svg",
    options: categoryOptions,
  },
];
