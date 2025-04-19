
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

  // Sample T-shirt product data
  const product = {
    id: id,
    name: "Essential Cotton T-Shirt",
    price: 49.99,
    description: "A luxurious cotton t-shirt crafted from the finest Egyptian cotton. Features a classic crew neck, short sleeves, and a comfortable regular fit. Perfect for everyday wear with a premium feel.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=60"
    ],
    details: [
      "100% Premium Egyptian Cotton",
      "Regular fit",
      "Crew neck",
      "Short sleeves",
      "Ribbed collar",
      "Made in Portugal",
      "Machine washable"
    ],
    care: [
      "Machine wash at 30°C",
      "Do not bleach",
      "Tumble dry low",
      "Iron on medium heat",
      "Do not dry clean",
      "Wash with similar colors"
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
