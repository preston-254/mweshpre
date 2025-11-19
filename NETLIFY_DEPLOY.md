# Deploy to Netlify (Free & Easy)

## Option 1: Drag and Drop (Easiest)
1. Go to https://app.netlify.com/drop
2. Drag your entire `public` folder onto the page
3. Your site will be live in seconds!

## Option 2: Connect to GitHub (Automatic Deployments) - RECOMMENDED
1. Go to https://app.netlify.com
2. Sign up/login with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository: `preston-254/mweshpre`
5. Build settings (IMPORTANT - Set these correctly):
   - **Base directory:** (leave empty)
   - **Publish directory:** `public`
   - **Build command:** (leave empty - no build needed)
6. Click "Deploy site"
7. Wait 1-2 minutes for deployment
8. Your site will be live at: `https://random-name.netlify.app`
9. You can customize the domain name in site settings

**Note:** The `netlify.toml` and `_redirects` files are already configured, so routing will work correctly!

## If you see "Page not found" (404 error):
The `netlify.toml` file has been created to fix this. You need to:
1. Go to your Netlify site dashboard
2. Click "Site settings" → "Build & deploy"
3. Under "Build settings", click "Edit settings"
4. Make sure:
   - **Publish directory:** `public`
   - **Base directory:** (leave empty)
5. Click "Save"
6. Go to "Deploys" tab and click "Trigger deploy" → "Clear cache and deploy site"

OR if you connected via GitHub:
1. The `netlify.toml` file will be automatically picked up
2. Go to "Deploys" tab and click "Trigger deploy" → "Clear cache and deploy site"

## Benefits:
- ✅ Free SSL certificate
- ✅ Works on mobile and desktop
- ✅ Automatic deployments from GitHub
- ✅ Custom domain support
- ✅ Fast CDN
- ✅ No configuration needed

