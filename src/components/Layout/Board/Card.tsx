import { CompanyBadges } from "@/components/Layout/Companies/CompanyBadges";
import { ApplicationStatus } from "@/components/Layout/Board";
import { cn } from "@/lib/utils";
import { ExternalLink } from 'lucide-react';
interface CardProps {
  company: string;
  position: string;
  date: string;
  updatedDate: string | null;
  status: ApplicationStatus;
  link: string;
}

export function Card({ company, position, date, updatedDate, status, link }: CardProps) {
  return (
    <div className="group flex flex-col gap-2 justify-between py-2 px-4 rounded-2xl bg-surface backdrop-blur-md border border-edge transition-colors duration-300 ease-out hover:bg-surface-hover hover:border-edge-hover hover:drop-shadow-[0_0_20px_rgba(99,102,241,0.3)] select-none">
      <div className="flex flex-col">
        <h3 className="font-bold text-lg text-contrast tracking-wide truncate group-hover:text-contrast">
          {company}
        </h3>
        <p className="text-sm font-medium text-accent-cyan/90 truncate group-hover:text-accent-cyan">
          {position}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <CompanyBadges applicationCompany={company} />
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            title="Open job posting"
            aria-label={`Open job posting: ${position} at ${company}`}
            onPointerDown={(event) => event.stopPropagation()}
            className="p-2 border border-transparent text-contrast/40 hover:text-link-hover transition-colors duration-300 cursor-pointer">
            <ExternalLink
              aria-hidden="true"
              className="size-5" />
          </a>
        </div>
        <div className={cn("flex gap-2", {
          "justify-between": status !== "applications",
          "justify-end": status === "applications",
        })}>
          {status !== "applications" && (
            <div className="flex flex-col">
              <span className="text-xs tracking-wider">
                Updated
              </span>
              <span className="text-xs text-contrast/40 tracking-wider">
                {updatedDate}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xs tracking-wider">
              Applied
            </span>
            <span className="text-xs text-contrast/40 tracking-wider">
              {date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}