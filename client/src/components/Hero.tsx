import { Wand2, MessageCircle, Hand, Zap, ShieldCheck, Smile, Search } from "lucide-react";
import { whatsappLink } from "@/data";

const badges = [
  { icon: Zap, label: "Rápido" },
  { icon: ShieldCheck, label: "Seguro" },
  { icon: Smile, label: "Fácil" },
];

interface HeroProps {
  onSearch: (value: string) => void;
  search: string;
}

export default function Hero({ onSearch, search }: HeroProps) {
  return (
    <section id="inicio" className="px-4 pt-4">
      <div className="bg-hero relative overflow-hidden rounded-3xl px-5 pb-7 pt-5 text-white shadow-xl shadow-primary/20">
        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-accent/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-primary-glow/30 blur-3xl" />

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-glow ring-1 ring-white/15">
            <Hand className="h-3.5 w-3.5" />
            Seu tempo vale mais
          </span>

          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight">
            Resolva tudo{" "}
            <span className="text-accent-glow">pelo celular.</span>
          </h1>

          <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-white/75">
            Contas, currículos, documentos, artes e serviços digitais — sem sair
            de casa.
          </p>

          <div className="mt-5 flex items-center gap-2.5">
            <a
              href={whatsappLink(
                "Olá! Quero que vocês resolvam um serviço pra mim.",
              )}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-accent px-5 py-3.5 font-display text-sm font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-transform active:scale-[0.98]"
            >
              <Wand2 className="h-4 w-4" />
              Resolver pra mim
            </a>
            <a
              href={whatsappLink("Olá! Tenho uma dúvida.")}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir conversa"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-transform active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2.5">
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 rounded-2xl bg-white/5 py-3 text-xs font-medium ring-1 ring-white/10"
              >
                <Icon className="h-4 w-4 text-accent-glow" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-5 px-2">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg shadow-primary/5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            type="text"
            placeholder="Buscar serviço (ex: currículo, conta...)"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
    </section>
  );
}
