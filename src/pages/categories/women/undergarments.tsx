import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function WomenUndergarentsPage() {
  return (
    <ShopifyCategoryPage
      title="Women's Under-garments"
      description="Comfortable and quality undergarments for women. Essentials for everyday wear."
      query="tag:women-undergarments OR (tag:women AND tag:undergarments) OR (tag:women AND tag:innerwear)"
    />
  );
}
