import { ApplicationProps, ApplicationStatus } from "@/components/Layout/Board";
import { createClient } from "./client";
import { toast } from "@/components/ui/toast";


const supabase = createClient();

export async function updateApplicationStatus(
  id: number,
  newStatus: ApplicationStatus,
  applications: ApplicationProps[],
  setApplications: React.Dispatch<React.SetStateAction<ApplicationProps[]>>,
) {
  const rawDate = new Date();
  const formattedDate = rawDate.toLocaleDateString('uk-UA');

  setApplications((prevApp) => {
    return prevApp.map(app => {
      if (app.id === id) {
        return { ...app, status: newStatus, updated_date: formattedDate }
      } else {
        return app;
      }
    })
  })

  const { error } = await supabase
    .from('applications')
    .update({ status: newStatus, updated_date: rawDate })
    .eq('id', id)

  if (error) {
    setApplications(applications)
    toast.add({
      title: "Failed to transfer the vacancy",
      description: error.message,
      type: "error",
    });
  }
}