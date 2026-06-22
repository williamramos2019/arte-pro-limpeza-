import { useState } from "react";
import { Wand2, Sparkles, Rocket } from "lucide-react";
import { whatsappLink } from "@/data";

const suggestions = [
  "2ª via da conta",
  "Currículo",
  "Imprimir",
  "Instagram da loja",
];

export default function ResolverForm() {
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const greeting = name.trim() ? `Olá, meu nome é ${name.trim()}. ` : "Olá! ";
    const body = request.trim()
      ? request.trim()
      : "Não sei bem por onde começar, podem me ajudar?";
    window.open(whatsappLink(`${greeting}${body}`), "_blank");
  }

  return (
    <section id="resolver" className="px-5 pt-9">
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Wand2 className="h-6 w-6" />
        </span>

        <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-secondary">
          <Sparkles className="h-3.5 w-3.5" />
          Botão mágico
        </span>

        <h2 className="mt-1 font-display text-xl font-bold text-foreground">
          Resolver para mim
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Não sabe por onde começar? Conte o que precisa que a gente cuida.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Seu nome"
            className="rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
          <input
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            type="text"
            placeholder="Ex: 'Preciso da 2ª via da conta de luz'"
            className="rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
          />

          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRequest(s)}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors active:scale-95 hover:border-primary/40 hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="mt-1 flex items-center justify-center gap-2 rounded-full bg-gradient-accent px-5 py-3.5 font-display text-sm font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-transform active:scale-[0.98]"
          >
            <Rocket className="h-4 w-4" />
            Enviar pelo WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
