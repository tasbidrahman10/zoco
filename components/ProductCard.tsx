import React, { useState } from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from './ui/Button';
import { useCart } from '../store/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { id, name, price, compareAtPrice, images, category, sizes } = product;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    // Default to first size for quick add, normally would open a modal
    addItem({
      productId: id,
      name,
      price,
      image: images[0],
      size: sizes[0],
      quantity: 1
    });
  };

  return (
    <Link to={`/product/${product.slug}`} className="group block relative">
      <motion.div 
        className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src={images[0]} 
          alt={name} 
          className={`h-full w-full object-cover object-center transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} 
        />
        {images[1] && (
          <img 
            src={images[1]} 
            alt={name} 
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
          />
        )}
        
        {/* Badges */}
        {compareAtPrice && (
          <span className="absolute left-2 top-2 rounded-full bg-destructive px-2 py-1 text-xs font-bold text-white">
            SALE
          </span>
        )}

        {/* Overlay Actions */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 ${isHovered ? 'translate-y-0' : ''}`}>
           <Button 
             className="w-full shadow-lg" 
             onClick={handleQuickAdd}
             variant="primary"
           >
             Quick Add
           </Button>
        </div>
        
        <button className="absolute top-2 right-2 rounded-full bg-white/80 p-2 text-gray-900 shadow-sm hover:bg-white hover:text-primary transition-colors">
          <Heart className="h-5 w-5" />
        </button>
      </motion.div>
      
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            {name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">${price}</p>
          {compareAtPrice && (
            <p className="text-sm font-medium text-gray-500 line-through">${compareAtPrice}</p>
          )}
        </div>
      </div>
    </Link>
  );
};