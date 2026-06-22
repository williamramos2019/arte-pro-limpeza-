import { Phone, Mail, MessageCircle } from "lucide-react";
import { PHONE_DISPLAY, PHONE_E164, EMAIL, whatsappLink } from "@/data";

export default function Contact() {
  return (
    <section id="contato" className="px-5 pt-9">
      <div className="bg-hero relative overflow-hidden rounded-3xl p-6 text-white shadow-xl shadow-primary/20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-xl font-bold">Fale com a WR</h2>
          <p className="mt-1 text-sm text-white/75">
            Resposta rápida, orçamento sem compromisso.
          </p>

          <div className="mt-4 flex flex-col gap-2.5">
            <a
              href={`tel:+${PHONE_E164}`}
              className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium ring-1 ring-white/10 transition-colors active:scale-[0.99]"
            >
              <Phone className="h-4 w-4 text-accent-glow" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium ring-1 ring-white/10 transition-colors active:scale-[0.99]"
            >
              <Mail className="h-4 w-4 text-accent-glow" />
              <span className="truncate">{EMAIL}</span>
            </a>
          </div>

          <a
            href={whatsappLink("Olá! Gostaria de um orçamento.")}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gradient-accent px-5 py-3.5 font-display text-sm font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-transform active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4" />
            Falar agora
          </a>
        </div>
      </div>

      <p className="py-6 text-center text-xs text-muted-foreground">
        © 2026 WR Soluções Digitais
      </p>
    </section>
  );
}
