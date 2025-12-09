import { ShopifyCategoryPage } from "./ShopifyCategoryPage";

const womenSubcategories = [
  {
    id: "eastern",
    name: "Eastern Wear",
    description: "Traditional Pakistani and South Asian clothing",
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800",
    route: "/eastern"
  },
  {
    id: "western",
    name: "Western Wear", 
    description: "Contemporary western fashion styles",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800",
    route: "/western"
  },
  {
    id: "saudi",
    name: "Saudi Style",
    description: "Elegant Middle Eastern inspired fashion",
    image: "https://images.unsplash.com/photo-1633934542143-827a422485a4?q=80&w=800",
    route: "/saudi"
  },
  {
    id: "makeup",
    name: "Makeup & Beauty",
    description: "Premium cosmetics and beauty essentials",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800",
    route: "/makeup"
  }
];

export default function WomenPage() {
  return (
    <ShopifyCategoryPage
      title="Women's Collection"
      description="Explore our curated collection of women's fashion, from traditional Eastern wear to contemporary Western styles."
      query="tag:women OR product_type:women"
      subcategories={womenSubcategories}
    />
  );
}
