"use client"

import { IconButton } from "@/components/ui/icon-button";
import { ApplicationForm } from "./ApplicationForm";
import { SearchInput } from "./SearchInput";
import { Moon, Sun } from "lucide-react"
import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

export function Header() {
  const [language, setLanguage] = useState<"en" | "ua">("en");
  const { theme, setTheme } = useTheme();

const mounted = useSyncExternalStore(
  () => () => {},
  () => true,
  () => false
);

  return (
    <header className="flex gap-6 justify-between items-center p-4">
      <ApplicationForm />
      <SearchInput />
      <div className="flex gap-4">
        <div className="flex gap-2">
          <IconButton
            icon={<Moon className="size-4" />}
            label="Dark theme"
            onClick={() => setTheme("dark")}
            isActive={mounted && theme === "dark"}
          />
          <IconButton
            icon={<Sun className="size-4" />}
            label="Light theme"
            onClick={() => setTheme("light")}
            isActive={mounted && theme === "light"}
          />
        </div>
        <div className="flex gap-2">
          <IconButton
            icon={<span className="text-xs font-semibold">EN</span>}
            label="English"
            onClick={() => setLanguage("en")}
            isActive={language === "en"}
          />
          <IconButton
            icon={<span className="text-xs font-semibold">UA</span>}
            label="Ukrainian"
            onClick={() => setLanguage("ua")}
            isActive={language === "ua"}
          />
        </div>
      </div>

    </header>
  )
}