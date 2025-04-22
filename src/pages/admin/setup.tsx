
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
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

  const supabaseInitialized = !!supabase;

  useEffect(() => {
    async function fetchCurrentUser() {
      setLoading(true);
      if (!supabaseInitialized) {
        setLoading(false);
        return;
      }
      
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
  }, [supabaseInitialized]);

  const handleAddAsAdmin = async () => {
    if (!currentUser || !supabaseInitialized) return;
    
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
    } catch (error) {
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
            {!supabaseInitialized && (
              <>
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Configuration Error</AlertTitle>
                  <AlertDescription>
                    Supabase client not initialized. Please set up your Supabase environment variables first.
                  </AlertDescription>
                </Alert>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-900">How to fix this:</h3>
                      <ol className="mt-2 space-y-2 text-sm text-blue-800">
                        <li>
                          1. Click the green Supabase button in the top right of the Lovable interface
                        </li>
                        <li>
                          2. Connect to or create a Supabase project
                        </li>
                        <li>
                          3. After connecting, Lovable will automatically set up the required environment variables
                        </li>
                        <li>
                          4. Refresh this page after connecting to Supabase
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : !currentUser && supabaseInitialized ? (
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
                  disabled={adding || !supabaseInitialized || !currentUser}
                  className="w-full"
                >
                  {adding ? "Adding..." : "Add Me As Admin"}
                </Button>
                {!supabaseInitialized && (
                  <p className="text-center text-sm text-gray-500">
                    You need to set up Supabase to use this feature
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
