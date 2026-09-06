import { CompanyProps } from "./Companies";
import { CompanyLogo } from "./CompanyLogo";

interface CompanyCardProps {
  company: CompanyProps;
  setSelectedCompanyID: React.Dispatch<React.SetStateAction<number | null>>;
}

export function CompanyCard({ company, setSelectedCompanyID }: CompanyCardProps) {
  return (
    <li
      role="button"
      tabIndex={0}
      className="flex items-center gap-4 p-1 cursor-pointer"
      onClick={() => setSelectedCompanyID(company.id)}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedCompanyID(company.id) }}
    >
      <CompanyLogo website={company.website!} name={company.name} />
      <h3>
        {company.name}
      </h3>
    </li>
  )
}