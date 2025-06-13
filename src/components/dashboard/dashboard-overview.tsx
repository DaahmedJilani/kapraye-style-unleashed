
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, ShoppingBag, Heart, Loader2 } from "lucide-react";
import { useLoyalty } from "@/hooks/use-loyalty";
import { useWishlist } from "@/hooks/use-wishlist";

export function DashboardOverview() {
  const { profile, loading: loyaltyLoading } = useLoyalty();
  const { items: wishlistItems, loading: wishlistLoading } = useWishlist();

  if (loyaltyLoading || wishlistLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-kapraye-burgundy">
          Welcome Back{profile?.full_name ? `, ${profile.full_name}` : ''}
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's your account overview
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SHUKRAN Points</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-kapraye-burgundy">
              {profile?.loyalty_points || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {profile?.loyalty_tier || 'Bronze'} tier member
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No recent orders
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wishlistItems.length}</div>
            <p className="text-xs text-muted-foreground">
              Items saved for later
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
