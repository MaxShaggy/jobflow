import { Button } from "@/components/ui/button"
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
import { Globe } from 'lucide-react';
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader } from "lucide-react";

interface CompanyDialogProps {
  company: Company | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

interface CompanyReview {
  id: number;
  text: string;
};

export function CompanyDialog({ company, open, onOpenChange }: CompanyDialogProps) {
  const [reviews, setReviews] = useState<CompanyReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!company || company.status !== "red_flag") {
      return;
    }

    const currentCompany = company;

    async function loadReviews() {
      setIsLoading(true);
      const supabase = createClient();
      const { data } = await supabase
        .from('company_reviews')
        .select()
        .eq('company_id', currentCompany.id);
      setReviews(data ?? []);
      setIsLoading(false);
    }

    loadReviews();
  }, [company, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm gradient-bg border-2 border-white/40 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
        <DialogHeader>
          <DialogTitle>{company?.name}</DialogTitle>
          <DialogDescription >
            {company?.website && (
              <a
                href={company?.website ?? undefined}
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
            company?.status === 'red_flag' ? (
              <ul>
                {reviews.map(review => (
                  <li key={review.id} className="pb-2">- {review.text}</li>
                ))}
              </ul>
            ) : (
              company?.description
            )
          )}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" className="w-22 border-2 border-white/20 bg-white/[0.04] backdrop-blur-sm hover:bg-white/15 hover:text-cyan-400/70 hover:border-white/40 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400/70 cursor-pointer">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}