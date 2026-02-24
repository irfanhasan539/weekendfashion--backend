# Firebase Realtime Database - Complete Rules Guide

## 📋 Rules Overview

The rules control who can read and write data in your Firebase Realtime Database.

---

## 🔐 Complete Rules JSON

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": false,
      ".indexOn": ["category", "tag", "created_at"],
      "$productId": {
        ".read": true,
        ".write": "root.child('admins').child(auth.uid).exists()"
      }
    },
    "admins": {
      ".read": false,
      ".write": false,
      "$uid": {
        ".read": "auth.uid === $uid",
        ".write": false
      }
    }
  }
}
```

---

## 📖 Rule-by-Rule Explanation

### 1. `"products"` Node

```json
"products": {
  ".read": true,                    // Public read access
  ".write": false,                  // Direct writes blocked
  ".indexOn": [...],                // Database indexes
  "$productId": {...}               // Individual product rules
}
```

#### `.read: true`
- **What it means**: Anyone on the internet can read all products
- **Use case**: Customers viewing your store
- **Effect**: `GET /api/products` works for everyone

#### `.write: false`
- **What it means**: Nobody can directly write to the `products` node
- **Use case**: Security - force all writes through your backend API
- **Effect**: Prevents accidental overwrites, enforces validated uploads

#### `.indexOn: ["category", "tag", "created_at"]`
- **What it means**: Create database indexes for faster queries
- **Use case**: Speed up filtering by category, tag, or date
- **Effect**: Queries run instantly even with 10,000+ products

#### `$productId` Pattern
- **What it means**: Individual product rule matching any product ID
- **Example**: `1708876543212` is a `$productId`
- **Effect**: Applies rules to each product separately

---

### 2. Individual Product Rules

```json
"$productId": {
  ".read": true,
  ".write": "root.child('admins').child(auth.uid).exists()"
}
```

#### `.read: true`
- Anyone can read a specific product
- Works without authentication
- Customers can see product details

#### `.write: "admin_check"`
- **Condition**: `root.child('admins').child(auth.uid).exists()`
- **Translation**: "Write is allowed IF the user ID exists in the admins node"
- **Effect**: Only admins authenticated as users in the "admins" node can upload

---

### 3. `"admins"` Node

```json
"admins": {
  ".read": false,
  ".write": false,
  "$uid": {
    ".read": "auth.uid === $uid",
    ".write": false
  }
}
```

#### `.read: false` (top level)
- Nobody can list all admins
- Prevents exposing admin list

#### `.write: false` (top level)
- Nobody can add themselves as admin
- Prevents unauthorized escalation
- **Admin registration must be done manually** in Firebase Console

#### Individual Admin (`$uid`)
- `.read: "auth.uid === $uid"` - Admins can only see their own data
- `.write: false` - Admins cannot self-modify (must be done in Firebase Console)

---

## 🔄 Authentication Flow

### User Tries to Upload Product

```
1. User logs in → Firebase generates auth.uid
                ↓
2. User clicks "Upload Product"
                ↓
3. Server checks: Is this user in admins node? → YES ✅
                ↓
4. Server uploads product to products/{id}
                ↓
5. Firebase checks rules: .write = "admin_check"
                ↓
6. Firebase verifies: Is user ID in admins node? → YES ✅
                ↓
7. Upload succeeds ✅
```

### Customer Tries to View Product

```
1. Customer visits store (no login needed)
                ↓
2. App fetches: GET /api/products
                ↓
3. Server reads from Firebase: products/
                ↓
4. Firebase checks rules: .read = true
                ↓
5. Anyone can read → YES ✅
                ↓
6. Products load in store ✅
```

### Random User Tries to Upload Product

```
1. Random user (not in admins node)
                ↓
2. Tries to write to products/{id}
                ↓
3. Firebase checks rules: .write = "admin_check"
                ↓
4. Checks: Is user in admins node? → NO ❌
                ↓
