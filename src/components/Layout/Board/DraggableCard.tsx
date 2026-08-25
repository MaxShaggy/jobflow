"use client"

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "./Card";
import { ApplicationStatus } from "./Board";

interface DraggableCardProps {
  id: string;
  company: string;
  position: string;
  date: string;
  updatedDate: string | null;
  status: ApplicationStatus;
}

export function DraggableCard({ id, company, position, date, status, updatedDate }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: transform ? 50 : undefined,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? "cursor-grabbing" : "cursor-grab"}
      {...listeners}
      {...attributes}>
      <Card company={company} position={position} date={date} status={status} updatedDate={updatedDate} />
    </div>
  );
}