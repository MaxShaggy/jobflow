import { ApplicationProps } from "./Board";
import { Card } from "./Card";
import { DraggableCard } from "./DraggableCard";
import { useDroppable } from "@dnd-kit/core";
interface ColumnProps {
  title: string;
  cardsByStatus: ApplicationProps[];
  id: string;
}

export function Column({ title, cardsByStatus, id }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="shrink-0 w-64 p-2 rounded-md max-h-full flex flex-col gap-2">
      <h2 className="text-center">{title}</h2>
      <div className="flex-1 overflow-y-auto min-h-0 hidden-scrollbar flex flex-col gap-2">
        {cardsByStatus.map(card => (
          <DraggableCard
            key={card.id}
            id={card.id}
            company={card.company}
            position={card.position}
            date={card.date}
          />
        ))}
      </div>
    </div>
  )
}