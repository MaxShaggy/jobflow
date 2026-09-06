import { Button } from "@/components/ui/button"
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
import { CompanyProps } from "./Companies";
import { Globe } from 'lucide-react';

interface CompanyDialogProps {
  company: CompanyProps | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CompanyDialog({ company, open, onOpenChange }: CompanyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm gradient-bg border-2 border-white/40 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
        <DialogHeader>
          <DialogTitle>{company?.name}</DialogTitle>
          <DialogDescription >
            <a
              href={company?.website ?? undefined}
              target="_blank"
              className="flex gap-2 items-center no-underline group"
            >
              <Globe size={16} className="group-hover:text-cyan-400/70 transition-colors duration-300"/>
              <span className="group-hover:text-cyan-400/70 transition-colors duration-300">Visit website</span>
            </a>
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {company?.description}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" className="w-22 border-2 border-white/20 bg-white/[0.04] backdrop-blur-sm hover:bg-white/15 hover:text-cyan-400/70 hover:border-white/40 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400/70 cursor-pointer">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}