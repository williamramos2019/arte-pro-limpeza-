import type { LucideIcon } from "lucide-react";
import {
  FileText,
  GraduationCap,
  Instagram,
  Smartphone,
  Palette,
  Truck,
  Printer,
  Headset,
  Receipt,
} from "lucide-react";

export const PHONE_DISPLAY = "(31) 98025-2882";
export const PHONE_E164 = "5531980252882";
export const EMAIL = "contato@wrsolucoesdigitais.com.br";

export function whatsappLink(message: string): string {
  return `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(message)}`;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind gradient color stops for the icon badge, e.g. "from-sky-500/20 to-sky-500/0". */
  gradient: string;
  /** Tailwind text color for the icon, e.g. "text-sky-600". */
  iconColor: string;
  tags: string[];
}

export const services: Service[] = [
  {
    id: "documentos",
    title: "Documentos e Contas",
    description: "2ª via, boletos, envio e digitalização.",
    icon: FileText,
    gradient: "from-sky-500/25 to-sky-500/5",
    iconColor: "text-sky-600",
    tags: ["Segunda via de contas", "Segunda via de boletos"],
  },
  {
    id: "curriculos",
    title: "Currículos & Vagas",
    description: "Currículo profissional e cadastro em vagas.",
    icon: GraduationCap,
    gradient: "from-emerald-500/25 to-emerald-500/5",
    iconColor: "text-emerald-600",
    tags: ["Criar currículo", "Atualizar currículo"],
  },
  {
    id: "redes",
    title: "Redes Sociais",
    description: "Criação e configuração de perfis.",
    icon: Instagram,
    gradient: "from-pink-500/25 to-pink-500/5",
    iconColor: "text-pink-600",
    tags: ["Instagram", "Facebook"],
  },
  {
    id: "digitais",
    title: "Serviços Digitais",
    description: "Apps, contas online e acessos.",
    icon: Smartphone,
    gradient: "from-violet-500/25 to-violet-500/5",
    iconColor: "text-violet-600",
    tags: ["Cadastro em apps", "Criação de contas"],
  },
  {
    id: "artes",
    title: "Artes Gráficas",
    description: "Cartões, panfletos, banners e convites.",
    icon: Palette,
    gradient: "from-amber-500/25 to-amber-500/5",
    iconColor: "text-amber-600",
    tags: ["Cartões de visita", "Panfletos e banners"],
  },
  {
    id: "coleta",
    title: "Coleta & Entrega",
    description: "Buscamos e entregamos pra você.",
    icon: Truck,
    gradient: "from-orange-500/25 to-orange-500/5",
    iconColor: "text-orange-600",
    tags: ["Coleta de documentos", "Entrega de documentos"],
  },
  {
    id: "impressoes",
    title: "Impressões",
    description: "Documentos, fotos e apostilas.",
    icon: Printer,
    gradient: "from-teal-500/25 to-teal-500/5",
    iconColor: "text-teal-600",
    tags: ["Documentos PDF", "Fotos"],
  },
  {
    id: "assistente",
    title: "WR Assistente",
    description: "Não sabe o que precisa? Conte pra gente.",
    icon: Headset,
    gradient: "from-green-500/25 to-green-500/5",
    iconColor: "text-green-600",
    tags: ["Atendimento humano", "Resposta rápida"],
  },
];

export interface Shortcut {
  id: string;
  label: string;
  icon: LucideIcon;
  message: string;
}

export const shortcuts: Shortcut[] = [
  {
    id: "contas",
    label: "Contas",
    icon: Receipt,
    message: "Olá! Preciso da 2ª via de uma conta.",
  },
  {
    id: "curriculo",
    label: "Currículo",
    icon: GraduationCap,
    message: "Olá! Quero fazer um currículo.",
  },
  {
    id: "imprimir",
    label: "Imprimir",
    icon: Printer,
    message: "Olá! Preciso imprimir um documento.",
  },
  {
    id: "artes",
    label: "Artes",
    icon: Palette,
    message: "Olá! Quero criar uma arte gráfica.",
  },
];
