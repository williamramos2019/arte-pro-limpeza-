import { Link } from "wouter";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { ServiceCard } from "@/components/ServiceCard";
import { ProviderCard } from "@/components/ProviderCard";
import { providers, services, stats, steps } from "@/lib/data";

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-hero px-5 pb-8 pt-6 text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
            <MapPin className="h-4 w-4" />
            Ache serviço perto
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight">
            AgendaAqui
          </h1>
          <p className="mt-3 text-base font-medium text-primary-foreground/90">
            Encontre prestadores próximos, veja horários disponíveis e confirme o atendimento.
          </p>
          <Link
            href="/buscar"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-card px-5 py-4 text-sm font-extrabold text-primary shadow-card"
          >
            <Search className="h-5 w-5" />
            Buscar agora
          </Link>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/15 p-3 text-center backdrop-blur">
                <strong className="block text-lg font-extrabold">{stat.value}</strong>
                <span className="text-[11px] font-semibold text-primary-foreground/85">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-extrabold">Categorias</h2>
            <Link href="/buscar" className="flex items-center gap-1 text-sm font-bold text-primary">
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        <section className="px-5 pb-6">
          <h2 className="mb-4 text-lg font-extrabold">Disponíveis hoje</h2>
          <div className="grid gap-3">
            {providers.slice(0, 2).map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </section>

        <section className="px-5 pb-8">
          <h2 className="mb-4 text-lg font-extrabold">Como funciona</h2>
          <div className="grid gap-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article key={step.title} className="rounded-3xl border border-border bg-card p-4 shadow-card">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 text-sm font-bold">{step.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
