"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAuthUserId } from "./data-service";
import { createClient } from "./supabase/server";
import { categoryOptions } from "@/utils/constants";
import { SignupFormSchema } from "./schemas/signupSchema";
import { SigninFormSchema } from "./schemas/signinSchema";
import { UpsertPotSchema } from "./schemas/upsertPotSchema";
import { UpsertBudgetSchema } from "./schemas/upsertBudgetSchema";
import { UpdatePotTotalSchema } from "./schemas/updatePotTotalSchema";
import { generateRandomStartingBalance, handleSupabaseResponse } from "@/utils/helpers";

export async function loginUser(_, formData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success)
    return {
      success: false,
      message: "Invalid email or password.",
    };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(validatedFields.data);

  if (error)
    return {
      success: false,
      message: "Invalid email or password.",
    };

  return redirect("/");
}

export async function createUser(_, formData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success)
    return {
      success: false,
      message: "Validation failed",
    };

  const { name, email, password } = validatedFields.data;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error)
    return {
      success: false,
      message: error.message || "Sign up failed",
    };

  const randomStartingBalance = generateRandomStartingBalance();

  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    name,
    current_balance: randomStartingBalance,
  });

  if (profileError)
    return {
      success: false,
      message: profileError.message,
    };

  return redirect("/");
}

export async function upsertBudget({ mode, budgetId }, _, formData) {
  const userId = await getAuthUserId();
  const supabase = await createClient();

  const validatedFields = UpsertBudgetSchema.safeParse({
    theme: formData.get("theme"),
    maximum: formData.get("maximumSpend"),
    category: categoryOptions.find((opt) => opt.value === formData.get("category")).name,
  });

  if (!validatedFields.success)
    return {
      status: "error",
      message: "Some fields are invalid. Please review your input.",
    };

  const data = validatedFields.data;

  const response =
    mode === "edit"
      ? await updateRecord({ supabase, table: "budgets", userId, id: budgetId, data })
      : await createRecord({
          supabase,
          table: "budgets",
          userId,
          data,
        });

  const responseError = handleSupabaseResponse(
    response.error,
    response.data,
    mode,
    "budget",
  );

  if (responseError) return responseError;

  revalidatePath("/budgets");

  return {
    status: "success",
    message: mode === "edit" ? "Budget updated!" : "Budget created!",
  };
}

export async function deleteBudget(_, formData) {
  const supabase = await createClient();

  const budgetId = formData.get("budgetId");

  const response = await supabase
    .from("budgets")
    .delete({ count: "exact" })
    .eq("id", budgetId);

  const responseError = handleSupabaseResponse(
    response.error,
    response.count,
    "delete",
    "budget",
  );

  if (responseError) return responseError;

  revalidatePath("/budgets");

  return { status: "success", message: "Budget deleted!" };
}

export async function upsertPot({ mode, potId }, _, formData) {
  const userId = await getAuthUserId();
  const supabase = await createClient();

  const validatedFields = UpsertPotSchema.safeParse({
    name: formData.get("name"),
    theme: formData.get("theme"),
    target: formData.get("target"),
  });

  if (!validatedFields.success) {
    return { status: "error", message: "Invalid pot data." };
  }

  const data = validatedFields.data;

  const response =
    mode === "edit"
      ? await updateRecord({ supabase, table: "pots", userId, id: potId, data })
      : await createRecord({
          supabase,
          table: "pots",
          userId,
          data: { ...data, total: 0 },
        });

  const responseError = handleSupabaseResponse(
    response.error,
    response.data,
    mode,
    "pot",
  );

  if (responseError) return responseError;

  revalidatePath("/pots");

  return {
    status: "success",
    message: mode === "edit" ? "Pot updated!" : "Pot created!",
  };
}

export async function deletePot(_, formData) {
  const supabase = await createClient();

  const potId = formData.get("potId");

  const response = await supabase.from("pots").delete({ count: "exact" }).eq("id", potId);

  const responseError = handleSupabaseResponse(
    response.error,
    response.count,
    "delete",
    "pot",
  );

  if (responseError) return responseError;

  revalidatePath("/budgets");

  return { status: "success", message: "Pot deleted!" };
}

export async function updatePotTotal(_, formData) {
  const userId = await getAuthUserId();
  const supabase = await createClient();

  const validatedField = UpdatePotTotalSchema.safeParse({
    id: formData.get("id"),
    total: Number(formData.get("total")),
  });

  if (!validatedField.success) {
    return { status: "error", message: "Invalid amount input" };
  }

  const { total, id } = validatedField.data;

  const { data, error } = await supabase
    .from("pots")
    .update({ total })
    .eq("id", id)
    .eq("user_id", userId)
    .select();

  const responseError = handleSupabaseResponse(error, data, "update", "pot");
  if (responseError) return responseError;

  revalidatePath("/pots");

  return { status: "success", message: "Pot updated!" };
}

async function createRecord({ supabase, table, userId, data }) {
  return supabase.from(table).insert({ ...data, user_id: userId });
}

async function updateRecord({ supabase, table, userId, id, data }) {
  return supabase.from(table).update(data).eq("id", id).eq("user_id", userId).select();
}
