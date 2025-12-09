import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function WomenBeautyCosmeticsPage() {
  return (
    <ShopifyCategoryPage
      title="Beauty & Cosmetics"
      description="Premium beauty and cosmetic products. Enhance your natural beauty with our curated collection."
      query="tag:beauty OR tag:cosmetics OR product_type:beauty OR product_type:cosmetics"
    />
  );
}
