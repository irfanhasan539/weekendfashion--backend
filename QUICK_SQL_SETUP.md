# 🗄️ SQL Setup - Quick Reference

## Step 1: Open MySQL Command Line

```bash
mysql -u root -p
```

**Enter password:** `password` (from your .env.local)

---

## Step 2: Run These SQL Commands (Copy & Paste)

### **Create Database**
```sql
CREATE DATABASE IF NOT EXISTS weekend_shopping;
```

### **Select Database**
```sql
USE weekend_shopping;
```

### **Create Products Table**
```sql
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
```

### **Create Indexes (Optional but Recommended)**
```sql
CREATE INDEX idx_category ON products(category);
CREATE INDEX idx_tag ON products(tag);
CREATE INDEX idx_created_at ON products(created_at);
```

---

## Step 3: Verify Everything is Set Up

```sql
-- Show all databases
SHOW DATABASES;

-- Show all tables (should show 'products')
SHOW TABLES;

-- Show products table structure
DESCRIBE products;
```

---

## Expected Output

After `DESCRIBE products;` you should see:

```
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int          | NO   | PRI | NULL    | auto_increment |
| name      | varchar(255) | NO   |     | NULL    |                |
| price     | int          | NO   |     | NULL    |                |
| category  | varchar(100) | NO   |     | NULL    |                |
| tag       | varchar(100) | YES  |     | NULL    |                |
| description| text        | YES  |     | NULL    |                |
| image_path| varchar(255) | NO   |     | NULL    |                |
| created_at| timestamp    | NO   |     | CURRENT_TIMESTAMP | |
| updated_at| timestamp    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-----------+--------------+------+-----+---------+----------------+
```

---

## Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"
- Check your password is correct
- Verify DB_PASSWORD in `.env.local` matches

### Error: "Database already exists"
- Database is already created (this is fine)
- Run `USE weekend_shopping;` to select it

### Error: "Table already exists"
- Table is already created (this is fine)
- Your setup is complete!

---

## Alternative: Run From File

Instead of copy-pasting, you can run the file directly:

```bash
mysql -u root -p weekend_shopping < "C:\Users\acer\Downloads\weekend-shopping\SQL_SETUP_STEPS.sql"
```

---

## ✅ You're Done!

Your database is now ready. The backend server will automatically use this database when you start it:

```bash
npx tsx server.ts
```
