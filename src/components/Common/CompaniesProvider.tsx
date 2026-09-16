"use client"

import { createContext, useContext, useState } from 'react'
import { Company } from '../Layout/Companies';

interface CompaniesProviderProps {
  children: React.ReactNode;
  initialCompanies: Company[];
}

interface CompaniesValueProps {
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>
}

export function useCompanies() {
  const context = useContext(CompaniesContext);

  if (!context) {
    throw new Error("useCompanies must be used within CompaniesProvider")
  }

  return context;
}

const CompaniesContext = createContext<CompaniesValueProps | null>(null);

export function CompaniesProvider({ children, initialCompanies }: CompaniesProviderProps) {
  const [companies, setCompanies] = useState(initialCompanies);

  return (
    <CompaniesContext.Provider value={{companies, setCompanies}}>
      {children}
    </CompaniesContext.Provider>
  )
}