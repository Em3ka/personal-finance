import { createClient } from "./supabase/server";
import { addDays, isAfter, parseISO } from "date-fns";
import { PAGE_LIMIT, SORT_DEFINITIONS } from "@/utils/constants";
import { getSpentThisMonth, limitArray } from "@/utils/helpers";

function addPublicAvatarUrls(data, supabase) {
  return data.map((t) => {
    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(t.avatar);
    return { ...t, avatar: urlData.publicUrl };
  });
}

export async function getAuthUserId() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  return data.claims.sub;
}

export async function getCurrentBalance() {
  const userId = await getAuthUserId();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("current_balance")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile data:", error);
  }

  return data.current_balance;
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

  // List out all the recurring transactions
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
  const bills = addPublicAvatarUrls(data, supabase);
  let result = deriveBills(bills, cutoff);

  if (sort) result = applyLocalSort(result, sort);
  if (search) result = applyLocalSearch(result, search);

  return {
    data: result,
    pagination: {
      currentPage: page,
      totalItems: result.length,
      totalPages: Math.ceil(result.length / PAGE_LIMIT),
    },
  };
}

function deriveBills(transactions, cutoff) {
  // Bill transaction per vendor
  const bills = Array.from(new Map(transactions.map((t) => [t.name, t])).values());

  // Derive due status
  const withDue = bills.map((t) => {
    const date = parseISO(t.date);
    const isDue = !t.paid && !isAfter(date, cutoff);
    return { ...t, isDue };
  });

  // Determine which due bills get caution flag
  const cautionIds = new Set(
    [...withDue]
      .filter((t) => t.isDue)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 2)
      .map((t) => t.id),
  );

  // Attach caution flag
  return withDue.map((t) => ({ ...t, showCaution: cautionIds.has(t.id) }));
}

function applyLocalSort(data, sort) {
  const def = SORT_DEFINITIONS[sort];
  if (!def) return data;
  return [...data].sort(def.compare);
}

function applyLocalSearch(query, search) {
  return query.filter((b) =>
    String(b.name).toLowerCase().includes(String(search).toLowerCase()),
  );
}

function applyCategory(query, category) {
  return query.eq("category_slug", category);
}

function applySorting(query, sort) {
  const def = SORT_DEFINITIONS[sort];
  if (!def) return query;
  return query.order(def.column, { ascending: def.ascending });
}

function applySearch(query, search) {
  const numericValue = Number(search);

  return query.or(
    isNaN(numericValue)
      ? `name.ilike.%${search}%`
      : `amount.eq.${numericValue},amount.eq.${-numericValue}`,
  );
}

function applyPagination(query, page) {
  const from = (page - 1) * PAGE_LIMIT;
  const to = page * PAGE_LIMIT - 1;

  return query.range(from, to);
}
