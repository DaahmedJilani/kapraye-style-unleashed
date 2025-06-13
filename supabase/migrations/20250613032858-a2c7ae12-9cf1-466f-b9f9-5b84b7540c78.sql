
-- Add missing columns to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN loyalty_tier text DEFAULT 'bronze',
ADD COLUMN phone text;
