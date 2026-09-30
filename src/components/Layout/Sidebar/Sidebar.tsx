import Image from "next/image";
import { LayoutDashboard, ChartColumnBig, Building2, ArchiveX, type LucideIcon } from "lucide-react";
import { SidebarNavItem } from './SidebarNavItem';
import { signOut } from "@/lib/supabase/auth";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  nickname: string | undefined;
}
interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Board", href: "/", icon: LayoutDashboard },
  { label: "Statistics", href: "/statistics", icon: ChartColumnBig },
  { label: "Companies", href: "/companies", icon: Building2 },
  { label: "Archive", href: "/archive", icon: ArchiveX },
];

export function Sidebar({ nickname }: SidebarProps) {
  return (
    <aside className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl w-64 pb-5 flex flex-col gap-5 transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]">
      <Image
        src="/images/logo.svg"
        alt="JobFlow"
        width={225}
        height={63}
        priority
        className="self-center pt-4"
      />
      <ul className="text-text-2 p-6 flex flex-col gap-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <SidebarNavItem
                href={item.href}
                label={item.label}
                icon={<Icon className="size-5" />}
              />
            </li>
          );
        })}
      </ul>

      <div className="mt-auto mx-6 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-white/70">
          Hello, <span className="font-semibold text-cyan-300">{nickname ?? "User"} !</span>
        </p>
        <form action={signOut}>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="shrink-0 text-white/70 cursor-pointer hover:bg-white/10 hover:text-cyan-300"
          >
            <LogOut aria-hidden="true" />
            Log out
          </Button>
        </form>
      </div>
    </aside>
  );
}