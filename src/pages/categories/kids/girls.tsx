import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function KidsGirlsPage() {
  return (
    <ShopifyCategoryPage
      title="Girls Collection"
      description="Beautiful and comfortable clothing for girls. From casual wear to festive outfits."
      query="tag:girls OR (tag:kids AND tag:girls) OR product_type:girls"
    />
  );
}
