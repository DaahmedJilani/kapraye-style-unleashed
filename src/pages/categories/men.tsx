import { ShopifyCategoryPage } from "./ShopifyCategoryPage";

export default function MenPage() {
  return (
    <ShopifyCategoryPage
      title="Men's Collection"
      description="Discover our premium collection of men's clothing, from casual essentials to formal wear."
      query="tag:men OR product_type:men"
    />
  );
}
