
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
import { ProductFormData } from '../types/product';

// Get environment variables with fallbacks to prevent crashes
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a conditional client to prevent runtime errors
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

// NOTE: These functions are temporarily disabled until the products table is created in Phase 2
// They will be re-enabled once we create the proper database schema

export async function fetchProducts() {
  console.warn('Products table not yet created - will be available in Phase 2');
  return [];
}

export async function fetchProductById(id: string) {
  console.warn('Products table not yet created - will be available in Phase 2');
  return null;
}

export async function createProduct(product: ProductFormData) {
  console.warn('Products table not yet created - will be available in Phase 2');
  return null;
}

export async function updateProduct(id: string, product: ProductFormData) {
  console.warn('Products table not yet created - will be available in Phase 2');
  return null;
}

export async function deleteProduct(id: string) {
  console.warn('Products table not yet created - will be available in Phase 2');
  return false;
}

export async function uploadProductImage(file: File): Promise<string | null> {
  console.warn('Product images storage not yet created - will be available in Phase 2');
  return null;
}
