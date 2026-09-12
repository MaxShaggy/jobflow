import { Company } from "./Companies";
import { CompanyLogo } from "./CompanyLogo";

interface CompanyCardProps {
  company: Company;
  setSelectedCompanyID: React.Dispatch<React.SetStateAction<number | null>>;
}

export function CompanyCard({ company, setSelectedCompanyID }: CompanyCardProps) {
  return (
    <li
      role="button"
      tabIndex={0}
      className="flex items-center gap-4 p-1 cursor-pointer group"
      onClick={() => setSelectedCompanyID(company.id)}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedCompanyID(company.id) }}
    >
      <CompanyLogo website={company.website!} name={company.name} />
      <h3 className="max-w-[150px] min-w-0 truncate group-hover:text-cyan-300 transition-colors duration-300">
        {company.name}
      </h3>
      <span className="text-[10px] text-white/70 px-2 text-center shrink-0 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_3px_6px_rgba(0,0,0,0.45),inset_0_-3px_12px_rgba(99,102,241,0.25)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {company.status === "top_rating" ? "more info" : "see comments"}
      </span>
    </li>
  )
}