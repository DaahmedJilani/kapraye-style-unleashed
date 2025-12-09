import { ShopifyCategoryPage } from "./ShopifyCategoryPage";

export default function EasternPage() {
  return (
    <ShopifyCategoryPage
      title="Eastern Collection"
      description="Explore our elegant collection of traditional Eastern wear, from kurtas to designer sarees."
      query="tag:eastern OR product_type:eastern"
    />
  );
}
