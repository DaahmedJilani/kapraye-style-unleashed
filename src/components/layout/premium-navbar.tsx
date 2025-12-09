import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SettingsMenu } from "@/components/settings/settings-menu";
import { AccountDropdown } from "@/components/account/account-dropdown";
import { CartDrawer } from "@/components/shopify/CartDrawer";
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

// Women subcategories - product based
const womenLinks: NavLink[] = [
  { name: "All Women", href: "/women" },
  { name: "Stitched", href: "/women/stitched" },
  { name: "Unstitched", href: "/women/unstitched" },
  { name: "T-Shirts", href: "/women/tshirts" },
  { name: "Jeans", href: "/women/jeans" },
  { name: "Bodycon", href: "/women/bodycon" },
  { name: "Western Dresses", href: "/women/western-dresses" },
  { name: "Undergarments", href: "/women/undergarments" },
];

// Men subcategories - product based
const menLinks: NavLink[] = [
  { name: "All Men", href: "/men" },
  { name: "Stitched", href: "/men/stitched" },
  { name: "Unstitched", href: "/men/unstitched" },
  { name: "T-Shirts", href: "/men/tshirts" },
  { name: "Jeans", href: "/men/jeans" },
  { name: "Formal", href: "/men/formal" },
  { name: "Casual", href: "/men/casual" },
];

// Kids subcategories
const kidsLinks: NavLink[] = [
  { name: "All Kids", href: "/kids" },
  { name: "Rompers", href: "/kids/rompers" },
  { name: "Bodysuits", href: "/kids/bodysuits" },
  { name: "T-Shirts", href: "/kids/tshirts" },
  { name: "Dresses", href: "/kids/dresses" },
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
      setMobileMenuOpen(false);
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
              className="text-2xl sm:text-3xl md:text-4xl font-above-beyond text-primary font-normal transition-colors"
            >
              Kaprayé
            </motion.span>
            <span className="text-xs sm:text-sm font-allure text-muted hidden sm:block mt-2">
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

            {/* Men Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
                    isScrolled ? "hover:bg-muted" : "hover:bg-foreground/5"
                  }`}
                >
                  Men
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="min-w-[180px] p-2">
                {menLinks.map((link) => (
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

            {/* Kids Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
                    isScrolled ? "hover:bg-muted" : "hover:bg-foreground/5"
                  }`}
                >
                  Kids
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="min-w-[180px] p-2">
                {kidsLinks.map((link) => (
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
            <CartDrawer />
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
            <div className="container py-20 px-6 flex flex-col min-h-screen">
              {/* Close Button Area */}
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-12 w-12"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Search */}
              <form onSubmit={handleSearch} className="mb-8 mt-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="w-full pl-12 pr-4 py-4 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>

              {/* Navigation Links */}
              <div className="space-y-8 flex-1">
                {/* Women Section */}
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">
                    Women
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {womenLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Link
                          to={link.href}
                          className="block text-lg font-medium text-foreground hover:text-secondary transition-colors py-3 px-4 rounded-lg hover:bg-muted/50 active:bg-muted"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Men Section */}
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">
                    Men
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {menLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (womenLinks.length + index) * 0.03 }}
                      >
                        <Link
                          to={link.href}
                          className="block text-lg font-medium text-foreground hover:text-secondary transition-colors py-3 px-4 rounded-lg hover:bg-muted/50 active:bg-muted"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Kids Section */}
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">
                    Kids
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {kidsLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (womenLinks.length + menLinks.length + index) * 0.03 }}
                      >
                        <Link
                          to={link.href}
                          className="block text-lg font-medium text-foreground hover:text-secondary transition-colors py-3 px-4 rounded-lg hover:bg-muted/50 active:bg-muted"
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
              <div className="pt-8 pb-4 space-y-3 border-t border-border mt-8">
                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-secondary transition-colors py-3 px-4 rounded-lg hover:bg-muted/50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  Wishlist
                </Link>
                <Link
                  to="/loyalty"
                  className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-secondary transition-colors py-3 px-4 rounded-lg hover:bg-muted/50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground">
                    S
                  </span>
                  SHUKRAN Loyalty
                </Link>
                <div className="pt-2 px-4">
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
