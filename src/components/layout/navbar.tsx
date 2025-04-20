
import { Link } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SettingsMenu } from "@/components/settings/settings-menu";
import { AccountDropdown } from "@/components/account/account-dropdown";
import { ShoppingCart } from "@/components/cart/shopping-cart";

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
  { name: "Makeup", href: "/makeup" },
  { name: "Accessories", href: "/accessories" },
  { name: "Perfumes", href: "/perfumes" },
  { name: "Shoes", href: "/shoes" },
];

// dummy items for cart, replace with actual app state if needed
const demoCartItems = [];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-kapraye-cream">
      <nav className="container py-4 px-2 sm:px-4 md:px-8 flex justify-between items-center">
        {/* Settings Menu at the top right */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          {/* Cart Button */}
          <ShoppingCart
            items={demoCartItems}
            onUpdateQuantity={() => {}}
            onRemoveItem={() => {}}
          />
        </div>

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

        {/* Search bar - mobile responsive */}
        <div className="flex-1 px-2">
          <form
            className="w-full flex flex-col items-center"
            onSubmit={e => { e.preventDefault(); }}
          >
            <div className="w-full flex flex-row justify-center">
              <div className="relative w-full max-w-[350px]">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="pl-9 pr-4 py-2 rounded-md border border-kapraye-cream bg-white placeholder:text-muted-foreground text-sm w-full transition-all focus:ring-2 focus:ring-kapraye-pink focus:border-kapraye-pink"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-kapraye-pink">
                  <Search className="h-4 w-4" />
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Account Actions Dropdown */}
          <AccountDropdown />
          {/* Hamburger for mobile */}
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
