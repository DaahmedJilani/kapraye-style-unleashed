import { MainLayout } from "@/components/layout/main-layout";
import { ProductSearch } from "@/components/home/product-search";
import { SortAndFilterSidebar } from "@/components/home/SortAndFilterSidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ProductReviews } from "@/components/reviews/product-reviews";
import { ShoppingCart } from "@/components/cart/shopping-cart";
import { useToast } from "@/hooks/use-toast";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { useNavigate, Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

const womenProducts: Product[] = [
  {
    id: "women-1",
    name: "Designer Evening Gown",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800",
    price: 250.00,
    category: "Dresses"
  },
  {
    id: "women-2",
    name: "Silk Blouse",
    image: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?q=80&w=800",
    price: 120.00,
    category: "Tops"
  },
  {
    id: "women-3",
    name: "Tailored Pants",
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?q=80&w=800",
    price: 150.00,
    category: "Pants"
  }
];

export default function WomenPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { toast } = useToast();
  const { formatPrice } = useAppSettings();
  const navigate = useNavigate();

  const categories = Array.from(new Set(womenProducts.map(product => product.category)));

  let sortedProducts = womenProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortOption === "price-asc") {
    sortedProducts = [...sortedProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    sortedProducts = [...sortedProducts].sort((a, b) => b.price - a.price);
  } else if (sortOption === "name-asc") {
    sortedProducts = [...sortedProducts].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "name-desc") {
    sortedProducts = [...sortedProducts].sort((a, b) => b.name.localeCompare(a.name));
  }

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
    navigate(`/women/${subcategory.toLowerCase().replace(/\s+/g, '-')}`, {
      state: {
        title: subcategory,
        mainCategory: 'women'
      }
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-medium text-kapraye-burgundy mb-4">
            Women's Collection
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of women's fashion, from elegant dresses to contemporary casual wear.
          </p>
        </div>

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
                    src={womenProducts.find(p => p.category === category)?.image || ''}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product, index) => (
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
                          <DialogTitle>Product Reviews</DialogTitle>
                          <DialogDescription>See what others are saying about this product</DialogDescription>
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

            {sortedProducts.length === 0 && (
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
