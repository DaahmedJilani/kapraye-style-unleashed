
import { Button } from "@/components/ui/button";
import { ParallaxContainer } from "@/components/ui/parallax-container";

export function LoyaltySection() {
  return (
    <section className="py-24 bg-kapraye-burgundy text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-kapraye-pink opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-kapraye-pink opacity-10 blur-3xl"></div>
      </div>
      
      <ParallaxContainer className="container px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="block text-kapraye-pink text-sm uppercase tracking-wide font-medium mb-2 parallax-layer">
            Rewards Program
          </span>
          
          <h2 className="text-3xl md:text-5xl font-playfair font-medium mb-6 parallax-layer depth-1">
            Join SHUKRAN Loyalty
          </h2>
          
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto parallax-layer depth-2">
            Earn points with every purchase and unlock exclusive rewards, early access to new collections, 
            and personalized shopping experiences.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg parallax-layer depth-1">
              <div className="text-kapraye-pink text-2xl font-playfair mb-2">1</div>
              <h3 className="text-xl font-playfair mb-2">Shop & Earn</h3>
              <p className="text-white/80 text-sm">Collect points with every purchase online or in-store</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg parallax-layer depth-2">
              <div className="text-kapraye-pink text-2xl font-playfair mb-2">2</div>
              <h3 className="text-xl font-playfair mb-2">Unlock Tiers</h3>
              <p className="text-white/80 text-sm">Rise through membership levels for enhanced benefits</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg parallax-layer depth-3">
              <div className="text-kapraye-pink text-2xl font-playfair mb-2">3</div>
              <h3 className="text-xl font-playfair mb-2">Redeem Rewards</h3>
              <p className="text-white/80 text-sm">Use your points for discounts, exclusive items, and experiences</p>
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="bg-kapraye-pink hover:bg-kapraye-pink/90 text-white min-w-[200px] rounded-full parallax-layer"
          >
            Join SHUKRAN Now
          </Button>
        </div>
      </ParallaxContainer>
    </section>
  );
}
