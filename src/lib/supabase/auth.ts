"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type AuthField = "nickname" | "email" | "password";

export type AuthState = {
  error: string | null;
  message: string | null;
  field: AuthField | null;
};

export async function signIn(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const text =
      error.code === "invalid_credentials"
        ? "Wrong email or password"
        : error.message;

    return { error: text, message: null, field: null };
  }

  revalidatePath("/", "layout");
  return { error: null, message: null, field: null };
}

export async function signUp(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const nickname = String(formData.get("nickname") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!nickname) {
    return { error: "Enter a nickname", message: null, field: "nickname" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { nickname } },
  });

  if (error) {
    if (error.code === "user_already_exists") {
      return {
        error: "This email is already registered",
        message: null,
        field: "email",
      };
    }

    if (error.code === "weak_password") {
      return { error: error.message, message: null, field: "password" };
    }

    return { error: error.message, message: null, field: null };
  }

  if (!data.session) {
    return {
      error: null,
      message: "Check your email to confirm your account",
      field: null,
    };
  }

  revalidatePath("/", "layout");
  return { error: null, message: null, field: null };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
}