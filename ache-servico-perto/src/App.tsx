import { Route, Switch } from "wouter";
import { AppShell } from "@/components/AppShell";
import { HomePage } from "@/routes";
import { SearchPage } from "@/routes/buscar";
import { BookingPage } from "@/routes/agendar";
import { ProviderPage } from "@/routes/prestador";
import { NotFoundPage } from "@/routes/not-found";

export default function App() {
  return (
    <AppShell>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/buscar" component={SearchPage} />
        <Route path="/prestador/:id">
          {(params) => <ProviderPage id={params.id} />}
        </Route>
        <Route path="/agendar/:id">{(params) => <BookingPage id={params.id} />}</Route>
        <Route component={NotFoundPage} />
      </Switch>
    </AppShell>
  );
}
