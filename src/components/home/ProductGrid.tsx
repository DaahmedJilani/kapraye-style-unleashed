
import React from "react";
import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  subcategory?: string;
}

interface ProductGridProps {
  products: Product[];
  onProductClick: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  formatPrice?: (price: number) => string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductClick,
  onAddToCart,
  formatPrice,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product, index) => (
      <div key={product.id} style={{ animationDelay: `${index * 100}ms` }}>
        <ProductCard
          product={product}
          onClick={() => onProductClick(product.id)}
          onAddToCart={(e?: React.MouseEvent) => {
            if (e) e.stopPropagation();
            onAddToCart(product);
          }}
          formatPrice={formatPrice}
        />
      </div>
    ))}
  </div>
);
