import { Link } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NavLink {
  name: string;
  href: string;
}

const mainLinks: NavLink[] = [
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "Kids", href: "/kids" },
  { name: "Eastern", href: "/eastern" },
  { name: "Western", href: "/western" },
  { name: "Saudi Style", href: "/saudi" },
];

const secondaryLinks: NavLink[] = [
  { name: "Makeup", href: "#makeup" },
  { name: "Accessories", href: "#accessories" },
  { name: "Perfumes", href: "#perfumes" },
  { name: "Shoes", href: "#shoes" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-kapraye-cream">
      <nav className="container py-4 px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-playfair font-medium">
              <span className="text-kapraye-burgundy">Kaprayé</span>
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {mainLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-foreground hover:text-kapraye-pink transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-4 w-px bg-kapraye-mauve/40 mx-2"></div>
          
          {secondaryLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-foreground hover:text-kapraye-pink transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-kapraye-cream/50 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <Link to="/loyalty" className="p-2 rounded-full hover:bg-kapraye-cream/50 transition-colors">
            <User className="h-5 w-5" />
          </Link>
          <button className="p-2 rounded-full hover:bg-kapraye-cream/50 transition-colors">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-kapraye-pink rounded-full">0</span>
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 rounded-full hover:bg-kapraye-cream/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in">
          <div className="container py-6 px-4 flex flex-col space-y-6">
            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-playfair font-medium text-kapraye-burgundy">Collections</h3>
              {mainLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base py-2 text-foreground hover:text-kapraye-pink transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="w-full h-px bg-kapraye-mauve/30"></div>
            
            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-playfair font-medium text-kapraye-burgundy">Categories</h3>
              {secondaryLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base py-2 text-foreground hover:text-kapraye-pink transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="w-full h-px bg-kapraye-mauve/30"></div>
            
            <div className="flex flex-col space-y-3">
              <Link
                to="/loyalty"
                className="text-base py-2 text-foreground hover:text-kapraye-pink transition-colors flex items-center space-x-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>SHUKRAN Loyalty</span>
              </Link>
            </div>
            
            <Button variant="outline" className="w-full mt-4 border-kapraye-pink text-kapraye-burgundy hover:text-kapraye-pink">
              Sign In / Register
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
