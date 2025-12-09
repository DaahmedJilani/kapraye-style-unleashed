import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function WomenBottomsPage() {
  return (
    <ShopifyCategoryPage
      title="Women's Bottoms"
      description="Explore our range of women's bottoms including trousers, palazzos, and more."
      query="tag:women-bottoms OR (tag:women AND tag:bottoms) OR (tag:women AND product_type:pants)"
    />
  );
}
