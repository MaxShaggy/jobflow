interface CardProps {
  company: string;
  position: string;
  date: string;
}

export function Card({ company, position, date }: CardProps) {
  return (
    <div className="flex flex-col gap-2 p-2 border border-solid border-text-2 bg-surface-2 rounded cursor-pointer">
      <h2 className="truncate">{company}</h2>
      <span className="text-sm text-text-2 truncate">{position}</span>
      <div className="text-right">
        <span className="text-sm text-text-2">{date}</span>
      </div>
    </div>
  );
}