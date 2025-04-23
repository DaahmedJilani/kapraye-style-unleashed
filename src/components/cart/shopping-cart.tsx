
import { useState } from "react";
import { ShoppingBag, Minus, Plus, Trash2, Banknote } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { useCart } from "@/contexts/CartContext";

export function ShoppingCart() {
  const { toast } = useToast();
  const { formatPrice, t } = useAppSettings();
  const { items, updateItemQuantity, removeItem } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  const handleCheckout = () => {
    setShowPaymentMethods(true);
  };

  const handlePaymentMethod = (method: string) => {
    setShowPaymentMethods(false);
    toast({
      title: `${method} Selected`,
      description: "Proceeding with your order. You'll be contacted with payment instructions.",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-4 w-4" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-kapraye-burgundy text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="space-y-2.5">
          <SheetTitle className="font-playfair text-2xl">{t('cart.title')} ({items.length})</SheetTitle>
          <Separator />
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg mb-2">{t('cart.empty')}</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t('cart.empty')}
            </p>
            <SheetClose asChild>
              <Button variant="outline">{t('cart.continue')}</Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-1">
              <div className="space-y-4 pt-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-accent/50 p-4 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-medium line-clamp-2">{item.name}</h4>
                          {item.size && (
                            <p className="text-sm text-muted-foreground mt-1">{t('product.size')}: {item.size}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-medium text-kapraye-burgundy">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-6">
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t('cart.subtotal')}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('cart.shipping')}</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <span>{t('cart.total')}</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              {!showPaymentMethods && (
                <Button onClick={handleCheckout} className="w-full" size="lg">
                  {t('cart.checkout')} ({formatPrice(total)})
                </Button>
              )}
              {showPaymentMethods && (
                <div className="flex flex-col gap-3">
                  <span className="text-center font-medium text-lg mb-2">Choose Payment Method</span>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 w-full"
                    onClick={() => handlePaymentMethod('JazzCash')}
                  >
                    <Banknote className="h-5 w-5 text-yellow-500" />
                    JazzCash
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 w-full"
                    onClick={() => handlePaymentMethod('EasyPaisa')}
                  >
                    <Banknote className="h-5 w-5 text-green-600" />
                    EasyPaisa
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 w-full"
                    onClick={() => handlePaymentMethod('Bank Transfer')}
                  >
                    <Banknote className="h-5 w-5 text-blue-600" />
                    Bank Transfer
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 w-full"
                    onClick={() => handlePaymentMethod('Cash on Delivery')}
                  >
                    <Banknote className="h-5 w-5" />
                    Cash on Delivery
                  </Button>
                </div>
              )}
              <SheetClose asChild>
                <Button variant="outline" className="w-full">
                  {t('cart.continue')}
                </Button>
              </SheetClose>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
