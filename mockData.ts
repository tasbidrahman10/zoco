import { Product, Category, Order } from './types';

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'T-Shirts',
    slug: 't-shirts',
    image: 'https://picsum.photos/400/300?random=1',
    description: 'Premium cotton basics'
  },
  {
    id: '2',
    name: 'Hoodies',
    slug: 'hoodies',
    image: 'https://picsum.photos/400/300?random=2',
    description: 'Cozy fleece comfort'
  },
  {
    id: '3',
    name: 'Jeans',
    slug: 'jeans',
    image: 'https://picsum.photos/400/300?random=3',
    description: 'Timeless denim cuts'
  },
  {
    id: '4',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://picsum.photos/400/300?random=4',
    description: 'The perfect details'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    slug: 'classic-white-tshirt',
    description: 'A timeless white t-shirt made from premium cotton. Perfect for everyday wear.',
    price: 29.99,
    compareAtPrice: 39.99,
    category: 'T-Shirts',
    images: [
      'https://picsum.photos/800/800?random=10',
      'https://picsum.photos/800/800?random=11'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
    stockBySize: { S: 10, M: 15, L: 20, XL: 12 }
  },
  {
    id: '2',
    name: 'Black Hoodie',
    slug: 'black-hoodie',
    description: 'Cozy black hoodie with soft fleece lining. Ideal for chilly days.',
    price: 59.99,
    category: 'Hoodies',
    images: [
      'https://picsum.photos/800/800?random=12',
      'https://picsum.photos/800/800?random=13'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    featured: true,
    stockBySize: { M: 8, L: 12, XL: 10, XXL: 5 }
  },
  {
    id: '3',
    name: 'Vintage Wash Jeans',
    slug: 'vintage-wash-jeans',
    description: 'Classic straight fit jeans with a vintage wash finish.',
    price: 89.99,
    category: 'Jeans',
    images: [
      'https://picsum.photos/800/800?random=14',
      'https://picsum.photos/800/800?random=15'
    ],
    sizes: ['30', '32', '34', '36'],
    featured: false,
    stockBySize: { '30': 5, '32': 10, '34': 8, '36': 2 }
  },
  {
    id: '4',
    name: 'Silk Scarf',
    slug: 'silk-scarf',
    description: 'Elegant silk scarf to add a touch of luxury to any outfit.',
    price: 45.00,
    category: 'Accessories',
    images: [
      'https://picsum.photos/800/800?random=16',
      'https://picsum.photos/800/800?random=17'
    ],
    sizes: ['One Size'],
    featured: true,
    stockBySize: { 'One Size': 25 }
  },
    {
    id: '5',
    name: 'Oversized Beige Tee',
    slug: 'oversized-beige-tee',
    description: 'Heavyweight cotton tee with an oversized street fit.',
    price: 34.99,
    category: 'T-Shirts',
    images: [
      'https://picsum.photos/800/800?random=18',
      'https://picsum.photos/800/800?random=19'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
    stockBySize: { S: 8, M: 20, L: 15, XL: 5 }
  },
  {
    id: '6',
    name: 'Leather Belt',
    slug: 'leather-belt',
    description: 'Genuine leather belt with antique brass buckle.',
    price: 39.99,
    category: 'Accessories',
    images: [
      'https://picsum.photos/800/800?random=20'
    ],
    sizes: ['30', '32', '34'],
    featured: false,
    stockBySize: { '30': 10, '32': 10, '34': 10 }
  }
];

export const MOCK_ORDERS: Order[] = [
  { id: '#ORD-7721', date: 'Oct 24, 2023', status: 'Delivered', total: 124.99, items: 3 },
  { id: '#ORD-7720', date: 'Oct 22, 2023', status: 'Processing', total: 59.99, items: 1 },
  { id: '#ORD-7719', date: 'Oct 15, 2023', status: 'Shipped', total: 245.00, items: 4 },
];