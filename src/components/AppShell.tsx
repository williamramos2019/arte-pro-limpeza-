import { Link, useLocation } from "wouter";
import { CalendarCheck, Home, Search, UserRound } from "lucide-react";
import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/buscar", label: "Buscar", icon: Search },
  { href: "/agendar/ana-limpeza", label: "Agenda", icon: CalendarCheck },
  { href: "/prestador/ana-limpeza", label: "Perfil", icon: UserRound },
];

function isActiveRoute(location: string, href: string) {
  if (href === "/") {
    return location === "/";
  }

  const section = href.split("/")[1];
  return location === href || location.startsWith(`/${section}/`);
}

export function AppShell({ children }: AppShellProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto min-h-screen max-w-md bg-background pb-24 shadow-soft">
        {children}
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur">
        <ul className="mx-auto grid max-w-md grid-cols-4 gap-1 px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActiveRoute(location, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
