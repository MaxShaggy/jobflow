"use client"

import { X } from 'lucide-react';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ClearableInput({className, ...props }: React.ComponentProps<typeof Input>) {
  const [value, setValue] = useState('');

  return (
    <div className="relative">
      <Input
        {...props}
        value={value}
        onChange={event => setValue(event.target.value)}
        className={cn("pr-10", className)}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear"
          className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
          onClick={() => setValue('')}
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}