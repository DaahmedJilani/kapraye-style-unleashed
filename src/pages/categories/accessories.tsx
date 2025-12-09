import { ShopifyCategoryPage } from "./ShopifyCategoryPage";

export default function AccessoriesPage() {
  return (
    <ShopifyCategoryPage
      title="Accessories"
      description="Complete your look with our curated collection of premium accessories."
      query="tag:accessories OR product_type:accessories"
    />
  );
}
