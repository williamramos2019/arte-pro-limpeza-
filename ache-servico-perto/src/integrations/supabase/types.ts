export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      services: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          category: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          category?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          category?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      providers: {
        Row: {
          id: string;
          name: string;
          service_id: string | null;
          city: string | null;
          rating: number | null;
          next_slot: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          service_id?: string | null;
          city?: string | null;
          rating?: number | null;
          next_slot?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          service_id?: string | null;
          city?: string | null;
          rating?: number | null;
          next_slot?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "providers_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
