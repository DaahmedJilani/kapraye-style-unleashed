
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ShopTheLookItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ShopTheLookCollection {
  id: string;
  title: string;
  description: string;
  items: ShopTheLookItem[];
}

export function ShopTheLook() {
  const navigate = useNavigate();

  // In a real app, this would come from an API
  const collections: ShopTheLookCollection[] = [
    {
      id: "summer-casual",
      title: "Summer Casual",
      description: "Perfect for warm summer days",
      items: [
        {
          id: "1",
          name: "Linen Shirt",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=60"
        },
        {
          id: "2",
          name: "Cotton Pants",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=60"
        }
      ]
    },
    {
      id: "business-casual",
      title: "Business Casual",
      description: "Elegant office wear",
      items: [
        {
          id: "3",
          name: "Blazer",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&auto=format&fit=crop&q=60"
        },
        {
          id: "4",
          name: "Dress Shirt",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&auto=format&fit=crop&q=60"
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-medium text-kapraye-burgundy mb-4">
            Shop The Look
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover curated collections and complete outfits styled by our fashion experts
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {collections.map((collection) => (
            <Card key={collection.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-playfair">{collection.title}</CardTitle>
                <CardDescription>{collection.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {collection.items.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-sm text-kapraye-burgundy">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full mt-6 bg-kapraye-burgundy hover:bg-kapraye-burgundy/90"
                  onClick={() => navigate(`/collection/${collection.id}`)}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Shop This Look
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
