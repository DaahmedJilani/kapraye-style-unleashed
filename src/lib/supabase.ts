
import { supabase } from '@/integrations/supabase/client';
import { ProductFormData } from '../types/product';

export async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductById(id: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function createProduct(product: ProductFormData) {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-'),
        description: product.description,
        short_description: product.shortDescription,
        price: product.price,
        regular_price: product.regularPrice,
        sale_price: product.salePrice,
        sku: product.sku,
        featured_image: product.image,
        images: product.images || [],
        category_id: product.categoryId,
        tags: product.tags || [],
        stock_status: product.inStock ? 'in_stock' : 'out_of_stock',
        stock_quantity: product.stockQuantity || 0,
        manage_stock: product.manageStock ?? true,
        weight: product.weight,
        dimensions: product.dimensions,
        is_active: product.isActive ?? true,
        is_featured: product.isFeatured ?? false,
        meta_title: product.metaTitle,
        meta_description: product.metaDescription,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}

export async function updateProduct(id: string, product: ProductFormData) {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: product.name,
        slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-'),
        description: product.description,
        short_description: product.shortDescription,
        price: product.price,
        regular_price: product.regularPrice,
        sale_price: product.salePrice,
        sku: product.sku,
        featured_image: product.image,
        images: product.images || [],
        category_id: product.categoryId,
        tags: product.tags || [],
        stock_status: product.inStock ? 'in_stock' : 'out_of_stock',
        stock_quantity: product.stockQuantity || 0,
        manage_stock: product.manageStock ?? true,
        weight: product.weight,
        dimensions: product.dimensions,
        is_active: product.isActive ?? true,
        is_featured: product.isFeatured ?? false,
        meta_title: product.metaTitle,
        meta_description: product.metaDescription,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
}

export async function uploadProductImage(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading product image:', error);
    return null;
  }
}
