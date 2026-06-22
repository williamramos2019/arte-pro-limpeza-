import { Link } from "wouter";
import { Header } from "@/components/Header";

export function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="px-5 py-12 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">404</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Página não encontrada</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          O caminho acessado não existe nesta versão local do AgendaAqui.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
        >
          Voltar ao início
        </Link>
      </main>
    </>
  );
}
