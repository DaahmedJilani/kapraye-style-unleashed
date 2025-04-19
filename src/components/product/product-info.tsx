
import { Heart, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ProductInfoProps {
  product: {
    name: string;
    price: number;
    description: string;
    sizes: string[];
  };
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

export function ProductInfo({
  product,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  onAddToCart,
  onAddToWishlist,
}: ProductInfoProps) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center mb-1">
          <div className="flex gap-0.5 text-kapraye-burgundy">
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4" />
          </div>
          <span className="text-xs text-gray-500 ml-2">(127 reviews)</span>
        </div>
        
        <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2 font-cormorant">
          {product.name}
        </h1>
        
        <Badge variant="outline" className="rounded-sm font-normal bg-kapraye-cream text-kapraye-burgundy border-none mb-4">
          New Collection
        </Badge>
        
        <p className="text-2xl font-medium text-kapraye-burgundy tracking-wide mt-4">
          ${product.price.toLocaleString()}
        </p>
      </div>

      <Separator className="bg-gray-100" />

      <div>
        <p className="text-gray-600 leading-relaxed font-light tracking-wide">
          {product.description}
        </p>
      </div>

      <Separator className="bg-gray-100" />

      <div className="space-y-6">
        <div>
          <label className="block text-sm uppercase tracking-wider font-medium mb-3 text-gray-900">Size</label>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[3.5rem] h-10 text-sm border rounded-none transition-colors ${
                  selectedSize === size
                    ? "border-kapraye-burgundy bg-kapraye-burgundy text-white"
                    : "border-gray-300 hover:border-kapraye-burgundy text-gray-900"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm uppercase tracking-wider font-medium mb-3 text-gray-900">Quantity</label>
          <div className="flex items-center border border-gray-300 w-fit">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
            >
              -
            </button>
            <span className="w-10 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-4">
        <Button
          onClick={onAddToCart}
          className="h-12 rounded-none bg-kapraye-burgundy hover:bg-kapraye-burgundy/90 text-white uppercase tracking-widest font-medium"
        >
          Add to Bag
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onAddToWishlist}
            className="flex-1 h-12 rounded-none border-gray-300 hover:bg-gray-50 text-gray-800 uppercase tracking-widest font-medium"
          >
            <Heart className="mr-2 h-4 w-4" /> Wishlist
          </Button>
          
          <Button
            variant="outline"
            className="h-12 w-12 rounded-none border-gray-300 hover:bg-gray-50"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
