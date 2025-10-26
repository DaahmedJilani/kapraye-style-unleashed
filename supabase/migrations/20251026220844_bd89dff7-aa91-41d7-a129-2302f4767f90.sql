-- Phase A: Fix Role System - Remove duplicate customer roles from admins
-- and update trigger to not auto-assign customer to admins/staff

-- 1. Remove customer role from users who have admin or staff role
DELETE FROM public.user_roles 
WHERE role = 'customer' 
AND user_id IN (
  SELECT user_id FROM public.user_roles WHERE role IN ('admin', 'staff')
);

-- 2. Drop and recreate the trigger function to be role-aware
DROP FUNCTION IF EXISTS public.handle_new_user_role() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Only assign customer role if user doesn't already have admin or staff role
  -- This prevents auto-assigning customer to manually created admin accounts
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = NEW.id 
    AND role IN ('admin', 'staff')
  ) THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'customer');
  END IF;
  
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;
CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();