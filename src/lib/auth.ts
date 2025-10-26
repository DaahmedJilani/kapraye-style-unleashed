
import { supabase } from '@/integrations/supabase/client';

export async function isAdmin(userId: string | undefined): Promise<boolean> {
  if (!userId) return false;
  
  try {
    const { data, error } = await supabase.rpc('is_admin', { 
      _user_id: userId 
    });
    
    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
    
    return data === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

export async function hasRole(
  userId: string | undefined, 
  role: 'admin' | 'staff' | 'customer'
): Promise<boolean> {
  if (!userId) return false;
  
  try {
    const { data, error } = await supabase.rpc('has_role', { 
      _user_id: userId,
      _role: role
    });
    
    if (error) {
      console.error('Error checking role:', error);
      return false;
    }
    
    return data === true;
  } catch (error) {
    console.error('Error checking role:', error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}
