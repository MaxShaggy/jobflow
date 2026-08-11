"use client"

import { useState } from "react";
import { Column } from "./Column";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
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

const mockApplications: ApplicationProps[] = [
  {
    id: "1",
    company: "MacPaw",
    position: "Junior Front-end Engineer",
    date: "06.08",
    status: "applications",
  },
  {
    id: "2",
    company: "Solvexus",
    position: "React Developer",
    date: "30.07",
    status: "follow-up",
  },
  {
    id: "3",
    company: "IDEAL",
    position: "JavaScript Frontend Developer",
    date: "28.07",
    status: "applications",
  },
  {
    id: "4",
    company: "Axels",
    position: "Junior Frontend React Developer",
    date: "28.07",
    status: "applications",
  },
];

export function Board() {
  const [applications, setApplications] = useState<ApplicationProps[]>(mockApplications);

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
          columns.map(col => {
            const cardsByStatus = getApplicationsByStatus(col.id);
            return (
              <Column key={col.id} title={col.title} cardsByStatus={cardsByStatus} id={col.id} />
            )
          })}
      </div>
      <DragOverlay>
        {neededCard && (
          <Card company={neededCard.company} position={neededCard.position} date={neededCard.date} />
        )}
      </DragOverlay>
    </DndContext>
  )
}