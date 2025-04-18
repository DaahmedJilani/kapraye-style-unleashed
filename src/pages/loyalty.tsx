
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ParallaxContainer } from "@/components/ui/parallax-container";

const Loyalty = () => {
  return (
    <MainLayout>
      <section className="pt-32 pb-16 bg-luxury-gradient">
        <div className="container px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-medium text-kapraye-burgundy mb-4">
              SHUKRAN Loyalty Program
            </h1>
            <p className="text-lg text-foreground/90 max-w-2xl mx-auto mb-6">
              Earn rewards with every purchase and enjoy exclusive benefits as a valued member
              of our SHUKRAN loyalty program.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-8">
          <ParallaxContainer sensitivity={0.03}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-kapraye-cream/30 rounded-lg p-8 text-center hover-lift parallax-layer">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-kapraye-burgundy text-white mb-6">
                  <span className="text-2xl font-playfair">1</span>
                </div>
                <h3 className="text-xl font-playfair font-medium text-kapraye-burgundy mb-3">Join</h3>
                <p className="text-foreground/90">
                  Create your account and start earning points with your first purchase.
                  Membership is completely free.
                </p>
              </div>
              
              <div className="bg-kapraye-cream/30 rounded-lg p-8 text-center hover-lift parallax-layer depth-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-kapraye-burgundy text-white mb-6">
                  <span className="text-2xl font-playfair">2</span>
                </div>
                <h3 className="text-xl font-playfair font-medium text-kapraye-burgundy mb-3">Earn</h3>
                <p className="text-foreground/90">
                  Collect 10 points for every $1 spent on any purchase online or in-store.
                  Special promotions offer bonus points.
                </p>
              </div>
              
              <div className="bg-kapraye-cream/30 rounded-lg p-8 text-center hover-lift parallax-layer depth-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-kapraye-burgundy text-white mb-6">
                  <span className="text-2xl font-playfair">3</span>
                </div>
                <h3 className="text-xl font-playfair font-medium text-kapraye-burgundy mb-3">Redeem</h3>
                <p className="text-foreground/90">
                  Use your points for discounts, exclusive products, early access to sales,
                  and special experiences.
                </p>
              </div>
            </div>
          </ParallaxContainer>
        </div>
      </section>
      
      <section className="py-16 bg-kapraye-cream/20">
        <div className="container px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-playfair font-medium text-kapraye-burgundy mb-6">
                  Membership Tiers
                </h2>
                <p className="text-base text-foreground/90 mb-6">
                  As you shop and earn points, you'll ascend through our exclusive membership tiers,
                  unlocking enhanced benefits and privileges at each level.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-kapraye-cream to-kapraye-mauve flex items-center justify-center">
                        <span className="text-xs font-bold text-kapraye-burgundy">1</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-playfair font-medium text-kapraye-burgundy">Pearl</h3>
                      <p className="text-sm text-foreground/90">
                        0-1000 points. Welcome gift, birthday offers, exclusive newsletter.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-kapraye-mauve to-kapraye-pink flex items-center justify-center">
                        <span className="text-xs font-bold text-white">2</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-playfair font-medium text-kapraye-burgundy">Ruby</h3>
                      <p className="text-sm text-foreground/90">
                        1001-5000 points. All Pearl benefits plus free shipping, early access to sales.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-kapraye-pink to-kapraye-burgundy flex items-center justify-center">
                        <span className="text-xs font-bold text-white">3</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-playfair font-medium text-kapraye-burgundy">Diamond</h3>
                      <p className="text-sm text-foreground/90">
                        5001+ points. All Ruby benefits plus personal shopping assistant, exclusive events, custom tailoring.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-2xl font-playfair font-medium text-kapraye-burgundy mb-6 text-center">
                  Join SHUKRAN Today
                </h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Create Password</label>
                    <Input id="password" type="password" placeholder="Create a secure password" />
                  </div>
                  <Button className="w-full bg-kapraye-burgundy hover:bg-kapraye-burgundy/90 text-white">
                    Create SHUKRAN Account
                  </Button>
                  <p className="text-xs text-center text-foreground/70 mt-4">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-playfair font-medium text-kapraye-burgundy mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="text-left space-y-6 mt-8">
              <div>
                <h3 className="text-lg font-playfair font-medium text-kapraye-burgundy mb-2">
                  How do I check my points balance?
                </h3>
                <p className="text-foreground/90">
                  You can check your points balance by logging into your SHUKRAN account on our website 
                  or mobile app. Your current points, tier status, and available rewards will be displayed on your dashboard.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-playfair font-medium text-kapraye-burgundy mb-2">
                  Do my points expire?
                </h3>
                <p className="text-foreground/90">
                  Points are valid for 12 months from the date they were earned. Any activity on your account 
                  will extend the validity of all your existing points for another 12 months.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-playfair font-medium text-kapraye-burgundy mb-2">
                  Can I earn points on sale items?
                </h3>
                <p className="text-foreground/90">
                  Yes! You earn points on all purchases, including sale items. Special promotions may 
                  offer bonus points on specific collections or during certain periods.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-playfair font-medium text-kapraye-burgundy mb-2">
                  How do I redeem my points?
                </h3>
                <p className="text-foreground/90">
                  During checkout, you'll have the option to apply your available points toward your purchase. 
                  You can choose how many points you'd like to redeem. 1000 points equals $10 in redemption value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Loyalty;
