import { createClient } from "./server";

export async function getApplications() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("applications")
    .select();

  return { data, error };
}

export async function getCompanies() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('companies')
    .select();

  return { data, error };
}

export async function getCompanyReviews(companyId: number){
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('company_reviews')
    .select()
    .eq('company_id', companyId);
  
  return { data, error };
}