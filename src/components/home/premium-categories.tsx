import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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

// Only Women and Men categories for now
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
];

export function PremiumCategories() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();

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

        {/* Category Grid - 2 columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/5] md:aspect-[3/4]"
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
    </section>
  );
}
