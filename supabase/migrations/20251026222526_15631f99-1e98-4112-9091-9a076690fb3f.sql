-- Fix orders table security: Make user_id NOT NULL to prevent anonymous orders
-- This ensures all orders are tied to a user and RLS policies work correctly

-- First, check if there are any orders without a user_id and delete them (orphaned orders)
DELETE FROM public.orders WHERE user_id IS NULL;

-- Now make user_id NOT NULL
ALTER TABLE public.orders 
ALTER COLUMN user_id SET NOT NULL;

-- Add a comment for documentation
COMMENT ON COLUMN public.orders.user_id IS 'User who placed the order - required for RLS security';
