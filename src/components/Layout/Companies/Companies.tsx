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
import { CompanyCard } from "@/components/Layout/Companies";
import { CompanyDialog } from "@/components/Layout/Companies";
import { RedFlagForm } from "@/components/Layout/Companies";

export interface Company {
  id: number;
  name: string;
  website: string | null;
  description: string | null;
  status: "top_rating" | null;
  created_at: string;
  company_reviews: { count: number }[];
}

export function Companies() {
  const { companies, setCompanies } = useCompanies();
  const [selectedCompanyID, setSelectedCompanyID] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"top_rated" | "red_flag">("top_rated");

  const companiesTopRated = companies
    .filter(company => company.status === 'top_rating')
    .toSorted((a, b) => a.name.localeCompare(b.name));

  const companiesRedFlag = companies.filter(company => company.company_reviews[0].count > 0)
    .toSorted((a, b) => a.name.localeCompare(b.name));

  const neededCompany = companies.find(company => company.id === selectedCompanyID)

  return (
    <div>
      {selectedCompanyID !== null && (
        <CompanyDialog
          company={neededCompany}
          open={selectedCompanyID !== null}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedCompanyID(null);
            }
          }}
          tab={activeTab}
        />
      )}

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="px-4 h-full flex flex-col min-h-0">
        <div className="flex items-center gap-6 mb-4">
          <TabsList className="flex items-center gap-2 p-2 bg-glass/40 border border-transparent hover:border-edge-hover hover:shadow-[0_2px_10px_rgba(26,27,46,0.15)] dark:bg-glass/10 dark:hover:border-glass/40 dark:hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] transition-all duration-300">
            <TabsTrigger
              value="top_rated"
              className="h-auto w-28 flex items-center gap-1 cursor-pointer transition-colors duration-300 data-active:bg-glass/70 dark:data-active:bg-glass/15 group">
              <Trophy
                aria-hidden="true"
                className="group-hover:text-secondary-yellow transition-colors duration-300 group-data-active:text-secondary-yellow" />
              <span className="group-hover:text-accent-cyan dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-colors duration-300 group-data-active:text-accent-cyan">Top Rated</span>
            </TabsTrigger>
            <TabsTrigger
              value="red_flag"
              className="h-auto w-28 flex items-center gap-1 cursor-pointer transition-colors duration-300 data-active:bg-glass/70 dark:data-active:bg-glass/15 group">
              <FlagTriangleRight
                aria-hidden="true"
                className="group-hover:text-destructive transition-colors duration-300 group-data-active:text-destructive" />
              <span className="group-hover:text-accent-cyan dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-colors duration-300 group-data-active:text-accent-cyan">Red Flag</span>
            </TabsTrigger>
          </TabsList>
          {activeTab === "red_flag" && <RedFlagForm />}
        </div>
        <TabsContent
          value="top_rated"
          className="flex-1 min-h-0 overflow-y-auto hidden-scrollbar">
          <ul className="grid grid-cols-[repeat(auto-fill,_minmax(min(250px,_100%),_1fr))] gap-x-4 gap-y-2">
            {companiesTopRated.map(company => (
              <CompanyCard key={company.id} company={company} setSelectedCompanyID={setSelectedCompanyID} />
            ))}
          </ul>
        </TabsContent>
        <TabsContent
          value="red_flag"
          className="flex-1 min-h-0 overflow-y-auto hidden-scrollbar"
        >
          <ul className="grid grid-cols-[repeat(auto-fill,_minmax(min(250px,_100%),_1fr))] gap-x-4 gap-y-2">
            {companiesRedFlag.map(company => (
              <CompanyCard key={company.id} company={company} setSelectedCompanyID={setSelectedCompanyID} />
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  )
}