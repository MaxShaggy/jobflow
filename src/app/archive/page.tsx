"use client"

import { useApplications } from "@/components/Common";
import { Card } from "@/components/Layout/Board/Card";

export default function Archive() {
  const { applications } = useApplications();
  const rejectedApplications = applications.filter(app => app.status === "rejected")

  return (
    <div className="flex flex-wrap gap-4">
      {rejectedApplications.map(rejApp => (
        <div key={rejApp.id} className="basis-[200px]">
          <Card
            company={rejApp.company}
            position={rejApp.position}
            date={rejApp.date}
            status={rejApp.status}
            updatedDate={rejApp.updated_date}
          />
        </div>
      ))}
    </div>
  )
}