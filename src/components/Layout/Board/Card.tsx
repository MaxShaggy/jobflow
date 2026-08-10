interface CardProps {
  company: string;
  position: string;
  date: string;
}

export function Card({ company, position, date }: CardProps) {
  return (
    <div>
      <h2>{company}</h2>
      <span>{position}</span>
      <span>{ date}</span>
    </div>
  );
}