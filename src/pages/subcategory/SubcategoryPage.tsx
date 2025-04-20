import { MainLayout } from "@/components/layout/main-layout";
import { ProductFilters } from "@/components/home/product-filters";
import { ProductSearch } from "@/components/home/product-search";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ProductReviews } from "@/components/reviews/product-reviews";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SortAndFilterSidebar } from "@/components/home/SortAndFilterSidebar";
import { ProductGrid } from "@/components/home/ProductGrid";
import { useAppSettings } from "@/contexts/AppSettingsContext";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  subcategory: string;
}

const allProducts: Product[] = [
  // Men's products
  {
    id: "men-1",
    name: "Premium Linen Shirt",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800",
    price: 89.50,
    category: "men",
    subcategory: "Shirts"
  },
  {
    id: "men-2",
    name: "Classic Denim Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800",
    price: 125.00,
    category: "men",
    subcategory: "Pants"
  },
  {
    id: "men-3",
    name: "Wool Blend Blazer",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800",
    price: 299.99,
    category: "men",
    subcategory: "Formal"
  },
  {
    id: "men-4",
    name: "Oxford Cotton Shirt",
    image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=800",
    price: 79.99,
    category: "men",
    subcategory: "Shirts"
  },
  // Shoes products
  {
    id: "shoe-1",
    name: "Classic Leather Loafers",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800",
    price: 150.00,
    category: "shoes",
    subcategory: "Formal"
  },
  {
    id: "shoe-2",
    name: "Sport Sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
    price: 120.00,
    category: "shoes",
    subcategory: "Casual"
  },
  {
    id: "shoe-3",
    name: "Leather Dress Shoes",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800",
    price: 175.00,
    category: "shoes",
    subcategory: "Formal"
  },
  // Perfumes products
  {
    id: "perf-1",
    name: "Oriental Essence",
    image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=800",
    price: 120.00,
    category: "perfumes",
    subcategory: "Oriental"
  },
  {
    id: "perf-2",
    name: "Floral Dreams",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800",
    price: 85.00,
    category: "perfumes",
    subcategory: "Floral"
  },
  // Makeup products
  {
    id: "makeup-1",
    name: "Luxury Lipstick",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800",
    price: 29.99,
    category: "makeup",
    subcategory: "Lipstick"
  },
  {
    id: "makeup-2",
    name: "Premium Foundation",
    image: "https://images.unsplash.com/photo-1631730486572-226d1f595b68?q=80&w=800",
    price: 45.00,
    category: "makeup",
    subcategory: "Foundation"
  },
  // Accessories products
  {
    id: "acc-1",
    name: "Designer Handbag",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800",
    price: 199.99,
    category: "accessories",
    subcategory: "Bags"
  },
  {
    id: "acc-2",
    name: "Gold Necklace",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
    price: 299.99,
    category: "accessories",
    subcategory: "Jewelry"
  }
];

export default function SubcategoryPage() {
  const { category, subcategory } = useParams();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(subcategory || "all");
  const [sortOption, setSortOption] = useState("default");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { formatPrice } = useAppSettings();

  const subcategoryTitle = location.state?.title || subcategory;
  const mainCategory = location.state?.mainCategory || category;

  const filters = Array.from(
    new Set(
      allProducts
        .filter(p => p.category === category)
        .map(p => p.subcategory)
    )
  );

  let sortedProducts = allProducts.filter(product => {
    const matchesCategory = product.category === category;
    const matchesSubcategory = product.subcategory === subcategoryTitle;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSubcategory && matchesSearch;
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-medium text-kapraye-burgundy mb-4">
            {subcategoryTitle} Collection
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Discover our premium collection of {subcategoryTitle?.toLowerCase()}.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-8">
          <SortAndFilterSidebar
            categories={filters}
            selectedCategory={subcategoryTitle}
            onCategoryChange={() => {}} // No-op since subcategory already determined
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
