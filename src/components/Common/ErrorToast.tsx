"use client"

import { useEffect } from "react";
import { toast } from "@/components/ui/toast";

interface ErrorToastProps {
  error: { message: string } | null;
}

export function ErrorToast({ error }: ErrorToastProps) {
useEffect(() => {
  if (error) {
    const timer = setTimeout(() => {
      toast.add({
        title: "Unable to load vacancies",
        description: error.message,
        type: "error",
      });
    }, 0);
    return () => clearTimeout(timer);
  }
}, [error]);

  return null;
}