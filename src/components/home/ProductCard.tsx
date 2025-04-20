
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ProductReviews } from "@/components/reviews/product-reviews";
import React from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    category: string;
    subcategory?: string;
  };
  onClick?: () => void;
  onAddToCart?: () => void;
  formatPrice?: (price: number) => string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  onAddToCart,
  formatPrice,
}) => {
  return (
    <div
      className="group relative animate-fade-in cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="mt-4 space-y-1">
        <div className="flex justify-between">
          <h3 className="text-sm text-kapraye-burgundy">
            {product.subcategory
              ? <span>{product.subcategory}</span>
              : <span>{product.category}</span>
            }
          </h3>
        </div>
        <h3 className="font-playfair text-lg font-medium text-foreground">
          {product.name}
        </h3>
        <p className="text-base font-medium text-kapraye-pink">
          {formatPrice ? formatPrice(product.price) : `$${product.price.toFixed(2)}`}
        </p>
      </div>
      {/* Dialogs Overlay (hidden until hover) */}
      <div className="absolute inset-0 flex items-center justify-center bg-kapraye-burgundy/0 group-hover:bg-kapraye-burgundy/10 transition-colors duration-300 opacity-0 group-hover:opacity-100">
        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm">
                Reviews
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogTitle>Product Reviews</DialogTitle>
              <DialogDescription>See what others are saying about this product</DialogDescription>
              <ProductReviews productId={product.id} />
            </DialogContent>
          </Dialog>
          <Button
            variant="secondary"
            size="sm"
            onClick={onAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
