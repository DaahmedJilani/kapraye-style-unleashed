
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { ProductSearch } from "@/components/home/product-search";
import { useState, useEffect } from "react";

// This is a placeholder for demo purposes
// In a real app, you'd fetch products from an API
const demoProducts = [
  { id: 1, name: "Cotton T-Shirt", category: "men", price: 24.99, image: "/placeholder.svg" },
  { id: 2, name: "Silk Dress", category: "women", price: 89.99, image: "/placeholder.svg" },
  { id: 3, name: "Kids Jeans", category: "kids", price: 34.99, image: "/placeholder.svg" },
  { id: 4, name: "Eastern Kurta", category: "eastern", price: 44.99, image: "/placeholder.svg" },
  { id: 5, name: "Western Shirt", category: "western", price: 39.99, image: "/placeholder.svg" },
  { id: 6, name: "Saudi Thobe", category: "saudi", price: 59.99, image: "/placeholder.svg" },
  { id: 7, name: "Lipstick", category: "makeup", price: 19.99, image: "/placeholder.svg" },
  { id: 8, name: "Necklace", category: "accessories", price: 29.99, image: "/placeholder.svg" },
  { id: 9, name: "Leather Shoes", category: "shoes", price: 79.99, image: "/placeholder.svg" },
  { id: 10, name: "Perfume", category: "perfumes", price: 69.99, image: "/placeholder.svg" },
];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [filteredProducts, setFilteredProducts] = useState(demoProducts);
  const [searchTerm, setSearchTerm] = useState(query);

  // Handle search when the query param changes
  useEffect(() => {
    if (query) {
      const results = demoProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
      setSearchTerm(query);
    } else {
      setFilteredProducts([]);
    }
  }, [query]);

  // Handle local search within the page
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredProducts([]);
      return;
    }
    
    const results = demoProducts.filter(product => 
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.category.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(results);
  };

  return (
    <MainLayout>
      <div className="container mt-24 mb-12">
        <h1 className="text-2xl font-medium mb-6">Search Results for "{query}"</h1>
        
        <div className="mb-8">
          <ProductSearch onSearch={handleSearch} />
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-muted-foreground">No products found matching "{query}"</h2>
            <p className="mt-2">Try a different search term or browse our categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <a 
                key={product.id} 
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="border border-kapraye-cream rounded-md overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium group-hover:text-kapraye-pink transition-colors">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="mt-2 font-medium">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
