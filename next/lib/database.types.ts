// Database types for Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          role: 'user' | 'agent' | 'admin';
          agent_id: string | null;
          image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: { id: string; email: string; name?: string | null; role?: 'user' | 'agent' | 'admin'; agent_id?: string | null; image?: string | null; created_at?: string; updated_at?: string };
        Update: { id?: string; email?: string; name?: string | null; role?: 'user' | 'agent' | 'admin'; agent_id?: string | null; image?: string | null; created_at?: string; updated_at?: string };
      };
      saved_properties: {
        Row: { id: string; user_id: string; property_id: string; created_at: string };
        Insert: { id?: string; user_id: string; property_id: string; created_at?: string };
        Update: { id?: string; user_id?: string; property_id?: string; created_at?: string };
      };
      properties: {
        Row: {
          id: string; title: string; price: number; location: string; country: string; city: string; type: string;
          bedrooms: number; bathrooms: number; sqft: number; year_built: number | null; description: string;
          images: string[]; features: string[]; agent_id: string; status: string; coordinates: Json;
          amenities: string[]; virtual_tour_url: string | null; is_boosted: boolean; apartments: number | null;
          down_payment: number | null; monthly_installment: number | null; payment_duration: number | null;
          created_at: string; updated_at: string;
        };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
      agents: {
        Row: {
          id: string; user_id: string | null; name: string; role: string; bio: string; company: string;
          location: string; website: string; experience: string; specialties: string[]; image: string;
          phone: string; email: string; socials: Json; rating: number; review_count: number;
          created_at: string; updated_at: string;
        };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
      messages: {
        Row: { id: string; sender_id: string; sender_name: string; receiver_id: string; content: string; timestamp: string; created_at: string };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
  };
}
