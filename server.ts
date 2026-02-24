import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import admin from 'firebase-admin';

// Load environment variables
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 5000;

// Debug logging
console.log('\n📋 Server Configuration:');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV || 'development\n');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    } as any),
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL
  });
}

const db = admin.database();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 500 * 1024 }, // 500KB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WebP, GIF) are allowed'));
    }
  }
});

// Verify Firebase Token Middleware
const verifyToken = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  // In production, verify the Firebase token
  // For now, we'll accept any token
  req.user = { token };
  next();
};

// Routes

// Health Check
app.get('/api/health', (req: any, res: any) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Upload Product
app.post('/api/products/upload', verifyToken, upload.single('file'), async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { name, price, category, tag, description } = req.body;
    const imagePath = `/images/${req.file.filename}`;

    console.log('📝 Uploading product:', { name, price, category, tag, fileSize: `${(req.file.size / 1024).toFixed(2)}KB` });

    // Create product object
    const productData = {
      id: Date.now().toString(),
      name,
      price: parseInt(price),
      category,
      tag,
      description,
      image_path: imagePath,
      created_at: new Date().toISOString()
    };

    // Save product to Firebase Realtime Database
    await db.ref(`products/${productData.id}`).set(productData);

    console.log('✅ Product saved to Firebase Realtime DB');

    res.json({
      success: true,
      message: 'Product uploaded successfully',
      product: productData
    });
  } catch (error: any) {
    console.error('❌ Upload error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'File too large. Maximum size is 500KB' });
    }
    res.status(500).json({ message: 'Failed to upload product', error: error.message });
  }
});

// Get all products
app.get('/api/products', async (req: any, res: any) => {
  try {
    const snapshot = await db.ref('products').orderByChild('created_at').get();
    
    if (!snapshot.exists()) {
      return res.json([]);
    }

    const products = [];
    snapshot.forEach((childSnapshot: any) => {
      products.unshift(childSnapshot.val());
    });

    res.json(products);
  } catch (error: any) {
    console.error('❌ Fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

// Delete product
app.delete('/api/products/:id', verifyToken, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    console.log('🗑️ Delete request for product ID:', id);
    
    // Get the product from Firebase to find the image file
    const snapshot = await db.ref(`products/${id}`).get();

    if (!snapshot.exists()) {
      console.log('❌ Product not found with ID:', id);
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = snapshot.val();
    const imageFilePath = path.join(process.cwd(), 'public', product.image_path);

    console.log('🖼️ Image path:', imageFilePath);
    console.log('📁 File exists:', fs.existsSync(imageFilePath));

    // Delete the product from Firebase
    await db.ref(`products/${id}`).remove();
    console.log('✅ Product deleted from Firebase Realtime DB');

    // Delete the image file if it exists
    if (fs.existsSync(imageFilePath)) {
      fs.unlinkSync(imageFilePath);
      console.log('✅ Image file deleted from public/images/');
    }

    res.status(200).json({
      success: true,
      message: 'Product and image deleted successfully',
      deletedProductId: id
    });
  } catch (error: any) {
    console.error('❌ Delete error:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});

// Get products by category
app.get('/api/products/category/:category', async (req: any, res: any) => {
  try {
    const { category } = req.params;
    const snapshot = await db.ref('products').get();

    if (!snapshot.exists()) {
      return res.json([]);
    }

    const products: any[] = [];
    snapshot.forEach((childSnapshot: any) => {
      const product = childSnapshot.val();
      if (product.category === category) {
        products.unshift(product);
      }
    });

    res.json(products);
  } catch (error: any) {
    console.error('❌ Fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start server
const startServer = async () => {
  console.log('🚀 Firebase Realtime DB initialized');
  
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log('📝 API Endpoint: http://localhost:' + PORT + '/api/products/upload\n');
  });
};

startServer();
