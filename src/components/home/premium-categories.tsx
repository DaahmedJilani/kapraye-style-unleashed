import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Import brand images
import womenNewArrival from "@/assets/collections/women-new-arrival.jpeg";
import womenTrendBoss from "@/assets/collections/women-trend-boss.jpeg";
import womenEmbroidery from "@/assets/collections/women-embroidery.jpeg";
import menWhite from "@/assets/collections/men-white.png";
import menNavy from "@/assets/collections/men-navy.png";

interface Category {
  id: string;
  name: string;
  slug: string;
  images: string[];
  description: string;
}

const categories: Category[] = [
  {
    id: "women",
    name: "Women",
    slug: "women",
    images: [womenNewArrival, womenTrendBoss, womenEmbroidery],
    description: "Elegant stitched & unstitched collections",
  },
  {
    id: "men",
    name: "Men",
    slug: "men",
    images: [menWhite, menNavy],
    description: "Premium formal & casual wear",
  },
  {
    id: "kids",
    name: "Kids",
    slug: "kids",
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1000",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000",
    ],
    description: "Adorable styles for little ones",
  },
];

function CategoryCard({ category }: { category: Category }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Auto-scroll through images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % category.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [category.images.length]);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[3/4]"
      onMouseEnter={() => setHoveredId(category.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={() => navigate(`/${category.slug}`)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Sliding Images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={category.images[currentIndex]}
            alt={category.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: hoveredId === category.id ? 1.05 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute top-4 left-4 flex gap-1.5 z-10">
        {category.images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`h-1 rounded-full transition-all ${
              idx === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-playfair font-medium text-white mb-1">
              {category.name}
            </h3>
            <motion.p
              animate={{
                opacity: hoveredId === category.id ? 1 : 0.8,
                y: hoveredId === category.id ? 0 : 5,
              }}
              transition={{ duration: 0.3 }}
              className="text-white/80 text-sm md:text-base"
            >
              {category.description}
            </motion.p>
          </div>

          {/* Arrow Icon */}
          <motion.div
            animate={{
              scale: hoveredId === category.id ? 1.1 : 0.9,
              opacity: hoveredId === category.id ? 1 : 0.7,
            }}
            transition={{ duration: 0.2 }}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0"
          >
            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Hover Border */}
      <motion.div
        animate={{ opacity: hoveredId === category.id ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 rounded-2xl border-2 border-secondary pointer-events-none"
      />
    </motion.div>
  );
}

export function PremiumCategories() {
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

        {/* 3 Cards in 1 Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
