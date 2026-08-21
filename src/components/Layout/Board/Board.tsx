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

type ApplicationStatus = "applications" | "follow-up" | "interview" | "rejected" | "offer";

interface ColumnProps {
  id: ApplicationStatus;
  title: string;
}

export interface ApplicationProps {
  id: string;
  company: string;
  position: string;
  date: string;
  status: ApplicationStatus;
}

const columns: ColumnProps[] = [
  { id: "applications", title: "Applications" },
  { id: "follow-up", title: "Follow-up" },
  { id: "interview", title: "Interview" },
  { id: "rejected", title: "Rejected" },
  { id: "offer", title: "Offer" },
]

interface BoardProps {
  applications: ApplicationProps[];
}

export function Board({ applications: initialApplications }: BoardProps) {
  const [applications, setApplications] = useState<ApplicationProps[]>(initialApplications);
  const [activeDragCard, setActiveDragCard] = useState<string | null>(null);

  function getApplicationsByStatus(status: ApplicationStatus) {
    const applicationsByStatus = applications.filter(app => app.status === status);

    return applicationsByStatus;
  }

  function handleDragEnd(event: DragEndEvent) {
    if (!event.over) {
      return;
    }

    const overId = event.over.id;

    setApplications(prevApplications => {
      return prevApplications.map(app => {
        if (app.id === event.active.id) {
          return { ...app, status: overId as ApplicationStatus }
        } else {
          return app;
        }
      })
    })

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
            <Card company={neededCard.company} position={neededCard.position} date={neededCard.date} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}