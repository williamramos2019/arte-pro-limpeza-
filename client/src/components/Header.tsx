import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-surface/85 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-3">
        <a href="#inicio" className="flex items-center gap-2.5">
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-sm font-extrabold tracking-tight text-primary-foreground">
            WR
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-accent" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold text-foreground">
              WR Soluções
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Digitais
            </span>
          </span>
        </a>

        <a
          href={whatsappLink("Olá! Vim pelo site da WR Soluções Digitais.")}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar no WhatsApp"
          className="grid h-11 w-11 place-items-center rounded-full bg-gradient-accent text-accent-foreground shadow-lg shadow-accent/30 transition-transform active:scale-95"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
    </header>
  );
}
