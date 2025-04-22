
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  User,
  ShoppingBag,
  Gift,
  LogOut,
  Home,
  Heart,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NavItem {
  icon: typeof User;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Overview", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: ShoppingBag, label: "Orders", href: "/dashboard/orders" },
  { icon: Gift, label: "SHUKRAN Rewards", href: "/dashboard/loyalty" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    
    getUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
          <div className="flex h-full flex-col">
            <div className="p-6">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-playfair font-medium">
                  <span className="font-above-beyond text-kapraye-burgundy">Kaprayé</span>
                </span>
              </Link>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-kapraye-burgundy text-white"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label === "Overview" ? (
                    <span className="font-above-beyond">Kaprayé</span>
                  ) : (
                    item.label
                  )}
                </Link>
              ))}
              
              {user?.email && (
                <Link
                  to="/admin"
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname.startsWith("/admin")
                      ? "bg-kapraye-burgundy text-white"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Settings className="mr-3 h-4 w-4" />
                  Admin Panel
                </Link>
              )}
            </nav>
            <div className="border-t p-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-accent-foreground"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>
        {/* Main content */}
        <main className="ml-64 flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
