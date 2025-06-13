
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LoyaltyTransaction {
  id: string;
  type: 'earned' | 'redeemed' | 'expired' | 'adjustment';
  points: number;
  description: string;
  created_at: string;
  order_id?: string;
}

interface UserProfile {
  id: string;
  full_name: string | null;
  loyalty_points: number;
  loyalty_tier: string;
  phone: string | null;
  avatar_url: string | null;
}

export function useLoyalty() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      // Transform the data to match UserProfile interface
      const profileData: UserProfile = {
        id: data.id,
        full_name: data.full_name,
        loyalty_points: data.loyalty_points || 0,
        loyalty_tier: data.loyalty_tier || 'bronze',
        phone: data.phone,
        avatar_url: data.avatar_url
      };
      
      setProfile(profileData);
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError(err.message);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('loyalty_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      // Transform the data to match LoyaltyTransaction interface
      const transactionData: LoyaltyTransaction[] = (data || []).map(item => ({
        id: item.id,
        type: item.type as 'earned' | 'redeemed' | 'expired' | 'adjustment',
        points: item.points,
        description: item.description || '',
        created_at: item.created_at,
        order_id: item.order_id || undefined
      }));
      
      setTransactions(transactionData);
    } catch (err: any) {
      console.error('Error fetching transactions:', err);
      setError(err.message);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id);

      if (error) throw error;

      await fetchProfile();
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (err: any) {
      console.error('Error updating profile:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    }
  };

  const canRedeem = (points: number): boolean => {
    return profile ? profile.loyalty_points >= points : false;
  };

  const getTierProgress = () => {
    if (!profile) return { current: 0, next: 1000, progress: 0 };
    
    const tiers = {
      bronze: { min: 0, max: 1000 },
      silver: { min: 1000, max: 2500 },
      gold: { min: 2500, max: 5000 },
      platinum: { min: 5000, max: Infinity }
    };

    const currentTier = tiers[profile.loyalty_tier as keyof typeof tiers] || tiers.bronze;
    const points = profile.loyalty_points;
    
    if (currentTier.max === Infinity) {
      return { current: points, next: currentTier.max, progress: 100 };
    }

    const progress = ((points - currentTier.min) / (currentTier.max - currentTier.min)) * 100;
    return {
      current: points,
      next: currentTier.max,
      progress: Math.min(progress, 100)
    };
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProfile(), fetchTransactions()]);
      setLoading(false);
    };

    loadData();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          loadData();
        } else {
          setProfile(null);
          setTransactions([]);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return {
    profile,
    transactions,
    loading,
    error,
    updateProfile,
    canRedeem,
    getTierProgress,
    refetch: () => Promise.all([fetchProfile(), fetchTransactions()])
  };
}
