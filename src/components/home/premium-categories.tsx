import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  route: string;
  itemCount: string;
  featured?: boolean;
}

const categories: Category[] = [
  {
    id: "women",
    name: "Women",
    image: "https://images.unsplash.com/photo-1594736797933-d0301ba6fe65?q=80&w=1000",
    description: "Eastern, Western & Saudi styles",
    route: "/women",
    itemCount: "250+ styles",
    featured: true,
  },
  {
    id: "men",
    name: "Men",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    description: "Contemporary menswear",
    route: "/men",
    itemCount: "180+ styles",
    featured: true,
  },
  {
    id: "kids",
    name: "Kids",
    image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?q=80&w=1000",
    description: "Stylish outfits for little ones",
    route: "/kids",
    itemCount: "120+ styles",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1617038260892-a3caa4e5f96e?q=80&w=1000",
    description: "Complete your look",
    route: "/accessories",
    itemCount: "90+ items",
  },
  {
    id: "perfumes",
    name: "Perfumes",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000",
    description: "Luxurious fragrances",
    route: "/perfumes",
    itemCount: "60+ scents",
  },
  {
    id: "shoes",
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000",
    description: "Step out in style",
    route: "/shoes",
    itemCount: "100+ pairs",
  },
];

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
            Discover premium clothing and accessories crafted for those who appreciate quality, style, and cultural heritage.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]"
        >
          {categories.map((category, index) => {
            // Determine grid span based on featured status and position
            const isLarge = category.featured;
            const gridClass = isLarge 
              ? "col-span-2 row-span-2" 
              : "col-span-1 row-span-1";

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className={`${gridClass} group relative overflow-hidden rounded-2xl cursor-pointer`}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => navigate(category.route)}
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
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                  {/* Featured Badge */}
                  {category.featured && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                    >
                      Featured
                    </motion.span>
                  )}

                  {/* Category Name */}
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className={`font-playfair font-medium text-primary-foreground mb-1 ${
                        isLarge ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                      }`}>
                        {category.name}
                      </h3>
                      <motion.p
                        animate={{
                          opacity: hoveredId === category.id ? 1 : 0.8,
                          y: hoveredId === category.id ? 0 : 5,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`text-primary-foreground/80 ${isLarge ? "text-sm" : "text-xs"}`}
                      >
                        {isLarge ? category.description : category.itemCount}
                      </motion.p>
                      {isLarge && (
                        <motion.span
                          animate={{
                            opacity: hoveredId === category.id ? 1 : 0.7,
                          }}
                          className="text-xs text-primary-foreground/60 mt-1 block"
                        >
                          {category.itemCount}
                        </motion.span>
                      )}
                    </div>

                    {/* Arrow Icon */}
                    <motion.div
                      animate={{
                        scale: hoveredId === category.id ? 1 : 0.8,
                        opacity: hoveredId === category.id ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
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
            );
          })}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate("/women")}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-secondary transition-colors group"
          >
            View All Collections
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
