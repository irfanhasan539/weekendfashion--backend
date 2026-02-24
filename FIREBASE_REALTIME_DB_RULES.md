# Firebase Realtime Database Rules

Copy and paste these rules in your Firebase Console > Realtime Database > Rules tab.

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

## Rules Explanation

### Products Node
- **`.read: true`** - Anyone can read all products (public access)
- **`.write: false`** - Direct writes to products node are disabled (security)
- **`.indexOn`** - Indexes for efficient queries on category, tag, and created_at
- **`$productId`** - Individual product access
  - **`.read: true`** - Anyone can read individual products
  - **`.write`** - Only authenticated admins can write/update products

### Admins Node
- **`.read: false`** - No public read access
- **`.write: false`** - No direct writes (preset by admin)
- **`$uid`** - Individual admin user data
  - **`.read: "auth.uid === $uid"`** - Admins can only read their own data
  - **`.write: false`** - Admins cannot modify their own data (prevent unauthorized escalation)

## Setup Instructions

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Realtime Database**
4. Click the **Rules** tab
5. Replace all content with the rules above
6. Click **Publish**

## Structure in Firebase

```
root
└── products
    └── {productId}
        ├── id: "1708876543212"
        ├── name: "CARGO PARACHUTE SKIRT // BLACK"
        ├── price: 1500
        ├── category: "BOTTOMS"
        ├── tag: "NEW ARRIVAL"
        ├── description: "High-quality cargo parachute skirt..."
        ├── image_path: "/images/1708876543212-123456789.jpg"
        └── created_at: "2026-02-24T10:15:43.212Z"
```

## Environment Variables Required

Add these to your `.env` or `.env.local`:

```
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_firebase_admin_email
```

To get Firebase Admin credentials:
1. Go to Firebase Console > Project Settings > Service Accounts
2. Click "Generate New Private Key"
3. Copy the JSON credentials
4. Extract: `project_id`, `private_key`, and `client_email`

## Testing the Rules

You can test rules in Firebase Console:

1. Go to **Realtime Database > Rules > Simulator**
2. Test read/write operations with different auth states:
   - **Not authenticated** - Can read products, cannot write
   - **Admin authenticated** - Can write to their assigned products
