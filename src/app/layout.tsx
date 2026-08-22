import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Sidebar } from "@/components/Layout/Sidebar";
import { Header } from "@/components/Layout/Header";
import { Toaster } from "@/components/ui/toast";
import { ApplicationsProvider } from "@/components/Common";
import { getApplications } from "@/lib/supabase/queries";
import { ErrorToast } from "@/components/Common";


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
  const { data, error } = await getApplications();

  const initialApplications = data
    ? data.map(card => {
        const newDate = new Date(card.date).toLocaleDateString('uk-UA');
        return { ...card, date: newDate };
      })
    : [];

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="h-screen flex gap-6 p-6 gradient-bg">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-6 min-w-0 min-h-0">
          <ApplicationsProvider initialApplications={initialApplications}>
            <ErrorToast error={error} />
            <Header />
            <main className="flex-1 min-w-0 min-h-0">
              {children}
            </main>
          </ApplicationsProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
