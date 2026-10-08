import { Company } from "./Companies";
import { CompanyLogo } from "./CompanyLogo";

interface CompanyCardProps {
  company: Company;
  setSelectedCompanyID: React.Dispatch<React.SetStateAction<number | null>>;
}

export function CompanyCard({ company, setSelectedCompanyID }: CompanyCardProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => setSelectedCompanyID(company.id)}
        className="w-full text-left flex items-center gap-4 p-1 cursor-pointer group"
      >
        <CompanyLogo website={company.website} name={company.name} />
        <span className="max-w-[150px] min-w-0 truncate group-hover:text-accent-cyan transition-colors duration-300">
          {company.name}
        </span>
        <span className="text-[10px] text-glass/90 dark:text-contrast/70 px-2 text-center shrink-0 rounded-xl bg-glass/10 backdrop-blur-md border border-glass/20 shadow-[inset_0_3px_6px_rgba(0,0,0,0.45),inset_0_-3px_12px_rgba(99,102,241,0.25)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
          {company.status === "top_rating" ? "more info" : "see comments"}
        </span>
      </button>
    </li>
  );
}