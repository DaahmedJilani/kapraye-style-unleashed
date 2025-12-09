import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function WomenStitchedPage() {
  return (
    <ShopifyCategoryPage
      title="Women's Stitched"
      description="Ready-to-wear stitched outfits for women. Perfectly tailored pieces for every occasion."
      query="tag:women-stitched OR (tag:women AND tag:stitched)"
    />
  );
}
