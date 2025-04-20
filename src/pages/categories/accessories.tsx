
import { MainLayout } from "@/components/layout/main-layout";
import { ProductSearch } from "@/components/home/product-search";
import { SortAndFilterSidebar } from "@/components/home/SortAndFilterSidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ProductReviews } from "@/components/reviews/product-reviews";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "@/contexts/AppSettingsContext";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

const accessoryProducts: Product[] = [
  {
    id: "acc-1",
    name: "Designer Handbag",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800",
    price: 199.99,
    category: "Bags"
  },
  {
    id: "acc-2",
    name: "Gold Necklace",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
    price: 299.99,
    category: "Jewelry"
  }
];

export default function AccessoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { formatPrice } = useAppSettings();

  const categories = Array.from(new Set(accessoryProducts.map(product => product.category)));

  let sortedProducts = accessoryProducts.filter(product => {
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
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const goToProductPage = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const navigateToSubcategory = (subcategory: string) => {
    navigate(`/accessories/${subcategory.toLowerCase().replace(/\s+/g, '-')}`, {
      state: {
        title: subcategory,
        mainCategory: 'accessories'
      }
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-medium text-kapraye-burgundy mb-4">
            Accessories Collection
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Discover our premium collection of stylish accessories.
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
                    src={accessoryProducts.find(p => p.category === category)?.image || ''}
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
