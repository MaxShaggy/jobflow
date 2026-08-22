import { createClient } from "./server";

export async function getApplications() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("applications")
    .select();

  return { data, error };
}