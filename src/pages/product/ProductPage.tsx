import { useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductTabs } from "@/components/product/product-tabs";
import { SimilarItems } from "@/components/product/similar-items";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/stores/cartStore";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const product = {
    id: "cotton-tshirt-001",
    name: "Premium Cotton T-Shirt",
    price: 49.99,
    description: "A luxurious cotton t-shirt crafted from the finest Egyptian cotton. Features a classic crew neck, short sleeves, and a comfortable regular fit. Perfect for everyday wear with a premium feel.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: false,
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

  const images360 = [
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=60"
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive"
      });
      return;
    }
    
    // Create a mock ShopifyProduct structure for legacy product pages
    const mockShopifyProduct = {
      node: {
        id: product.id,
        title: product.name,
        description: product.description,
        handle: product.id,
        priceRange: {
          minVariantPrice: {
            amount: product.price.toString(),
            currencyCode: 'PKR'
          }
        },
        images: {
          edges: product.images.map(url => ({ node: { url, altText: product.name } }))
        },
        variants: {
          edges: [{
            node: {
              id: `${product.id}-${selectedSize}`,
              title: selectedSize,
              price: { amount: product.price.toString(), currencyCode: 'PKR' },
              availableForSale: true,
              selectedOptions: [{ name: 'Size', value: selectedSize }]
            }
          }]
        },
        options: [{ name: 'Size', values: product.sizes }]
      }
    };
    
    addItem({
      product: mockShopifyProduct,
      variantId: `${product.id}-${selectedSize}`,
      variantTitle: selectedSize,
      price: { amount: product.price.toString(), currencyCode: 'PKR' },
      quantity: quantity,
      selectedOptions: [{ name: 'Size', value: selectedSize }]
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} (Size: ${selectedSize}) has been added to your cart.`
    });
  };

  const handleAddToWishlist = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive"
      });
      return;
    }
    
    const wishlistItem: WishlistItem = {
      id: `${id}-${selectedSize}`,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize
    };

    setWishlistItems((prevItems) => {
      const exists = prevItems.some(item => item.id === wishlistItem.id);
      
      if (exists) {
        toast({
          title: "Already in wishlist",
          description: "This item is already in your wishlist.",
          variant: "destructive"
        });
        return prevItems;
      }

      const newItems = [...prevItems, wishlistItem];
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} (Size: ${selectedSize}) has been added to your wishlist.`
      });
      
      return newItems;
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10 mt-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <ProductGallery 
              images={product.images} 
              productName={product.name}
              has360View={true}
              images360={images360}
            />
          </div>
          <div className="lg:col-span-5">
            <ProductInfo
              product={product}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
        <ProductTabs product={product} />
        <SimilarItems currentProductId={product.id} />
      </div>
    </MainLayout>
  );
}
