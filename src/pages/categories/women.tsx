import { ShopifyCategoryPage } from "./ShopifyCategoryPage";

const womenSubcategories = [
  {
    id: "unstitched",
    name: "Unstitched",
    description: "Premium unstitched fabric collections",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800",
    route: "/women/unstitched"
  },
  {
    id: "stitched",
    name: "Stitched",
    description: "Ready-to-wear tailored outfits",
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800",
    route: "/women/stitched"
  },
  {
    id: "tees",
    name: "Tees",
    description: "Comfortable stylish t-shirts",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800",
    route: "/women/tees"
  },
  {
    id: "bottoms",
    name: "Bottoms",
    description: "Trousers, palazzos & more",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800",
    route: "/women/bottoms"
  },
  {
    id: "undergarments",
    name: "Under-garments",
    description: "Quality everyday essentials",
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=800",
    route: "/women/undergarments"
  },
  {
    id: "bodycon",
    name: "Bodycon",
    description: "Figure-hugging statement pieces",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",
    route: "/women/bodycon"
  },
  {
    id: "western-dresses",
    name: "Western Dresses",
    description: "Contemporary western styles",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800",
    route: "/women/western-dresses"
  },
  {
    id: "beauty-cosmetics",
    name: "Beauty & Cosmetics",
    description: "Premium beauty products",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800",
    route: "/women/beauty-cosmetics"
  }
];

export default function WomenPage() {
  return (
    <ShopifyCategoryPage
      title="Women's Collection"
      description="Explore our curated collection of women's fashion, from traditional wear to contemporary styles."
      query="tag:women OR product_type:women"
      subcategories={womenSubcategories}
    />
  );
}
