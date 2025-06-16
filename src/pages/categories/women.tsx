
import { MainLayout } from "@/components/layout/main-layout";
import { ProductSearch } from "@/components/home/product-search";
import { SortAndFilterSidebar } from "@/components/home/SortAndFilterSidebar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ProductReviews } from "@/components/reviews/product-reviews";
import { ShoppingCart } from "@/components/cart/shopping-cart";
import { useToast } from "@/hooks/use-toast";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { useNavigate, Link } from "react-router-dom";
import { useWooCommerceCart } from "@/contexts/WooCommerceCartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { WCProduct, woocommerceApi } from "@/lib/woocommerce";
import { Skeleton } from "@/components/ui/skeleton";

interface Subcategory {
  id: string;
  name: string;
  description: string;
  image: string;
  route: string;
}

const womenSubcategories: Subcategory[] = [
  {
    id: "eastern",
    name: "Eastern Wear",
    description: "Traditional Pakistani and South Asian clothing",
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800",
    route: "/eastern"
  },
  {
    id: "western",
    name: "Western Wear", 
    description: "Contemporary western fashion styles",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800",
    route: "/western"
  },
  {
    id: "saudi",
    name: "Saudi Style",
    description: "Elegant Middle Eastern inspired fashion",
    image: "https://images.unsplash.com/photo-1633934542143-827a422485a4?q=80&w=800",
    route: "/saudi"
  },
  {
    id: "makeup",
    name: "Makeup & Beauty",
    description: "Premium cosmetics and beauty essentials",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800",
    route: "/makeup"
  }
];

export default function WomenPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [products, setProducts] = useState<WCProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { formatPrice } = useAppSettings();
  const navigate = useNavigate();
  const { addItem } = useWooCommerceCart();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch women's products from WooCommerce
        const womenProducts = await woocommerceApi.getProducts({ 
          category: 'women', // This should match your WooCommerce category slug
          per_page: 12 
        });
        
        setProducts(womenProducts);
      } catch (error) {
        console.error('Error fetching women products:', error);
        setError('Failed to load women\'s products');
      } finally {
        setLoading(false);
      }
    };

    fetchWomenProducts();
  }, []);

  const categories = Array.from(new Set(
    products.flatMap(product => product.categories?.map(cat => cat.name) || []).filter(Boolean)
  ));

  let sortedProducts = products.filter(product => {
    const productName = product.name || '';
    const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.categories?.some(cat => 
                           cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = activeCategory === "all" || 
                          product.categories?.some(cat => cat.name === activeCategory);
    return matchesSearch && matchesCategory;
  });

  if (sortOption === "price-asc") {
    sortedProducts = [...sortedProducts].sort((a, b) => parseFloat(a.price || '0') - parseFloat(b.price || '0'));
  } else if (sortOption === "price-desc") {
    sortedProducts = [...sortedProducts].sort((a, b) => parseFloat(b.price || '0') - parseFloat(a.price || '0'));
  } else if (sortOption === "name-asc") {
    sortedProducts = [...sortedProducts].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  } else if (sortOption === "name-desc") {
    sortedProducts = [...sortedProducts].sort((a, b) => (b.name || '').localeCompare(a.name || ''));
  }

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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-medium text-kapraye-burgundy mb-4">
            Women's Collection
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of women's fashion, from traditional Eastern wear to contemporary Western styles.
          </p>
        </div>

        {/* Subcategories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-playfair font-medium text-kapraye-burgundy mb-6 text-center">
            Browse by Style
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {womenSubcategories.map((subcategory) => (
              <div
                key={subcategory.id}
                className="bg-white border border-kapraye-cream rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => navigate(subcategory.route)}
              >
                <div className="aspect-[3/2] overflow-hidden bg-gray-100">
                  <img
                    src={subcategory.image}
                    alt={subcategory.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-playfair text-lg font-medium text-kapraye-burgundy mb-2">{subcategory.name}</h3>
                  <p className="text-sm text-muted-foreground">{subcategory.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="flex flex-col sm:flex-row gap-8">
          <SortAndFilterSidebar
            categories={categories}
            selectedCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
          <div className="flex-1">
            <div className="space-y-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <ProductSearch onSearch={setSearchTerm} />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className="group relative animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => goToProductPage(product.slug)}
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={product.images?.[0]?.src || '/placeholder.svg'}
                        alt={product.name || 'Product image'}
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
                    <div className="mt-4 space-y-1">
                      <div className="flex justify-between">
                        <h3 className="text-sm text-kapraye-burgundy">
                          {product.categories?.[0]?.name || 'Women'}
                        </h3>
                      </div>
                      <h3 className="font-playfair text-lg font-medium text-foreground">
                        {product.name || 'Product'}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="text-base font-medium text-kapraye-pink">
                          {formatPrice(parseFloat(product.price || '0'))}
                        </p>
                        {product.on_sale && product.regular_price && (
                          <p className="text-sm text-gray-500 line-through">
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
                              <DialogTitle>Product Reviews</DialogTitle>
                              <DialogDescription>See what others are saying about this product</DialogDescription>
                              <ProductReviews productId={product.id?.toString() || '0'} />
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
            )}

            {sortedProducts.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
