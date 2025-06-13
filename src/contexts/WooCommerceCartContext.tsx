
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WCProduct, WCCart, WCCartItem } from '@/lib/woocommerce';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  variation_id?: number;
  sku?: string;
}

interface WooCommerceCartContextType {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  addItem: (product: WCProduct, quantity?: number, variationId?: number, size?: string) => Promise<void>;
  removeItem: (itemKey: string) => Promise<void>;
  updateItemQuantity: (itemKey: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getItemsCount: () => number;
  refreshCart: () => Promise<void>;
}

const WooCommerceCartContext = createContext<WooCommerceCartContextType | undefined>(undefined);

export function WooCommerceCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    saveCartToStorage();
  }, [items]);

  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('woo_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
  };

  const saveCartToStorage = () => {
    try {
      localStorage.setItem('woo_cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  };

  const addItem = async (product: WCProduct, quantity = 1, variationId?: number, size?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        quantity,
        image: product.images[0]?.src || '',
        size,
        variation_id: variationId,
        sku: product.sku,
      };

      setItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(
          item => 
            item.id === newItem.id && 
            item.variation_id === newItem.variation_id &&
            item.size === newItem.size
        );

        if (existingItemIndex > -1) {
          // Update existing item quantity
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity;
          return updatedItems;
        } else {
          // Add new item
          return [...prevItems, newItem];
        }
      });

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      setError('Failed to add item to cart');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      setItems(prevItems => prevItems.filter(item => `${item.id}-${item.variation_id || ''}-${item.size || ''}` !== itemId));
      
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } catch (error) {
      setError('Failed to remove item from cart');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateItemQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(itemId);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      setItems(prevItems => 
        prevItems.map(item => {
          const currentItemId = `${item.id}-${item.variation_id || ''}-${item.size || ''}`;
          if (currentItemId === itemId) {
            return { ...item, quantity };
          }
          return item;
        })
      );
    } catch (error) {
      setError('Failed to update item quantity');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update item quantity. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    setError(null);

    try {
      setItems([]);
      localStorage.removeItem('woo_cart');
      
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    } catch (error) {
      setError('Failed to clear cart');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to clear cart. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCartTotal = (): number => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemsCount = (): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const refreshCart = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would sync with WooCommerce cart API
      // For now, we'll just reload from localStorage
      loadCartFromStorage();
    } catch (error) {
      setError('Failed to refresh cart');
    } finally {
      setIsLoading(false);
    }
  };

  const value: WooCommerceCartContextType = {
    items,
    isLoading,
    error,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    getCartTotal,
    getItemsCount,
    refreshCart,
  };

  return (
    <WooCommerceCartContext.Provider value={value}>
      {children}
    </WooCommerceCartContext.Provider>
  );
}

export function useWooCommerceCart() {
  const context = useContext(WooCommerceCartContext);
  if (context === undefined) {
    throw new Error('useWooCommerceCart must be used within a WooCommerceCartProvider');
  }
  return context;
}
