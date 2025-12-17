import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, Heart } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { CartDrawer } from './CartDrawer';
import { Button } from './ui/Button';

const Header = () => {
  const { setIsOpen, itemCount } = useCart();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-2xl tracking-tight">ZOCO</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/shop?category=new" className="transition-colors hover:text-foreground/80 text-foreground/60">New</Link>
            <Link to="/shop" className="transition-colors hover:text-foreground/80 text-foreground/60">Shop</Link>
            <Link to="/shop?category=sale" className="transition-colors hover:text-destructive text-destructive/80 font-semibold">Sale</Link>
            <Link to="/admin" className="transition-colors hover:text-foreground/80 text-foreground/60">Admin</Link>
          </nav>
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
        </button>
        <div className="flex w-full items-center gap-2 md:w-auto md:gap-4 md:ml-auto">
          <form className="flex-1 md:w-64 md:flex-initial hidden sm:block">
             <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="search" 
                  placeholder="Search products..." 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8"
                />
             </div>
          </form>
          <div className="flex items-center gap-2">
            <Link to="/auth/login">
               <Button variant="ghost" size="icon">
                 <User className="h-5 w-5" />
                 <span className="sr-only">Account</span>
               </Button>
            </Link>
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="border-t bg-white">
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">ZOCO</h3>
          <p className="text-sm text-gray-500 font-serif italic">"Wear your desired attire"</p>
          <div className="flex space-x-4">
            {/* Social Icons Placeholder */}
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-xs">FB</div>
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-xs">IG</div>
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-xs">TW</div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/shop" className="hover:text-primary">All Products</Link></li>
            <li><Link to="/shop?category=t-shirts" className="hover:text-primary">T-Shirts</Link></li>
            <li><Link to="/shop?category=hoodies" className="hover:text-primary">Hoodies</Link></li>
            <li><Link to="/shop?category=sale" className="hover:text-primary">Sale</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-primary">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary">FAQs</a></li>
            <li><a href="#" className="hover:text-primary">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-sm text-gray-600 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <Button size="sm">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
        <p>&copy; 2024 ZOCO. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};