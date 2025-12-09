import { ShopifyCategoryPage } from "./ShopifyCategoryPage";

export default function WesternPage() {
  return (
    <ShopifyCategoryPage
      title="Western Collection"
      description="Discover our modern collection of western wear, from casual to formal attire."
      query="tag:western OR product_type:western"
    />
  );
}
