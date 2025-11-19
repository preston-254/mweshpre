# How to Push Code to GitHub

## Step 1: Create a Personal Access Token (PAT)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Firebase Deployment"
4. Select expiration: "90 days" or "No expiration"
5. Check these scopes:
   - ✅ `repo` (Full control of private repositories)
6. Click "Generate token"
7. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

## Step 2: Push Your Code

Run this command in your terminal (it will ask for your username and password):

```powershell
cd "c:\web project mwesh"
git push -u origin main
```

**When prompted:**
- Username: `preston-254`
- Password: **Paste your Personal Access Token** (NOT your GitHub password)

## Alternative: Use GitHub CLI (Easier)

If you have GitHub CLI installed:

```powershell
gh auth login
git push -u origin main
```

## Step 3: After Pushing

Once your code is on GitHub, connect it to Firebase:
1. Go to: https://console.firebase.google.com/project/mweshpra-apartments/hosting
2. Click "Get started" or "Connect repository"
3. Select "GitHub" → Authorize Firebase
4. Select repository: `preston-254/mweshpre`
5. Branch: `main`
6. Root directory: `public`
7. Click "Deploy"

