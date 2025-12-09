import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function WomenTeesPage() {
  return (
    <ShopifyCategoryPage
      title="Women's Tees"
      description="Comfortable and stylish t-shirts for women. From casual basics to trendy designs."
      query="tag:women-tees OR (tag:women AND tag:tees) OR (tag:women AND product_type:tshirt)"
    />
  );
}
