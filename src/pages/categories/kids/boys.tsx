import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function KidsBoysPage() {
  return (
    <ShopifyCategoryPage
      title="Boys Collection"
      description="Stylish and comfortable clothing for boys. Quality pieces for everyday wear and special occasions."
      query="tag:boys OR (tag:kids AND tag:boys) OR product_type:boys"
    />
  );
}
