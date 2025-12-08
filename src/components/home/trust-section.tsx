
import { Shield, Truck, RotateCcw, Heart, Star, Award } from "lucide-react";
import { motion } from "framer-motion";

const trustFeatures = [
  {
    icon: Shield,
    title: "100% Authentic",
    description: "All products are sourced directly from verified suppliers"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Free shipping nationwide on orders above PKR 3,000"
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return and exchange policy"
  },
  {
    icon: Heart,
    title: "Customer Care",
    description: "Dedicated support team available 24/7"
  }
];

const stats = [
  { number: "50K+", label: "Happy Customers" },
  { number: "100K+", label: "Products Sold" },
  { number: "4.8★", label: "Customer Rating" },
  { number: "99%", label: "Satisfaction Rate" }
];

export function TrustSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-kapraye-cream/30 to-white">
      <div className="container mx-auto px-4">
        {/* Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-kapraye-burgundy/10 rounded-full mb-4 group-hover:bg-kapraye-burgundy/20 transition-colors duration-300">
                <feature.icon className="h-8 w-8 text-kapraye-burgundy" />
              </div>
              <h3 className="text-lg font-semibold text-kapraye-burgundy mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-medium text-kapraye-burgundy mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our growing community of satisfied customers who trust <span className="font-above-beyond">Kaprayé</span> for their fashion needs
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-kapraye-burgundy mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
