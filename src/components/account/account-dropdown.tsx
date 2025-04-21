
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export function AccountDropdown() {
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const getUser = async () => {
      // Skip if Supabase client is not initialized
      if (!supabase) {
        console.warn('Supabase client not initialized. Auth functionality will be limited.');
        return;
      }
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    
    getUser();
    
    // Only set up auth listener if supabase client exists
    if (supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user ?? null);
        }
      );
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);
  
  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      window.location.href = "/";
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="p-2 rounded-full hover:bg-kapraye-cream/50 transition-colors"
          aria-label="Account Menu"
        >
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {user ? (
          <>
            <DropdownMenuItem asChild>
              <Link to="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link to="/admin">Admin Panel</Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link to="/wishlist">Wishlist</Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link to="/auth">Sign In</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/wishlist">Wishlist</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
