import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import type { ShopifyProduct } from '@/lib/shopify/types';

interface RelatedProductsProps {
  products: ShopifyProduct['node'][];
  currentProductId: string;
}

export function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  // Filter out current product
  const filteredProducts = products.filter(p => p.id !== currentProductId).slice(0, 4);

  if (filteredProducts.length === 0) return null;

  return (
    <section className="mt-16 md:mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-playfair font-medium text-foreground mb-8">
          You Might Also Like
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={`/product/${product.handle}`}
                className="group block"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-3 relative">
                  {product.images?.edges?.[0]?.node?.url ? (
                    <img
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-primary/90 px-4 py-2 rounded-lg">
                      View Product
                    </span>
                  </div>
                </div>
                
                <h3 className="font-medium text-foreground text-sm md:text-base line-clamp-2 group-hover:text-secondary transition-colors">
                  {product.title}
                </h3>
                
                {product.priceRange?.minVariantPrice && (
                  <p className="text-secondary font-semibold mt-1">
                    {product.priceRange.minVariantPrice.currencyCode}{' '}
                    {parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString()}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
