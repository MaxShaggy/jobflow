"use client"

import { createContext, useContext, useState } from "react";

interface SearchProviderProps {
  children: React.ReactNode;
}

interface SearchValueProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === null) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

const SearchContext = createContext<SearchValueProps | null>(null);

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }} >
      {children}
    </SearchContext.Provider>
  )
}
