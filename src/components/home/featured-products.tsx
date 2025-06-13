
import { useState, useEffect } from "react";
import { ProductSearch } from "./product-search";
import { ProductFilters } from "./product-filters";
import { ShoppingCart } from "../cart/shopping-cart";
import { ProductReviews } from "../reviews/product-reviews";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { SettingsMenu } from "../settings/settings-menu";
import { useNavigate } from "react-router-dom";
import { useWooCommerceCart } from "@/contexts/WooCommerceCartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { WCProduct, woocommerceApi } from "@/lib/woocommerce";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<WCProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { formatPrice } = useAppSettings();
  const navigate = useNavigate();
  const { addItem } = useWooCommerceCart();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch featured products and latest arrivals
        const [featuredProducts, latestProducts] = await Promise.all([
          woocommerceApi.getProducts({ featured: true, per_page: 8 }),
          woocommerceApi.getProducts({ orderby: 'date', order: 'desc', per_page: 8 })
        ]);

        // Combine and deduplicate products
        const allProducts = [...featuredProducts, ...latestProducts];
        const uniqueProducts = allProducts.filter((product, index, self) => 
          index === self.findIndex(p => p.id === product.id)
        ).slice(0, 12);

        setProducts(uniqueProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(new Set(
    products.flatMap(product => product.categories?.map(cat => cat.name) || [])
  ));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.categories?.some(cat => 
                           cat.name.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = activeCategory === "all" || 
                          product.categories?.some(cat => cat.name === activeCategory);
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = async (product: WCProduct) => {
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
  
  const goToProductPage = (productSlug: string) => {
    navigate(`/product/${productSlug}`);
  };

  if (loading) {
    return (
      <section className="py-4 md:py-12 bg-gradient-to-b from-kapraye-cream/20 to-white">
        <div className="container px-2 xs:px-3 md:px-6 xl:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 md:mb-8 gap-2 md:gap-0">
            <div className="w-full md:w-auto">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex items-center gap-2 md:gap-4 min-w-fit">
              <SettingsMenu />
              <ShoppingCart />
            </div>
          </div>
          
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-4 md:py-12 bg-gradient-to-b from-kapraye-cream/20 to-white">
        <div className="container px-2 xs:px-3 md:px-6 xl:px-8">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 md:py-12 bg-gradient-to-b from-kapraye-cream/20 to-white">
      <div className="container px-2 xs:px-3 md:px-6 xl:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 md:mb-8 gap-2 md:gap-0">
          <div className="w-full md:w-auto">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-playfair font-medium text-kapraye-burgundy mb-1 md:mb-4">
              Latest Arrivals
            </h2>
            <p className="text-xs md:text-base text-foreground/80 max-w-xl">
              Discover our newest collection of premium fashion pieces.
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-4 min-w-fit">
            <SettingsMenu />
            <ShoppingCart />
          </div>
        </div>

        <div className="space-y-2 md:space-y-6 mb-3 md:mb-8">
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-between w-full">
            <ProductSearch onSearch={setSearchTerm} />
            <ProductFilters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="group relative animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => goToProductPage(product.slug)}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.images?.[0]?.src || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {product.on_sale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Sale
                  </div>
                )}
                {product.featured && (
                  <div className="absolute top-2 right-2 bg-kapraye-burgundy text-white text-xs px-2 py-1 rounded">
                    Featured
                  </div>
                )}
              </div>
              <div className="mt-1.5 md:mt-4 space-y-0.5 md:space-y-1">
                <div className="flex justify-between">
                  <h3 className="text-xs text-kapraye-burgundy">
                    {product.categories?.[0]?.name || 'Fashion'}
                  </h3>
                </div>
                <h3 className="font-playfair text-xs sm:text-sm md:text-lg font-medium text-foreground truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-xs md:text-base font-medium text-kapraye-pink">
                    {formatPrice(parseFloat(product.price))}
                  </p>
                  {product.on_sale && product.regular_price && (
                    <p className="text-xs text-gray-500 line-through">
                      {formatPrice(parseFloat(product.regular_price))}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Desktop hover actions */}
              <div className={`absolute inset-0 flex items-center justify-center bg-kapraye-burgundy/0 group-hover:bg-kapraye-burgundy/10 transition-colors duration-300 ${isMobile ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                  {!isMobile && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="secondary" size="sm">
                          Reviews
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <ProductReviews productId={product.id.toString()} />
                      </DialogContent>
                    </Dialog>
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    disabled={product.stock_status !== 'instock'}
                  >
                    {product.stock_status === 'instock' ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </div>
              
              {/* Mobile action button */}
              {isMobile && (
                <div className="absolute bottom-1 right-1 z-10" onClick={e => e.stopPropagation()}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/80 backdrop-blur-sm h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    disabled={product.stock_status !== 'instock'}
                  >
                    +
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-4 md:py-12">
            <p className="text-sm md:text-lg text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
