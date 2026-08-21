"use client"

import { AddApplicationButton } from "./AddApplicationButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader } from "lucide-react";
import { toast } from "@/components/ui/toast";

const items = [
  { label: "Junior", value: "junior" },
  { label: "Middle", value: "middle" },
  { label: "Senior", value: "senior" },
]

export function ApplicationForm() {
  const inputStyles = "bg-white/10 border-2 border-white/20 focus-visible:border-2 focus-visible:border-cyan-400/70 focus-visible:ring-0";
  const labelStyles = "transition-colors duration-300 group-focus-within:text-cyan-400/70";

  const [level, setLevel] = useState<"Junior" | "Middle" | "Senior" | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const supabase = createClient();

    const { data, error } = await supabase
      .from("applications")
      .insert({
        company: formData.get("company"),
        position: formData.get("position"),
        link: formData.get("link"),
        level,
        status: "applications",
        notes: formData.get("notes")
      })

    if (error) {
      toast.add({
        title: "Failed to send data",
        description: error.message,
        type: "error",
      });
    } else {
      setIsOpen(false);
      setLevel(null);
    }

    setIsSubmitting(false);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setLevel(null);
        }
      }}>
      <DialogTrigger render={<AddApplicationButton />} />
      <DialogContent className="sm:max-w-sm gradient-bg border-2 border-white/40 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="uppercase">Add Job Application</DialogTitle>
            <DialogDescription>
              Fill in the details of the job you applied for. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field className="group">
              <Label htmlFor="company" className={labelStyles}>Company</Label>
              <Input
                id="company"
                name="company"
                placeholder="e.g. Google"
                autoComplete="off"
                required
                className={inputStyles}
              />
            </Field>
            <Field className="group">
              <Label htmlFor="position" className={labelStyles}>Position</Label>
              <Input
                id="position"
                name="position"
                placeholder="e.g. Junior Frontend Developer"
                autoComplete="off"
                required
                className={inputStyles}
              />
            </Field>
            <Field className="group">
              <Label htmlFor="link" className={labelStyles}>Link</Label>
              <Input
                id="link"
                name="link"
                placeholder="e.g. https://..."
                autoComplete="off"
                required
                className={inputStyles}
              />
            </Field>
            <Field className="group">
              <Label htmlFor="level" className={labelStyles}>Experience Level</Label>
              <Select
                items={items}
                required
                value={level}
                onValueChange={value => setLevel(value)}
              >
                <SelectTrigger
                  id="level"
                  className={`w - full max - w - 60 ${inputStyles} `}>
                  <SelectValue placeholder="Choose Experience Level" />
                </SelectTrigger>
                <SelectContent className="gradient-bg bg-black/20 border-2 border-white/50">
                  <SelectGroup>
                    <SelectLabel className="text-cyan-400/70">Experience Level</SelectLabel>
                    {items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field className="group">
              <Label htmlFor="notes" className={labelStyles}>Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                maxLength={250}
                placeholder="e.g. Job notes, key requirements, or your thoughts..."
                className={`${inputStyles} resize-none mb-2`}
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
    </Dialog >
  )
}

