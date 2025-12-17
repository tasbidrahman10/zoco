export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  images: string[];
  sizes: string[];
  featured: boolean;
  stockBySize: Record<string, number>;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  total: number;
  items: number;
}

export interface SiteContent {
  hero: {
    headline: string;
    subheadline: string;
    image: string;
  };
  categories: Category[];
}