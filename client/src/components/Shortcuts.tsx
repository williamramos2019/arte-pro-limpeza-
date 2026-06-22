import { shortcuts, whatsappLink } from "@/data";

export default function Shortcuts() {
  return (
    <section className="px-5 pt-6">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
        Atalhos
      </h2>
      <div className="grid grid-cols-4 gap-3">
        {shortcuts.map(({ id, label, icon: Icon, message }) => (
          <a
            key={id}
            href={whatsappLink(message)}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card py-3 text-center shadow-sm transition-transform active:scale-95"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-semibold text-foreground">
              {label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
