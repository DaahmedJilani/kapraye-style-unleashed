
import { supabase } from '@/integrations/supabase/client';

export async function addAdminUser(userId: string) {
  try {
    // First check if the user is already an admin to avoid duplicate entries
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (checkError) {
      console.error('Error checking existing admin:', checkError);
      return false;
    }
    
    // If already an admin, return success without inserting
    if (existingAdmin) {
      console.log('User is already an admin');
      return true;
    }
    
    // Insert the new admin user
    const { data, error } = await supabase
      .from('admin_users')
      .insert({ user_id: userId });

    if (error) {
      console.error('Error adding admin user:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error in addAdminUser:', error);
    return false;
  }
}
