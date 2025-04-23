
import { supabase } from '@/integrations/supabase/client';

export async function isAdmin(userId: string | undefined): Promise<boolean> {
  if (!userId) return false;
  
  try {
    console.log("Checking admin status for user:", userId);
    const { data, error } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();
      
    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
    
    console.log("Admin check result:", data);
    return !!data;
  } catch (error) {
    console.error('Error checking admin status:', error);
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
