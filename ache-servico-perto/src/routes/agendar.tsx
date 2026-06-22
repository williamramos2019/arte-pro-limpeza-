import { Link } from "wouter";
import { Header } from "@/components/Header";
import { BookingForm } from "@/components/BookingForm";
import { providers } from "@/lib/data";

type BookingPageProps = {
  id: string;
};

export function BookingPage({ id }: BookingPageProps) {
  const provider = providers.find((item) => item.id === id);

  if (!provider) {
    return (
      <>
        <Header />
        <main className="px-5 py-10">
          <h1 className="text-2xl font-extrabold">Agenda não encontrada</h1>
          <Link href="/buscar" className="mt-5 inline-flex rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground">
            Buscar prestadores
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="px-5 py-6">
        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          Próximo horário: {provider.nextSlot}
        </span>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Agendar com {provider.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Preencha as informações para enviar a solicitação já formatada ao prestador.
        </p>
        <div className="mt-6">
          <BookingForm provider={provider} />
        </div>
      </main>
    </>
  );
}
