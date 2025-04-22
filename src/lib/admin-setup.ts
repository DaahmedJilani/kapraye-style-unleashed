
import { supabase } from './supabase';

export async function addAdminUser(userId: string) {
  const { data, error } = await supabase
    .from('admin_users')
    .insert({ user_id: userId });

  if (error) {
    console.error('Error adding admin user:', error);
    return false;
  }

  return true;
}
