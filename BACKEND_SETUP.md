# 🔧 Backend Setup & Troubleshooting Guide

## Step 1: Make Sure MySQL is Running

### Check if MySQL is Running
```bash
# On Windows, MySQL is typically a service
# Check if it's running via Services or use this in PowerShell:
Get-Service MySQL*
```

If MySQL is not running, start it:
```bash
# Windows Service
net start MySQL80

# Or use MySQL Installer to start it
```

---

## Step 2: Create Database and Tables

Open MySQL command line and run:

```bash
mysql -u root -p
```

Enter password: `password`

Then copy & paste these commands:

```sql
CREATE DATABASE IF NOT EXISTS weekend_shopping;
USE weekend_shopping;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  category VARCHAR(100) NOT NULL,
  tag VARCHAR(100),
  description TEXT,
  image_path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_category ON products(category);
CREATE INDEX idx_tag ON products(tag);
CREATE INDEX idx_created_at ON products(created_at);

SHOW TABLES;
DESCRIBE products;
```

---

## Step 3: Update Your .env File

Make sure your `.env` file has correct credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=weekend_shopping
PORT=5000
NODE_ENV=development
```

---

## Step 4: Start the Backend Server

### Terminal 1 - Backend Server
```bash
cd "C:\Users\acer\Downloads\weekend-shopping"
npx tsx server.ts
```

**You should see:**
```
🔧 Environment Configuration:
DB_HOST: localhost
DB_USER: root
DB_PASSWORD: ***
DB_NAME: weekend_shopping
PORT: 5000

Server running on http://localhost:5000
Database initialized successfully
```

### Terminal 2 - Frontend Server
```bash
npm run dev
```

**You should see:**
```
VITE v... ready in ... ms

➜  Local:   http://localhost:3000
➜  Network: use --host to expose
```

---

## Step 5: Test Upload

1. Open `http://localhost:3000` in browser
2. Click **Admin** button in navbar
3. Login with: admin@weekend-shopping.com / (Firebase password)
4. Fill product details
5. Select image
6. Click **PUBLISH PRODUCT**

---

## Common Errors & Fixes

### ❌ Error: `net::ERR_CONNECTION_REFUSED`
**Cause:** Backend server is not running
**Fix:** Make sure you ran `npx tsx server.ts` in a separate terminal

### ❌ Error: `Access denied for user 'root'@'localhost'`
**Cause:** Wrong MySQL password
**Fix:** Update `DB_PASSWORD` in `.env` file to match your MySQL root password

### ❌ Error: `Connect ECONNREFUSED`
**Cause:** MySQL service is not running
**Fix:** Start MySQL service with `net start MySQL80`

### ❌ Error: `Unknown database 'weekend_shopping'`
**Cause:** Database doesn't exist
**Fix:** Create it using the SQL commands in Step 2

### ❌ Error: `CORS error`
**Cause:** Frontend and backend CORS mismatch
**Fix:** Make sure backend is on `localhost:5000` and frontend is on `localhost:3000`

---

## Quick Verification Checklist

- [ ] MySQL is running
- [ ] Database `weekend_shopping` exists
- [ ] Table `products` exists
- [ ] `.env` file has correct DB credentials
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can see "Admin" button in navbar
- [ ] Can login with Firebase credentials
- [ ] Can upload a product successfully

---

## Next Steps After Backend Starts

Once you see:
```
✅ Server running on http://localhost:5000
✅ Database initialized successfully
```

1. Keep this terminal open
2. Open a new terminal for frontend
3. Run `npm run dev`
4. Open http://localhost:3000 in browser
5. Test admin panel and product upload
