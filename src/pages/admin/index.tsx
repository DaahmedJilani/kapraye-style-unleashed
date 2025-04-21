
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchStats = async () => {
    setLoading(true);
    
    try {
      // Get product count
      const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });
      
      if (!error && count !== null) {
        setProductCount(count);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 mt-16">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium text-kapraye-burgundy mb-8">
          Admin Dashboard
        </h1>

        {!user ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Authentication Required</h2>
            <p className="mb-6">You need to be logged in to access the admin dashboard.</p>
            <Button asChild>
              <Link to="/auth">Log In</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage your product inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {loading ? "..." : productCount}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Total products</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to="/admin/products">Manage Products</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>View and manage customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">0</div>
                  <p className="text-sm text-muted-foreground mt-1">Total orders</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customers</CardTitle>
                  <CardDescription>View customer information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">0</div>
                  <p className="text-sm text-muted-foreground mt-1">Registered users</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <h2 className="text-2xl font-playfair font-medium text-kapraye-burgundy mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              <Button asChild variant="outline" className="h-auto py-4 justify-start">
                <Link to="/admin/products">
                  <div>
                    <div className="font-medium">Manage Products</div>
                    <div className="text-sm text-muted-foreground mt-1">Add, edit or remove products from your inventory</div>
                  </div>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto py-4 justify-start" disabled>
                <div>
                  <div className="font-medium">View Orders</div>
                  <div className="text-sm text-muted-foreground mt-1">Process and manage customer orders (Coming Soon)</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto py-4 justify-start" disabled>
                <div>
                  <div className="font-medium">Website Settings</div>
                  <div className="text-sm text-muted-foreground mt-1">Update banners, featured items and more (Coming Soon)</div>
                </div>
              </Button>
            </div>
            
            <Separator className="my-8" />
            
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                Logged in as {user.email}
              </p>
              <Button 
                variant="link" 
                className="mt-2"
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = "/";
                }}
              >
                Sign Out
              </Button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
