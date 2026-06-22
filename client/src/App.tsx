import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Shortcuts from "@/components/Shortcuts";
import Services from "@/components/Services";
import ResolverForm from "@/components/ResolverForm";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";
import BottomNav from "@/components/BottomNav";

const SECTION_IDS = ["inicio", "servicos", "resolver", "contato"];

export default function App() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("inicio");

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
      <Header />
      <main>
        <Hero search={search} onSearch={setSearch} />
        <Shortcuts />
        <Services search={search} />
        <ResolverForm />
        <HowItWorks />
        <Contact />
      </main>
      <BottomNav active={active} />
    </div>
  );
}
