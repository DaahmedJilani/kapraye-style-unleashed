import { MainLayout } from "@/components/layout/main-layout";
import { ProductSearch } from "@/components/home/product-search";
import { SortAndFilterSidebar } from "@/components/home/SortAndFilterSidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductReviews } from "@/components/reviews/product-reviews";
import { useToast } from "@/hooks/use-toast";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { useNavigate } from "react-router-dom";
import { ProductGrid } from "@/components/home/ProductGrid";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

const westernProducts: Product[] = [
  {
    id: "western-1",
    name: "Designer Blazer",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800",
    price: 199.00,
    category: "Formal"
  },
  {
    id: "western-2",
    name: "Casual T-Shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
    price: 29.99,
    category: "Casual"
  },
  {
    id: "western-3",
    name: "Skinny Jeans",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800",
    price: 79.99,
    category: "Pants"
  }
];

export default function WesternPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { toast } = useToast();
  const { formatPrice } = useAppSettings();
  const navigate = useNavigate();

  const categories = Array.from(new Set(westernProducts.map(product => product.category)));

  let sortedProducts = westernProducts.filter(product => {
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
    navigate(`/western/${subcategory.toLowerCase().replace(/\s+/g, '-')}`, {
      state: {
        title: subcategory,
        mainCategory: 'western'
      }
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-medium text-kapraye-burgundy mb-4">
            Western Collection
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Discover our modern collection of western wear, from casual to formal attire.
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
                    src={westernProducts.find(p => p.category === category)?.image || ''}
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
            <ProductGrid
              products={sortedProducts}
              onProductClick={goToProductPage}
              onAddToCart={addToCart}
              formatPrice={formatPrice}
            />
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
