-- ============================================
-- Weekend Shopping - Database Setup
-- ============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS weekend_shopping;
USE weekend_shopping;

-- ============================================
-- Products Table
-- ============================================
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

-- ============================================
-- Add Indexes for Better Performance
-- ============================================
CREATE INDEX idx_category ON products(category);
CREATE INDEX idx_tag ON products(tag);
CREATE INDEX idx_created_at ON products(created_at);

-- ============================================
-- Sample Data (Optional)
-- ============================================
INSERT INTO products (name, price, category, tag, description, image_path) VALUES
('CARGO PARACHUTE SKIRT // BLACK', 1500, 'BOTTOMS', 'NEW ARRIVAL', 'A black cargo parachute skirt with utility pockets and relaxed fit.', '/images/cargo-skirt-black.jpg'),
('VOLCANO // FULL SLEEVE T-SHIRT', 1400, 'TSHIRTS', 'BESTSELLER', 'Full sleeve Volcano tee featuring bold circular print.', '/images/volcano-tee.jpg'),
('GRAPHITE // FULL SLEEVE T-SHIRT', 1400, 'TSHIRTS', 'NEW ARRIVAL', 'Graphite full sleeve tee in a premium cotton blend.', '/images/graphite-tee.jpg'),
('OXIDIZED RELAXED RIVET DENIM // BLACK', 2750, 'BOTTOMS', 'BESTSELLER', 'Relaxed rivet denim with oxidized black finish.', '/images/denim-black.jpg'),
('TECH MESSENGER BAG // NOIR', 3200, 'BAGS', 'NEW ARRIVAL', 'Tech messenger bag with multiple compartments and zippers.', '/images/messenger-bag.jpg'),
('URBAN SLING POUCH // CHARCOAL', 1200, 'ACCESSORIES', 'NEW ARRIVAL', 'Compact sling pouch for daily essentials.', '/images/sling-pouch.jpg'),
('CLASSIC RUNNER // SNEAKERS', 2200, 'SHOES', 'NEW ARRIVAL', 'Classic runner sneakers with comfortable cushioning.', '/images/runner-sneakers.jpg');

-- ============================================
-- View All Products
-- ============================================
SELECT * FROM products ORDER BY created_at DESC;

-- ============================================
-- Useful Queries for Admin Panel
-- ============================================

-- Get products by category
-- SELECT * FROM products WHERE category = 'SHIRTS' ORDER BY created_at DESC;

-- Get products by tag
-- SELECT * FROM products WHERE tag = 'NEW ARRIVAL' ORDER BY created_at DESC;

-- Get bestselling products
-- SELECT * FROM products WHERE tag = 'BESTSELLER' ORDER BY created_at DESC;

-- Count products by category
-- SELECT category, COUNT(*) as count FROM products GROUP BY category;

-- Count products by tag
-- SELECT tag, COUNT(*) as count FROM products GROUP BY tag;

-- Get products with minimum price
-- SELECT * FROM products WHERE price = (SELECT MIN(price) FROM products);

-- Get products with maximum price
-- SELECT * FROM products WHERE price = (SELECT MAX(price) FROM products);

-- Get all distinct categories
-- SELECT DISTINCT category FROM products ORDER BY category;

-- Get all distinct tags
-- SELECT DISTINCT tag FROM products ORDER BY tag;

-- Update product category
-- UPDATE products SET category = 'NEW_CATEGORY' WHERE id = 1;

-- Update product tag
-- UPDATE products SET tag = 'NEW_TAG' WHERE id = 1;

-- Update product price
-- UPDATE products SET price = 2000 WHERE id = 1;

-- Update product details
-- UPDATE products SET name = 'NEW_NAME', description = 'NEW_DESCRIPTION' WHERE id = 1;

-- Delete all products (use with caution!)
-- DELETE FROM products;

-- Drop table (use with caution!)
-- DROP TABLE products;

-- Drop database (use with caution!)
-- DROP DATABASE weekend_shopping;
