
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAdmin, getCurrentUser } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const user = await getCurrentUser();
      if (user) {
        const adminStatus = await isAdmin(user.id);
        setHasAccess(adminStatus);
      }
      setLoading(false);
    };

    checkAccess();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasAccess) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
