### Step 1: Set Environment Variables in Vercel

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Click on your project: `scatch-azure`

2. **Navigate to Settings:**
   - Click "Settings" tab
   - Click "Environment Variables" in left sidebar

3. **Add These 3 Variables:**

   **Variable 1: MONGODB_URI**
   ```
   Key: MONGODB_URI
   Value: mongodb+srv://your-username:your-password@cluster.mongodb.net
   Environment: Production, Preview, Development (select all)
   ```
   ⚠️ **IMPORTANT:** 
   - Do NOT include `/scatch` at the end (our code adds it automatically)
   - Replace `your-username` and `your-password` with your actual MongoDB Atlas credentials
   - If you don't have MongoDB Atlas yet, follow Step 2 below

   **Variable 2: EXPRESS_SESSION_SECRET**
   ```
   Key: EXPRESS_SESSION_SECRET
   Value: any-random-long-string-like-xyz123abc456def789
   Environment: Production, Preview, Development (select all)
   ```
   
   **Variable 3: NODE_ENV**
   ```
   Key: NODE_ENV
   Value: production
   Environment: Production only
   ```

4. **Click "Save"** for each variable

5. **Redeploy:**
   - Go to "Deployments" tab
   - Click ⋮ (three dots) on latest deployment
   - Click "Redeploy"
   - ✅ Your app should now work!

---

### Step 2: Get MongoDB Atlas Connection String (if you don't have it)

1. **Sign up for MongoDB Atlas** (free):
   - Go to: https://www.mongodb.com/cloud/atlas
   - Create free account
   - Create a new cluster (M0 Free tier)

2. **Create Database User:**
   - Click "Database Access" in left menu
   - Click "Add New Database User"
   - Set username & password (remember these!)
   - Set role: "Atlas admin" or "Read and write to any database"
   - Click "Add User"

3. **Allow Vercel's IP Addresses:**
   - Click "Network Access" in left menu
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add Vercel's IPs: [see list here](https://vercel.com/docs/concepts/security/deployment-protection)
   - Click "Confirm"

4. **Get Connection String:**
   - Click "Database" in left menu
   - Click "Connect" button on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/
     ```
   - Replace `<password>` with your actual password
   - **Remove** any database name at the end (like `/test` or `/myFirstDatabase`)
   
   Example of correct format:
   ```
   mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net
   ```
   ❌ NOT: `mongodb+srv://...mongodb.net/scatch`
   
5. **Copy this to Vercel** as the `MONGODB_URI` variable (Step 1 above)

---

## 🔍 Verify It's Working

After redeploying:

1. **Check Vercel logs:**
   - Go to your deployment
   - Click "Runtime Logs"
   - You should see "connected to MongoDB" (if debug is enabled)
   - No more config errors!

2. **Test your site:**
   - Visit: https://scatch-azure.vercel.app
   - Try navigating to different pages
   - Try user registration/login if applicable

---

## 🐛 Still Getting Errors?

### "MongooseServerSelectionError" or "connection timeout"
- ✅ Check MongoDB Atlas Network Access allows 0.0.0.0/0
- ✅ Verify database user has correct permissions
- ✅ Ensure password doesn't contain special characters (or URL-encode them)

### "Cannot find module 'config'"
- ✅ Run: `git add . && git commit -m "Add production config" && git push`
- ✅ Redeploy on Vercel

### Environment variables not showing up
- ✅ Make sure you selected all environments (Production, Preview, Development)
- ✅ Clear deployment cache: Settings → General → scroll to bottom → "Clear Cache"
- ✅ Redeploy again

---

## 📸 Visual Guide

**Where to find Environment Variables in Vercel:**
```
Vercel Dashboard
  └── Your Project (scatch-azure)
       └── Settings tab (top)
            └── Environment Variables (left sidebar)
                 └── Add New Variable button
```

**What it should look like:**
```
| Key                      | Value                                           | Environments |
|--------------------------|------------------------------------------------|--------------|
| MONGODB_URI              | mongodb+srv://user:pass@cluster.mongodb.net    | Pro,Pre,Dev  |
| EXPRESS_SESSION_SECRET   | my-super-secret-key-xyz123                     | Pro,Pre,Dev  |
| NODE_ENV                 | production                                      | Production   |
```

---

## ⚡ Quick Test (Optional)

If you want to test locally first:

1. Create `.env` file in your project:
   ```bash
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net
   EXPRESS_SESSION_SECRET=test-secret
   ```

2. Run locally:
   ```bash
   node app.js
   ```

3. Visit: http://localhost:3000

If it works locally, it will work on Vercel once you set the same variables!

---

**After setting these variables and redeploying, your error will be gone! ✅**
