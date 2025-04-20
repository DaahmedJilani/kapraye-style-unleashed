
import { MainLayout } from "@/components/layout/main-layout";
import { ProductFilters } from "@/components/home/product-filters";
import { ProductSearch } from "@/components/home/product-search";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductReviews } from "@/components/reviews/product-reviews";
import { useToast } from "@/hooks/use-toast";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

const easternProducts: Product[] = [
  {
    id: "eastern-1",
    name: "Embroidered Kurta",
    image: "https://images.unsplash.com/photo-1614654150157-f7635f43474b?q=80&w=800",
    price: 125.00,
    category: "Kurtas"
  },
  {
    id: "eastern-2",
    name: "Traditional Sherwani",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800",
    price: 299.00,
    category: "Formal"
  },
  {
    id: "eastern-3",
    name: "Designer Saree",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800",
    price: 450.00,
    category: "Sarees"
  }
];

export default function EasternPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { toast } = useToast();
  const { formatPrice } = useAppSettings();
  const navigate = useNavigate();

  const categories = Array.from(new Set(easternProducts.map(product => product.category)));

  const filteredProducts = easternProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const goToProductPage = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  
  const navigateToSubcategory = (subcategory: string) => {
    navigate(`/eastern/${subcategory.toLowerCase().replace(/\s+/g, '-')}`, {
      state: {
        title: subcategory,
        mainCategory: 'eastern'
      }
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-medium text-kapraye-burgundy mb-4">
            Eastern Collection
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Explore our elegant collection of traditional Eastern wear, from kurtas to designer sarees.
          </p>
        </div>
        
        {/* Browse by Category section */}
        <div className="mb-12">
          <h2 className="text-2xl font-playfair font-medium text-kapraye-burgundy mb-6 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category}
                className="bg-white border border-kapraye-cream rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigateToSubcategory(category)}
              >
                <div className="aspect-[3/2] overflow-hidden bg-gray-100">
                  <img
                    src={easternProducts.find(p => p.category === category)?.image || ''}
                    alt={category}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-playfair text-lg font-medium text-kapraye-burgundy">{category}</h3>
                  <p className="text-sm text-muted-foreground mt-1">View all {category.toLowerCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <ProductSearch onSearch={setSearchTerm} />
            <ProductFilters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                />
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex justify-between">
                  <h3 className="text-sm text-kapraye-burgundy">
                    <span onClick={e => e.stopPropagation()}>{product.category}</span>
                  </h3>
                </div>
                <h3 className="font-playfair text-lg font-medium text-foreground">
                  {product.name}
                </h3>
                <p className="text-base font-medium text-kapraye-pink">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-kapraye-burgundy/0 group-hover:bg-kapraye-burgundy/10 transition-colors duration-300 opacity-0 group-hover:opacity-100">
                <div className="flex gap-2" onClick={e => e.stopPropagation()}>
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
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
