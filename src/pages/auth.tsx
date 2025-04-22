
import { MainLayout } from "@/components/layout/main-layout";
import { AuthForm } from "@/components/auth/auth-form";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <AuthForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default Auth;
