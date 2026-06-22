import { Search } from "lucide-react";

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBox({
  value,
  onChange,
  placeholder = "Buscar serviço ou profissional",
}: SearchBoxProps) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-card">
      <Search className="h-5 w-5 text-muted-foreground" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
      />
    </label>
  );
}
