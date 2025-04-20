import { ParallaxContainer } from "@/components/ui/parallax-container";

export function AboutSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container px-4 md:px-8">
        <ParallaxContainer sensitivity={0.03}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="order-2 lg:order-1 parallax-layer">
              <span className="text-kapraye-pink text-sm uppercase tracking-wide font-medium mb-2 block">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-playfair font-medium text-kapraye-burgundy mb-6">
                <span className="font-above-beyond">Kaprayé</span> by Rayan
              </h2>
              <div className="prose prose-lg text-foreground/90 max-w-none">
                <p>
                  Founded with a passion for bringing together traditional craftsmanship and contemporary design,{" "}
                  <span className="font-above-beyond">Kaprayé</span> by Rayan offers a carefully curated collection of premium clothing and accessories.
                </p>
                <p>
                  Our brand celebrates the richness of Eastern, Western and Saudi aesthetics, blending cultural 
                  heritage with modern sensibilities. We believe in quality over quantity, creating pieces that 
                  stand the test of time both in durability and style.
                </p>
                <p>
                  Every <span className="font-above-beyond">Kaprayé</span> piece tells a story - one of meticulous attention to detail, ethical production, 
                  and timeless elegance that transcends seasons and trends.
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <hr className="flex-grow max-w-[80px] border-t-2 border-kapraye-mauve mr-4" />
                <span className="text-kapraye-burgundy italic font-playfair">Style Without Limits</span>
              </div>
            </div>
            
            {/* Image */}
            <div className="order-1 lg:order-2 parallax-layer depth-2 relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/lovable-uploads/e5f87f66-0f74-44c0-89cd-9e1a21f6488a.png"
                  alt="Kaprayé by Rayan"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Logo overlay */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-lg flex items-center justify-center p-4">
                <img 
                  src="/lovable-uploads/40e24681-5545-43f2-939e-e27f867c2e2a.png" 
                  alt="Kaprayé Logo" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </ParallaxContainer>
      </div>
    </section>
  );
}
