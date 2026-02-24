// API utility functions for backend communication

const API_BASE_URL = 'http://localhost:5000/api';

export const productAPI = {
  // Fetch all products from backend (no duplicates)
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      // Remove duplicates if any
      const uniqueProducts = Array.from(new Map(products.map((p: any) => [p.id, p])).values());
      return uniqueProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get products by category (server-side filtering)
  getProductsByCategory: async (category: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      // Remove duplicates if any
      const uniqueProducts = Array.from(new Map(products.map((p: any) => [p.id, p])).values());
      return uniqueProducts;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  // Get products by tag
  getProductsByTag: async (tag: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products?tag=${tag}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      // Remove duplicates if any
      const uniqueProducts = Array.from(new Map(products.map((p: any) => [p.id, p])).values());
      return uniqueProducts;
    } catch (error) {
      console.error('Error fetching products by tag:', error);
      return [];
    }
  },

  // Format product image path
  getImageUrl: (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:3000${imagePath}`;
  }
};
