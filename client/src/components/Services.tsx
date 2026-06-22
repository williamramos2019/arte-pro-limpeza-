import { ChevronRight } from "lucide-react";
import { services, whatsappLink } from "@/data";

interface ServicesProps {
  search: string;
}

export default function Services({ search }: ServicesProps) {
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
        {filtered.map(({ id, title, description, icon: Icon, gradient, iconColor, tags }) => (
          <a
            key={id}
            href={whatsappLink(`Olá! Tenho interesse em: ${title}.`)}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all active:scale-[0.99] hover:border-primary/30 hover:shadow-md"
          >
            <span
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${gradient} ${iconColor}`}
            >
              <Icon className="h-6 w-6" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate font-display text-sm font-bold text-foreground">
                  {title}
                </h3>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
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
            </div>
          </a>
        ))}

        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
            Nenhum serviço encontrado. Fale com a gente que a gente resolve!
          </p>
        )}
      </div>
    </section>
  );
}
