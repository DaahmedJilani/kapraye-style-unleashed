import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchShopifyProducts } from '@/lib/shopify/api';
import type { ShopifyProduct } from '@/lib/shopify/types';
import { ShopifyProductCard } from './ShopifyProductCard';

interface ShopifyProductGridProps {
  query?: string;
  limit?: number;
}

export function ShopifyProductGrid({ query, limit = 50 }: ShopifyProductGridProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchShopifyProducts(limit, query);
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [query, limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg mb-4">No products found</p>
        <p className="text-sm text-muted-foreground">
          Tell me what products you'd like to add to your store!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ShopifyProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
}
