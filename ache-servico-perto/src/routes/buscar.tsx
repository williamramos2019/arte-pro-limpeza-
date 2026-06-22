import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { ProviderCard } from "@/components/ProviderCard";
import { SearchBox } from "@/components/SearchBox";
import { ServiceCard } from "@/components/ServiceCard";
import { providers, services } from "@/lib/data";

function getInitialService() {
  return new URLSearchParams(window.location.search).get("servico") ?? "";
}

export function SearchPage() {
  const [query, setQuery] = useState(getInitialService);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredServices = useMemo(() => {
    if (!normalizedQuery) {
      return services;
    }

    return services.filter((service) =>
      [service.id, service.title, service.description, service.category]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const filteredProviders = useMemo(() => {
    if (!normalizedQuery) {
      return providers;
    }

    const matchingServiceIds = new Set(filteredServices.map((service) => service.id));

    return providers.filter((provider) =>
      matchingServiceIds.has(provider.serviceId) ||
      [provider.name, provider.specialty, provider.city].join(" ").toLowerCase().includes(normalizedQuery),
    );
  }, [filteredServices, normalizedQuery]);

  return (
    <>
      <Header />
      <main className="px-5 py-6">
        <h1 className="text-2xl font-extrabold tracking-tight">Buscar serviços</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Filtre categorias, bairros e profissionais disponíveis para agendamento.
        </p>
        <div className="mt-5">
          <SearchBox value={query} onChange={setQuery} />
        </div>

        <section className="mt-7">
          <h2 className="mb-4 text-lg font-extrabold">Categorias encontradas</h2>
          {filteredServices.length > 0 ? (
            <div className="grid gap-3">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <p className="rounded-3xl border border-border bg-card p-5 text-sm text-muted-foreground">
              Nenhuma categoria encontrada para essa busca.
            </p>
          )}
        </section>

        <section className="mt-7">
          <h2 className="mb-4 text-lg font-extrabold">Prestadores</h2>
          {filteredProviders.length > 0 ? (
            <div className="grid gap-3">
              {filteredProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          ) : (
            <p className="rounded-3xl border border-border bg-card p-5 text-sm text-muted-foreground">
              Nenhum prestador encontrado para essa busca.
            </p>
          )}
        </section>
      </main>
    </>
  );
}
