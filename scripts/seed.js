import "dotenv/config";
import { readFileSync } from "fs";
import { slugify } from "../utils/helpers.js";
import { createClient } from "@supabase/supabase-js";

const data = JSON.parse(readFileSync("./data/data.json", "utf8"));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

// Auth user ID
const USER_ID = "";

// Convert "./images/avatars/emma-richardson.jpg" → "emma-richardson.jpg"
function convertAvatarPath(localPath) {
  if (!localPath) return null;
  const filename = localPath.split("/").pop();
  return filename;
}

async function seed() {
  console.log("🌱 Seeding database...\n");

  // ================================
  // 1. INSERT BUDGETS
  // ================================
  console.log("📘 Inserting budgets...");

  const budgetsToInsert = data.budgets.map((b) => ({
    user_id: USER_ID,
    category: b.category,
    maximum: b.maximum,
    theme: b.theme,
  }));

  const { data: insertedBudgets, error: budgetsError } = await supabase
    .from("budgets")
    .insert(budgetsToInsert)
    .select();

  if (budgetsError) {
    console.error("❌ Failed to insert budgets:", budgetsError);
    return;
  }

  console.log(`✔️ Inserted ${insertedBudgets.length} budgets.\n`);

  // Build map: category → budget.id
  const budgetIdByCategory = {};
  for (const b of insertedBudgets) {
    budgetIdByCategory[b.category] = b.id;
  }

  // ================================
  // 2. INSERT POTS
  // ================================
  console.log("🪣 Inserting pots...");

  const potsToInsert = data.pots.map((p) => ({
    user_id: USER_ID,
    name: p.name,
    target: p.target,
    total: p.total,
    theme: p.theme,
  }));

  const { data: insertedPots, error: potsError } = await supabase
    .from("pots")
    .insert(potsToInsert)
    .select();

  if (potsError) {
    console.error("❌ Failed to insert pots:", potsError);
    return;
  }

  console.log(`✔️ Inserted ${insertedPots.length} pots.\n`);

  // ================================
  // 3. INSERT TRANSACTIONS + budget_id
  // ================================
  console.log("💸 Inserting transactions...");

  const transactionsToInsert = data.transactions.map((t) => ({
    user_id: USER_ID,
    name: t.name,
    category: t.category,
    date: t.date,
    amount: t.amount,
    recurring: t.recurring,
    paid: t.paid ?? null,
    avatar: convertAvatarPath(t.avatar),
    budget_id: budgetIdByCategory[t.category] || null,
    category_slug: slugify(t.category),
  }));

  const { data: insertedTransactions, error: transactionsError } = await supabase
    .from("transactions")
    .insert(transactionsToInsert)
    .select();

  if (transactionsError) {
    console.error("❌ Failed to insert transactions:", transactionsError);
    return;
  }

  console.log(`✔️ Inserted ${insertedTransactions.length} transactions.\n`);

  // ================================
  // DONE
  // ================================
  console.log("🌱 Seed completed successfully!");
}

seed();
