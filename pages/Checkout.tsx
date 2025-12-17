import React, { useState } from 'react';
import { useCart } from '../store/CartContext';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, CreditCard } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { items, total } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Order placed successfully! (Demo)');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/shop">
          <Button>Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const shipping: number = 0; // Free shipping logic could go here
  const finalTotal = total + shipping;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container pt-8 pb-12">
        <Link to="/cart" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ChevronLeft className="h-4 w-4 mr-1" /> Return to Cart
        </Link>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Left Column: Forms */}
          <section className="lg:col-span-7 bg-white rounded-xl shadow-sm border p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-10">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input type="email" id="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border" />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="newsletter" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-500">Email me with news and offers</label>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                    <input type="text" id="firstName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                    <input type="text" id="lastName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input type="text" id="address" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">Apartment, suite, etc.</label>
                    <input type="text" id="apartment" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input type="text" id="city" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border" />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal code</label>
                    <input type="text" id="postalCode" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border" />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-6">Payment</h2>
                <div className="bg-gray-50 p-4 rounded-lg border flex flex-col gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white border rounded-md">
                    <input type="radio" name="payment" defaultChecked className="h-4 w-4 text-primary focus:ring-primary" />
                    <span className="flex-1 font-medium text-sm">Credit Card</span>
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                     <div>
                       <input type="text" placeholder="Card number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                       <input type="text" placeholder="Expiration (MM/YY)" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border" />
                       <input type="text" placeholder="CVC" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border" />
                     </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-lg" isLoading={isProcessing}>
                Pay ${finalTotal.toFixed(2)}
              </Button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <ShieldCheck className="h-4 w-4" />
                <span>Payments are secure and encrypted</span>
              </div>
            </form>
          </section>

          {/* Right Column: Order Summary */}
          <section className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>
              <ul className="divide-y divide-gray-100 mb-6">
                {items.map((item) => (
                  <li key={`${item.productId}-${item.size}`} className="flex py-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Size: {item.size}</p>
                        <p className="mt-1 text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Subtotal</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Shipping</p>
                  <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
                </div>
                <div className="border-t pt-4 flex justify-between text-base font-bold text-gray-900">
                  <p>Total</p>
                  <p>${finalTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};