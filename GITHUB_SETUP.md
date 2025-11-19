# GitHub Setup Instructions

## Step 1: Create Repository on GitHub
1. Go to https://github.com and sign in
2. Click the "+" icon → "New repository"
3. Name: `mweshpra-apartments`
4. Choose Public or Private
5. **DO NOT** check "Initialize with README"
6. Click "Create repository"

## Step 2: Push Your Code
After creating the repository, run these commands (replace YOUR_USERNAME with your GitHub username):

```powershell
cd "c:\web project mwesh"
git remote add origin https://github.com/YOUR_USERNAME/mweshpra-apartments.git
git branch -M main
git push -u origin main
```

## Step 3: Connect to Firebase Hosting
1. Go to Firebase Console: https://console.firebase.google.com/project/mweshpra-apartments/hosting
2. Click "Get started" or "Connect repository"
3. Select "GitHub" as the source
4. Authorize Firebase to access GitHub
5. Select your repository: `mweshpra-apartments`
6. Select branch: `main`
7. Set root directory: `public`
8. Click "Continue" and "Deploy"

Your site will automatically deploy from GitHub!

