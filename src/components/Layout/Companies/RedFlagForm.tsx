"use client"

import { AddRedFlagButton } from "@/components/Layout/Companies";
import { Button } from "@/components/ui/button";
import { ClearableInput } from '@/components/Common';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useCompanies } from "@/components/Common/CompaniesProvider";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/toast";

export function RedFlagForm() {
  const inputStyles = "bg-white/10 border-2 border-white/20 focus-visible:border-2 focus-visible:border-cyan-400/70 focus-visible:ring-0";
  const labelStyles = "transition-colors duration-300 group-focus-within:text-cyan-400/70";

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { companies, setCompanies } = useCompanies();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const companyName = String(formData.get("company") ?? "").trim();
    const review = String(formData.get("review") ?? "").trim();

    const existingCompany = companies.find(
      company => company.name.toLowerCase() === companyName.toLowerCase()
    );

    const supabase = createClient();

    let companyId = existingCompany?.id;
    let createdCompany = null;

    if (!companyId) {
      const { data, error } = await supabase
        .from("companies")
        .insert({ name: companyName })
        .select()
        .single();

      if (error) {
        toast.add({ title: "Failed to add company", description: error.message, type: "error" });
        setIsSubmitting(false);
        return;
      }

      companyId = data.id;
      createdCompany = data;
    }

    const { error: reviewError } = await supabase
      .from("company_reviews")
      .insert({ company_id: companyId, text: review });

    if (reviewError) {
      toast.add({ title: "Failed to add review", description: reviewError.message, type: "error" });
      setIsSubmitting(false);
      return;
    }

    if (existingCompany) {
      setCompanies(companies.map(company =>
        company.id === existingCompany.id
          ? { ...company, company_reviews: [{ count: company.company_reviews[0].count + 1 }] }
          : company
      ));
    } else {
      setCompanies([...companies, { ...createdCompany, company_reviews: [{ count: 1 }] }]);
    }

    setIsSubmitting(false);
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger render={<AddRedFlagButton />} />
      <DialogContent className="sm:max-w-sm gradient-bg border-2 border-white/40 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="uppercase">Add redflag company</DialogTitle>
            <DialogDescription className="mb-4">
              Specify the company and leave your review.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field className="group">
              <Label
                htmlFor="company"
                className={labelStyles}
              >Company</Label>
              <ClearableInput
                id="company"
                name="company"
                placeholder="e.g. Google"
                autoComplete="off"
                list="companyNames"
                required
                className={inputStyles}
              />
              <datalist id="companyNames">
                {companies.map(company => (
                  <option key={company.id} value={company.name} />
                ))}
              </datalist>
            </Field>
            <Field className="group">
              <Label htmlFor="review" className={labelStyles}>Review</Label>
              <Textarea
                id="review"
                name="review"
                maxLength={250}
                required
                placeholder="Leave your comment about this company, which can help other users..."
                className={`${inputStyles} resize-none mb-2 min-h-[160px]`}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" className="w-22 border-2 border-white/20 bg-white/[0.04] backdrop-blur-sm hover:bg-white/15 hover:text-cyan-400/70 hover:border-white/40 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400/70">Cancel</Button>} />
            <Button
              type="submit"
              className="w-22 border-2 border-white/20 bg-white/[0.04] backdrop-blur-sm hover:bg-white/15 hover:text-cyan-400/70 hover:border-white/40 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400/70"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
