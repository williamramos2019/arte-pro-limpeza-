import {
  CalendarDays,
  Car,
  Hammer,
  Home,
  Paintbrush,
  Scissors,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
};

export type Provider = {
  id: string;
  name: string;
  serviceId: string;
  specialty: string;
  city: string;
  rating: number;
  nextSlot: string;
};

export const services: Service[] = [
  {
    id: "limpeza",
    title: "Limpeza residencial",
    description: "Diaristas e faxinas completas para casas e apartamentos.",
    category: "Casa",
    icon: Sparkles,
  },
  {
    id: "reparos",
    title: "Reparos gerais",
    description: "Manutenção, montagem e pequenos consertos no mesmo lugar.",
    category: "Manutenção",
    icon: Hammer,
  },
  {
    id: "beleza",
    title: "Beleza e estética",
    description: "Cabeleireiros, manicure, maquiagem e cuidados pessoais.",
    category: "Bem-estar",
    icon: Scissors,
  },
  {
    id: "automotivo",
    title: "Serviços automotivos",
    description: "Lavagem, mecânica rápida e assistência para seu veículo.",
    category: "Auto",
    icon: Car,
  },
  {
    id: "pintura",
    title: "Pintura",
    description: "Pintores para ambientes internos, fachadas e acabamentos.",
    category: "Reforma",
    icon: Paintbrush,
  },
  {
    id: "encanador",
    title: "Encanador",
    description: "Instalações hidráulicas, vazamentos e desentupimentos.",
    category: "Casa",
    icon: Wrench,
  },
];

export const providers: Provider[] = [
  {
    id: "ana-limpeza",
    name: "Ana Serviços",
    serviceId: "limpeza",
    specialty: "Limpeza residencial",
    city: "Centro",
    rating: 4.9,
    nextSlot: "Hoje, 15:30",
  },
  {
    id: "marcos-reparos",
    name: "Marcos Reparos",
    serviceId: "reparos",
    specialty: "Reparos gerais",
    city: "Jardim das Flores",
    rating: 4.8,
    nextSlot: "Amanhã, 09:00",
  },
  {
    id: "studio-bella",
    name: "Studio Bella",
    serviceId: "beleza",
    specialty: "Beleza e estética",
    city: "Vila Nova",
    rating: 4.7,
    nextSlot: "Hoje, 18:00",
  },
  {
    id: "auto-plus",
    name: "Auto Plus",
    serviceId: "automotivo",
    specialty: "Serviços automotivos",
    city: "Distrito Industrial",
    rating: 4.6,
    nextSlot: "Sexta, 10:00",
  },
];

export const stats = [
  { label: "Prestadores", value: "120+" },
  { label: "Categorias", value: "30+" },
  { label: "Agendamentos", value: "24h" },
];

export const steps = [
  {
    title: "Busque perto de você",
    description: "Encontre profissionais por serviço, bairro ou disponibilidade.",
    icon: Home,
  },
  {
    title: "Escolha um horário",
    description: "Veja a próxima agenda livre antes de entrar em contato.",
    icon: CalendarDays,
  },
  {
    title: "Confirme o serviço",
    description: "Finalize pelo WhatsApp com as informações já preenchidas.",
    icon: Sparkles,
  },
];
