import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';
import { SiteContent } from '../types';
import { Package, DollarSign, ShoppingCart, Users, Upload, X, LayoutTemplate, Save, Image as ImageIcon } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="bg-white p-6 rounded-xl border shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
      </div>
      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
        <Icon className="h-5 w-5" />
      </div>
    </div>
    <div className="mt-4">
      <span className="text-green-600 text-sm font-medium">{trend}</span>
      <span className="text-gray-500 text-sm ml-2">from last month</span>
    </div>
  </div>
);

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'content'>('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // -- Content Editing State --
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [contentLoading, setContentLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'content' && !siteContent) {
      const loadContent = async () => {
        setContentLoading(true);
        const data = await api.settings.getContent();
        setSiteContent(data);
        setContentLoading(false);
      };
      loadContent();
    }
  }, [activeTab]);

  const handleSaveContent = async () => {
    if (!siteContent) return;
    setIsSubmitting(true);
    await api.settings.saveContent(siteContent);
    setIsSubmitting(false);
    alert('Site content updated!');
  };

  const handleUploadHero = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && siteContent) {
       setIsSubmitting(true);
       try {
         const url = await api.products.uploadImage(e.target.files[0]);
         setSiteContent({
           ...siteContent,
           hero: { ...siteContent.hero, image: url }
         });
       } finally {
         setIsSubmitting(false);
       }
    }
  };

  const handleUploadCategory = async (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
    if (e.target.files && e.target.files[0] && siteContent) {
       setIsSubmitting(true);
       try {
         const url = await api.products.uploadImage(e.target.files[0]);
         setSiteContent({
           ...siteContent,
           categories: siteContent.categories.map(c => 
             c.id === categoryId ? { ...c, image: url } : c
           )
         });
       } finally {
         setIsSubmitting(false);
       }
    }
  };

  // -- Product Form State --
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'T-Shirts',
    description: '',
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
        alert("Please upload an image");
        return;
    }

    setIsSubmitting(true);
    
    try {
        const imageUrl = await api.products.uploadImage(selectedFile);

        await api.products.create({
            name: newProduct.name,
            slug: newProduct.name.toLowerCase().replace(/ /g, '-'),
            description: newProduct.description,
            price: Number(newProduct.price),
            category: newProduct.category,
            images: [imageUrl],
            sizes: ['S', 'M', 'L', 'XL'],
            featured: true,
            stockBySize: { S: 10, M: 10, L: 10, XL: 10 }
        });

        alert('Product Created Successfully!');
        setShowAddProduct(false);
        setNewProduct({ name: '', price: '', category: 'T-Shirts', description: '' });
        setSelectedFile(null);
        setPreviewUrl(null);

    } catch (error) {
        console.error(error);
        alert('Error creating product. Check console.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">ZOCO Admin</h2>
        </div>
        <nav className="p-4 space-y-1">
          <Button 
            variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </Button>
          <Button 
             variant={activeTab === 'products' ? 'secondary' : 'ghost'}
             className="w-full justify-start"
             onClick={() => setActiveTab('products')}
          >
            Products
          </Button>
          <Button 
             variant={activeTab === 'content' ? 'secondary' : 'ghost'}
             className="w-full justify-start"
             onClick={() => setActiveTab('content')}
          >
            Site Content
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {activeTab === 'dashboard' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard title="Total Revenue" value="$45,231.89" icon={DollarSign} trend="+20.1%" />
              <StatsCard title="Orders" value="+2350" icon={ShoppingCart} trend="+180.1%" />
              <StatsCard title="Products" value="12" icon={Package} trend="+19%" />
              <StatsCard title="Active Now" value="+573" icon={Users} trend="+201" />
            </div>
          </>
        )}

        {activeTab === 'content' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Site Content Editor</h1>
              <Button onClick={handleSaveContent} isLoading={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>

            {contentLoading || !siteContent ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                   <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                     <LayoutTemplate className="h-5 w-5 text-gray-400" /> Hero Section
                   </h2>
                   <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                        <input 
                           type="text"
                           value={siteContent.hero.headline}
                           onChange={e => setSiteContent({...siteContent, hero: {...siteContent.hero, headline: e.target.value}})}
                           className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subheadline</label>
                        <input 
                           type="text"
                           value={siteContent.hero.subheadline}
                           onChange={e => setSiteContent({...siteContent, hero: {...siteContent.hero, subheadline: e.target.value}})}
                           className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
                         <div className="relative group rounded-lg overflow-hidden h-48 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                            {siteContent.hero.image ? (
                               <img src={siteContent.hero.image} alt="Hero" className="h-full w-full object-cover" />
                            ) : (
                               <span className="text-gray-400">No image selected</span>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-100">
                                 Change Image
                                 <input type="file" className="hidden" accept="image/*" onChange={handleUploadHero} />
                               </label>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Categories Section */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                   <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                     <ImageIcon className="h-5 w-5 text-gray-400" /> Category Images
                   </h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {siteContent.categories.map((cat) => (
                       <div key={cat.id} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">{cat.name}</h4>
                          <div className="relative group rounded-md overflow-hidden aspect-[4/3] bg-gray-100">
                             <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <label className="cursor-pointer bg-white text-gray-900 px-3 py-1.5 rounded-md font-medium text-xs hover:bg-gray-100">
                                 Upload New
                                 <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUploadCategory(e, cat.id)} />
                               </label>
                            </div>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
           <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Products</h1>
                <Button onClick={() => setShowAddProduct(!showAddProduct)}>
                  {showAddProduct ? 'Cancel' : 'Add Product'}
                </Button>
              </div>

              {showAddProduct ? (
                <div className="bg-white p-8 rounded-xl border shadow-sm">
                   <h2 className="text-xl font-bold mb-6">Create New Product</h2>
                   <form onSubmit={handleCreateProduct} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input 
                          required
                          type="text" 
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
                          value={newProduct.name}
                          onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                          <input 
                            required
                            type="number" 
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
                            value={newProduct.price}
                            onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <select 
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
                            value={newProduct.category}
                            onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                          >
                             <option>T-Shirts</option>
                             <option>Hoodies</option>
                             <option>Jeans</option>
                             <option>Accessories</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea 
                          rows={4}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
                          value={newProduct.description}
                          onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                        />
                      </div>

                      {/* Image Upload Area */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center relative hover:bg-gray-50 transition-colors">
                           
                           {!previewUrl ? (
                             <div className="flex flex-col items-center pointer-events-none">
                                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">Click to upload image</p>
                             </div>
                           ) : (
                             <div className="relative">
                               <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-md shadow-sm" />
                               <button 
                                 type="button"
                                 onClick={(e) => {
                                   e.preventDefault();
                                   setPreviewUrl(null);
                                   setSelectedFile(null);
                                 }}
                                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                               >
                                 <X className="h-4 w-4" />
                               </button>
                             </div>
                           )}

                           <input 
                              type="file" 
                              accept="image/*"
                              onChange={handleFileSelect}
                              className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${previewUrl ? 'hidden' : ''}`}
                           />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button type="submit" isLoading={isSubmitting}>
                           Create Product
                        </Button>
                      </div>
                   </form>
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed">
                   <p className="text-gray-500">Select "Add Product" to list a new item on your store.</p>
                </div>
              )}
           </div>
        )}
      </main>
    </div>
  );
};