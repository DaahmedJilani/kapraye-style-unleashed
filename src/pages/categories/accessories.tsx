
import { MainLayout } from "@/components/layout/main-layout";
import { ProductSearch } from "@/components/home/product-search";
import { GenderFilter } from "@/components/home/gender-filter";
import { SortAndFilterSidebar } from "@/components/home/SortAndFilterSidebar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ProductReviews } from "@/components/reviews/product-reviews";
import { useToast } from "@/hooks/use-toast";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { useNavigate } from "react-router-dom";
import { useWooCommerceCart } from "@/contexts/WooCommerceCartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { WCProduct, woocommerceApi } from "@/lib/woocommerce";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccessoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
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
    const fetchAccessories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch accessories from WooCommerce
        const accessoriesProducts = await woocommerceApi.getProducts({ 
          category: 'accessories', // This should match your WooCommerce category slug
          per_page: 20 
        });
        
        setProducts(accessoriesProducts);
      } catch (error) {
        console.error('Error fetching accessories:', error);
        setError('Failed to load accessories');
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  const categories = Array.from(new Set(
    products.flatMap(product => product.categories?.map(cat => cat.name) || []).filter(Boolean)
  ));

  let filteredProducts = products.filter(product => {
    const productName = product.name || '';
    const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.categories?.some(cat => 
                           cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = activeCategory === "all" || 
                          product.categories?.some(cat => cat.name === activeCategory);
    
    // Gender filtering based on product tags or attributes
    let matchesGender = true;
    if (selectedGender !== "all") {
      const productTags = product.tags?.map(tag => tag.name.toLowerCase()) || [];
      const productAttributes = product.attributes?.flatMap(attr => attr.options.map(opt => opt.toLowerCase())) || [];
      const searchTerms = [...productTags, ...productAttributes];
      
      matchesGender = searchTerms.some(term => 
        term.includes(selectedGender) || 
        (selectedGender === "men" && term.includes("male")) ||
        (selectedGender === "women" && (term.includes("female") || term.includes("ladies")))
      );
    }
    
    return matchesSearch && matchesCategory && matchesGender;
  });

  // Apply sorting
  if (sortOption === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => parseFloat(a.price || '0') - parseFloat(b.price || '0'));
  } else if (sortOption === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => parseFloat(b.price || '0') - parseFloat(a.price || '0'));
  } else if (sortOption === "name-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  } else if (sortOption === "name-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.name || '').localeCompare(a.name || ''));
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
            Accessories Collection
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Complete your look with our curated selection of premium accessories for men and women.
          </p>
        </div>

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
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <ProductSearch onSearch={setSearchTerm} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by Gender</h3>
                  <GenderFilter 
                    selectedGender={selectedGender} 
                    onGenderChange={setSelectedGender} 
                  />
                </div>
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
                          {product.categories?.[0]?.name || 'Accessories'}
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

            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No accessories found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
