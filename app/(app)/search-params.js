import { useQueryStates } from "nuqs";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

const searchParams = {
  page: parseAsInteger.withDefault(1),
  search: parseAsString.withDefault(""),
  sort: parseAsString.withDefault("latest"),
  category: parseAsString.withDefault("all"),
};

const urlKeys = {
  search: "q",
  sort: "s",
  category: "c",
};

export const loadFilters = createLoader(searchParams, { urlKeys });

export const useUrlFilters = (options) =>
  useQueryStates(searchParams, {
    ...options,
    urlKeys,
    shallow: false,
  });
