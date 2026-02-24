# Firebase Configuration - Environment Variables

Copy this template to your `.env.local` or `.env` file and fill in your Firebase credentials.

```env
# ============================================
# FIREBASE CONFIGURATION
# ============================================

# Firebase Web Config (for frontend/client)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here

# Firebase Realtime Database URL (required for new flow)
VITE_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

# Firebase Admin SDK Credentials (for backend/server)
FIREBASE_PROJECT_ID=your_project_id_here
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxx@your-project.iam.gserviceaccount.com

# ============================================
# SERVER CONFIGURATION
# ============================================

PORT=5000
NODE_ENV=development
```

---

## 🔑 How to Get Your Firebase Credentials

### Step 1: Web Config (Frontend)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click ⚙️ **Project Settings** (top-left)
4. Go to **General** tab
5. Scroll down to "Your apps" section
6. Find your Web app and click the config code icon
7. Copy all values starting with `VITE_FIREBASE_`

### Step 2: Database URL
1. Go to **Realtime Database**
2. Look at the top - you'll see: `https://your-project.firebaseio.com`
3. Copy this as `VITE_FIREBASE_DATABASE_URL`

### Step 3: Admin SDK Credentials (Backend)
1. Go to **Project Settings** → **Service Accounts** tab
2. Select **Node.js** as environment
3. Click **Generate New Private Key**
4. A JSON file will download
5. Open the JSON and copy these values:
   ```json
   {
     "project_id": "your_project_id",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com"
   }
   ```

---

## ⚠️ Important Notes

- **Keep `FIREBASE_PRIVATE_KEY` secure** - Never commit to GitHub
- **Use `.env.local`** - This file is git-ignored and won't be uploaded
- **Private key format**: Keep the `\n` characters as-is for line breaks
- **VITE_ prefix**: These are accessible in frontend (use VITE_ prefix with Vite)
- **Non-VITE_ prefix**: These are for backend only (never expose to frontend)

---

## 🧪 Testing Configuration

After setting up `.env.local`, test it:

```bash
# Start the development server
npm run dev

# In another terminal, test the API server
npm run server
```

Visit `http://localhost:3000` to test the frontend.

---

## 🛡️ Security Best Practices

1. **Never commit sensitive credentials**
   ```bash
   # .gitignore should contain
   .env.local
   .env
   ```

2. **Use Firebase Rules** to restrict database access
   - See `FIREBASE_REALTIME_DB_RULES.md`

3. **Rotate credentials periodically**
   - Generate new private keys every few months

4. **Use environment-specific keys**
   - Development: One Firebase project
   - Production: Another Firebase project

---

## 🐛 Troubleshooting

**Error: "databaseURL is required"**
- Make sure `VITE_FIREBASE_DATABASE_URL` is set

**Error: "private_key is required"**
- Check `FIREBASE_PRIVATE_KEY` format
- Ensure line breaks are preserved as `\n`

**Error: "Failed to connect to Firebase"**
- Verify all credentials are correct
- Check Firebase Realtime Database is enabled
- Confirm network connectivity to firebaseio.com

**Error: "Permission denied when reading"**
- Check Firebase Realtime Database Rules
- See `FIREBASE_REALTIME_DB_RULES.md`
