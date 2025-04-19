
import { ShoppingBag } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function ShoppingCart({ items, onUpdateQuantity, onRemoveItem }: ShoppingCartProps) {
  const { toast } = useToast();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "Redirecting to payment...",
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-4 w-4" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Shopping Cart ({items.length} items)</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground">Your cart is empty</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          <DrawerFooter>
            {items.length > 0 && (
              <>
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full">
                  Checkout
                </Button>
              </>
            )}
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
