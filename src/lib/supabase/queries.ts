import { createClient } from "./server";

export async function getApplications() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("application")
    .select();

  return { data, error };
}