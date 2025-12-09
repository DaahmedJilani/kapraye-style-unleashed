import { ShopifyCategoryPage } from "./ShopifyCategoryPage";

const kidsSubcategories = [
  {
    id: "boys",
    name: "Boys",
    description: "Stylish clothing for boys",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800",
    route: "/kids/boys"
  },
  {
    id: "girls",
    name: "Girls",
    description: "Beautiful outfits for girls",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800",
    route: "/kids/girls"
  },
  {
    id: "babies",
    name: "Babies",
    description: "Soft & gentle baby clothing",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800",
    route: "/kids/babies"
  }
];

export default function KidsPage() {
  return (
    <ShopifyCategoryPage
      title="Kids Collection"
      description="Adorable and comfortable clothing for children of all ages."
      query="tag:kids OR product_type:kids"
      subcategories={kidsSubcategories}
    />
  );
}
