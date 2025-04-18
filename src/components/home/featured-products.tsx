
interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

const products: Product[] = [
  {
    id: "prod-1",
    name: "Silk Blend Kurta",
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800",
    price: 120.00,
    category: "Eastern"
  },
  {
    id: "prod-2",
    name: "Premium Linen Shirt",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800",
    price: 89.50,
    category: "Men"
  },
  {
    id: "prod-3",
    name: "Designer Evening Gown",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800",
    price: 250.00,
    category: "Women"
  },
  {
    id: "prod-4",
    name: "Traditional Embroidered Thobe",
    image: "https://images.unsplash.com/photo-1597346908500-28cda8acfe4e?q=80&w=800",
    price: 175.00,
    category: "Saudi Style"
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-gradient-to-b from-kapraye-cream/20 to-white">
      <div className="container px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair font-medium text-kapraye-burgundy mb-4">
              Latest Arrivals
            </h2>
            <p className="text-base text-foreground/90 max-w-2xl">
              Discover our newest collection of premium fashion pieces.
            </p>
          </div>
          <a 
            href="#all-products" 
            className="mt-4 md:mt-0 text-kapraye-burgundy hover:text-kapraye-pink transition-colors flex items-center group"
          >
            View All Products
            <svg 
              className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex justify-between">
                  <h3 className="text-sm text-kapraye-burgundy">
                    {product.category}
                  </h3>
                </div>
                <h3 className="font-playfair text-lg font-medium text-foreground">
                  {product.name}
                </h3>
                <p className="text-base font-medium text-kapraye-pink">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              {/* Hover overlay with quick actions */}
              <div className="absolute inset-0 flex items-center justify-center bg-kapraye-burgundy/0 group-hover:bg-kapraye-burgundy/10 transition-colors duration-300 opacity-0 group-hover:opacity-100">
                <div className="bg-white rounded-full p-3 m-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <svg className="w-5 h-5 text-kapraye-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="bg-white rounded-full p-3 m-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75">
                  <svg className="w-5 h-5 text-kapraye-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="bg-white rounded-full p-3 m-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform delay-150">
                  <svg className="w-5 h-5 text-kapraye-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
