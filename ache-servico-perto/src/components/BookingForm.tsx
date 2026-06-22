import { useState } from "react";
import { Send } from "lucide-react";
import type { Provider } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type BookingFormProps = {
  provider: Provider;
};

export function BookingForm({ provider }: BookingFormProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const message = [
    `Olá! Quero agendar com ${provider.name}.`,
    name ? `Nome: ${name}` : "",
    date ? `Data/horário desejado: ${date}` : "",
    notes ? `Observações: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <form
      className="space-y-3 rounded-3xl border border-border bg-card p-5 shadow-card"
      onSubmit={(event) => {
        event.preventDefault();
        window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
      }}
    >
      <label className="grid gap-1.5 text-sm font-semibold">
        Seu nome
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-2xl border border-input bg-background px-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          placeholder="Digite seu nome"
        />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold">
        Melhor data e horário
        <input
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="rounded-2xl border border-input bg-background px-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          placeholder="Ex: amanhã às 14h"
        />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold">
        Observações
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="min-h-28 resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          placeholder="Conte detalhes do serviço"
        />
      </label>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98]"
      >
        <Send className="h-4 w-4" />
        Confirmar pelo WhatsApp
      </button>
    </form>
  );
}
