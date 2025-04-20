import { Heart, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { StockNotification } from "./stock-notification";
import { useToast } from "@/components/ui/use-toast";

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    sizes: string[];
    inStock?: boolean;
  };
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  onAddToCart: () => void;
}

export function ProductInfo({ product, selectedSize, setSelectedSize, onAddToCart }: ProductInfoProps) {
  const { formatPrice, t } = useAppSettings();
  const { toast } = useToast();

  const handlePaymentMethod = async (method: string) => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: `Processing ${method} payment`,
      description: "Redirecting to payment gateway..."
    });
    
    console.log(`Processing ${method} payment for ${product.name}`);
  };

  const rating = 4.5;
  const reviewCount = 120;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-sm text-muted-foreground">({reviewCount} Reviews)</span>
        </div>
        <div className="mt-4">
          <span className="text-lg text-muted-foreground font-cormorant tracking-wider">Price</span>
          <h3 className="text-4xl font-cormorant font-light text-kapraye-burgundy tracking-widest">
            {formatPrice(product.price)}
          </h3>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-lg font-medium">{t('product.size')}</h4>
        <div className="flex gap-2">
          {product.sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "default" : "outline"}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-4">
        {product.inStock ? (
          <div className="space-y-4">
            <Button
              onClick={onAddToCart}
              className="w-full h-12 rounded-none bg-kapraye-burgundy hover:bg-kapraye-burgundy/90 text-white uppercase tracking-widest font-medium"
            >
              {t('product.addToCart')}
            </Button>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handlePaymentMethod('Bank Transfer')}
              >
                Bank Transfer
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handlePaymentMethod('Jazz Cash')}
              >
                Jazz Cash
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handlePaymentMethod('Easy Paisa')}
              >
                Easy Paisa
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handlePaymentMethod('Cash on Delivery')}
              >
                Cash on Delivery
              </Button>
            </div>
          </div>
        ) : (
          <StockNotification productId={product.id} productName={product.name} />
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full">
            <Heart className="mr-2 h-4 w-4" />
            {t('product.addToWishlist')}
          </Button>
          <Button variant="outline" className="w-full">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium">Description</h4>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div>
        <h4 className="text-lg font-medium">Reviews</h4>
        <Badge>Coming Soon</Badge>
      </div>
    </div>
  );
}
