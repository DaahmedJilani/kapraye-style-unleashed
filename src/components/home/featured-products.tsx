import { ShopifyProductGrid } from "@/components/shopify/ShopifyProductGrid";
import { SettingsMenu } from "../settings/settings-menu";

export function FeaturedProducts() {
  return (
    <section className="py-4 md:py-12 bg-gradient-to-b from-kapraye-cream/20 to-white">
      <div className="container px-2 xs:px-3 md:px-6 xl:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 md:mb-8 gap-2 md:gap-0">
          <div className="w-full md:w-auto">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-playfair font-medium text-kapraye-burgundy mb-1 md:mb-4">
              Latest Arrivals
            </h2>
            <p className="text-xs md:text-base text-foreground/80 max-w-xl">
              Discover our newest collection of premium fashion pieces.
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-4 min-w-fit">
            <SettingsMenu />
          </div>
        </div>
        
        <ShopifyProductGrid limit={12} />
      </div>
    </section>
  );
}
