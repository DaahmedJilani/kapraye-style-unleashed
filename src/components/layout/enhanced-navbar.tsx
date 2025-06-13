
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { EnhancedShoppingCart } from '@/components/woocommerce/EnhancedShoppingCart';
import { ProductSearch } from '@/components/woocommerce/ProductSearch';
import { AccountDropdown } from '@/components/account/account-dropdown';
import { SettingsMenu } from '@/components/settings/settings-menu';
import { Menu, X, Heart, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function EnhancedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Men', href: '/men' },
    { name: 'Women', href: '/women' },
    { name: 'Kids', href: '/kids' },
    { name: 'Eastern', href: '/eastern' },
    { name: 'Western', href: '/western' },
    { name: 'Saudi Style', href: '/saudi' },
    { name: 'Makeup', href: '/makeup' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Perfumes', href: '/perfumes' },
    { name: 'Shoes', href: '/shoes' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-playfair font-bold text-kapraye-burgundy">
              Kaprayé
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.slice(0, 6).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-kapraye-burgundy transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <ProductSearch />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Settings Menu */}
            <SettingsMenu />

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/wishlist')}
              className="hidden sm:flex"
            >
              <Heart className="h-5 w-5" />
            </Button>

            {/* Account */}
            <AccountDropdown />

            {/* Shopping Cart */}
            <EnhancedShoppingCart />

            {/* Mobile Menu Toggle */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="py-6">
                  {/* Mobile Search */}
                  <div className="mb-6 md:hidden">
                    <ProductSearch />
                  </div>

                  {/* Mobile Navigation */}
                  <div className="space-y-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-lg font-medium text-gray-700 hover:text-kapraye-burgundy hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Actions */}
                  <div className="mt-8 pt-8 border-t space-y-4">
                    <Link
                      to="/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-kapraye-burgundy transition-colors"
                    >
                      <Heart className="h-5 w-5" />
                      Wishlist
                    </Link>
                    <Link
                      to="/auth"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-kapraye-burgundy transition-colors"
                    >
                      <User className="h-5 w-5" />
                      Account
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
