"use client"

import { IconButton } from "@/components/ui/icon-button";
import { AddApplicationButton } from "./AddApplicationButton";
import { SearchInput } from "./SearchInput";
import { Moon, Sun } from "lucide-react"
import { useState } from "react";

export function Header() {
  const [language, setLanguage] = useState<"en" | "ua">("en");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <header className="flex gap-6 justify-between items-center p-4">
      <AddApplicationButton />
      <SearchInput />
      <div className="flex gap-4">
        <div className="flex gap-2">
          <IconButton
            icon={<Moon className="size-4" />}
            onClick={() => setTheme("dark")}
            isActive={theme === "dark"}
          />
          <IconButton
            icon={<Sun className="size-4" />}
            onClick={() => setTheme("light")}
            isActive={theme === "light"}
          />
        </div>
        <div className="flex gap-2">
          <IconButton
            icon={<span className="text-xs font-semibold">EN</span>} onClick={() => setLanguage("en")}
            isActive={language === "en"}
          />
          <IconButton
            icon={<span className="text-xs font-semibold">UA</span>} onClick={() => setLanguage("ua")}
            isActive={language === "ua"}
          />
        </div>
      </div>

    </header>
  )
}