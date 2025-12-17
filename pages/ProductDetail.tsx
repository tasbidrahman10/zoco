import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useCart } from '../store/CartContext';
import { Star, Minus, Plus, Truck, RotateCcw, ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { Product } from '../types';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
        if (!slug) return;
        setIsLoading(true);
        const data = await api.products.get(slug);
        
        if (data) {
            setProduct(data);
            if (data.sizes && data.sizes.length > 0) {
                setSelectedSize(data.sizes[0]);
            }
        }
        setIsLoading(false);
    };
    loadProduct();
  }, [slug]);

  if (isLoading) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }

  if (!product) {
    return (
        <div className="container py-20 text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setIsAdding(true);
    // Simulate network request for UI feedback
    setTimeout(() => {
        addItem({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: selectedSize,
            quantity: quantity
        });
        setIsAdding(false);
    }, 600);
  };

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Images */}
        <div className="space-y-4">
          <motion.div 
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square bg-gray-100 rounded-xl overflow-hidden"
          >
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
          {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === idx ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold font-serif text-gray-900">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
               <div className="flex text-yellow-400">
                 {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
               </div>
               <span className="text-sm text-gray-500">12 Reviews</span>
            </div>
            <div className="mt-4 flex items-end gap-3">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.compareAtPrice && (
                 <span className="text-xl text-gray-400 line-through">${product.compareAtPrice}</span>
              )}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-900">Size</label>
              <div className="grid grid-cols-4 gap-3 mt-2">
                {product.sizes.map(size => {
                    // Check stock if available, otherwise assume in stock
                    const stock = product.stockBySize ? (product.stockBySize[size] || 0) : 10;
                    const disabled = stock === 0;
                    return (
                        <button
                          key={size}
                          disabled={disabled}
                          onClick={() => setSelectedSize(size)}
                          className={`
                            py-3 border rounded-md text-sm font-medium transition-all
                            ${selectedSize === size 
                                ? 'border-primary bg-primary text-white' 
                                : disabled 
                                   ? 'bg-gray-100 text-gray-300 cursor-not-allowed border-gray-200'
                                   : 'border-gray-200 text-gray-900 hover:border-gray-400'
                            }
                          `}
                        >
                          {size}
                        </button>
                    )
                })}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                   <button 
                     className="p-3 hover:bg-gray-100 disabled:opacity-50"
                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
                     disabled={quantity <= 1}
                   >
                     <Minus className="h-4 w-4" />
                   </button>
                   <span className="px-4 font-mono font-medium">{quantity}</span>
                   <button 
                     className="p-3 hover:bg-gray-100"
                     onClick={() => setQuantity(quantity + 1)}
                   >
                     <Plus className="h-4 w-4" />
                   </button>
                </div>
                <Button 
                   size="lg" 
                   className="flex-1" 
                   onClick={handleAddToCart}
                   isLoading={isAdding}
                   disabled={!selectedSize}
                >
                   Add to Cart
                </Button>
            </div>
          </div>

          <div className="border-t pt-8 space-y-4">
             <div className="flex items-center gap-3 text-sm text-gray-600">
               <Truck className="h-5 w-5 text-primary" />
               <span>Free shipping on orders over $50</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-gray-600">
               <RotateCcw className="h-5 w-5 text-primary" />
               <span>30-day return policy</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-gray-600">
               <ShieldCheck className="h-5 w-5 text-primary" />
               <span>Secure checkout</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};