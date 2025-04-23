
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Users, ShoppingBag, ArrowUp, ArrowDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
  const [adminCount, setAdminCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    
    try {
      // Get admin users count
      const { count: adminCount, error: adminError } = await supabase
        .from('admin_users')
        .select('*', { count: 'exact', head: true });
      
      if (!adminError && adminCount !== null) {
        setAdminCount(adminCount);
      }
      
      // Get products count
      const { count: productCount, error: productError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });
        
      if (!productError && productCount !== null) {
        setProductCount(productCount);
      } else {
        // If no products table yet, just show 0
        setProductCount(0);
      }
      
      // For now, just mock these counts as they will be implemented later
      setOrderCount(0);
      setUserCount(0);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for sales chart
  const recentOrders = [
    { id: '#4532', customer: 'Sarah Johnson', status: 'completed', total: '$129.99', date: '2025-04-22' },
    { id: '#4531', customer: 'Michael Smith', status: 'processing', total: '$89.95', date: '2025-04-21' },
    { id: '#4530', customer: 'Emily Davis', status: 'pending', total: '$212.50', date: '2025-04-21' }
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : productCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Total products in inventory</p>
            <Button asChild variant="ghost" className="p-0 h-auto mt-2 text-xs text-blue-600 hover:text-blue-800">
              <Link to="/admin/products">View all products</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : orderCount}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <span>+0% from last month</span>
            </div>
            <Button asChild variant="ghost" className="p-0 h-auto mt-2 text-xs text-blue-600 hover:text-blue-800">
              <Link to="/admin/orders">View all orders</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : userCount}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <span>+0% from last month</span>
            </div>
            <Button asChild variant="ghost" className="p-0 h-auto mt-2 text-xs text-blue-600 hover:text-blue-800">
              <Link to="/admin/users">View all customers</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : adminCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Users with admin access</p>
            <Button asChild variant="ghost" className="p-0 h-auto mt-2 text-xs text-blue-600 hover:text-blue-800">
              <Link to="/admin/setup">Manage admins</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Sales chart will be available soon
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest orders from your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center">
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">
                        {order.id} - {order.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.date}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {order.total}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[100px] text-muted-foreground">
                No recent orders
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="default" className="w-full justify-start">
              <Link to="/admin/products/new">
                <Package className="mr-2 h-4 w-4" /> 
                Add New Product
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/products/import">
                <Upload className="mr-2 h-4 w-4" /> 
                Import Products
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/orders">
                <ShoppingBag className="mr-2 h-4 w-4" /> 
                View Orders
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
