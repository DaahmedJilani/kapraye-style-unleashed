import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-kapraye-cream/50 pt-16 pb-8">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-playfair font-medium mb-4 text-kapraye-burgundy">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/men" className="text-sm hover:text-kapraye-pink transition-colors">Men</Link></li>
              <li><Link to="/women" className="text-sm hover:text-kapraye-pink transition-colors">Women</Link></li>
              <li><Link to="/kids" className="text-sm hover:text-kapraye-pink transition-colors">Kids</Link></li>
              <li><Link to="/eastern" className="text-sm hover:text-kapraye-pink transition-colors">Eastern</Link></li>
              <li><Link to="/western" className="text-sm hover:text-kapraye-pink transition-colors">Western</Link></li>
              <li><Link to="/saudi" className="text-sm hover:text-kapraye-pink transition-colors">Saudi Style</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-medium mb-4 text-kapraye-burgundy">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/makeup" className="text-sm hover:text-kapraye-pink transition-colors">Makeup</Link></li>
              <li><Link to="/accessories" className="text-sm hover:text-kapraye-pink transition-colors">Accessories</Link></li>
              <li><Link to="/perfumes" className="text-sm hover:text-kapraye-pink transition-colors">Perfumes</Link></li>
              <li><Link to="/shoes" className="text-sm hover:text-kapraye-pink transition-colors">Shoes</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-medium mb-4 text-kapraye-burgundy">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:text-kapraye-pink transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-kapraye-pink transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-sm hover:text-kapraye-pink transition-colors">Careers</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-kapraye-pink transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-kapraye-pink transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-medium mb-4 text-kapraye-burgundy">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/50 border-kapraye-mauve focus:border-kapraye-pink focus:ring-kapraye-pink"
              />
              <Button type="submit" className="bg-kapraye-burgundy text-white hover:bg-kapraye-pink">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-kapraye-mauve/30 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Link to="/" className="text-xl font-playfair font-medium">
                <span className="text-kapraye-burgundy">Kaprayé</span>
                <span className="text-sm font-allure ml-2">By Rayan</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-kapraye-mauve/20 transition-colors">
                <Instagram className="h-5 w-5 text-kapraye-burgundy" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-kapraye-mauve/20 transition-colors">
                <Facebook className="h-5 w-5 text-kapraye-burgundy" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-kapraye-mauve/20 transition-colors">
                <Twitter className="h-5 w-5 text-kapraye-burgundy" />
              </a>
            </div>
            
            <div className="mt-4 md:mt-0 text-sm text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} Kaprayé by Rayan. All rights reserved.</p>
              <p className="mt-1 text-xs text-kapraye-burgundy/70">Style Without Limits</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
