import React, { useState, useRef, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { LogOut, Upload, X, Trash2 } from 'lucide-react';
import axios from 'axios';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'SHIRTS',
    tag: 'NEW ARRIVAL',
    description: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('');
  const [products, setProducts] = useState<any[]>([]);
  const [fetchingProducts, setFetchingProducts] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'SHIRTS', 'TSHIRTS', 'BOTTOMS', 'BAGS', 'ACCESSORIES', 'SHOES', 'EYEWEAR', 'HEADWEAR'
  ];

  const tags = ['NEW ARRIVAL', 'BESTSELLER', 'CLEARANCE', 'LIMITED EDITION'];

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setFetchingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    setDeletingId(productId);
    try {
      console.log('🗑️ Deleting product ID:', productId);
      
      const token = await user.getIdToken();
      console.log('✅ Token obtained');
      
      const response = await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Delete response:', response.data);

      setProducts(products.filter(p => p.id !== productId));
      setMessage('✅ Product deleted successfully! Deleted from Firebase and image folder.');
      setMessageType('success');
      setTimeout(() => setMessage(''), 4000);
    } catch (error: any) {
      console.error('❌ Delete error:', error);
      console.error('Response:', error.response);
      setMessage(error.response?.data?.message || error.message || 'Failed to delete product');
      setMessageType('error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      setMessage('Please select an image');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', image);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('tag', formData.tag);
      formDataToSend.append('description', formData.description);

      const response = await axios.post('http://localhost:5000/api/products/upload', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${await user.getIdToken()}`
        }
      });

      setMessage('✅ Product uploaded successfully! It will appear in your store shortly.');
      setMessageType('success');
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        category: 'SHIRTS',
        tag: 'NEW ARRIVAL',
        description: ''
      });
      setImage(null);
      setImagePreview('');

      // Refresh page after 2 seconds to show new product
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to upload product');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter">ADMIN PANEL</h1>
            <p className="text-xs text-gray-500 font-bold">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-black hover:bg-gray-800 transition-colors"
          >
            <LogOut size={16} />
            LOGOUT
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-black mb-8">Add New Product</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Form */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="E.g., CARGO PARACHUTE SKIRT // BLACK"
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="1500"
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Tag */}
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                    Tag *
                  </label>
                  <select
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  >
                    {tags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Product details..."
                    rows={4}
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2">
                    Product Image *
                  </label>
                  
                  {imagePreview ? (
                    <div className="relative aspect-[3/4] bg-gray-100 border-2 border-gray-300 overflow-hidden">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setImagePreview('');
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-black transition-colors bg-gray-50"
                    >
                      <div className="text-center">
                        <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-bold text-gray-600">Click to upload image</p>
                        <p className="text-xs text-gray-500 mt-1">Or drag and drop</p>
                      </div>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                {/* File Info */}
                {image && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <p className="text-xs font-bold text-blue-900">
                      File: {image.name}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Size: {(image.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`px-4 py-3 rounded text-sm font-bold ${
                  messageType === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-700'
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 px-6 text-sm font-black tracking-widest uppercase hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {loading ? 'PUBLISHING...' : 'PUBLISH PRODUCT'}
            </button>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-black mb-8">Manage Products</h2>

          {fetchingProducts ? (
            <div className="text-center py-12">
              <p className="text-gray-500 font-bold tracking-widest">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 font-bold tracking-widest mb-2">NO PRODUCTS YET</p>
              <p className="text-sm text-gray-400">Upload your first product above to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                    <img 
                      src={`http://localhost:3000${product.image_path}`} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Image';
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-bold text-sm line-clamp-2 mb-2">{product.name}</h3>
                    
                    <div className="space-y-1 mb-4 text-xs text-gray-600">
                      <p><span className="font-bold">Price:</span> ₹{product.price}</p>
                      <p><span className="font-bold">Category:</span> {product.category}</p>
                      <p><span className="font-bold">Tag:</span> {product.tag}</p>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      disabled={deletingId === product.id}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 text-xs font-bold tracking-widest uppercase hover:bg-red-700 disabled:opacity-50 transition-colors"
                    >
                      <Trash2 size={16} />
                      {deletingId === product.id ? 'DELETING...' : 'DELETE'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
