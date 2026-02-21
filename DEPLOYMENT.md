# Vercel Deployment Guide

## ✅ Code Changes Completed

Your app is now configured for serverless deployment on Vercel!

### What was fixed:
1. ✅ Changed `app.listen()` to `module.exports = app`
2. ✅ Added `vercel.json` configuration
3. ✅ Installed `connect-mongo` for persistent session storage
4. ✅ Updated session config to use MongoDB store
5. ✅ Updated MongoDB connection to support cloud database

---

## 🚀 Deployment Steps

### Step 1: Set up MongoDB Atlas (Cloud Database)

1. **Create free account** at https://www.mongodb.com/cloud/atlas
2. **Create a new cluster** (free tier M0 is sufficient)
3. **Create database user:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Set username & password (save these!)
   - Grant "Read and write to any database" role
4. **Whitelist all IPs** (for Vercel):
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm
5. **Get connection string:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`)
   - Replace `<password>` with your actual password
   - **Important:** Remove `/scatch` or any database name from the end (our code adds it)

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Easiest)

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for Vercel serverless deployment"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com/
   - Click "New Project"
   - Import your GitHub repository
   - **Add Environment Variables:**
     - `MONGODB_URI` = `mongodb+srv://username:password@cluster.mongodb.net` (from Step 1)
     - `EXPRESS_SESSION_SECRET` = `any-long-random-string-here`
     - `NODE_ENV` = `production`
   - Click "Deploy"

#### Option B: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Set environment variables:**
   ```bash
   vercel env add MONGODB_URI
   # Paste your MongoDB Atlas connection string when prompted
   
   vercel env add EXPRESS_SESSION_SECRET
   # Paste a random secret string
   
   vercel env add NODE_ENV
   # Type: production
   ```

4. **Deploy:**
   ```bash
   vercel --prod
   ```

### Step 3: Verify Deployment

1. Visit your Vercel URL
2. Check that routes work: `/`, `/users`, `/owners`, `/products`
3. Test user registration/login to verify sessions work
4. Monitor Vercel logs for any errors

---

## 🔧 Local Development

### Run locally:

1. **Create `.env` file** (copy from .env.example):
   ```bash
   cp .env.example .env
   ```

2. **Option A: Use local MongoDB:**
   - Leave `.env` empty (will use config/development.json)
   - Make sure MongoDB is running: `mongod`

3. **Option B: Use MongoDB Atlas locally:**
   - Add your Atlas connection string to `.env`:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
     EXPRESS_SESSION_SECRET=dev-secret
     ```

4. **Start the app:**
   ```bash
   node app.js
   ```
   
5. **Visit:** http://localhost:3000

---

## ⚠️ Important Notes

### Session Storage
- Sessions are now stored in MongoDB (not memory)
- Sessions persist across serverless function restarts
- Users will stay logged in between requests

### File Uploads
- If you're using file uploads (multer), be aware:
  - Vercel's filesystem is read-only except `/tmp`
  - `/tmp` is cleared after each function invocation
  - **Solution:** Use cloud storage (Cloudinary, AWS S3, Uploadcare)

### Environment Variables
- Never commit `.env` to Git (it's in .gitignore)
- Always use Vercel Dashboard to set production env vars
- Values in `.env` are for local development only

### Serverless Limitations
- ⏱️ **10-second timeout** for requests
- 💾 **50MB** deployment size limit
- 🧊 **Cold starts** on first request (~1-2 seconds)
- ⚡ Use `/tmp` for temporary files only

---

## 🐛 Troubleshooting

### Error: "FUNCTION_INVOCATION_FAILED"
- ✅ **Fixed!** This was caused by missing `module.exports`
- Make sure line 43 in app.js says `module.exports = app` (not `odule.exports`)
- Save all files before deploying

### Error: "MongooseServerSelectionError"
- Check MongoDB Atlas connection string is correct
- Verify IP whitelist includes 0.0.0.0/0
- Ensure database user has correct permissions

### Sessions not persisting
- Verify `MONGODB_URI` is set in Vercel environment variables
- Check Vercel logs for connection errors
- Make sure `connect-mongo` is in package.json dependencies

### Routes return 404
- Verify `vercel.json` exists with correct routing config
- Check that all route files are committed to Git
- Review Vercel build logs

---

## 📚 Additional Resources

- [Vercel Node.js Documentation](https://vercel.com/docs/frameworks/node)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [Express Session with MongoDB](https://www.npmjs.com/package/connect-mongo)

---

**Need help?** Check Vercel logs in Dashboard → Your Project → Deployments → [Latest] → Runtime Logs
