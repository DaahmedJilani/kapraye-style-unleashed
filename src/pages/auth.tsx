
import { MainLayout } from "@/components/layout/main-layout";
import { AuthForm } from "@/components/auth/auth-form";

const Auth = () => {
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
