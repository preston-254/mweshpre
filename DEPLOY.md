# Firebase Hosting Deployment Guide

## Prerequisites

1. **Firebase CLI installed**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

## Deployment Steps

### Step 1: Verify Firebase Project
Make sure you're using the correct project:
```bash
firebase use mweshpra-apartments
```

### Step 2: Build/Prepare Your Site
All your files are already in the `public` folder, so no build step is needed.

### Step 3: Deploy to Firebase Hosting
```bash
firebase deploy --only hosting
```

### Step 4: Verify Deployment
After deployment, Firebase will provide you with a URL like:
- `https://mweshpra-apartments.web.app`
- `https://mweshpra-apartments.firebaseapp.com`

## Quick Deploy Command
```bash
firebase deploy --only hosting
```

## Deploy Specific Files Only
If you only want to deploy specific files:
```bash
firebase deploy --only hosting --only hosting:site:mweshpra-apartments
```

## View Deployment History
```bash
firebase hosting:channel:list
```

## Rollback to Previous Version
```bash
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live
```

## Important Notes

1. **All files in the `public` folder will be deployed**
2. **The `index.html` file will be served as the default page**
3. **Make sure all file paths are relative (e.g., `css/style.css` not `/css/style.css`)**
4. **After deployment, your site will be live at the Firebase hosting URL**

## Troubleshooting

- **"Site Not Found"**: Make sure you've deployed at least once using `firebase deploy --only hosting`
- **"404 errors"**: Check that your file paths are correct and relative
- **"Assets not loading"**: Verify that CSS, JS, and image files are in the correct folders within `public`

