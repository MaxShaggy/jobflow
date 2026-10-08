"use client"

import { useApplications } from "@/components/Common";
import { useSearch } from "@/components/Common/SearchProvider";
import { Card } from "@/components/Layout/Board/Card";
import { Button } from "@/components/ui/button";
import { updateApplicationStatus } from "@/lib/supabase/updateApplicationStatus";

export default function Archive() {
  const { applications, setApplications } = useApplications();
  const { searchQuery } = useSearch();
  const rejectedApplications = applications
    .filter(app => app.status === "rejected")
    .filter(app => app.company.toLowerCase().includes(searchQuery.toLowerCase().trim()));

  return (
    <div className="flex flex-wrap content-start gap-4 px-4 h-full min-h-0 overflow-y-auto hidden-scrollbar">
      {rejectedApplications.map(rejApp => (
        <div key={rejApp.id} className="basis-[250px] relative group">
          <Card
            company={rejApp.company}
            position={rejApp.position}
            date={rejApp.date}
            status={rejApp.status}
            updatedDate={rejApp.updated_date}
            link={rejApp.link}
          />
          <Button
            variant="glass"
            aria-label={`Move ${rejApp.company} back to interview`}
            className="w-26 p-4 absolute top-2 right-2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-300"
            onClick={() => updateApplicationStatus(rejApp.id, "interview", applications, setApplications)}
          >
            To Interview
          </Button>
        </div>
      ))}
    </div>
  );
}