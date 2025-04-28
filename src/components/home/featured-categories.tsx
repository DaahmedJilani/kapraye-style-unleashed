
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "men",
    name: "Men",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000",
    description: "Sophisticated elegance for the modern gentleman"
  },
  {
    id: "women",
    name: "Women",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1000",
    description: "Timeless fashion with contemporary flair"
  },
  {
    id: "kids",
    name: "Kids",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000",
    description: "Playful styles for the little trendsetters"
  },
  {
    id: "eastern",
    name: "Eastern",
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1000",
    description: "Cultural aesthetics with modern sensibilities"
  },
  {
    id: "western",
    name: "Western",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000",
    description: "Contemporary designs for everyday luxury"
  },
  {
    id: "saudi",
    name: "Saudi Style",
    image: "https://images.unsplash.com/photo-1633934542143-827a422485a4?q=80&w=1000",
    description: "Traditional elegance meets modern design"
  },
];

export function FeaturedCategories() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isMobile = useIsMobile();

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
            <a 
              key={category.id}
              href={`#${category.id}`}
              className="group relative overflow-hidden rounded-lg md:rounded-xl aspect-[3/4] md:aspect-[4/5] hover-lift"
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
              onLoad={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.classList.add("animate-fade-in");
              }}
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
