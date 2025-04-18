
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center py-20">
        <div className="container px-4 max-w-lg mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-kapraye-burgundy mb-4">404</h1>
          <p className="text-xl font-playfair text-kapraye-burgundy/80 mb-8">Page not found</p>
          <p className="text-base text-foreground/90 mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Button asChild className="bg-kapraye-burgundy text-white hover:bg-kapraye-burgundy/90">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
