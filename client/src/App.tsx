import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Shortcuts from "@/components/Shortcuts";
import Services from "@/components/Services";
import ResolverForm from "@/components/ResolverForm";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import BottomNav from "@/components/BottomNav";
import OrderBar from "@/components/OrderBar";
import BackToTop from "@/components/BackToTop";
import { services, type Service } from "@/data";
import { useTheme } from "@/hooks/useTheme";

const SECTION_IDS = ["inicio", "servicos", "resolver", "contato"];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("inicio");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleService = useCallback((service: Service) => {
    setSelectedIds((prev) =>
      prev.includes(service.id)
        ? prev.filter((id) => id !== service.id)
        : [...prev, service.id],
    );
  }, []);

  const removeService = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  }, []);

  const clearOrder = useCallback(() => setSelectedIds([]), []);

  const selectedServices = useMemo(
    () => services.filter((s) => selectedIds.includes(s.id)),
    [selectedIds],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto min-h-screen max-w-[440px] bg-background pb-24 shadow-2xl shadow-black/5">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero search={search} onSearch={setSearch} />
        <Shortcuts />
        <Services
          search={search}
          selectedIds={selectedIds}
          onToggle={toggleService}
        />
        <ResolverForm />
        <HowItWorks />
        <Faq />
        <Contact />
      </main>
      <OrderBar
        selected={selectedServices}
        onRemove={removeService}
        onClear={clearOrder}
      />
      <BackToTop raised={selectedServices.length > 0} />
      <BottomNav active={active} />
    </div>
  );
}
