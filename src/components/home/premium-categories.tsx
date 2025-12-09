import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import your brand images
import womenNewArrival from "@/assets/collections/women-new-arrival.jpeg";
import womenTrendBoss from "@/assets/collections/women-trend-boss.jpeg";
import womenEmbroidery from "@/assets/collections/women-embroidery.jpeg";
import menWhite from "@/assets/collections/men-white.png";
import menNavy from "@/assets/collections/men-navy.png";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  badge?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1] as const,
    },
  },
};

const categories: Category[] = [
  {
    id: "women-new",
    name: "New Arrivals",
    slug: "women",
    image: womenNewArrival,
    description: "Fresh styles just dropped",
    badge: "NEW",
  },
  {
    id: "women-trend",
    name: "Trend Boss",
    slug: "women/stitched",
    image: womenTrendBoss,
    description: "Premium stitched collection",
  },
  {
    id: "women-embroidery",
    name: "Embroidery",
    slug: "women/unstitched",
    image: womenEmbroidery,
    description: "Exquisite handcrafted designs",
    badge: "35% OFF",
  },
  {
    id: "men-classic",
    name: "Men's Classic",
    slug: "men",
    image: menWhite,
    description: "Timeless elegance for him",
  },
  {
    id: "men-premium",
    name: "Men's Premium",
    slug: "men/unstitched",
    image: menNavy,
    description: "Luxury unstitched fabrics",
  },
];

export function PremiumCategories() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background" id="categories">
      <div className="container px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-widest text-secondary mb-4">
            Explore
          </span>
          <h2 className="text-3xl md:text-5xl font-playfair font-medium text-foreground mb-4">
            Our Collections
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover premium clothing crafted for those who appreciate quality, style, and cultural heritage.
          </p>
        </motion.div>

        {/* Mobile Scroll Buttons */}
        <div className="flex justify-center gap-4 mb-4 md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Category Grid - Scrollable on mobile */}
        <div className="relative">
          <motion.div
            ref={scrollRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex md:grid md:grid-cols-5 gap-4 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[3/4] flex-shrink-0 w-[280px] md:w-auto snap-center"
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => navigate(`/${category.slug}`)}
              >
                {/* Badge */}
                {category.badge && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      category.badge === "NEW" 
                        ? "bg-secondary text-secondary-foreground" 
                        : "bg-destructive text-destructive-foreground"
                    }`}>
                      {category.badge}
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="absolute inset-0">
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredId === category.id ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                  {/* Category Name */}
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl md:text-2xl font-playfair font-medium text-white mb-1">
                        {category.name}
                      </h3>
                      <motion.p
                        animate={{
                          opacity: hoveredId === category.id ? 1 : 0.8,
                          y: hoveredId === category.id ? 0 : 5,
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-white/80 text-sm"
                      >
                        {category.description}
                      </motion.p>
                    </div>

                    {/* Arrow Icon */}
                    <motion.div
                      animate={{
                        scale: hoveredId === category.id ? 1.1 : 0.9,
                        opacity: hoveredId === category.id ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <motion.div
                  animate={{
                    opacity: hoveredId === category.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-2xl border-2 border-secondary pointer-events-none"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
