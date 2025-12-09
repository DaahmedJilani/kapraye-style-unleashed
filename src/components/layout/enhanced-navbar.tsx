import { Link, useNavigate } from "react-router-dom";
import { Search, User, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SettingsMenu } from "@/components/settings/settings-menu";
import { AccountDropdown } from "@/components/account/account-dropdown";
import { CartDrawer } from "@/components/shopify/CartDrawer";
import { NotificationBell } from "@/components/notifications/NotificationBell";
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
  { name: "Kids", href: "/kids" },
];

const womenLinks: NavLink[] = [
  { name: "Women", href: "/women" },
  { name: "Eastern", href: "/eastern" },
  { name: "Western", href: "/western" },
  { name: "Saudi Style", href: "/saudi" },
];


export function EnhancedNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-kapraye-cream shadow-sm' 
          : 'bg-transparent'
      }`} 
      style={{ height: '72px' }}
    >
      <nav className="container py-5 px-2 sm:px-4 md:px-8 flex justify-between items-center" style={{ height: '72px' }}>
        {/* Logo and Title */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <Link to="/" className="flex items-center" style={{ lineHeight: 1 }}>
            <span className={`text-3xl font-above-beyond font-normal leading-none transition-colors duration-300 ${
              isScrolled ? 'text-kapraye-burgundy' : 'text-white'
            }`} style={{ lineHeight: 1.1, paddingTop: '0.15rem', paddingBottom: '0.15rem' }}>
              Kaprayé
            </span>
          </Link>
          <span className={`text-sm font-allure select-none transition-colors duration-300 ${
            isScrolled ? 'text-kapraye-mauve' : 'text-white/80'
          }`} style={{ marginTop: '0.3rem' }}>
            By Rayan
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {mainLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-kapraye-pink ${
                isScrolled ? 'text-foreground' : 'text-white hover:text-kapraye-cream'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={`flex items-center text-sm font-medium px-2 py-1 transition-colors ${
                  isScrolled ? 'text-foreground hover:text-kapraye-pink' : 'text-white hover:text-kapraye-cream'
                }`}
              >
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
        </div>

        {/* Compact Search and Right Actions */}
        <div className="flex items-center space-x-2">
          <form
            className="hidden md:block"
            onSubmit={handleSearch}
            style={{ minWidth: 0 }}
          >
            <div className="relative">
              <input
                type="search"
                placeholder="Search…"
                className={`pl-8 pr-3 py-1.5 rounded-md border text-sm w-36 focus:w-48 transition-all focus:ring-2 focus:ring-kapraye-pink focus:border-kapraye-pink ${
                  isScrolled 
                    ? 'border-kapraye-cream bg-white placeholder:text-muted-foreground' 
                    : 'border-white/30 bg-white/10 placeholder:text-white/70 text-white'
                }`}
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
          
          <div className="hidden md:block">
            <SettingsMenu />
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <CartDrawer />
            <AccountDropdown />
          </div>
          <button
            className={`lg:hidden p-2 rounded-full transition-colors ml-2 ${
              isScrolled 
                ? 'hover:bg-kapraye-cream/50 text-foreground' 
                : 'hover:bg-white/20 text-white'
            }`}
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in">
          <div className="container py-6 px-4 flex flex-col space-y-6">
            {/* Search Form */}
            <form className="mb-6" onSubmit={handleSearch}>
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

            {/* Navigation Links */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-playfair font-medium text-kapraye-burgundy">Collections</h3>
              {mainLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-base py-2 text-foreground hover:text-kapraye-pink transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div>
                <div className="text-base py-2 font-medium text-kapraye-burgundy">Women</div>
                <div className="flex flex-col pl-4 space-y-1">
                  {womenLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-base py-2 text-foreground hover:text-kapraye-pink transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
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
