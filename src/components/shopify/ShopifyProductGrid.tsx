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
      <div className="relative py-20 px-6">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-kapraye-burgundy/5 via-kapraye-pink/10 to-kapraye-mauve/5 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(199,146,234,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,175,55,0.1),transparent_50%)]" />
        </div>
        
        <div className="relative text-center max-w-lg mx-auto">
          {/* Decorative elements */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-kapraye-burgundy to-kapraye-pink flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-kapraye-gold rounded-full animate-pulse" />
            </div>
          </div>
          
          {/* Main heading */}
          <h3 className="text-3xl md:text-4xl font-playfair font-bold text-kapraye-burgundy mb-3">
            Coming Soon
          </h3>
          
          {/* Elegant tagline */}
          <p className="text-xl font-allure text-kapraye-pink mb-4">
            Something Beautiful is on its way
          </p>
          
          {/* Description */}
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We're curating an exclusive collection just for you. 
            Our artisans are putting the finishing touches on pieces that blend 
            timeless elegance with contemporary style.
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-kapraye-mauve" />
            <div className="w-2 h-2 rounded-full bg-kapraye-gold" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-kapraye-mauve" />
          </div>
          
          {/* CTA */}
          <p className="text-sm text-kapraye-burgundy/70 italic">
            Stay tuned for our grand reveal ✨
          </p>
        </div>
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
