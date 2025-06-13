
import React, { useState } from 'react';
import { ShoppingBag, Minus, Plus, Trash2, X, Package, Truck } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAppSettings } from '@/contexts/AppSettingsContext';
import { useWooCommerceCart } from '@/contexts/WooCommerceCartContext';
import { useNavigate } from 'react-router-dom';

export function EnhancedShoppingCart() {
  const { formatPrice } = useAppSettings();
  const { 
    items, 
    updateItemQuantity, 
    removeItem, 
    getCartTotal, 
    getItemsCount,
    isLoading 
  } = useWooCommerceCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;
  const itemsCount = getItemsCount();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  const handleRemoveItem = async (item: any) => {
    const itemId = `${item.id}-${item.variation_id || ''}-${item.size || ''}`;
    await removeItem(itemId);
  };

  const handleUpdateQuantity = async (item: any, newQuantity: number) => {
    const itemId = `${item.id}-${item.variation_id || ''}-${item.size || ''}`;
    await updateItemQuantity(itemId, newQuantity);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {itemsCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-kapraye-burgundy text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
              {itemsCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-playfair text-2xl">
              Shopping Cart ({itemsCount})
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              Looks like you haven't added any items to your cart yet.
            </p>
            <SheetClose asChild>
              <Button 
                onClick={() => navigate('/')}
                className="bg-kapraye-burgundy hover:bg-kapraye-burgundy/90"
              >
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.variation_id}-${item.size}`} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="relative">
                      <img
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      {item.size && (
                        <Badge className="absolute -top-2 -right-2 text-xs bg-kapraye-burgundy">
                          {item.size}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <h4 className="font-medium line-clamp-2 text-sm">
                            {item.name}
                          </h4>
                          {item.sku && (
                            <p className="text-xs text-gray-500 mt-1">SKU: {item.sku}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-red-500 h-8 w-8"
                          onClick={() => handleRemoveItem(item)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none hover:bg-gray-100"
                            onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isLoading}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none hover:bg-gray-100"
                            onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                            disabled={isLoading}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-kapraye-burgundy">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatPrice(item.price)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t bg-white p-6 space-y-4">
              {/* Shipping Notice */}
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Truck className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">
                  {shipping === 0 
                    ? "Free shipping included!" 
                    : `Add ${formatPrice(100 - subtotal)} more for free shipping`
                  }
                </span>
              </div>

              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-kapraye-burgundy">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleCheckout} 
                  className="w-full h-12 bg-kapraye-burgundy hover:bg-kapraye-burgundy/90 text-white font-medium"
                  disabled={isLoading}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Checkout ({formatPrice(total)})
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <SheetClose asChild>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/cart')}
                      className="h-10"
                    >
                      View Cart
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button 
                      variant="ghost" 
                      onClick={() => navigate('/')}
                      className="h-10"
                    >
                      Continue Shopping
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
