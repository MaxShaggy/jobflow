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
import { inputStyles, labelStyles, dialogContentStyles } from "@/lib/formStyles";

export function RedFlagForm() {
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
    setCompanies(prev => [...prev, { ...data, company_reviews: [{ count: 0 }] }]);
  }

  const { error: reviewError } = await supabase
    .from("company_reviews")
    .insert({ company_id: companyId, text: review });

  if (reviewError) {
    toast.add({ title: "Failed to add review", description: reviewError.message, type: "error" });
    setIsSubmitting(false);
    return;
  }

  setCompanies(prev => prev.map(company =>
    company.id === companyId
      ? { ...company, company_reviews: [{ count: company.company_reviews[0].count + 1 }] }
      : company
  ));

  setIsSubmitting(false);
  setIsOpen(false);
}

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger render={<AddRedFlagButton />} />
      <DialogContent className={dialogContentStyles}>
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
                className={`${inputStyles} [&::-webkit-calendar-picker-indicator]:hidden!`}
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
            <DialogClose render={<Button variant="glass" className="w-22">Cancel</Button>} />
            <Button
              type="submit"
              variant="glass"
              className="w-22"
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
