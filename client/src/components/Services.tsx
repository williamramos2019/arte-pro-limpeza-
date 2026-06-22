import { Check, Plus } from "lucide-react";
import { services, whatsappLink, type Service } from "@/data";

interface ServicesProps {
  search: string;
  selectedIds: string[];
  onToggle: (service: Service) => void;
}

export default function Services({ search, selectedIds, onToggle }: ServicesProps) {
  const query = search.trim().toLowerCase();
  const filtered = query
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.tags.some((t) => t.toLowerCase().includes(query)),
      )
    : services;

  return (
    <section id="servicos" className="px-5 pt-7">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">
          Serviços
        </h2>
        <span className="text-xs font-medium text-muted-foreground">
          {filtered.length} de {services.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((service) => {
          const { id, title, description, icon: Icon, gradient, iconColor, tags } = service;
          const selected = selectedIds.includes(id);
          return (
            <div
              key={id}
              className={`flex items-start gap-4 rounded-2xl border bg-card p-4 shadow-sm transition-all ${
                selected ? "border-accent/60 ring-1 ring-accent/30" : "border-border"
              }`}
            >
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${gradient} ${iconColor}`}
              >
                <Icon className="h-6 w-6" />
              </span>

              <a
                href={whatsappLink(`Olá! Tenho interesse em: ${title}.`)}
                target="_blank"
                rel="noreferrer"
                className="group min-w-0 flex-1"
              >
                <h3 className="truncate font-display text-sm font-bold text-foreground">
                  {title}
                </h3>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>

              <button
                type="button"
                onClick={() => onToggle(service)}
                aria-pressed={selected}
                aria-label={
                  selected
                    ? `Remover ${title} do pedido`
                    : `Adicionar ${title} ao pedido`
                }
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform active:scale-90 ${
                  selected
                    ? "bg-gradient-accent text-accent-foreground shadow-md shadow-accent/30"
                    : "bg-muted text-muted-foreground hover:text-primary"
                }`}
              >
                {selected ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </button>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
            Nenhum serviço encontrado. Fale com a gente que a gente resolve!
          </p>
        )}
      </div>
    </section>
  );
}
