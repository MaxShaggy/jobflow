"use client"

import { useCompanies } from "@/components/Common/CompaniesProvider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Trophy, FlagTriangleRight } from 'lucide-react';
import { useState } from "react";
import { CompanyCard } from "./CompanyCard";
import { CompanyDialog } from "./CompanyDialog";

export interface Company {
  id: number;
  name: string;
  website: string | null;
  description: string | null;
  status: "top_rating" | "red_flag";
  created_at: string;
}

export function Companies() {
  const { companies, setCompanies } = useCompanies();
  const [selectedCompanyID, setSelectedCompanyID] = useState<number | null>(null);

  const companiesTopRated = companies
    .filter(company => company.status === 'top_rating')
    .toSorted((a, b) => a.name.localeCompare(b.name));
  const companiesRedFlag = companies.filter(company => company.status === 'red_flag');

  const neededCompany = companies.find(company => company.id === selectedCompanyID)

  return (
    <>
      {selectedCompanyID && (
        <CompanyDialog
          company={neededCompany}
          open={selectedCompanyID !== null}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedCompanyID(null);
            }
          }} />
      )}

      <Tabs defaultValue="top_rated" className="px-4 h-full flex flex-col min-h-0">
        <TabsList className="flex items-center gap-2 mb-4 p-2 bg-white/10 border border-transparent hover:border-white/40 hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] transition-border-color duration-300">
          <TabsTrigger
            value="top_rated"
            className="h-auto w-28 flex items-center gap-1 cursor-pointer transition-color duration-300 data-active:bg-white/15 group">
            <Trophy className="group-hover:text-secondary-yellow transition-colors duration-300 group-data-active:text-secondary-yellow" />
            <span className="group-hover:text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-colors duration-300 group-data-active:text-cyan-300">Top Rated</span>
          </TabsTrigger>
          <TabsTrigger
            value="red_flag"
            className="h-auto w-28 flex items-center gap-1 cursor-pointer  transition-color duration-300 data-active:bg-white/15 group">
            <FlagTriangleRight className="group-hover:text-destructive transition-colors duration-300 group-data-active:text-destructive" />
            <span className="group-hover:text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-colors duration-300 group-data-active:text-cyan-300">Red Flag</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="top_rated" className="flex-1 min-h-0 overflow-y-auto hidden-scrollbar">
          <ul className="grid grid-cols-[repeat(auto-fill,_minmax(min(250px,_100%),_1fr))] gap-x-4 gap-y-2">
            {companiesTopRated.map(company => (
              <CompanyCard key={company.id} company={company} setSelectedCompanyID={setSelectedCompanyID} />
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="red_flag">
          <ul className="grid grid-cols-[repeat(auto-fill,_minmax(min(250px,_100%),_1fr))] gap-x-4 gap-y-2">
            {companiesRedFlag.map(company => (
              <CompanyCard key={company.id} company={company} setSelectedCompanyID={setSelectedCompanyID} />
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </>
  )
}