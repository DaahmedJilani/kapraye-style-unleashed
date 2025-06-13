
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WCProduct } from '@/lib/woocommerce';
import { useWooCommerceCart } from '@/contexts/WooCommerceCartContext';
import { useAppSettings } from '@/contexts/AppSettingsContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: WCProduct;
  onProductClick?: (product: WCProduct) => void;
  className?: string;
}

export function ProductCard({ product, onProductClick, className = '' }: ProductCardProps) {
  const { addItem } = useWooCommerceCart();
  const { formatPrice } = useAppSettings();
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addItem(product, 1);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add product to cart. Please try again.",
      });
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement wishlist functionality
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const mainImage = product.images?.[0]?.src || '/placeholder.svg';
  const isOnSale = product.on_sale;
  const isFeatured = product.featured;
  const stockStatus = product.stock_status;

  return (
    <motion.div
      className={`group relative bg-white rounded-lg overflow-hidden hover-lift ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onProductClick?.(product)}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOnSale && (
            <Badge variant="destructive" className="text-xs">
              Sale
            </Badge>
          )}
          {isFeatured && (
            <Badge variant="secondary" className="text-xs">
              Featured
            </Badge>
          )}
          {stockStatus === 'outofstock' && (
            <Badge variant="outline" className="text-xs bg-white">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="icon"
            className="w-8 h-8 bg-white/90 hover:bg-white"
            onClick={handleWishlist}
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handleAddToCart}
            disabled={stockStatus === 'outofstock'}
            className="w-full bg-white text-black hover:bg-white/90"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {product.categories?.slice(0, 2).map((category) => (
            <span
              key={category.id}
              className="text-xs text-gray-500 uppercase tracking-wide"
            >
              {category.name}
            </span>
          ))}
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-kapraye-burgundy transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(parseFloat(product.average_rating))
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.rating_count})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-kapraye-burgundy">
            {formatPrice(parseFloat(product.price))}
          </span>
          {isOnSale && product.regular_price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(parseFloat(product.regular_price))}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
