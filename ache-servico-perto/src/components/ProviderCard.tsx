import { Link } from "wouter";
import { CalendarClock, MapPin, Star } from "lucide-react";
import type { Provider } from "@/lib/data";

type ProviderCardProps = {
  provider: Provider;
};

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <article className="rounded-3xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-card-foreground">{provider.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{provider.specialty}</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
          <Star className="h-3.5 w-3.5 fill-current" />
          {provider.rating}
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-xs font-medium text-muted-foreground">
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {provider.city}
        </span>
        <span className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4" />
          Próximo horário: {provider.nextSlot}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link
          href={`/prestador/${provider.id}`}
          className="rounded-2xl border border-border px-4 py-3 text-center text-sm font-bold text-foreground"
        >
          Ver perfil
        </Link>
        <Link
          href={`/agendar/${provider.id}`}
          className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground"
        >
          Agendar
        </Link>
      </div>
    </article>
  );
}
