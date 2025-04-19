
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductTabs } from "@/components/product/product-tabs";
import { useToast } from "@/hooks/use-toast";

export default function ProductPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // This would typically come from an API
  const product = {
    id: id,
    name: "Dior Oblique Jacket",
    price: 3800.00,
    description: "The Dior Oblique jacket is crafted in blue technical cotton canvas and features the iconic Dior Oblique motif. The sportswear-inspired design has a regular fit and showcases the House's exceptional savoir-faire.",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1000",
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44b?q=80&w=1000",
    ],
    details: [
      "Regular fit",
      "100% cotton",
      "Machine washable",
      "Made in Italy"
    ],
    care: [
      "Machine wash cold",
      "Do not bleach",
      "Tumble dry low",
      "Iron low heat"
    ]
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} (Size: ${selectedSize}) has been added to your cart.`
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductGallery images={product.images} />
          <ProductInfo
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        </div>
        <ProductTabs product={product} />
      </div>
    </MainLayout>
  );
}
