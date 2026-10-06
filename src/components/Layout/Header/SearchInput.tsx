"use client";

import { Search, X } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useSearch } from "@/components/Common/SearchProvider";
import { usePathname } from "next/navigation";

export function SearchInput() {
  const { searchQuery, setSearchQuery } = useSearch();
  const pathname = usePathname();

  return (
    <InputGroup
      className="max-w-xs rounded-xl backdrop-blur-md transition-all duration-300 group bg-glass/30 border border-glass/50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.45),inset_0_-3px_12px_rgba(99,102,241,0.25)] focus-within:bg-glass/50 focus-within:border-contrast/50 focus-within:shadow-[inset_0_3px_6px_rgba(0,0,0,0.45),inset_0_-3px_10px_rgba(99,102,241,0.25),0_0_40px_rgba(99,102,241,0.25)] dark:bg-white/10 dark:border-white/20 dark:focus-within:bg-white/15 dark:focus-within:border-white/40"
    >
      <InputGroupAddon className="text-glass/70 group-focus-within:text-contrast/50 dark:text-white/50 dark:group-focus-within:text-accent-cyan group-focus-within:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300">
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end" className="text-contrast/50 hover:text-accent-cyan transition-colors duration-300">
        <button
          onClick={() => setSearchQuery('')}
          className={`transition-opacity duration-300 ${searchQuery !== "" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <X className="size-4 cursor-pointer" />
        </button>
      </InputGroupAddon>
      <InputGroupInput
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value.trimStart().replace(/\s+/g, ' '))}
        placeholder={pathname === "/archive" ? "Search in Archive..." : "Search..."}
        className="bg-transparent border-none text-sm text-contrast placeholder:text-contrast/40 focus-visible:ring-0 focus-visible:ring-offset-0 pr-4 py-2"
      />
    </InputGroup>
  );
}