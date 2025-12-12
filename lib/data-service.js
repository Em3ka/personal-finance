import { PAGE_LIMIT } from "@/utils/constants";
import { createClient } from "./supabase/server";
import { addDays, isAfter, parseISO } from "date-fns";
import { getSpentThisMonth, limitArray } from "@/utils/helpers";

export async function getAuthUserId() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  return data.claims.sub;
}

export async function getTransactions(params) {
  const { page, search = "", sort = "latest", category = "all" } = params || {};

  const userId = await getAuthUserId();
  const supabase = await createClient();

  let query = supabase
    .from("transactions")
    .select("id, amount, name, date, avatar, category", {
      count: "exact",
    })
    .eq("user_id", userId);

  if (sort) query = applySorting(query, sort);

  if (search) query = applySearch(query, search);

  if (page) query = applyPagination(query, page);

  if (category !== "all") query = applyCategory(query, category);

  const { data: trnData, count, error } = await query;

  if (error) {
    return [];
  }

  return {
    data: addPublicAvatarUrls(trnData, supabase),
    pagination: {
      currentPage: page,
      totalItems: count,
      totalPages: Math.ceil(count / PAGE_LIMIT),
    },
  };
}

export async function getBudgets() {
  const userId = await getAuthUserId();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("budgets")
    .select(
      "id, category, maximum, theme, transactions(id, avatar, name, date, amount, category)",
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    return [];
  }

  const usedColors = data.map((b) => b.theme).filter(Boolean);

  return data.map((b) => ({
    ...b,
    usedColors,
    spent: Math.abs(getSpentThisMonth(b.transactions)),
    transactions: addPublicAvatarUrls(limitArray(b.transactions, 3), supabase),
  }));
}

export async function getPots() {
  const userId = await getAuthUserId();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("pots")
    .select("id, name, target, total, theme")
    .eq("user_id", userId);

  if (error) {
    console.log("Pots fetch error:", error);
    return [];
  }

  return data;
}

export async function getBills(params) {
  const { page, search = "", sort = "latest" } = params || {};

  const userId = await getAuthUserId();
  const supabase = await createClient();
  let dueCount = 0;

  // Get the latest transaction date for the user
  const { data: latestTransaction, error: latestTransactionError } = await supabase
    .from("transactions")
    .select("date")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(1)
    .single();

  if (latestTransactionError) {
    return [];
  }

  // Cutoff = latest date + 5 days
  const cutoff = addDays(latestTransaction.date, 5);

  const { data, error } = await supabase
    .from("transactions")
    .select("id, avatar, category, date, name, paid, amount")
    .eq("user_id", userId)
    .eq("recurring", true)
    .order("date", { ascending: true });

  if (error) {
    return [];
  }

  // Normalize the data by adding avatar URLs.
  const billsData = addPublicAvatarUrls(data, supabase);

  // Deduplicate by vendor
  let uniqueVendor = Array.from(new Map(billsData.map((t) => [t.name, t])).values());

  // Local search (if any)
  if (search) {
    uniqueVendor = applyLocalSearch(uniqueVendor, search);
  }

  // Local sort (if any)
  if (sort) {
    uniqueVendor = applyLocalSort(uniqueVendor, sort);
  }

  // Compute due and caution
  const finalData = uniqueVendor.map((t) => {
    const trnDate = parseISO(t.date);
    // Due if: bill is unpaid AND date <= cutoff
    const isDue = !t.paid && !isAfter(trnDate, cutoff);

    // showCaution should apply only to the first two due bills
    const showCaution = isDue && dueCount < 2;
    if (showCaution) dueCount++;

    return { ...t, isDue, showCaution };
  });

  const count = finalData.length;

  return {
    data: finalData,
    pagination: {
      currentPage: page,
      totalItems: count,
      totalPages: Math.ceil(count / PAGE_LIMIT),
    },
  };
}

function applyLocalSort(query, sort) {
  const SORTERS = {
    latest: (a, b) => new Date(a.date) - new Date(b.date),
    oldest: (a, b) => new Date(b.date) - new Date(a.date),
    "name-asc": (a, b) => a.name.localeCompare(b.name),
    "name-desc": (a, b) => b.name.localeCompare(a.name),
    "amount-asc": (a, b) => Math.abs(b.amount) - Math.abs(a.amount),
    "amount-desc": (a, b) => Math.abs(a.amount) - Math.abs(b.amount),
  };

  return [...query].sort(SORTERS[sort]);
}

function applyLocalSearch(query, search) {
  return query.filter((b) =>
    String(b.name).toLowerCase().includes(String(search).toLowerCase()),
  );
}

function applyCategory(query, category) {
  return query.eq("category_slug", category);
}

function applySearch(query, search) {
  const numericValue = Number(search);

  return query.or(
    isNaN(numericValue)
      ? `name.ilike.%${search}%`
      : `amount.eq.${numericValue},amount.eq.${-numericValue}`,
  );
}

function applySorting(query, sort) {
  const SORT_MAP = {
    latest: { column: "date", ascending: false },
    oldest: { column: "date", ascending: true },
    "name-asc": { column: "name", ascending: true },
    "name-desc": { column: "name", ascending: false },
    "amount-asc": { column: "amount", ascending: true },
    "amount-desc": { column: "amount", ascending: false },
  };

  if (SORT_MAP[sort]) {
    const { column, ascending } = SORT_MAP[sort];
    return query.order(column, { ascending });
  }

  return query;
}

function applyPagination(query, page) {
  const from = (page - 1) * PAGE_LIMIT;
  const to = page * PAGE_LIMIT - 1;

  return query.range(from, to);
}

function addPublicAvatarUrls(data, supabase) {
  return data.map((t) => {
    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(t.avatar);

    return {
      ...t,
      avatar: urlData.publicUrl,
    };
  });
}
