import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import type { Service } from "@/lib/data";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Link
      href={`/buscar?servico=${service.id}`}
      className="group flex items-center gap-3 rounded-3xl border border-border bg-card p-4 shadow-card transition-transform active:scale-[0.99]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-card-foreground">{service.title}</span>
        <span className="mt-1 line-clamp-2 block text-xs text-muted-foreground">
          {service.description}
        </span>
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
