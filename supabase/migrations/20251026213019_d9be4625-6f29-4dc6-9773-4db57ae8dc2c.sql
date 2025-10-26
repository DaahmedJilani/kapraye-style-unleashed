-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  loyalty_points INTEGER NOT NULL DEFAULT 0,
  loyalty_tier TEXT NOT NULL DEFAULT 'bronze',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create loyalty_transactions table
CREATE TABLE public.loyalty_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('earned', 'redeemed', 'expired', 'adjustment')),
  points INTEGER NOT NULL,
  description TEXT NOT NULL,
  order_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on loyalty_transactions
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;

-- Loyalty transactions RLS policies
CREATE POLICY "Users can view their own transactions"
  ON public.loyalty_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Create wishlist_items table
CREATE TABLE public.wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  product_price NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS on wishlist_items
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;

-- Wishlist RLS policies
CREATE POLICY "Users can view their own wishlist"
  ON public.wishlist_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their wishlist"
  ON public.wishlist_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their wishlist"
  ON public.wishlist_items FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$;

-- Trigger to auto-create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger for profiles updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create function to update loyalty tier based on points
CREATE OR REPLACE FUNCTION public.update_loyalty_tier()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.loyalty_points >= 5000 THEN
    NEW.loyalty_tier = 'platinum';
  ELSIF NEW.loyalty_points >= 2500 THEN
    NEW.loyalty_tier = 'gold';
  ELSIF NEW.loyalty_points >= 1000 THEN
    NEW.loyalty_tier = 'silver';
  ELSE
    NEW.loyalty_tier = 'bronze';
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to auto-update loyalty tier
CREATE TRIGGER update_tier_on_points_change
  BEFORE INSERT OR UPDATE OF loyalty_points ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_loyalty_tier();

-- Create indexes for performance
CREATE INDEX idx_loyalty_transactions_user_id ON public.loyalty_transactions(user_id);
CREATE INDEX idx_loyalty_transactions_created_at ON public.loyalty_transactions(created_at DESC);
CREATE INDEX idx_wishlist_items_user_id ON public.wishlist_items(user_id);
CREATE INDEX idx_wishlist_items_product_id ON public.wishlist_items(product_id);