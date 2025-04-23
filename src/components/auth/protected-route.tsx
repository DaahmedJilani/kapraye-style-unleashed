
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAdmin, getCurrentUser } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const user = await getCurrentUser();
        
        if (!user) {
          console.log("No user found, redirecting to auth");
          setHasAccess(false);
          setLoading(false);
          return;
        }
        
        // Check admin status
        const adminStatus = await isAdmin(user.id);
        console.log("Admin status check result:", adminStatus, "for user:", user.id);
        setHasAccess(adminStatus);
        
        if (!adminStatus) {
          console.log("User is not an admin:", user.id);
        }
      } catch (err: any) {
        console.error("Error in protected route:", err);
        setError(err?.message || "Failed to verify admin access");
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
    
    // Don't need to recheck on auth state changes since we're already checking
    // when the component mounts, and we'll navigate away if the user is not an admin
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Spinner className="mx-auto" />
          <p className="mt-4">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-md p-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!hasAccess) {
    // Store the attempted URL to redirect back after login
    return <Navigate to="/admin/setup" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
