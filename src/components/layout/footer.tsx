import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// TikTok icon component since Lucide doesn't have it
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    instagram: "https://instagram.com/kapraye",
    facebook: "https://facebook.com/kapraye",
    twitter: "https://twitter.com/kapraye",
    tiktok: "https://tiktok.com/@kapraye",
  });

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "social_links")
          .maybeSingle();

        if (data && !error) {
          setSocialLinks(data.value as SocialLinks);
        }
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchSocialLinks();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
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
          toast.info("You're already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Thank you for subscribing!");
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-kapraye-burgundy text-white py-16">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Shop Links */}
          <div>
            <h3 className="font-playfair text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/women" className="text-white/80 hover:text-white transition-colors">Women</Link></li>
              <li><Link to="/men" className="text-white/80 hover:text-white transition-colors">Men</Link></li>
              <li><Link to="/kids" className="text-white/80 hover:text-white transition-colors">Kids</Link></li>
              <li><Link to="/accessories" className="text-white/80 hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-playfair text-lg font-medium mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/eastern" className="text-white/80 hover:text-white transition-colors">Eastern Wear</Link></li>
              <li><Link to="/western" className="text-white/80 hover:text-white transition-colors">Western Wear</Link></li>
              <li><Link to="/perfumes" className="text-white/80 hover:text-white transition-colors">Perfumes</Link></li>
              <li><Link to="/shoes" className="text-white/80 hover:text-white transition-colors">Shoes</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-playfair text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-white/80 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white/80 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-playfair text-lg font-medium mb-4">Newsletter</h3>
            <p className="text-white/80 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <Button
                type="submit"
                variant="secondary"
                className="bg-white text-kapraye-burgundy hover:bg-white/90"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo & Copyright */}
            <div className="text-center md:text-left">
              <Link to="/" className="font-above-beyond text-3xl text-white mb-2 block">
                Kaprayé
              </Link>
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} <span className="font-above-beyond">Kaprayé</span>. All rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {socialLinks.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Tagline */}
          <p className="text-center text-white/40 text-sm mt-6">
            Premium Fashion • Timeless Elegance • Cultural Heritage
          </p>
        </div>
      </div>
    </footer>
  );
}
