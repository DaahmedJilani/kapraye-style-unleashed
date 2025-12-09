import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { ShopifyProductGrid } from "@/components/shopify/ShopifyProductGrid";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(query);
  const [shopifyQuery, setShopifyQuery] = useState(query);

  useEffect(() => {
    setSearchTerm(query);
    setShopifyQuery(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShopifyQuery(searchTerm);
  };

  return (
    <MainLayout>
      <div className="container mt-24 mb-12">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium text-kapraye-burgundy mb-6 text-center">
          {shopifyQuery ? `Search Results for "${shopifyQuery}"` : "Search Products"}
        </h1>
        
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </form>

        {shopifyQuery ? (
          <ShopifyProductGrid query={`title:*${shopifyQuery}*`} limit={50} />
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Enter a search term to find products
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