5. Upload blocked → Permission Denied ❌
```

---

## 🛠️ How to Set These Rules

### Step 1: Open Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project

### Step 2: Navigate to Realtime Database
1. Click **Realtime Database** in left menu
2. Click **Rules** tab at the top

### Step 3: Replace Rules
1. Select all current text (Ctrl+A / Cmd+A)
2. Copy the complete JSON rules above
3. Paste into the editor
4. Click **Publish**

### Step 4: Confirm
- Rules should change to the new ones
- Your database is now secured

---

## 🎯 Quick Reference

| Action | User | Permission | Reason |
|--------|------|-----------|--------|
| Read all products | Anybody | ✅ YES | `.read: true` on products |
| Read one product | Anybody | ✅ YES | `.read: true` on $productId |
| Write product | Authenticated Admin | ✅ YES | In admins node |
| Write product | Random user | ❌ NO | Not in admins node |
| Admin reads own data | Self | ✅ YES | `auth.uid === $uid` |
| Admin modifies account | Self | ❌ NO | `.write: false` for security |
| List all admins | Anybody | ❌ NO | `.read: false` on admins |

---

## ⚠️ Important Notes

1. **Only Write Through API**
   - Never write directly from frontend
   - Always validate on backend before writing
   - Rules handle additional security layer

2. **Admin Setup**
   - Admins must be added manually in Firebase Console
   - Go to Realtime Database → Create path: `admins/{uid}`
   - Set any value (e.g., `{"role": "admin"}`)

3. **Indexes**
   - Firebase will suggest creating indexes
   - Accept all suggestions for performance
   - No manual action needed after rules are published

4. **Testing**
   - Firebase has a Rules Simulator in Console
   - Test read/write scenarios before publishing
   - Test with different auth states

---

## 🧪 Testing in Firebase Console

### Test 1: Public Read
**Simulator:**
- Auth: None
- Location: `/products`
- Operation: read
- Expected: ✅ true (allowed)

### Test 2: Admin Write
**Simulator:**
- Auth: Custom token with uid = "admin123"
- *First, add admin123 to admins node*
- Location: `/products/1234567890`
- Operation: write
- Expected: ✅ true (allowed)

### Test 3: Random User Write
**Simulator:**
- Auth: Custom token with uid = "random_user"
- Location: `/products/1234567890`
- Operation: write
- Expected: ❌ false (denied)

---

## 🚀 Common Customizations

### Allow Creation Date Filtering
Already included in `.indexOn`:
```json
".indexOn": ["category", "tag", "created_at"]
```

### Add More Admins
In Firebase Console Realtime Database:
```
admins/
├── uid_admin1 → {"role": "admin"}
├── uid_admin2 → {"role": "admin"}
└── uid_admin3 → {"role": "admin"}
```

### Add Additional Permissions
```json
"$productId": {
  ".read": true,
  ".write": "root.child('editors').child(auth.uid).exists() || root.child('admins').child(auth.uid).exists()"
}
```

---

## 🆘 Troubleshooting

**Error: "Permission denied when reading products"**
- Check: Is `.read: true` set on products?
- Fix: Republish rules

**Error: "Cannot upload as admin"**
- Check: Is user ID in admins node?
- Check: Is user authenticated?
- Fix: Add user to admins node in Console

**Error: "Product not saving"**
- Check: Are you uploading through `/api/products/upload`?
- Check: Did you get auth token?
- Check: Is token from authenticated user?

**Products load slow**
- Wait for indexes to build
- Check `.indexOn` values
- Restart app to clear cache

---

## 📊 Rules Best Practices

✅ **DO:**
- Use `.write: false` on parent nodes for security
- Create indexes for frequently queried fields
- Test rules with Simulator before publishing
- Keep sensitive data in admin-only nodes
- Use auth.uid for user-specific rules

❌ **DON'T:**
- Use `.write: true` everywhere (security risk)
- Upload files directly from frontend
- Trust client-side validation alone
- Skip testing rules before go-live
- Expose user emails or sensitive info

---

## 🎓 Firebase Rules Documentation
For more info: [Official Firebase Rules Guide](https://firebase.google.com/docs/database/security)
