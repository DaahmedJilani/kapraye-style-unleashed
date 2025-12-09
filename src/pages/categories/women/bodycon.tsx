import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function WomenBodyconPage() {
  return (
    <ShopifyCategoryPage
      title="Women's Bodycon"
      description="Figure-hugging bodycon dresses and outfits. Make a statement with our stunning collection."
      query="tag:women-bodycon OR (tag:women AND tag:bodycon) OR (tag:women AND product_type:bodycon)"
    />
  );
}
