import { useCompanies } from '@/components/Common/CompaniesProvider';
import { cn } from '@/lib/utils';
import { Trophy, FlagTriangleRight } from 'lucide-react';

interface CompanyBadgesProps {
  applicationCompany: string;
}

export function CompanyBadges({ applicationCompany }: CompanyBadgesProps) {
  const styleIconBlock = "p-2 border border-white/20 rounded-full bg-black/20 shadow-[inset_2px_2px_2px_rgba(0,0,0,0.5),inset_-2px_-1px_2px_rgba(255,255,255,0.1)]";

  const { companies } = useCompanies();

  const isTopRated = companies.some(company => {
    const companyWords = company.name.toLowerCase().split(" ");
    const applicationWords = applicationCompany.toLowerCase().split(" ");

    const nameMatches = companyWords.some((companyWord: string) =>
      applicationWords.includes(companyWord)
    );

    return company.status === 'top_rating' && nameMatches;
  });

  const isRedFlag = companies.some(company => {
    const companyWords = company.name.toLowerCase().split(" ");
    const applicationWords = applicationCompany.toLowerCase().split(" ");

    const nameMatches = companyWords.some((companyWord: string) =>
      applicationWords.includes(companyWord)
    );

    return company.status === 'red_flag' && nameMatches;
  });

  return (
    <div className="flex items-center gap-2 ">
      <div className={cn(
        styleIconBlock,
        isTopRated && "border-secondary-yellow bg-secondary-yellow/20 shadow-[0_0_12px_rgba(250,204,21,0.5)]"
      )}>
        <Trophy className={cn(
          "size-3",
          isTopRated ? "text-secondary-yellow drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]" : "text-white/20"
        )} />
      </div>
      <div className={cn(
        styleIconBlock,
        isRedFlag && "border-destructive bg-destructive/20 shadow-[0_0_12px_rgba(239,68,68,0.5)]"
      )}>
        <FlagTriangleRight className={cn(
          "size-3",
          isRedFlag ? "text-destructive drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]" : "text-white/20"
        )} />
      </div>
    </div>
  )
}