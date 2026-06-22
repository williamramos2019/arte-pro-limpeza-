const steps = [
  {
    n: "01",
    title: "Conte o que precisa",
    description: "Escreva ou escolha um serviço.",
  },
  {
    n: "02",
    title: "Nós resolvemos",
    description: "Atendimento ágil pelo WhatsApp.",
  },
  {
    n: "03",
    title: "Receba pronto",
    description: "No prazo combinado.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-5 pt-9">
      <h2 className="mb-4 font-display text-xl font-bold text-foreground">
        Como funciona
      </h2>
      <div className="flex flex-col gap-3">
        {steps.map(({ n, title, description }) => (
          <div
            key={n}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/15 font-display text-base font-extrabold text-accent">
              {n}
            </span>
            <div>
              <h3 className="font-display text-sm font-bold text-foreground">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
