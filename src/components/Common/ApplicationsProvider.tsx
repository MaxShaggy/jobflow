"use client"

import { createContext, useContext, useState } from "react";
import { ApplicationProps } from "../Layout/Board";

interface ApplicationsProviderProps { 
  children: React.ReactNode;
  initialApplications: ApplicationProps[];
}

interface ValueProps{
  applications: ApplicationProps[];
  setApplications: React.Dispatch<React.SetStateAction<ApplicationProps[]>>;
}

const ApplicationsContext = createContext<ValueProps | null>(null);

export function useApplications() {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error("useApplications must be used within ApplicationsProvider");
  }
  return context;
}

export function ApplicationsProvider({ children, initialApplications }: ApplicationsProviderProps) {
  const [applications, setApplications] = useState(initialApplications);

  return (
    <ApplicationsContext.Provider value={{ applications, setApplications }}>
      {children}
    </ApplicationsContext.Provider>
  )
}