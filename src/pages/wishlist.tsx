
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, X, ShoppingBag, Loader2 } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const Wishlist = () => {
  const navigate = useNavigate();
  const { items, loading, removeFromWishlist } = useWishlist();

  const handleRemoveItem = async (productId: number) => {
    await removeFromWishlist(productId);
  };

  return (
    <>
      <Helmet>
        <title>My Wishlist - Kaprayé</title>
        <meta name="description" content="View and manage your saved items in your Kaprayé wishlist." />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-playfair text-kapraye-burgundy flex items-center gap-2">
                <Heart className="h-6 w-6" /> My Wishlist ({items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Loading wishlist...</span>
                </div>
              ) : items.length === 0 ? (
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
                  {items.map((item) => (
                    <Card key={item.id} className="relative group">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveItem(item.product_id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="relative aspect-square">
                        <img
                          src={item.product_image || '/placeholder.svg'}
                          alt={item.product_name}
                          className="object-cover w-full h-full rounded-t-lg"
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-1">{item.product_name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-kapraye-burgundy">
                            {item.product_price ? `PKR ${item.product_price.toFixed(2)}` : 'Price not available'}
                          </p>
                          <Button
                            size="sm"
                            className="bg-kapraye-burgundy text-white hover:bg-kapraye-burgundy/90"
                            onClick={() => navigate(`/product/${item.product_id}`)}
                          >
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            View
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
    </>
  );
};

export default Wishlist;
