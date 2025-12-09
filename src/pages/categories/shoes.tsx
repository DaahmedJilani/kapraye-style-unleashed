import { ShopifyCategoryPage } from "./ShopifyCategoryPage";

export default function ShoesPage() {
  return (
    <ShopifyCategoryPage
      title="Footwear"
      description="Step out in style with our premium collection of shoes and footwear."
      query="tag:shoes OR product_type:shoes"
    />
  );
}
