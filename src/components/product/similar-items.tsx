
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface SimilarItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

interface SimilarItemsProps {
  currentProductId: string;
}

export function SimilarItems({ currentProductId }: SimilarItemsProps) {
  // In a real app, this would be filtered based on category/style
  const similarItems: SimilarItem[] = [
    {
      id: "2",
      name: "Premium Linen Shirt",
      price: 59.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: "3",
      name: "Organic Cotton V-Neck",
      price: 45.00,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: "4",
      name: "Classic Polo Shirt",
      price: 55.00,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: "5",
      name: "Casual Cotton Blend",
      price: 49.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=60"
    }
  ].filter(item => item.id !== currentProductId);

  return (
    <section className="mt-24 mb-16">
      <h2 className="text-2xl font-light tracking-tight text-gray-900 mb-8 font-cormorant text-center">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {similarItems.map((item) => (
          <Link 
            key={item.id}
            to={`/product/${item.id}`}
            className="group"
          >
            <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-kapraye-burgundy">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < Math.floor(item.rating)
                        ? "fill-current"
                        : index < item.rating
                        ? "fill-current opacity-50"
                        : "opacity-30"
                    }`}
                  />
                ))}
              </div>
              <h3 className="font-light text-gray-900">{item.name}</h3>
              <p className="font-medium text-kapraye-burgundy">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
