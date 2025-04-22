
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { addAdminUser } from "@/lib/admin-setup";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";

export default function AdminSetupPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchCurrentUser() {
      setLoading(true);
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentUser();
  }, []);

  const handleAddAsAdmin = async () => {
    if (!currentUser) return;
    
    setAdding(true);
    try {
      const result = await addAdminUser(currentUser.id);
      if (result) {
        setSuccess(true);
        toast({
          title: "Success",
          description: "You've been added as an admin user!",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add you as an admin. Please check console for details.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error adding admin:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 mt-16">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium text-kapraye-burgundy mb-8">
          Admin Setup
        </h1>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Set Up Admin Access</CardTitle>
            <CardDescription>
              Add yourself as an admin user to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : !currentUser ? (
              <div className="text-center py-4">
                <p className="mb-4">You need to be logged in to perform this action.</p>
                <Button onClick={() => window.location.href = "/auth"}>
                  Go to Login Page
                </Button>
              </div>
            ) : success ? (
              <div className="text-center py-4">
                <p className="text-green-600 mb-4">✅ Successfully added you as an admin!</p>
                <Button onClick={() => window.location.href = "/admin"}>
                  Go to Admin Dashboard
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {currentUser && (
                  <div className="p-4 bg-gray-50 rounded-md">
                    <p className="font-medium">Your User ID:</p>
                    <p className="text-sm break-all mt-1">{currentUser?.id}</p>
                  </div>
                )}
                <Button 
                  onClick={handleAddAsAdmin}
                  disabled={adding}
                  className="w-full"
                >
                  {adding ? "Adding..." : "Add Me As Admin"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
