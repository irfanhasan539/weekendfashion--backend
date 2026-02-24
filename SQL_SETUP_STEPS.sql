-- ============================================
-- STEP 1: Create Database
-- ============================================
CREATE DATABASE IF NOT EXISTS weekend_shopping;

-- ============================================
-- STEP 2: Use the Database
-- ============================================
USE weekend_shopping;

-- ============================================
-- STEP 3: Create Tables
-- ============================================

-- Products Table
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
-- STEP 4: Create Indexes (For Performance)
-- ============================================
CREATE INDEX idx_category ON products(category);
CREATE INDEX idx_tag ON products(tag);
CREATE INDEX idx_created_at ON products(created_at);

-- ============================================
-- STEP 5: Verify Setup
-- ============================================
-- Run these to verify everything is created:

-- Check database
SHOW DATABASES;

-- Check tables in database
SHOW TABLES;

-- Check table structure
DESCRIBE products;

-- ============================================
-- TABLE STRUCTURE REFERENCE
-- ============================================
/*
Column name: id
Type: INT
Primary Key: YES
Auto Increment: YES
-----------
Column name: name
Type: VARCHAR(255)
NOT NULL: YES
-----------
Column name: price
Type: INT
NOT NULL: YES
-----------
Column name: category
Type: VARCHAR(100)
NOT NULL: YES
Examples: SHIRTS, TSHIRTS, BOTTOMS, BAGS, ACCESSORIES, SHOES, EYEWEAR, HEADWEAR
-----------
Column name: tag
Type: VARCHAR(100)
Nullable: YES
Examples: NEW ARRIVAL, BESTSELLER, CLEARANCE, LIMITED EDITION
-----------
Column name: description
Type: TEXT
Nullable: YES
-----------
Column name: image_path
Type: VARCHAR(255)
NOT NULL: YES
Format: /images/filename.jpg
-----------
Column name: created_at
Type: TIMESTAMP
Default: CURRENT_TIMESTAMP
-----------
Column name: updated_at
Type: TIMESTAMP
Default: CURRENT_TIMESTAMP
ON UPDATE: CURRENT_TIMESTAMP
*/
