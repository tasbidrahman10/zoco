import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ProductCard';
import { api } from '../services/api';
import { Product, SiteContent } from '../types';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load Products
        const allProducts = await api.products.list();
        setFeaturedProducts(allProducts.filter(p => p.featured).slice(0, 4));
        
        // Load Site Content (Hero, Categories)
        const siteContent = await api.settings.getContent();
        setContent(siteContent);
        
      } catch (error) {
        console.error("Failed to load home data");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={content.hero.image} 
            alt="Hero Background" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container h-full flex flex-col items-center justify-center text-center text-white space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
          >
            {content.hero.headline}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-xl md:text-3xl italic max-w-2xl"
          >
            {content.hero.subheadline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/shop">
              <Button size="lg" className="rounded-full px-8 text-lg font-semibold bg-white text-black hover:bg-gray-100">
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
           <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
             <div className="w-1 h-3 bg-white rounded-full mt-2" />
           </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container">
        <h2 className="text-3xl font-bold mb-8 text-center font-serif">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/shop?category=${category.slug}`}
              className="group relative overflow-hidden rounded-lg aspect-[3/4]"
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-bold">{category.name}</h3>
                <span className="mt-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container bg-secondary/20 py-16 rounded-3xl">
         <div className="flex items-center justify-between mb-8 px-4">
           <h2 className="text-3xl font-bold font-serif">Trending This Week</h2>
           <Link to="/shop" className="text-primary font-medium hover:underline">View All</Link>
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
           {featuredProducts.map(product => (
             <ProductCard key={product.id} product={product} />
           ))}
         </div>
      </section>

      {/* Newsletter */}
      <section className="container max-w-4xl mx-auto text-center py-12">
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold">Stay Updated</h2>
            <p className="text-primary-foreground/80 max-w-lg mx-auto">
              Subscribe to our newsletter to receive early access to new collections and exclusive discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="flex h-12 w-full rounded-md border-0 bg-white/20 px-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};