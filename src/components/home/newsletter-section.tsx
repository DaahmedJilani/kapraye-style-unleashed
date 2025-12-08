import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.toLowerCase().trim() });

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already subscribed to our newsletter!");
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast.success("Welcome to the Kaprayé family!");
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          
          {isSubscribed ? (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow bg-white border-kapraye-mauve focus:border-kapraye-pink focus:ring-kapraye-pink"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <Button 
                type="submit"
                className="bg-kapraye-burgundy text-white hover:bg-kapraye-burgundy/90 whitespace-nowrap"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          )}
          
          <p className="text-xs text-foreground/70 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  );
}
