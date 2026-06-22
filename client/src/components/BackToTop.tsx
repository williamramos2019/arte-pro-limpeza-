import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

interface BackToTopProps {
  raised?: boolean;
}

export default function BackToTop({ raised = false }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-40 mx-auto flex max-w-[440px] justify-end px-4"
      style={{ bottom: raised ? 132 : 80 }}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Voltar ao topo"
        className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-lg transition-transform active:scale-90"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
