
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { isAdmin } from "@/lib/auth";
import { ShieldCheck, User } from "lucide-react";

export default function AdminSetupPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndRoles = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          // Check if user is admin
          const adminStatus = await isAdmin(user.id);
          setIsAdminUser(adminStatus);
          
          // Fetch user's roles
          const { data: userRoles, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id);
          
          if (!error && userRoles) {
            setRoles(userRoles.map(r => r.role));
          }
        }
      } catch (error: any) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndRoles();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 mt-16">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium text-kapraye-burgundy mb-8">
          Role Information
        </h1>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6" />
              Your Account Roles
            </CardTitle>
            <CardDescription>
              View your account roles and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : !user ? (
              <Alert>
                <AlertDescription>
                  Please log in to view your roles.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Roles:</label>
                  <div className="flex flex-wrap gap-2">
                    {roles.length > 0 ? (
                      roles.map((role) => (
                        <Badge 
                          key={role} 
                          variant={role === 'admin' ? 'default' : 'secondary'}
                        >
                          {role}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">No roles assigned</span>
                    )}
                  </div>
                </div>

                {isAdminUser ? (
                  <div className="space-y-4 pt-4">
                    <Alert>
                      <ShieldCheck className="h-4 w-4" />
                      <AlertDescription>
                        You have admin access
                      </AlertDescription>
                    </Alert>
                    <Button 
                      onClick={() => navigate("/admin")}
                      className="w-full"
                    >
                      Go to Admin Dashboard
                    </Button>
                  </div>
                ) : (
                  <Alert>
                    <AlertDescription>
                      You don't have admin access. Contact the site administrator (ahmedjilani97@gmail.com) if you need admin privileges.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
