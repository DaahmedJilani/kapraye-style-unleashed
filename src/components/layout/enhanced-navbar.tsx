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

const womenLinks: NavLink[] = [
  { name: "All Women", href: "/women" },
  { name: "Unstitched", href: "/women/unstitched" },
  { name: "Stitched", href: "/women/stitched" },
  { name: "Tees", href: "/women/tees" },
  { name: "Bottoms", href: "/women/bottoms" },
  { name: "Under-garments", href: "/women/undergarments" },
  { name: "Bodycon", href: "/women/bodycon" },
  { name: "Western Dresses", href: "/women/western-dresses" },
  { name: "Beauty & Cosmetics", href: "/women/beauty-cosmetics" },
];

const menLinks: NavLink[] = [
  { name: "All Men", href: "/men" },
  { name: "Unstitched", href: "/men/unstitched" },
  { name: "Tees", href: "/men/tees" },
  { name: "Bottoms", href: "/men/bottoms" },
];

const kidsLinks: NavLink[] = [
  { name: "All Kids", href: "/kids" },
  { name: "Boys", href: "/kids/boys" },
  { name: "Girls", href: "/kids/girls" },
  { name: "Babies", href: "/kids/babies" },
];

interface EnhancedNavbarProps {
  isTransparent?: boolean;
}

export function EnhancedNavbar({ isTransparent = false }: EnhancedNavbarProps) {
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

  // Determine if we should use light text (transparent mode and not scrolled)
  const useLightText = isTransparent && !isScrolled;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isTransparent
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
          : 'bg-transparent'
      }`} 
      style={{ height: '72px' }}
    >
      <nav className="container py-5 px-2 sm:px-4 md:px-8 flex justify-between items-center" style={{ height: '72px' }}>
        {/* Logo and Title */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <Link to="/" className="flex items-center" style={{ lineHeight: 1 }}>
            <span className={`text-3xl font-above-beyond font-normal leading-none transition-colors duration-300 ${
              useLightText ? 'text-white' : 'text-primary'
            }`} style={{ lineHeight: 1.1, paddingTop: '0.15rem', paddingBottom: '0.15rem' }}>
              Kaprayé
            </span>
          </Link>
          <span className={`text-sm font-allure select-none transition-colors duration-300 ${
            useLightText ? 'text-white/80' : 'text-secondary'
          }`} style={{ marginTop: '0.3rem' }}>
            By Rayan
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Women Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={`flex items-center text-sm font-medium px-2 py-1 transition-colors ${
                  useLightText ? 'text-white hover:text-white/80 hover:bg-white/10' : 'text-foreground hover:text-secondary hover:bg-transparent'
                }`}
              >
                Women <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[180px]">
              {womenLinks.map((link) => (
                <DropdownMenuItem
                  key={link.name}
                  className="cursor-pointer"
                  onSelect={() => navigate(link.href)}
                >
                  {link.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Men Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={`flex items-center text-sm font-medium px-2 py-1 transition-colors ${
                  useLightText ? 'text-white hover:text-white/80 hover:bg-white/10' : 'text-foreground hover:text-secondary hover:bg-transparent'
                }`}
              >
                Men <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[160px]">
              {menLinks.map((link) => (
                <DropdownMenuItem
                  key={link.name}
                  className="cursor-pointer"
                  onSelect={() => navigate(link.href)}
                >
                  {link.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Kids Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={`flex items-center text-sm font-medium px-2 py-1 transition-colors ${
                  useLightText ? 'text-white hover:text-white/80 hover:bg-white/10' : 'text-foreground hover:text-secondary hover:bg-transparent'
                }`}
              >
                Kids <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[140px]">
              {kidsLinks.map((link) => (
                <DropdownMenuItem
                  key={link.name}
                  className="cursor-pointer"
                  onSelect={() => navigate(link.href)}
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
                className={`pl-8 pr-3 py-1.5 rounded-md border text-sm w-36 focus:w-48 transition-all focus:ring-2 focus:ring-secondary focus:border-secondary ${
                  useLightText 
                    ? 'border-white/30 bg-white/10 placeholder:text-white/70 text-white' 
                    : 'border-border bg-background placeholder:text-muted-foreground text-foreground'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className={`absolute left-2 top-1/2 -translate-y-1/2 ${useLightText ? 'text-white/70' : 'text-secondary'}`}
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
          
          <div className="hidden md:block">
            <SettingsMenu />
          </div>
          <div className={`flex items-center gap-2 ${useLightText ? '[&_button]:text-white [&_svg]:text-white' : ''}`}>
            <NotificationBell />
            <CartDrawer />
            <AccountDropdown />
          </div>
          <button
            className={`lg:hidden p-2 rounded-full transition-colors ml-2 ${
              useLightText 
                ? 'hover:bg-white/20 text-white' 
                : 'hover:bg-muted text-foreground'
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
        <div className="lg:hidden fixed inset-0 top-[72px] bg-background z-40 animate-fade-in overflow-y-auto">
          <div className="container py-6 px-4 flex flex-col space-y-6">
            {/* Search Form */}
            <form className="mb-6" onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search…"
                  className="pl-8 pr-3 py-2 rounded-md border border-border bg-background placeholder:text-muted-foreground text-sm w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-secondary"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Navigation Links */}
            <div className="flex flex-col space-y-4">
              {/* Women Section */}
              <div>
                <div className="text-base py-2 font-medium text-primary">Women</div>
                <div className="flex flex-col pl-4 space-y-1">
                  {womenLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-sm py-2 text-foreground hover:text-secondary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Men Section */}
              <div>
                <div className="text-base py-2 font-medium text-primary">Men</div>
                <div className="flex flex-col pl-4 space-y-1">
                  {menLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-sm py-2 text-foreground hover:text-secondary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Kids Section */}
              <div>
                <div className="text-base py-2 font-medium text-primary">Kids</div>
                <div className="flex flex-col pl-4 space-y-1">
                  {kidsLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-sm py-2 text-foreground hover:text-secondary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="w-full h-px bg-border"></div>
            
            <div className="flex flex-col space-y-3">
              <Link
                to="/loyalty"
                className="text-base py-2 text-foreground hover:text-secondary transition-colors flex items-center space-x-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>SHUKRAN Loyalty</span>
              </Link>
            </div>
            <div className="flex flex-col space-y-2">
              <SettingsMenu />
              <Button variant="outline" className="w-full mt-2 border-secondary text-primary hover:text-secondary">
                Sign In / Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
