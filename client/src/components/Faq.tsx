import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Como funciona o atendimento?",
    a: "Você nos conta o que precisa pelo WhatsApp ou pelo botão mágico do site, e a gente cuida de todo o resto até a entrega.",
  },
  {
    q: "Quanto tempo leva para ficar pronto?",
    a: "Depende do serviço, mas a maioria é resolvida no mesmo dia. Sempre combinamos um prazo antes de começar.",
  },
  {
    q: "Vocês fazem coleta e entrega?",
    a: "Sim! Buscamos e entregamos documentos na sua casa em horário combinado, sem você precisar sair.",
  },
  {
    q: "Como faço o pagamento?",
    a: "Aceitamos Pix, cartão e dinheiro. O orçamento é informado antes, sem nenhum compromisso.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 pt-9">
      <h2 className="mb-4 font-display text-xl font-bold text-foreground">
        Perguntas frequentes
      </h2>
      <div className="flex flex-col gap-2.5">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <span className="font-display text-sm font-semibold text-foreground">
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
