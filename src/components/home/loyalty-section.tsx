import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function LoyaltySection() {
  return (
    <section className="py-24 bg-kapraye-burgundy text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-kapraye-pink opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-kapraye-pink opacity-10 blur-3xl"></div>
      </div>
      
      <div className="container px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="block text-kapraye-pink text-sm uppercase tracking-wide font-medium mb-2"
          >
            Rewards Program
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-playfair font-medium mb-6"
          >
            Join SHUKRAN Loyalty
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Earn points with every purchase and unlock exclusive rewards, early access to new collections, 
            and personalized shopping experiences.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/15 transition-colors duration-300"
            >
              <div className="text-kapraye-pink text-2xl font-playfair mb-2">1</div>
              <h3 className="text-xl font-playfair mb-2">Shop & Earn</h3>
              <p className="text-white/80 text-sm">Collect points with every purchase online or in-store</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/15 transition-colors duration-300"
            >
              <div className="text-kapraye-pink text-2xl font-playfair mb-2">2</div>
              <h3 className="text-xl font-playfair mb-2">Unlock Tiers</h3>
              <p className="text-white/80 text-sm">Rise through membership levels for enhanced benefits</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/15 transition-colors duration-300"
            >
              <div className="text-kapraye-pink text-2xl font-playfair mb-2">3</div>
              <h3 className="text-xl font-playfair mb-2">Redeem Rewards</h3>
              <p className="text-white/80 text-sm">Use your points for discounts, exclusive items, and experiences</p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-kapraye-pink hover:bg-kapraye-pink/90 text-white min-w-[200px] rounded-full transition-all duration-300 hover:scale-105"
            >
              Join SHUKRAN Now
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
