
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section className="py-20 bg-kapraye-cream/30">
      <div className="container px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-playfair font-medium text-kapraye-burgundy mb-4">
            Stay Inspired
          </h2>
          <p className="text-base text-foreground/90 max-w-xl mx-auto mb-8">
            Subscribe to our newsletter for exclusive offers, early access to new collections, 
            style inspiration and more.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow bg-white border-kapraye-mauve focus:border-kapraye-pink focus:ring-kapraye-pink"
              required
            />
            <Button 
              type="submit"
              className="bg-kapraye-burgundy text-white hover:bg-kapraye-burgundy/90 whitespace-nowrap"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="text-xs text-foreground/70 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  );
}
