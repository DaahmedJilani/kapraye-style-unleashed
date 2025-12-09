import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import brand images
import womenNewArrival from "@/assets/collections/women-new-arrival.jpeg";
import womenTrendBoss from "@/assets/collections/women-trend-boss.jpeg";
import womenEmbroidery from "@/assets/collections/women-embroidery.jpeg";
import menWhite from "@/assets/collections/men-white.png";
import menNavy from "@/assets/collections/men-navy.png";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  badge?: string;
}

const womenItems: CategoryItem[] = [
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
];

const menItems: CategoryItem[] = [
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

const kidsItems: CategoryItem[] = [
  {
    id: "kids-boys",
    name: "Boys",
    slug: "kids/boys",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800",
    description: "Cool styles for boys",
  },
  {
    id: "kids-girls",
    name: "Girls",
    slug: "kids/girls",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800",
    description: "Pretty outfits for girls",
  },
  {
    id: "kids-babies",
    name: "Babies",
    slug: "kids/babies",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800",
    description: "Adorable baby wear",
  },
];

interface CategoryRowProps {
  title: string;
  items: CategoryItem[];
  href: string;
}

function CategoryRow({ title, items, href }: CategoryRowProps) {
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
    <div className="mb-12">
      {/* Row Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl md:text-3xl font-playfair font-medium text-foreground">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-secondary hover:text-primary"
            onClick={() => navigate(href)}
          >
            View All
          </Button>
          <div className="hidden sm:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-border"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-border"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable Items */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[3/4] flex-shrink-0 w-[260px] md:w-[280px] snap-center"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => navigate(`/${item.slug}`)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {/* Badge */}
            {item.badge && (
              <div className="absolute top-4 left-4 z-20">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  item.badge === "NEW" 
                    ? "bg-secondary text-secondary-foreground" 
                    : "bg-destructive text-destructive-foreground"
                }`}>
                  {item.badge}
                </span>
              </div>
            )}

            {/* Image */}
            <div className="absolute inset-0">
              <motion.img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                animate={{
                  scale: hoveredId === item.id ? 1.05 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <div className="flex items-end justify-between">
                <div>
                  <h4 className="text-xl font-playfair font-medium text-white mb-1">
                    {item.name}
                  </h4>
                  <p className="text-white/80 text-sm">
                    {item.description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <motion.div
                  animate={{
                    scale: hoveredId === item.id ? 1.1 : 0.9,
                    opacity: hoveredId === item.id ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0"
                >
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </div>

            {/* Hover Border */}
            <motion.div
              animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 rounded-2xl border-2 border-secondary pointer-events-none"
            />
          </motion.div>
        ))}
      </div>
    </div>
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

        {/* Women Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <CategoryRow title="Women" items={womenItems} href="/women" />
        </motion.div>

        {/* Men Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CategoryRow title="Men" items={menItems} href="/men" />
        </motion.div>

        {/* Kids Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CategoryRow title="Kids" items={kidsItems} href="/kids" />
        </motion.div>
      </div>
    </section>
  );
}
