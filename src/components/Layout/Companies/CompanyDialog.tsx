"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Company } from "./Companies";
import { Globe, Trash2 } from 'lucide-react';
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { useCompanies } from "@/components/Common/CompaniesProvider";

interface CompanyDialogProps {
  company: Company | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tab: "top_rated" | "red_flag";
};

interface CompanyReview {
  id: number;
  text: string;
  user_id: string | null;
};

export function CompanyDialog({ company, open, onOpenChange, tab }: CompanyDialogProps) {
  const [reviews, setReviews] = useState<CompanyReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const { companies, setCompanies } = useCompanies();

  useEffect(() => {
    if (!company || tab !== "red_flag") {
      return;
    }

    const currentCompany = company;

    async function loadReviews() {
      setIsLoading(true);

      const supabase = createClient();

      const { data: { user } } = await supabase.auth.getUser();

      setCurrentUserId(user?.id ?? null);

      const { data } = await supabase
        .from('company_reviews')
        .select()
        .eq('company_id', currentCompany.id);
      setReviews(data ?? []);
      setIsLoading(false);
    }

    loadReviews();
  }, [company, open, tab]);

  async function handleDelete(reviewId: number) {
    const supabase = createClient();

    const { error } = await supabase
      .from("company_reviews")
      .delete()
      .eq("id", reviewId);

    if (error) {
      toast.add({ title: "Failed to delete review", description: error.message, type: "error" });
      return;
    }

    setReviews(reviews.filter(review => review.id !== reviewId));

    setCompanies(companies.map(item =>
      item.id === company?.id
        ? { ...item, company_reviews: [{ count: item.company_reviews[0].count - 1 }] }
        : item
    ));

    if (reviews.length === 1) {
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm gradient-bg border-2 border-white/40 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
        <DialogHeader>
          <DialogTitle>{company?.name}</DialogTitle>
          <DialogDescription >
            {company?.website && (
              <a
                href={company?.website ?? undefined}
                rel="noopener noreferrer"
                target="_blank"
                className="flex gap-2 items-center no-underline group"
              >
                <Globe size={16} className="group-hover:text-cyan-400/70 transition-colors duration-300" />
                <span className="group-hover:text-cyan-400/70 transition-colors duration-300">Visit website</span>
              </a>
            )}

          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {isLoading ? (
            <div className="min-h-12 flex items-center justify-center">
              <Loader className="size-4 animate-spin" />
            </div>
          ) : (
            tab === "red_flag" ? (
              <ul>
                {reviews.map(review => (
                  <li key={review.id} className="pb-2 flex justify-between gap-2">
                    - {review.text}
                    {currentUserId !== null && review.user_id === currentUserId &&
                      <button
                        type="button"
                        aria-label="delete your review"
                        className="shrink-0 self-start hover:text-destructive cursor-pointer transition-colors duration-300"
                        onClick={() => handleDelete(review.id)}
                      >
                        <Trash2
                          aria-hidden="true"
                          className="size-4"
                        />
                      </button>
                    }
                  </li>
                ))}
              </ul>
            ) : (
              company?.description
            )
          )}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="glass" className="w-22">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}