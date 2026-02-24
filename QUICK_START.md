# ⚡ Quick Start - Fix Upload Error

## The Problem
You're getting `net::ERR_CONNECTION_REFUSED` because the backend server isn't running.

## The Solution - 3 Simple Steps

### Step 1️⃣: Set Up MySQL Database

Open MySQL Command Line and run these commands:

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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SHOW TABLES;
```

---

### Step 2️⃣: Start Backend Server

Open **PowerShell/Terminal** and run:

```bash
cd "C:\Users\acer\Downloads\weekend-shopping"
npx tsx server.ts
```

**Wait for these messages:**
```
📋 Server Configuration:
PORT: 5000
DB_HOST: localhost
DB_USER: root
DB_PASSWORD: ***set***
DB_NAME: weekend_shopping

🚀 Initializing database...
✅ Database table check complete
✅ Server running on http://localhost:5000
📝 API Endpoint: http://localhost:5000/api/products/upload
```

**⚠️ Keep this terminal OPEN - do NOT close it!**

---

### Step 3️⃣: Start Frontend Server

Open **a NEW PowerShell/Terminal** window and run:

```bash
cd "C:\Users\acer\Downloads\weekend-shopping"
npm run dev
```

**Wait for:**
```
VITE v... ready in ... ms
➜  Local:   http://localhost:3000
```

---

## Now Test It!

1. Open your browser: http://localhost:3000
2. Click **"Admin"** button in navbar
3. Login with Firebase credentials
4. Fill out product form
5. Upload image
6. Click **"PUBLISH PRODUCT"**

**If you see "Product uploaded successfully!" - it's working! ✅**

---

## What If It Still Doesn't Work?

### Error: `DB_PASSWORD: ***not set***`
→ Your `.env` file is missing
→ Create `.env` file in the project root with:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=weekend_shopping
PORT=5000
```

### Error: `Access denied for user 'root'`
→ Your MySQL password is wrong
→ Update `DB_PASSWORD` in `.env` to your actual MySQL password
→ Restart backend: Stop (Ctrl+C) and run `npx tsx server.ts` again

### Error: `Cannot GET /api/products/upload`
→ Make sure frontend is on port 3000 and backend is on port 5000
→ Check that backend shows "Server running on http://localhost:5000"

---

## Terminal Setup

You need **2 terminals running at the same time:**

| Terminal | Command | Port | Keep Open? |
|----------|---------|------|-----------|
| #1 Backend | `npx tsx server.ts` | 5000 | ✅ YES |
| #2 Frontend | `npm run dev` | 3000 | ✅ YES |

---

## Success Checklist

- [ ] MySQL database `weekend_shopping` created
- [ ] Table `products` created
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Can login to admin panel
- [ ] Can upload a product
- [ ] Product appears in database

---

## Need Help?

Check the logs in both terminals for errors. Share the error message from the terminal where the server is running.
