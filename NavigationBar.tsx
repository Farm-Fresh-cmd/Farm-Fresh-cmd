import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, MountainIcon, ShoppingBagIcon } from "lucide-react"; // Added ShoppingBagIcon
import { useCartStore } from "../utils/cartStore"; // Import cart store

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  currentPath: string;
  onClick?: () => void; // For mobile nav item click
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, currentPath, onClick }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-base font-medium transition-colors ${isActive ? "text-green-600 font-semibold border-b-2 border-green-600" : "text-gray-700 hover:text-green-600 hover:border-b-2 hover:border-green-300 pb-1"}`}
    >
      {children}
    </Link>
  );
};

export const NavigationBar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const uniqueItemsCount = useCartStore(state => state.getCartUniqueItemsCount());

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/ShopPage", label: "Shop" },
    { to: "/JoinFarmerPage", label: "Join as Farmer" },
    { to: "/ContactPage", label: "Contact" },
    { to: "/ReviewsPage", label: "Reviews" },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-lime-50/90 backdrop-blur-sm shadow-md" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 mr-6"> {/* Increased gap slightly for better spacing */}
          <img src="https://static.databutton.com/public/9f696f41-628c-4897-aae7-8a5d64128ece/logo.png" alt="Farm Fresh Logo" className="h-10 w-auto" /> 
          <span className="text-2xl font-bold text-green-700" style={{ fontFamily: "'Georgia', serif"}}>Farm Fresh</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} currentPath={location.pathname}>
              {link.label}
            </NavLink>
          ))}
          <Link to="/cart-page" className="relative flex items-center text-gray-700 hover:text-green-600 transition-colors pb-1">
            <ShoppingBagIcon className="h-6 w-6" />
            {uniqueItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {uniqueItemsCount}
              </span>
            )}
            <span className="sr-only">Shopping Cart</span>
          </Link>
        </nav>

        {/* Mobile Navigation Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="rounded-full">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-lime-50 p-6">
            <div className="flex flex-col gap-6 text-lg font-medium">
              <Link to="/" className="flex items-center gap-3 mb-4" onClick={closeMobileMenu}> {/* Increased gap */}
                <img src="https://static.databutton.com/public/9f696f41-628c-4897-aae7-8a5d64128ece/logo.png" alt="Farm Fresh Logo" className="h-10 w-auto" />
                <span className="text-2xl font-bold text-green-700" style={{ fontFamily: "'Georgia', serif"}}>Farm Fresh</span>
              </Link>
              {navLinks.map(link => (
                <NavLink key={link.to} to={link.to} currentPath={location.pathname} onClick={closeMobileMenu}>
                  {link.label}
                </NavLink>
              ))}
              <Link 
                to="/cart-page" 
                onClick={closeMobileMenu}
                className={`relative flex items-center gap-2 text-base font-medium transition-colors ${location.pathname === '/cart-page' ? "text-green-600 font-semibold" : "text-gray-700 hover:text-green-600"}`}>
                <ShoppingBagIcon className="h-6 w-6" />
                <span>Cart</span>
                {uniqueItemsCount > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {uniqueItemsCount}
                  </span>
                )}
              </Link>
              <Link 
                to="/LoginPage" 
                onClick={closeMobileMenu}
                className="bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out py-2 text-center">
                Login / Sign Up
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}