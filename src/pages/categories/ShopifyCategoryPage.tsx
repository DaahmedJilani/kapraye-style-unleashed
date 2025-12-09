import { MainLayout } from "@/components/layout/main-layout";
import { ShopifyProductGrid } from "@/components/shopify/ShopifyProductGrid";

interface ShopifyCategoryPageProps {
  title: string;
  description: string;
  query: string;
  subcategories?: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
    route: string;
  }>;
}

export function ShopifyCategoryPage({ 
  title, 
  description, 
  query,
  subcategories 
}: ShopifyCategoryPageProps) {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-medium text-kapraye-burgundy mb-4">
            {title}
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {subcategories && subcategories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-playfair font-medium text-kapraye-burgundy mb-6 text-center">
              Browse by Style
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {subcategories.map((subcategory) => (
                <a
                  key={subcategory.id}
                  href={subcategory.route}
                  className="bg-card border border-border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="aspect-[3/2] overflow-hidden bg-muted">
                    <img
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-playfair text-lg font-medium text-kapraye-burgundy mb-2">
                      {subcategory.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{subcategory.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-playfair font-medium text-kapraye-burgundy mb-6 text-center">
            Products
          </h2>
          <ShopifyProductGrid query={query} limit={50} />
        </div>
      </div>
    </MainLayout>
  );
}
