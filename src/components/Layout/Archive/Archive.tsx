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
    .filter(app => app.company.toLowerCase().includes(searchQuery.toLowerCase()));

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
          />
          <Button
            className="w-26 p-4 border-2 border-white/20 bg-white/[0.04] backdrop-blur-sm hover:bg-white/15 hover:text-cyan-400/70 hover:border-white/40 duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400/70 absolute top-2 right-2 opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300"
          onClick={()=> updateApplicationStatus(rejApp.id, "interview", applications, setApplications)}
          >
            To Interview
          </Button>
        </div>
      ))}
    </div>
  )
}