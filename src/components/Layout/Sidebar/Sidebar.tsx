import Image from "next/image";
import { LayoutDashboard, ChartColumnBig, Building2, ArchiveX, type LucideIcon } from "lucide-react";
import { SidebarNavItem } from './SidebarNavItem';
import { signOut } from "@/lib/supabase/auth";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  nickname: string | undefined;
  isLoggedIn: boolean;
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

export function Sidebar({ nickname, isLoggedIn }: SidebarProps) {
  return (
    <aside className="bg-surface backdrop-blur-md border border-edge rounded-2xl w-64 pb-5 flex flex-col gap-5 transition-all duration-300 hover:bg-surface-hover hover:border-edge-hover hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]">
      <Image
        src="/images/logo.svg"
        alt="JobFlow"
        width={225}
        height={63}
        priority
        className="hidden dark:block self-center pt-4"
      />
      <Image
        src="/images/logo-light.svg"
        alt="JobFlow"
        width={225}
        height={63}
        priority
        className="dark:hidden self-center pt-4"
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
      {isLoggedIn && (
      <div className="mt-auto mx-6 pt-5 border-t border-edge flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-contrast/70">
          Hello, <span className="font-semibold text-accent-cyan">{nickname ?? "User"} !</span>
        </p>
        <form action={signOut}>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="shrink-0 text-contrast/70 cursor-pointer hover:bg-glass/10 hover:text-accent-cyan"
          >
            <LogOut aria-hidden="true" />
            Log out
          </Button>
        </form>
      </div>
          )}
    </aside>
  );
}