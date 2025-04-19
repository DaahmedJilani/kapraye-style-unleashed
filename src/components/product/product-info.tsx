
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="space-y-2">
        <h1 className="text-3xl font-playfair font-medium text-kapraye-burgundy">
          {product.name}
        </h1>
        <p className="text-2xl font-medium text-kapraye-pink">
          ${product.price.toLocaleString()}
        </p>
      </div>

      <p className="text-gray-600">{product.description}</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Size</label>
          <div className="grid grid-cols-5 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 text-sm border rounded-md transition-colors ${
                  selectedSize === size
                    ? "border-kapraye-burgundy bg-kapraye-burgundy text-white"
                    : "border-gray-300 hover:border-kapraye-burgundy"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
            >
              -
            </button>
            <span className="w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onAddToCart}
          className="flex-1 bg-kapraye-burgundy hover:bg-kapraye-burgundy/90"
        >
          Add to Cart
        </Button>
        <Button
          variant="outline"
          onClick={onAddToWishlist}
          className="px-4 border-kapraye-pink"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
