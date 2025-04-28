
import { useState } from "react";
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
import { useCart } from "@/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

const products: Product[] = [
  {
    id: "prod-1",
    name: "Silk Blend Kurta",
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800",
    price: 120.00,
    category: "Eastern"
  },
  {
    id: "prod-2",
    name: "Premium Linen Shirt",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800",
    price: 89.50,
    category: "Men"
  },
  {
    id: "prod-3",
    name: "Designer Evening Gown",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800",
    price: 250.00,
    category: "Women"
  },
  {
    id: "prod-4",
    name: "Traditional Embroidered Thobe",
    image: "https://images.unsplash.com/photo-1597346908500-28cda8acfe4e?q=80&w=800",
    price: 175.00,
    category: "Saudi Style"
  }
];

export function FeaturedProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { toast } = useToast();
  const { formatPrice, t } = useAppSettings();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const isMobile = useIsMobile();

  const categories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  };
  
  const goToProductPage = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-kapraye-cream/20 to-white">
      <div className="container px-4 md:px-6 xl:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 md:gap-0">
          <div className="w-full md:w-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-medium text-kapraye-burgundy mb-2 md:mb-4">
              Latest Arrivals
            </h2>
            <p className="text-sm md:text-base text-foreground/80 max-w-xl">
              Discover our newest collection of premium fashion pieces.
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-4 min-w-fit">
            <SettingsMenu />
            <ShoppingCart />
          </div>
        </div>

        <div className="space-y-3 md:space-y-6 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-between w-full">
            <ProductSearch onSearch={setSearchTerm} />
            <ProductFilters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="group relative animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => goToProductPage(product.id)}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="mt-2 md:mt-4 space-y-0.5 md:space-y-1">
                <div className="flex justify-between">
                  <h3 className="text-xs xs:text-sm text-kapraye-burgundy">
                    {product.category}
                  </h3>
                </div>
                <h3 className="font-playfair text-sm sm:text-base md:text-lg font-medium text-foreground truncate">
                  {product.name}
                </h3>
                <p className="text-sm md:text-base font-medium text-kapraye-pink">
                  {formatPrice(product.price)}
                </p>
              </div>
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
                        <ProductReviews productId={product.id} />
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
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              {/* Mobile-only action button */}
              {isMobile && (
                <div className="absolute bottom-2 right-2 z-10" onClick={e => e.stopPropagation()}>
                  <Button
                    variant="secondary"
                    size="xs"
                    className="bg-white/80 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    +
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-6 md:py-12">
            <p className="text-base md:text-lg text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
