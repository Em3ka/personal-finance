"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAuthUserId } from "./data-service";
import { createClient } from "./supabase/server";
import { categoryOptions } from "@/utils/constants";
import { SignupFormSchema } from "./schemas/signupSchema";
import { SigninFormSchema } from "./schemas/signinSchema";
import { AddOrEditSchema } from "./schemas/addOrEditSchema";
import { UpsertPotSchema } from "./schemas/upsertPotSchema";
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

export async function addOrEditBudget({ variant, budgetId }, _, formData) {
  const userId = await getAuthUserId();
  const supabase = await createClient();

  const validatedFields = AddOrEditSchema.safeParse({
    theme: formData.get("theme"),
    maximum: formData.get("maximumSpend"),
    category: categoryOptions.find((opt) => opt.value === formData.get("category")).name,
  });

  if (!validatedFields.success)
    return { success: false, message: "Invalid budget data." };

  const base = supabase.from("budgets");
  const response =
    variant === "edit"
      ? await base.update(validatedFields.data).eq("id", budgetId).eq("user_id", userId)
      : await base.insert({ ...validatedFields.data, user_id: userId });

  const { error } = response;

  if (error) return { success: false, message: error.message };

  revalidatePath("/budgets");
  return { success: true, message: "Budget saved" };
}

export async function deleteBudget(_, formData) {
  const supabase = await createClient();

  const budgetId = formData.get("budgetId");
  const { error } = await supabase.from("budgets").delete().eq("id", budgetId);

  if (error) return { success: false, message: "Error deleting budget" };

  revalidatePath("/budgets");
  return { success: true, message: "Budget deleted" };
}

async function createPot({ supabase, userId, data }) {
  return supabase.from("pots").insert({ ...data, total: 0, user_id: userId });
}

async function updatePot({ supabase, userId, potId, data }) {
  return supabase
    .from("pots")
    .update(data)
    .eq("id", potId)
    .eq("user_id", userId)
    .select();
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
    return { success: false, message: "Invalid pot data." };
  }

  const data = validatedFields.data;
  const response =
    mode === "edit"
      ? await updatePot({ supabase, userId, potId, data })
      : await createPot({ supabase, userId, data });

  const responseError = handleSupabaseResponse(
    response.error,
    response.data,
    mode,
    "pot",
  );

  if (responseError) return responseError;

  revalidatePath("/pots");

  return {
    success: true,
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

  return { success: true, message: "Pot deleted!" };
}

export async function updatePotTotal(_, formData) {
  const userId = await getAuthUserId();
  const supabase = await createClient();

  const validatedField = UpdatePotTotalSchema.safeParse({
    id: formData.get("id"),
    total: Number(formData.get("total")),
  });

  if (!validatedField.success) return { success: false, message: "Invalid input" };

  const { total, id } = validatedField.data;

  const { error } = await supabase
    .from("pots")
    .update({ total })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) return { success: false, message: "Failed to update pot" };

  revalidatePath("/pots");

  return { success: true, message: "Pot updated!" };
}
