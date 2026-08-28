"use client"

import { useState } from "react";
import { Column } from "./Column";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent
} from "@dnd-kit/core";
import { Card } from "./Card";
import { useApplications } from "@/components/Common";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/toast";
import { updateApplicationStatus } from "@/lib/supabase/updateApplicationStatus";

export type ApplicationStatus = "applications" | "follow-up" | "interview" | "rejected" | "offer";

interface ColumnProps {
  id: ApplicationStatus;
  title: string;
}

export interface ApplicationProps {
  id: string;
  company: string;
  position: string;
  date: string;
  updated_date: string | null;
  status: ApplicationStatus;
}

const columns: ColumnProps[] = [
  { id: "applications", title: "Applications" },
  { id: "follow-up", title: "Follow-up" },
  { id: "interview", title: "Interview" },
  { id: "rejected", title: "Rejected" },
  { id: "offer", title: "Offer" },
]

export function Board() {
  const { applications, setApplications } = useApplications()
  const [activeDragCard, setActiveDragCard] = useState<string | null>(null);

  function getApplicationsByStatus(status: ApplicationStatus) {
    const applicationsByStatus = applications
      .filter(app => app.status === status)
      .toSorted((a, b) => {
        const dateStringA = status === "applications" ? a.date : a.updated_date!;
        const dateStringB = status === "applications" ? b.date : b.updated_date!;

        const [dayA, monthA, yearA] = dateStringA.split('.');
        const [dayB, monthB, yearB] = dateStringB.split('.');

        const dateA = new Date(+yearA, +monthA - 1, +dayA);
        const dateB = new Date(+yearB, +monthB - 1, +dayB);

        return dateB.getTime() - dateA.getTime();
      });

    return applicationsByStatus;
  }

  const supabase = createClient();


  async function handleDragEnd(event: DragEndEvent) {
    if (!event.over) {
      return;
    }

    const overId = event.over.id;

    updateApplicationStatus(event.active.id as string, overId as ApplicationStatus, applications, setApplications)

    setActiveDragCard(null);
  }


  function handleDragStart(event: DragStartEvent) {
    setActiveDragCard(event.active.id as string)
  }

  const neededCard = applications.find(app => app.id === activeDragCard)

  return (
    <DndContext id="board-dnd-context" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex items-start gap-4 p-4 overflow-x-auto board-scrollbar h-full min-h-0">
        {
          columns.map((col, index) => {
            const cardsByStatus = getApplicationsByStatus(col.id);
            return (
              <div key={col.id} className="flex h-full">
                <Column title={col.title} cardsByStatus={cardsByStatus} id={col.id} />
                {index < columns.length - 1 && (
                  <div className="w-px bg-white/10 h-full ml-4" />
                )}
              </div>
            )
          })
        }
      </div>
      <DragOverlay>
        {neededCard && (
          <div className="cursor-grabbing">
            <Card
              company={neededCard.company}
              position={neededCard.position}
              date={neededCard.date}
              status={neededCard.status}
              updatedDate={neededCard.updated_date}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}