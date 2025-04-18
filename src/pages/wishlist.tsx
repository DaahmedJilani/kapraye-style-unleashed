
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Wishlist = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-kapraye-burgundy">My Wishlist</CardTitle>
            <CardDescription>Save your favorite items for later</CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: Implement wishlist items grid */}
            <p className="text-muted-foreground">Your wishlist is empty</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

export default Wishlist;
