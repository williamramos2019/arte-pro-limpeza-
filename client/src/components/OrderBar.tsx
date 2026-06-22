import { useState } from "react";
import { ShoppingBag, X, Trash2, Send } from "lucide-react";
import { whatsappLink, type Service } from "@/data";

interface OrderBarProps {
  selected: Service[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function OrderBar({ selected, onRemove, onClear }: OrderBarProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  if (selected.length === 0) return null;

  function buildMessage() {
    const greeting = name.trim()
      ? `Olá, meu nome é ${name.trim()}.`
      : "Olá!";
    const list = selected.map((s) => `• ${s.title}`).join("\n");
    return `${greeting} Gostaria de solicitar os seguintes serviços:\n${list}\n\nPodem me ajudar?`;
  }

  function handleSend() {
    window.open(whatsappLink(buildMessage()), "_blank");
    setOpen(false);
    onClear();
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-[72px] z-40 mx-auto max-w-[440px] px-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="pointer-events-auto flex w-full items-center gap-3 rounded-2xl bg-gradient-accent px-4 py-3 text-accent-foreground shadow-xl shadow-accent/30 transition-transform active:scale-[0.99]"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-black/10">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-foreground text-[11px] font-bold text-background">
              {selected.length}
            </span>
          </span>
          <span className="flex-1 text-left font-display text-sm font-bold">
            Meu pedido
          </span>
          <span className="text-sm font-semibold">Ver pedido</span>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Meu pedido"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-[440px] rounded-t-3xl border border-border bg-card p-5 pb-8 shadow-2xl">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" />

            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-foreground">
                Meu pedido
                <span className="ml-2 text-sm font-medium text-muted-foreground">
                  {selected.length} {selected.length === 1 ? "serviço" : "serviços"}
                </span>
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground transition-transform active:scale-90"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="mb-4 flex max-h-56 flex-col gap-2 overflow-y-auto">
              {selected.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3"
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${s.gradient} ${s.iconColor}`}
                  >
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {s.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {s.description}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(s.id)}
                    aria-label={`Remover ${s.title}`}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Seu nome (opcional)"
              className="mb-3 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClear}
                className="flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors active:scale-95"
              >
                <Trash2 className="h-4 w-4" />
                Limpar
              </button>
              <button
                type="button"
                onClick={handleSend}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-accent px-5 py-3 font-display text-sm font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-transform active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                Enviar pelo WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
