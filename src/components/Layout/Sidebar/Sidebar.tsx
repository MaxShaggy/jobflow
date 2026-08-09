import Image from "next/image";
import { LayoutDashboard, ChartColumnBig, Building2, ArchiveX, type LucideIcon } from "lucide-react";
import { SidebarNavItem } from './SidebarNavItem';

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

export function Sidebar() {
  return <aside className="bg-surface-1 rounded-2xl p-6 w-64 flex flex-col gap-10">
    <Image
      src="/images/logo.png"
      alt="JobFlow"
      width={200}
      height={62}
      priority
      className="self-center" />
    <ul className="text-text-2 flex flex-col gap-6">
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
    </ul >
  </aside>
}