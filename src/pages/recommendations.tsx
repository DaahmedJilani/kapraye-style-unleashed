
import { useLocation, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/main-layout";
import { ShopTheLook } from "@/components/product/shop-the-look";

export default function Recommendations() {
  const location = useLocation();
  const answers = location.state?.answers;

  if (!answers) {
    return <Navigate to="/quiz" replace />;
  }

  return (
    <MainLayout>
      <div className="py-16">
        <div className="container px-4">
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl font-playfair text-center text-kapraye-burgundy">
                Your Personalized Style Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 max-w-2xl mx-auto">
                Based on your style preferences, we've curated these looks just for you.
              </p>
            </CardContent>
          </Card>
          <ShopTheLook />
        </div>
      </div>
    </MainLayout>
  );
}
