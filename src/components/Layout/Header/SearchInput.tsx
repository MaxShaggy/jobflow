"use client";

import { Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export function SearchInput() {
  return (
    <InputGroup 
      className="max-w-xs rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_3px_6px_rgba(0,0,0,0.45),inset_0_-3px_12px_rgba(99,102,241,0.25)] transition-all duration-300 focus-within:bg-white/15 focus-within:border-white/40 focus-within:shadow-[inset_0_3px_6px_rgba(0,0,0,0.45),inset_0_-3px_12px_rgba(99,102,241,0.25),0_0_40px_rgba(99,102,241,0.25)] group"
    >
      <InputGroupAddon className="pl-3.5 pr-1 text-white/50 group-focus-within:text-cyan-300 group-focus-within:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300">
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupInput 
        placeholder="Search..." 
        className="bg-transparent border-none text-sm text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 pr-4 py-2
        "
      />
    </InputGroup>
  );
}