"use client"

import { createContext, useContext, useState } from 'react'
import { CompanyProps } from '../Layout/Companies';

interface CompaniesProviderProps {
  children: React.ReactNode;
  initialCompanies: CompanyProps[];
}

interface CompaniesValueProps {
  companies: CompanyProps[];
  setCompanies: React.Dispatch<React.SetStateAction<CompanyProps[]>>
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