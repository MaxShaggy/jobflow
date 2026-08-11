"use client"

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "./Card";

interface DraggableCardProps {
  id: string;
  company: string;
  position: string;
  date: string;
}

export function DraggableCard({ id, company, position, date }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: transform ? 50 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card company={company} position={position} date={date}/>
    </div>
  );
}