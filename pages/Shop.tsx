import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../mockData';
import { api } from '../services/api'; // Switch to API
import { Product } from '../types';
import { Filter, SlidersHorizontal, ChevronDown, Loader2 } from 'lucide-react';

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(200);

  // Load products from "Database"
  useEffect(() => {
    const loadData = async () => {
        setIsLoading(true);
        const data = await api.products.list();
        setProducts(data);
        setIsLoading(false);
    };
    loadData();
  }, []);
  
  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategory ? p.category === selectedCategory : true;
    const priceMatch = p.price <= priceRange;
    return categoryMatch && priceMatch;
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-8 sticky top-24 self-start">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Filter className="h-5 w-5" /> Filters
            </h3>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`block text-sm ${!selectedCategory ? 'font-bold text-primary' : 'text-gray-600 hover:text-primary'}`}
                >
                  All Products
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`block text-sm ${selectedCategory === cat.name ? 'font-bold text-primary' : 'text-gray-600 hover:text-primary'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range: ${priceRange}</h4>
              <input 
                type="range" 
                min="0" 
                max="200" 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$0</span>
                <span>$200</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold font-serif">
              {selectedCategory ? selectedCategory : 'All Products'}
            </h1>
            <span className="text-sm text-gray-500">{filteredProducts.length} results</span>
          </div>
          
          {isLoading ? (
             <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-900">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};