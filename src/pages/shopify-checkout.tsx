import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";
import { Helmet } from "react-helmet-async";
import { ShoppingBag, ExternalLink, Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ShopifyCheckoutPage() {
  const { items, updateQuantity, removeItem, createCheckout, isLoading, getCartTotal, getItemsCount } = useCartStore();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const checkoutUrl = await createCheckout();
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const total = getCartTotal();
  const itemCount = getItemsCount();
  const currencyCode = items[0]?.price?.currencyCode || 'PKR';

  if (items.length === 0) {
    return (
      <MainLayout>
        <Helmet>
          <title>Cart - Kaprayé</title>
        </Helmet>
        <div className="container mx-auto px-4 py-20 mt-16 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-playfair font-medium text-primary mb-4">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Add some items to your cart to proceed with checkout
          </p>
          <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cart ({itemCount}) - Kaprayé</title>
        <meta name="description" content="Review your cart and proceed to checkout at Kaprayé." />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-20 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-playfair font-medium text-primary mb-8 text-center">
              Your Cart
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.variantId}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-secondary/20 rounded-lg overflow-hidden flex-shrink-0">
                          {item.product.node.images?.edges?.[0]?.node && (
                            <img
                              src={item.product.node.images.edges[0].node.url}
                              alt={item.product.node.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">
                            {item.product.node.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.selectedOptions.map(opt => opt.value).join(' / ')}
                          </p>
                          <p className="font-semibold text-primary mt-2">
                            {currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                          </p>
                        </div>
                        
                        {/* Quantity & Remove */}
                        <div className="flex flex-col items-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <p className="text-sm font-medium">
                            {currencyCode} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                        <span>{currencyCode} {total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-sm text-muted-foreground">Calculated at checkout</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{currencyCode} {total.toFixed(2)}</span>
                    </div>
                    
                    <Button 
                      onClick={handleCheckout}
                      className="w-full"
                      size="lg"
                      disabled={checkoutLoading || isLoading}
                    >
                      {checkoutLoading || isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating Checkout...
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Proceed to Checkout
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      You'll be redirected to complete your purchase securely
                    </p>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/')}
                    >
                      Continue Shopping
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </MainLayout>
    </>
  );
}