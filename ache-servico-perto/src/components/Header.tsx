import { Link } from "wouter";
import { CalendarCheck, MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 px-5 py-4 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-card">
            <CalendarCheck className="h-6 w-6" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-extrabold tracking-tight">AgendaAqui</span>
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              serviços perto de você
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
}
