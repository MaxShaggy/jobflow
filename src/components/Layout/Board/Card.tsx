import { ApplicationStatus } from "./Board";
interface CardProps {
  company: string;
  position: string;
  date: string;
  updatedDate: string | null;
  status: ApplicationStatus;
}

export function Card({ company, position, date, updatedDate, status }: CardProps) {
  return (
    <div className="group flex flex-col justify-between p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-colors duration-300 ease-out hover:bg-white/10 hover:border-white/20 hover:drop-shadow-[0_0_20px_rgba(99,102,241,0.3)] select-none">
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-lg text-white tracking-wide truncate group-hover:text-white">
          {company}
        </h3>
        <p className="text-sm font-medium text-cyan-400/90 truncate group-hover:text-cyan-300">
          {position}
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div>
          <span>
            ICONS
          </span>
        </div>
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col">
            <span className="text-xs tracking-wider">
              Applied
            </span>
            <span className="text-xs text-white/40 tracking-wider">
              {date}
            </span>
          </div>
          {status !== "applications" && (
            <div className="flex flex-col">
            <span className="text-xs tracking-wider">
              Updated
            </span>
            <span className="text-xs text-white/40 tracking-wider">
              {updatedDate}
            </span>
          </div>
          ) }         
        </div>
      </div>
    </div>
  );
}