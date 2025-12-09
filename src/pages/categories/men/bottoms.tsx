import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function MenBottomsPage() {
  return (
    <ShopifyCategoryPage
      title="Men's Bottoms"
      description="Explore our range of men's bottoms including trousers, jeans, and casual pants."
      query="tag:men-bottoms OR (tag:men AND tag:bottoms) OR (tag:men AND product_type:pants)"
    />
  );
}
