import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Sidebar } from "@/components/Layout/Sidebar";
import { Header } from "@/components/Layout/Header";
import { Toaster } from "@/components/ui/toast";
import { ApplicationsProvider } from "@/components/Common";
import { getApplications, getCompanies } from "@/lib/supabase/queries";
import { ErrorToast } from "@/components/Common";
import { SearchProvider } from "@/components/Common/SearchProvider";
import { CompaniesProvider } from "@/components/Common/CompaniesProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobFlow",
  description: "Personal job application tracker",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: applicationsData, error: applicationsError } = await getApplications();
  const { data: companiesData, error: companiesError } = await getCompanies();

  const initialApplications = applicationsData
    ? applicationsData.map(card => {
      const newDate = new Date(card.date).toLocaleDateString('uk-UA');
      const newUpdatedDate = card.updated_date
        ? new Date(card.updated_date).toLocaleDateString('uk-UA')
        : null;

      return { ...card, date: newDate, updated_date: newUpdatedDate };
    })
    : [];

  const initialCompanies = companiesData ? companiesData : [];

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="h-screen py-4 pl-4 flex gap-2 gradient-bg">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-6 min-w-0 min-h-0">
          <ApplicationsProvider initialApplications={initialApplications}>
            <SearchProvider>
              <CompaniesProvider initialCompanies={initialCompanies}>
                <ErrorToast error={applicationsError} />
                <ErrorToast error={companiesError} />
                <Header />
                <main className="flex-1 min-w-0 min-h-0">
                  {children}
                </main>
              </CompaniesProvider>
            </SearchProvider>
          </ApplicationsProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
