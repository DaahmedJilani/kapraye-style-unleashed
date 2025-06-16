
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  route: string;
}

const categories: Category[] = [
  {
    id: "women",
    name: "Women",
    image: "https://images.unsplash.com/photo-1594736797933-d0301ba6fe65?q=80&w=1000",
    description: "Eastern, Western & Saudi styles with makeup essentials",
    route: "/women"
  },
  {
    id: "men",
    name: "Men",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    description: "Contemporary and traditional menswear collection",
    route: "/men"
  },
  {
    id: "kids",
    name: "Kids",
    image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?q=80&w=1000",
    description: "Stylish outfits for the little fashionistas",
    route: "/kids"
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1617038260892-a3caa4e5f96e?q=80&w=1000",
    description: "Complete your look with elegant accessories",
    route: "/accessories"
  },
  {
    id: "perfumes",
    name: "Perfumes",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000",
    description: "Luxurious fragrances for every occasion",
    route: "/perfumes"
  },
  {
    id: "shoes",
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000",
    description: "Step out in style with our footwear collection",
    route: "/shoes"
  },
];

export function FeaturedCategories() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleCategoryClick = (route: string) => {
    navigate(route);
  };

  return (
    <section className="py-6 md:py-20 bg-white" id="categories">
      <div className="container px-3 md:px-8">
        <div className="text-center mb-6 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-playfair font-medium text-kapraye-burgundy mb-2 md:mb-4">
            Explore Our Collections
          </h2>
          <p className="text-sm md:text-base text-foreground/90 max-w-2xl mx-auto">
            Discover premium clothing and accessories crafted for those who appreciate 
            quality, style, and cultural heritage.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className="group relative overflow-hidden rounded-lg md:rounded-xl aspect-[3/4] md:aspect-[4/5] hover-lift cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleCategoryClick(category.route)}
            >
              {/* Image */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-kapraye-burgundy/70"></div>
              </div>
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-6 text-white">
                <h3 className="text-base sm:text-lg md:text-2xl font-playfair font-medium mb-0 md:mb-1 text-shadow">
                  {category.name}
                </h3>
                
                {!isMobile ? (
                  <>
                    <p className={`text-xs md:text-sm text-white/90 max-w-xs transition-opacity duration-300 ${hoveredId === category.id ? 'opacity-100' : 'opacity-80'}`}>
                      {category.description}
                    </p>
                    <div className={`mt-2 md:mt-4 overflow-hidden transition-all duration-300 ${hoveredId === category.id ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <span className="inline-flex items-center text-xs md:text-sm font-medium">
                        Explore
                        <svg className="w-3 h-3 md:w-4 md:h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-xs text-white/80">Explore</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
