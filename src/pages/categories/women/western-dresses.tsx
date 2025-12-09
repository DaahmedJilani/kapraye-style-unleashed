import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function WomenWesternDressesPage() {
  return (
    <ShopifyCategoryPage
      title="Women's Western Dresses"
      description="Contemporary western style dresses for the modern woman. Elegant designs for every occasion."
      query="tag:women-western OR (tag:women AND tag:western) OR (tag:women AND product_type:dress)"
    />
  );
}
