
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SettingsMenu } from "@/components/settings/settings-menu";
import { AccountDropdown } from "@/components/account/account-dropdown";
import { ShoppingCart } from "@/components/cart/shopping-cart";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface NavLink {
  name: string;
  href: string;
}

const mainLinks: NavLink[] = [
  { name: "Men", href: "/men" },
  // Women will be handled with dropdown
  { name: "Kids", href: "/kids" },
];

const womenLinks: NavLink[] = [
  { name: "Women", href: "/women" },
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
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-kapraye-cream">
      <nav className="container py-2 px-2 sm:px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-playfair font-medium">
              <span className="text-kapraye-burgundy">Kaprayé</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {mainLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-foreground hover:text-kapraye-pink transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {/* Women Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center text-sm font-medium px-2 py-1">
                Women <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[160px]">
              {womenLinks.map((link) => (
                <DropdownMenuItem
                  key={link.name}
                  className="cursor-pointer"
                  onSelect={() => {
                    setMobileMenuOpen(false);
                    navigate(link.href);
                  }}
                >
                  {link.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="h-4 w-px bg-kapraye-mauve/40 mx-2" />
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

        {/* Compact Search and Right Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Bar */}
          <form
            className="hidden md:block"
            onSubmit={handleSearch}
            style={{ minWidth: 0 }}
          >
            <div className="relative">
              <input
                type="search"
                placeholder="Search…"
                className="pl-8 pr-3 py-1.5 rounded-md border border-kapraye-cream bg-white placeholder:text-muted-foreground text-sm w-36 focus:w-48 transition-all focus:ring-2 focus:ring-kapraye-pink focus:border-kapraye-pink"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-kapraye-pink"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
          
          {/* Settings (Currency/Language) */}
          <div className="hidden md:block">
            <SettingsMenu />
          </div>
          {/* Cart & Account */}
          <div className="flex items-center gap-2">
            <ShoppingCart
              items={demoCartItems}
              onUpdateQuantity={() => {}}
              onRemoveItem={() => {}}
            />
            <AccountDropdown />
          </div>
          {/* Hamburger for mobile */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-kapraye-cream/50 transition-colors ml-2"
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
            {/* Search in mobile */}
            <form
              className="mb-6"
              onSubmit={handleSearch}
            >
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search…"
                  className="pl-8 pr-3 py-2 rounded-md border border-kapraye-cream bg-white placeholder:text-muted-foreground text-sm w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-kapraye-pink"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
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
              {/* Women Group with sublinks */}
              <div>
                <div className="text-base py-2 font-medium text-kapraye-burgundy">Women</div>
                <div className="flex flex-col pl-4 space-y-1">
                  {womenLinks.map((link) => (
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
              </div>
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
            <div className="flex flex-col space-y-2">
              <SettingsMenu />
              <Button variant="outline" className="w-full mt-2 border-kapraye-pink text-kapraye-burgundy hover:text-kapraye-pink">
                Sign In / Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

