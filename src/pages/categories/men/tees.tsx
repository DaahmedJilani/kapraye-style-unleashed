import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function MenTeesPage() {
  return (
    <ShopifyCategoryPage
      title="Men's Tees"
      description="Comfortable and stylish t-shirts for men. From casual basics to premium designs."
      query="tag:men-tees OR (tag:men AND tag:tees) OR (tag:men AND product_type:tshirt)"
    />
  );
}
