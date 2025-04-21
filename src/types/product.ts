
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
}
