
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  subcategory?: string;
  image: string;
  images?: string[];
  sizes?: string[];
  inStock: boolean;
  details?: string[];
  care?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  slug?: string;
  price: number;
  regularPrice?: number;
  salePrice?: number;
  description: string;
  shortDescription?: string;
  category: string;
  categoryId?: string;
  subcategory?: string;
  sku?: string;
  image: string;
  images?: string[];
  sizes?: string[];
  tags?: string[];
  inStock: boolean;
  stockQuantity?: number;
  manageStock?: boolean;
  weight?: number;
  dimensions?: any;
  isActive?: boolean;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  details?: string[];
  care?: string[];
}
