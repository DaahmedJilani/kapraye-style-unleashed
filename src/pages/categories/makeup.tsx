import { ShopifyCategoryPage } from "./ShopifyCategoryPage";

export default function MakeupPage() {
  return (
    <ShopifyCategoryPage
      title="Makeup & Beauty"
      description="Discover premium cosmetics and beauty essentials for your complete look."
      query="tag:makeup OR product_type:makeup"
    />
  );
}
