import { ShopifyCategoryPage } from "./ShopifyCategoryPage";

export default function KidsPage() {
  return (
    <ShopifyCategoryPage
      title="Kids' Collection"
      description="Discover our adorable collection of children's clothing, from playful casuals to special occasion wear."
      query="tag:kids OR product_type:kids"
    />
  );
}
