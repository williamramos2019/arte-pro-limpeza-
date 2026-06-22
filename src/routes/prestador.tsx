import { Link } from "wouter";
import { CalendarClock, MapPin, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { providers, services } from "@/lib/data";

type ProviderPageProps = {
  id: string;
};

export function ProviderPage({ id }: ProviderPageProps) {
  const provider = providers.find((item) => item.id === id);

  if (!provider) {
    return (
      <>
        <Header />
        <main className="px-5 py-10">
          <h1 className="text-2xl font-extrabold">Prestador não encontrado</h1>
          <Link href="/buscar" className="mt-5 inline-flex rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground">
            Voltar para busca
          </Link>
        </main>
      </>
    );
  }

  const service = services.find((item) => item.id === provider.serviceId);

  return (
    <>
      <Header />
      <main className="px-5 py-6">
        <section className="rounded-3xl border border-border bg-card p-5 shadow-card">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {service?.category ?? "Serviço"}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">{provider.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{provider.specialty}</p>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-muted-foreground">
            <span className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-accent text-accent" />
              Avaliação {provider.rating}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Atende em {provider.city}
            </span>
            <span className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              Próximo horário: {provider.nextSlot}
            </span>
          </div>
          <Link
            href={`/agendar/${provider.id}`}
            className="mt-6 inline-flex w-full justify-center rounded-2xl bg-primary px-5 py-4 text-sm font-extrabold text-primary-foreground"
          >
            Agendar atendimento
          </Link>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-card">
          <h2 className="text-lg font-extrabold">Sobre o serviço</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {service?.description ??
              "Profissional disponível para atendimento próximo de você."}
          </p>
        </section>
      </main>
    </>
  );
}
