import { ShopifyCategoryPage } from "./ShopifyCategoryPage";

const menSubcategories = [
  {
    id: "unstitched",
    name: "Unstitched",
    description: "Premium unstitched fabric collections",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
    route: "/men/unstitched"
  },
  {
    id: "tees",
    name: "Tees",
    description: "Comfortable stylish t-shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
    route: "/men/tees"
  },
  {
    id: "bottoms",
    name: "Bottoms",
    description: "Trousers, jeans & casual pants",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800",
    route: "/men/bottoms"
  }
];

export default function MenPage() {
  return (
    <ShopifyCategoryPage
      title="Men's Collection"
      description="Discover our range of men's fashion, from traditional to contemporary styles."
      query="tag:men OR product_type:men"
      subcategories={menSubcategories}
    />
  );
}
