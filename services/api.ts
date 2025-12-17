import { supabase } from '../lib/supabase';
import { Product, Order, SiteContent } from '../types';
import { MOCK_ORDERS, PRODUCTS, CATEGORIES } from '../mockData';

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    headline: "ZOCO",
    subheadline: "\"Wear your desired attire\"",
    image: "https://picsum.photos/1920/1080?grayscale"
  },
  categories: CATEGORIES
};

export const api = {
  products: {
    list: async (): Promise<Product[]> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) {
          console.warn('Supabase fetch failed (using mock data):', error);
          return PRODUCTS;
        }
        
        if (!data || data.length === 0) {
           return PRODUCTS;
        }

        return data as Product[];
      } catch (e) {
        console.warn('Supabase client error (using mock data):', e);
        return PRODUCTS;
      }
    },
    
    get: async (slug: string): Promise<Product | undefined> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .single();
          
        if (error || !data) {
           return PRODUCTS.find(p => p.slug === slug);
        }
        return data as Product;
      } catch (e) {
        return PRODUCTS.find(p => p.slug === slug);
      }
    },

    create: async (product: Omit<Product, 'id'>): Promise<Product> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .insert([product])
          .select()
          .single();

        if (error) throw error;
        return data as Product;
      } catch (error) {
        console.error('Create product failed (simulating success):', error);
        const mockProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
        return mockProduct as Product;
      }
    },

    uploadImage: async (file: File): Promise<string> => {
      try {
        const fileName = `${Math.random()}-${file.name}`;
        const { error } = await supabase.storage
          .from('products') // We reuse the products bucket for now
          .upload(fileName, file);

        if (error) throw error;

        const { data } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);
          
        return data.publicUrl;
      } catch (error) {
        console.error('Image upload failed (using local preview):', error);
        return URL.createObjectURL(file);
      }
    }
  },
  orders: {
    list: async (): Promise<Order[]> => {
      return [...MOCK_ORDERS];
    }
  },
  settings: {
    // Get site content (Hero, Categories)
    getContent: async (): Promise<SiteContent> => {
      // In a real app, this would be a DB fetch. 
      // For now, we use LocalStorage to simulate persistence for the user.
      const saved = localStorage.getItem('zoco-site-content');
      if (saved) {
        return JSON.parse(saved);
      }
      return DEFAULT_CONTENT;
    },
    
    // Save site content
    saveContent: async (content: SiteContent): Promise<void> => {
      localStorage.setItem('zoco-site-content', JSON.stringify(content));
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
};