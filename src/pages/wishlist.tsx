
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, X, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
}

const Wishlist = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlistItems(JSON.parse(saved));
    }
  }, []);

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems((prevItems) => {
      const newItems = prevItems.filter(item => item.id !== itemId);
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      
      toast({
        title: "Item removed",
        description: "The item has been removed from your wishlist."
      });
      
      return newItems;
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-kapraye-burgundy flex items-center gap-2">
              <Heart className="h-6 w-6" /> My Wishlist
            </CardTitle>
          </CardHeader>
          <CardContent>
            {wishlistItems.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="bg-kapraye-burgundy text-white hover:bg-kapraye-burgundy/90"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="relative group">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="relative aspect-square">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">Size: {item.size}</p>
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-kapraye-burgundy">
                          ${item.price.toFixed(2)}
                        </p>
                        <Button
                          size="sm"
                          className="bg-kapraye-burgundy text-white hover:bg-kapraye-burgundy/90"
                          onClick={() => {
                            const [productId] = item.id.split('-');
                            navigate(`/product/${productId}`);
                          }}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Buy Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Wishlist;
