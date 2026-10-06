"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemesProvider {
  children: React.ReactNode;
}

export function ThemesProvider({ children }: ThemesProvider) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}