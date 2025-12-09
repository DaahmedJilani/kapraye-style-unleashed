import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Plus } from 'lucide-react';
import { toast } from 'sonner';
import type { ShopifyProduct, CartItem } from '@/lib/shopify/types';
import { useCartStore } from '@/stores/cartStore';

interface ShopifyProductCardProps {
  product: ShopifyProduct;
}

export function ShopifyProductCard({ product }: ShopifyProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const image = node.images?.edges?.[0]?.node;
  const price = node.priceRange?.minVariantPrice;
  const firstVariant = node.variants?.edges?.[0]?.node;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) {
      toast.error('Product not available');
      return;
    }

    const cartItem: CartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success(`${node.title} added to cart`, {
      position: 'top-center'
    });
  };

  return (
    <Link to={`/shop/${node.handle}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 bg-card">
        <div className="aspect-square overflow-hidden relative">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          <Button
            onClick={handleAddToCart}
            size="icon"
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {node.title}
          </h3>
          {price && (
            <p className="text-lg font-bold text-primary">
              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
