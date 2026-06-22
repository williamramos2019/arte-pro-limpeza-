import { Home, LayoutGrid, Wand2, User } from "lucide-react";

const items = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "servicos", label: "Serviços", icon: LayoutGrid },
  { id: "resolver", label: "Resolver", icon: Wand2 },
  { id: "contato", label: "Contato", icon: User },
];

interface BottomNavProps {
  active: string;
}

export default function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[440px] border-t border-border bg-card/90 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
      <ul className="grid grid-cols-4">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                  isActive ? "text-accent" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
