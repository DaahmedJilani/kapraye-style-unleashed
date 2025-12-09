import { ShopifyCategoryPage } from "./ShopifyCategoryPage";

export default function PerfumesPage() {
  return (
    <ShopifyCategoryPage
      title="Perfumes"
      description="Discover our exquisite collection of fragrances for every occasion."
      query="tag:perfumes OR product_type:perfumes"
    />
  );
}
