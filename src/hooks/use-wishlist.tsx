import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { ShopifyProduct } from '@/lib/shopify/types';

interface WishlistItem {
  id: string;
  product_id: number;
  product_name: string;
  product_image: string | null;
  product_price: number | null;
  created_at: string;
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchWishlist = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setItems([]);
        return;
      }

      const { data, error } = await supabase
        .from('wishlist_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      console.error('Error fetching wishlist:', err);
      setError(err.message);
    }
  };

  const addToWishlist = async (product: ShopifyProduct) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Please log in",
          description: "You need to be logged in to add items to your wishlist.",
        });
        return false;
      }

      const price = product.node.priceRange?.minVariantPrice?.amount;
      const image = product.node.images?.edges?.[0]?.node?.url;

      const { error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          product_id: parseInt(product.node.id.replace(/\D/g, '').slice(0, 8)) || Date.now(),
          product_name: product.node.title,
          product_image: image || null,
          product_price: price ? parseFloat(price) : null,
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already in wishlist",
            description: "This item is already in your wishlist.",
          });
          return false;
        }
        throw error;
      }

      await fetchWishlist();
      toast({
        title: "Added to wishlist",
        description: `${product.node.title} has been added to your wishlist.`,
      });
      return true;
    } catch (err: any) {
      console.error('Error adding to wishlist:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add item to wishlist.",
      });
      return false;
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      await fetchWishlist();
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      });
      return true;
    } catch (err: any) {
      console.error('Error removing from wishlist:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove item from wishlist.",
      });
      return false;
    }
  };

  const isInWishlist = (productId: number): boolean => {
    return items.some(item => item.product_id === productId);
  };

  const clearWishlist = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setItems([]);
      toast({
        title: "Wishlist cleared",
        description: "All items have been removed from your wishlist.",
      });
      return true;
    } catch (err: any) {
      console.error('Error clearing wishlist:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to clear wishlist.",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchWishlist().finally(() => setLoading(false));

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          fetchWishlist();
        } else {
          setItems([]);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return {
    items,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    refetch: fetchWishlist
  };
}
