import { Board } from "@/components/Layout/Board";
import { getApplications } from "@/lib/supabase/queries";
import { ErrorToast } from "@/components/Common";

export default async function Page() {
  const { data, error } = await getApplications();

  const formattedData = data
    ? data.map(card => {
        const newDate = new Date(card.date).toLocaleDateString('uk-UA');
        return { ...card, date: newDate };
      })
    : [];

  return (
    <>
      <ErrorToast error={error} />
      <Board applications={formattedData} />
    </>
  );
}