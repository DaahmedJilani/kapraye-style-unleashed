import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
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
    id: "women",
    name: "Women",
    slug: "women",
    image: "https://images.unsplash.com/photo-1594736797933-d0301ba6fe65?q=80&w=1000",
    description: "Elegant stitched & unstitched collections",
  },
  {
    id: "men",
    name: "Men",
    slug: "men",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    description: "Premium formal & casual wear",
  },
  {
    id: "kids",
    name: "Kids",
    slug: "kids",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000",
    description: "Adorable styles for little ones",
  },
];

export function PremiumCategories() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
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
            className="rounded-full"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
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
            className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/5] md:aspect-[3/4] flex-shrink-0 w-[280px] md:w-auto snap-center"
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => navigate(`/${category.slug}`)}
              >
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
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  {/* Category Name */}
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-playfair font-medium text-primary-foreground mb-2">
                        {category.name}
                      </h3>
                      <motion.p
                        animate={{
                          opacity: hoveredId === category.id ? 1 : 0.8,
                          y: hoveredId === category.id ? 0 : 5,
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-primary-foreground/80 text-sm md:text-base"
                      >
                        {category.description}
                      </motion.p>
                    </div>

                    {/* Arrow Icon */}
                    <motion.div
                      animate={{
                        scale: hoveredId === category.id ? 1 : 0.8,
                        opacity: hoveredId === category.id ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      <ArrowUpRight className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
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
