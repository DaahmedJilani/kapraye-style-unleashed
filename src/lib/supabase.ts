
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

export async function fetchProducts() {
  if (!supabase) {
    console.error('Supabase client is not initialized');
    return [];
  }
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('createdAt', { ascending: false });
    
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data || [];
}

export async function fetchProductById(id: string) {
  if (!supabase) {
    console.error('Supabase client is not initialized');
    return null;
  }
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  
  return data;
}

export async function createProduct(product: ProductFormData) {
  if (!supabase) {
    console.error('Supabase client is not initialized');
    return null;
  }
  
  const { data, error } = await supabase
    .from('products')
    .insert([{ 
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating product:', error);
    return null;
  }
  
  return data;
}

export async function updateProduct(id: string, product: ProductFormData) {
  if (!supabase) {
    console.error('Supabase client is not initialized');
    return null;
  }
  
  const { data, error } = await supabase
    .from('products')
    .update({ 
      ...product,
      updatedAt: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating product:', error);
    return null;
  }
  
  return data;
}

export async function deleteProduct(id: string) {
  if (!supabase) {
    console.error('Supabase client is not initialized');
    return false;
  }
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }
  
  return true;
}

export async function uploadProductImage(file: File): Promise<string | null> {
  if (!supabase) {
    console.error('Supabase client is not initialized');
    return null;
  }
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `product-images/${fileName}`;

  const { error } = await supabase.storage
    .from('products')
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  const { data } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
