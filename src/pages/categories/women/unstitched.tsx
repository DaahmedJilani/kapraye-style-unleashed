import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function WomenUnstitchedPage() {
  return (
    <ShopifyCategoryPage
      title="Women's Unstitched"
      description="Premium unstitched fabric collections for women. Create your own custom designs with our finest quality materials."
      query="tag:women-unstitched OR (tag:women AND tag:unstitched)"
    />
  );
}
