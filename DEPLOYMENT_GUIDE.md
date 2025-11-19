# Website Deployment Guide

This guide will help you deploy your Mweshpra Apartments website so you can test it on your phone.

## Option 1: Firebase Hosting (Recommended - Since you're already using Firebase)

### Prerequisites
- Node.js installed (download from https://nodejs.org/)
- Firebase account (you already have one)

### Steps:

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting in your project folder:**
   ```bash
   cd "c:\web project mwesh"
   firebase init hosting
   ```
   
   When prompted:
   - Select "Use an existing project" and choose your Firebase project
   - Public directory: `.` (current directory)
   - Configure as single-page app: `No`
   - Set up automatic builds: `No`

4. **Deploy:**
   ```bash
   firebase deploy --only hosting
   ```

5. **Your website will be live at:**
   `https://YOUR-PROJECT-ID.web.app` or `https://YOUR-PROJECT-ID.firebaseapp.com`

### Update Firebase Config (if needed)
Make sure your `firebaseConfig` in all HTML files matches your Firebase project settings.

---

## Option 2: Netlify (Free & Easy)

### Steps:

1. **Go to https://www.netlify.com/ and sign up (free)**

2. **Drag and drop your project folder:**
   - Go to Netlify dashboard
   - Drag your entire project folder (`c:\web project mwesh`) to the deploy area
   - Your site will be live in seconds!

3. **Or use Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify login
   cd "c:\web project mwesh"
   netlify deploy
   ```

4. **Your website will be live at:**
   `https://random-name.netlify.app`

---

## Option 3: Vercel (Free & Fast)

### Steps:

1. **Go to https://vercel.com/ and sign up (free)**

2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Deploy:**
   ```bash
   cd "c:\web project mwesh"
   vercel
   ```

4. **Follow the prompts and your site will be live!**

---

## Option 4: GitHub Pages (Free)

### Steps:

1. **Create a GitHub account** (if you don't have one)

2. **Create a new repository** on GitHub

3. **Upload your files:**
   - Use GitHub Desktop or Git commands
   - Or use the web interface to upload files

4. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select main branch
   - Your site will be at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME`

---

## Option 5: Quick Local Testing on Phone (No Deployment Needed)

### Steps:

1. **Find your computer's IP address:**
   - Windows: Open Command Prompt and type `ipconfig`
   - Look for "IPv4 Address" (e.g., 192.168.1.100)

2. **Start a local server:**
   ```bash
   cd "c:\web project mwesh"
   python -m http.server 8000
   ```
   (Or use any other local server like Live Server in VS Code)

3. **On your phone:**
   - Make sure phone and computer are on the same WiFi network
   - Open browser and go to: `http://YOUR-IP-ADDRESS:8000`
   - Example: `http://192.168.1.100:8000`

**Note:** This only works on your local network. For public access, use one of the hosting options above.

---

## Recommended: Firebase Hosting

Since you're already using Firebase for your database and authentication, **Firebase Hosting is the best choice** because:
- ✅ Free hosting
- ✅ Fast CDN (Content Delivery Network)
- ✅ Automatic HTTPS
- ✅ Easy to update (just run `firebase deploy`)
- ✅ Works perfectly with Firebase services
- ✅ Custom domain support (optional)

---

## After Deployment - Testing on Phone

1. **Open the deployed URL on your phone's browser**
2. **Test the QR scanner** - it should work much better on mobile!
3. **Test all features:**
   - Login/Logout
   - Tenant portal
   - Security portal
   - QR scanning
   - Visitor management

---

## Important Notes:

⚠️ **Firebase Security Rules:** Make sure your Firebase Realtime Database rules are properly configured (see `FIREBASE_SETUP.md`)

⚠️ **HTTPS Required:** Most hosting services provide HTTPS automatically, which is required for camera access on mobile browsers.

⚠️ **CORS Issues:** If you encounter CORS errors, you may need to configure your Firebase project settings.

---

## Quick Start Command (Firebase Hosting):

```bash
# One-time setup
npm install -g firebase-tools
firebase login
cd "c:\web project mwesh"
firebase init hosting

# Every time you want to update
firebase deploy --only hosting
```

Your site will be live in minutes! 🚀

