
-- Create profiles table if it doesn't exist (enhanced version)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  phone text,
  date_of_birth date,
  loyalty_points integer DEFAULT 0,
  loyalty_tier text DEFAULT 'bronze',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create addresses table for user shipping addresses
CREATE TABLE IF NOT EXISTS public.addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('shipping', 'billing')),
  first_name text NOT NULL,
  last_name text NOT NULL,
  company text,
  address_1 text NOT NULL,
  address_2 text,
  city text NOT NULL,
  state text NOT NULL,
  postcode text NOT NULL,
  country text NOT NULL DEFAULT 'PK',
  phone text,
  is_default boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create orders table to track WooCommerce orders locally
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  woocommerce_order_id integer UNIQUE NOT NULL,
  order_number text,
  status text NOT NULL,
  total decimal(10,2) NOT NULL,
  currency text DEFAULT 'PKR',
  points_earned integer DEFAULT 0,
  points_used integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create loyalty_transactions table to track point history
CREATE TABLE IF NOT EXISTS public.loyalty_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  type text NOT NULL CHECK (type IN ('earned', 'redeemed', 'expired', 'adjustment')),
  points integer NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create wishlist table
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id integer NOT NULL,
  product_name text NOT NULL,
  product_image text,
  product_price decimal(10,2),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(user_id, product_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for addresses
CREATE POLICY "Users can view own addresses" ON public.addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own addresses" ON public.addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own addresses" ON public.addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own addresses" ON public.addresses FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for orders
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for loyalty transactions
CREATE POLICY "Users can view own loyalty transactions" ON public.loyalty_transactions FOR SELECT USING (auth.uid() = user_id);

-- Create RLS policies for wishlist
CREATE POLICY "Users can view own wishlist" ON public.wishlist_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own wishlist" ON public.wishlist_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own wishlist" ON public.wishlist_items FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, loyalty_points)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    0
  );
  RETURN new;
END;
$$;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to award loyalty points
CREATE OR REPLACE FUNCTION public.award_loyalty_points(
  p_user_id uuid,
  p_order_id uuid,
  p_points integer,
  p_description text DEFAULT 'Points earned from purchase'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Update user's total loyalty points
  UPDATE public.profiles 
  SET loyalty_points = loyalty_points + p_points,
      updated_at = now()
  WHERE id = p_user_id;
  
  -- Record the transaction
  INSERT INTO public.loyalty_transactions (user_id, order_id, type, points, description)
  VALUES (p_user_id, p_order_id, 'earned', p_points, p_description);
END;
$$;

-- Create function to redeem loyalty points
CREATE OR REPLACE FUNCTION public.redeem_loyalty_points(
  p_user_id uuid,
  p_order_id uuid,
  p_points integer,
  p_description text DEFAULT 'Points redeemed for discount'
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  current_points integer;
BEGIN
  -- Check if user has enough points
  SELECT loyalty_points INTO current_points 
  FROM public.profiles 
  WHERE id = p_user_id;
  
  IF current_points >= p_points THEN
    -- Deduct points
    UPDATE public.profiles 
    SET loyalty_points = loyalty_points - p_points,
        updated_at = now()
    WHERE id = p_user_id;
    
    -- Record the transaction
    INSERT INTO public.loyalty_transactions (user_id, order_id, type, points, description)
    VALUES (p_user_id, p_order_id, 'redeemed', -p_points, p_description);
    
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END;
$$;
