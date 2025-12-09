import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function MenUnstitchedPage() {
  return (
    <ShopifyCategoryPage
      title="Men's Unstitched"
      description="Premium unstitched fabric collections for men. Quality materials for your custom tailoring needs."
      query="tag:men-unstitched OR (tag:men AND tag:unstitched)"
    />
  );
}
