interface ColumnProps {
  title: string;
}

export function Column({ title }: ColumnProps) {
  return (
    <div className="shrink-0 w-64 p-2 rounded-md bg-surface-3 h-full flex flex-col gap-2">
      <h2 className="text-center">{title}</h2>
      <div className="flex-1 overflow-y-auto min-h-0 hidden-scrollbar">
        <div className="h-20 bg-surface-1 mb-2 rounded">1</div>
        <div className="h-20 bg-surface-1 mb-2 rounded">2</div>
        <div className="h-20 bg-surface-1 mb-2 rounded">3</div>
        <div className="h-20 bg-surface-1 mb-2 rounded">1</div>
        <div className="h-20 bg-surface-1 mb-2 rounded">2</div>
        <div className="h-20 bg-surface-1 mb-2 rounded">3</div>
        <div className="h-20 bg-surface-1 mb-2 rounded">1</div>
        <div className="h-20 bg-surface-1 mb-2 rounded">2</div>
        <div className="h-20 bg-surface-1 mb-2 rounded">3</div>
      </div>
    </div>
  )
}