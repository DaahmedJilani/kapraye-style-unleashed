import { ShopifyCategoryPage } from "./ShopifyCategoryPage";

export default function SaudiPage() {
  return (
    <ShopifyCategoryPage
      title="Saudi Style Collection"
      description="Elegant Middle Eastern inspired fashion with traditional and modern designs."
      query="tag:saudi OR product_type:saudi"
    />
  );
}
