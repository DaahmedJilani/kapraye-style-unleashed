import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SettingsMenu } from "@/components/settings/settings-menu";
import { AccountDropdown } from "@/components/account/account-dropdown";
import { EnhancedShoppingCart } from "@/components/woocommerce/EnhancedShoppingCart";
import { motion, AnimatePresence } from "framer-motion";
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
  { name: "All Women", href: "/women" },
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

export function PremiumNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setSearchOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="container py-4 px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="text-3xl md:text-4xl font-above-beyond text-primary font-normal transition-colors"
            >
              Kaprayé
            </motion.span>
            <span className="text-sm font-allure text-muted hidden sm:block mt-2">
              By Rayan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Women Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
                    isScrolled ? "hover:bg-muted" : "hover:bg-foreground/5"
                  }`}
                >
                  Women
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="min-w-[180px] p-2">
                {womenLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.name}
                    className="cursor-pointer rounded-md px-3 py-2"
                    onSelect={() => navigate(link.href)}
                  >
                    {link.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {mainLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative text-sm font-medium px-4 py-2 rounded-full transition-colors group ${
                  isScrolled ? "hover:bg-muted" : "hover:bg-foreground/5"
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-1/2 rounded-full" />
              </Link>
            ))}

            <div className="h-5 w-px bg-border mx-2" />

            {secondaryLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative text-sm font-medium px-3 py-2 rounded-full transition-colors group ${
                  isScrolled ? "hover:bg-muted" : "hover:bg-foreground/5"
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-1/2 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full transition-colors ${
                isScrolled ? "hover:bg-muted" : "hover:bg-foreground/5"
              }`}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className={`hidden md:flex rounded-full transition-colors ${
                isScrolled ? "hover:bg-muted" : "hover:bg-foreground/5"
              }`}
              onClick={() => navigate("/wishlist")}
            >
              <Heart className="h-5 w-5" />
            </Button>

            {/* Settings - Desktop Only */}
            <div className="hidden md:block">
              <SettingsMenu />
            </div>

            {/* Cart & Account */}
            <EnhancedShoppingCart />
            <AccountDropdown />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden rounded-full transition-colors ${
                isScrolled ? "hover:bg-muted" : "hover:bg-foreground/5"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>

        {/* Search Bar - Expandable */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border bg-background/95 backdrop-blur-lg overflow-hidden"
            >
              <form onSubmit={handleSearch} className="container py-4 px-4 md:px-8">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search for products, categories..."
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="lg:hidden fixed inset-0 top-0 bg-background z-40 overflow-y-auto"
          >
            <div className="container py-24 px-6 flex flex-col">
              {/* Close Button Area */}
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Search */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>

              {/* Navigation Links */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    Women
                  </h3>
                  <div className="space-y-2">
                    {womenLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={link.href}
                          className="block text-2xl font-playfair text-foreground hover:text-secondary transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    Collections
                  </h3>
                  <div className="space-y-2">
                    {mainLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (womenLinks.length + index) * 0.05 }}
                      >
                        <Link
                          to={link.href}
                          className="block text-2xl font-playfair text-foreground hover:text-secondary transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    Categories
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {secondaryLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (womenLinks.length + mainLinks.length + index) * 0.05 }}
                      >
                        <Link
                          to={link.href}
                          className="block text-lg text-foreground hover:text-secondary transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-auto pt-8 space-y-4">
                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 text-lg text-foreground hover:text-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  Wishlist
                </Link>
                <Link
                  to="/loyalty"
                  className="flex items-center gap-3 text-lg text-foreground hover:text-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground">
                    S
                  </span>
                  SHUKRAN Loyalty
                </Link>
                <div className="pt-4">
                  <SettingsMenu />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
