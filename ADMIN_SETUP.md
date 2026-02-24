# Admin System Setup Guide

## Overview
This guide walks you through setting up the complete admin system with Firebase authentication, product uploads, image storage, and MySQL database integration.

## Prerequisites
- Node.js (v16+)
- MySQL Server running locally or on a server
- Firebase Account
- npm or yarn

## Step 1: Firebase Setup

### 1.1 Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the wizard
3. Name your project (e.g., "weekend-shopping")
4. Accept the terms and create the project

### 1.2 Enable Authentication
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication

### 1.3 Get Firebase Credentials
1. Go to **Project Settings** (gear icon) → **General**
2. Scroll down to "Your apps" and click the web icon `</>`
3. Copy your Firebase config values
4. Paste them into `.env.local` file:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 1.4 Create an Admin User in Firebase
1. In Firebase Console → **Authentication** → **Users**
2. Click **Add user**
3. Enter email: `admin@weekend-shopping.com`
4. Enter password: (choose a strong password)
5. Click **Add user**

## Step 2: MySQL Database Setup

### 2.1 Create Database
```sql
CREATE DATABASE weekend_shopping;
USE weekend_shopping;
```

The `products` table will be created automatically when the server starts.

### 2.2 Update `.env.local`
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=weekend_shopping
PORT=5000
```

## Step 3: Installation

### 3.1 Install Dependencies
```bash
npm install
```

### 3.2 Build the Frontend
```bash
npm run build
```

## Step 4: Running the Application

### 4.1 Start the Backend Server (Terminal 1)
```bash
npx tsx server.ts
```

Server will start on `http://localhost:5000`

### 4.2 Start the Frontend (Terminal 2)
```bash
npm run dev
```

Frontend will start on `http://localhost:3000`

## Step 5: Testing Admin Panel

### 5.1 Access Admin
1. Open `http://localhost:3000` in your browser
2. Click the **"Admin"** button in the navbar
3. Login with credentials:
   - Email: `admin@weekend-shopping.com`
   - Password: (the password you set in Firebase)

### 5.2 Add a Product
1. Fill in product details:
   - Product Name
   - Price (in ₹)
   - Category
   - Tag
   - Description
2. Select an image
3. Click **PUBLISH PRODUCT**

### 5.3 Image Storage
- Uploaded images are stored in `public/images/`
- Image paths are saved in the MySQL database
- Images are accessible at `http://localhost:3000/images/filename`

## Step 6: Database Structure

The `products` table will have:
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  category VARCHAR(100) NOT NULL,
  tag VARCHAR(100),
  description TEXT,
  image_path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Troubleshooting

### Firebase Connection Error
- Verify all Firebase credentials in `.env.local`
- Check internet connection
- Ensure Firebase project is active

### MySQL Connection Error
- Verify MySQL is running: `mysql -u root -p`
- Check DB credentials in `.env.local`
- Ensure database exists: `CREATE DATABASE weekend_shopping;`

### Image Upload Failed
- Check `public/images/` folder has write permissions
- Ensure image file is not corrupted
- Check server logs for specific error

### Admin Login Failed
- Verify admin user exists in Firebase Console
- Check credentials are correct
- Clear browser cookies/cache and try again

## Security Notes

⚠️ **Important**: 
1. Never commit `.env.local` to version control (add to `.gitignore`)
2. Use strong passwords for admin accounts
3. Use HTTPS in production
4. Restrict Firebase authentication to your admin domain
5. Set proper file permissions on `public/images/`

## Next Steps

1. Create additional admin users in Firebase
2. Configure image optimization/compression
3. Set up backup for MySQL database
4. Deploy to production (Vercel for frontend, AWS/Heroku for backend)

## Support

For issues or questions about specific technologies:
- Firebase: https://firebase.google.com/docs
- MySQL: https://dev.mysql.com/doc/
- Express: https://expressjs.com/
- React: https://react.dev/
