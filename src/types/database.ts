
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          price: number
          description: string
          category: string
          subcategory?: string | null
          image: string
          images?: string[] | null
          sizes?: string[] | null
          inStock: boolean
          details?: string[] | null
          care?: string[] | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name: string
          price: number
          description: string
          category: string
          subcategory?: string | null
          image: string
          images?: string[] | null
          sizes?: string[] | null
          inStock: boolean
          details?: string[] | null
          care?: string[] | null
          createdAt: string
          updatedAt: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          description?: string
          category?: string
          subcategory?: string | null
          image?: string
          images?: string[] | null
          sizes?: string[] | null
          inStock?: boolean
          details?: string[] | null
          care?: string[] | null
          createdAt?: string
          updatedAt?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
