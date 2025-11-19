# Project Structure Guide

## Correct Folder Structure for Deployment

Your project should be organized like this:

```
web project mwesh/
│
├── public/                          # Main deployment folder (Firebase Hosting)
│   ├── index.html                   # Main landing page
│   ├── login.html                   # Login page
│   ├── signup.html                  # Signup page
│   ├── register.html                # Customer inquiry page
│   ├── admin.html                   # Admin panel
│   ├── security.html                # Security portal
│   ├── about.html                   # About page
│   ├── contact.html                 # Contact page
│   ├── gallery.html                 # Gallery page
│   ├── join.html                    # Available houses page
│   ├── portal.html                  # Tenant portal main page
│   ├── portal-dashboard.html        # Portal dashboard
│   ├── portal-profile.html          # Portal profile page
│   ├── portal-announcements.html    # Portal announcements
│   ├── portal-maintenance.html      # Portal maintenance
│   ├── portal-community.html        # Portal community
│   ├── portal-notifications-center.html  # Notifications
│   ├── portal-visitors.html         # Visitor management
│   ├── financeportal.html           # Finance page
│   ├── setup-emailjs.html           # EmailJS setup
│   ├── emailjs-setup.html           # EmailJS guide
│   │
│   ├── css/                         # CSS files
│   │   ├── bootstrap.css
│   │   ├── style.css
│   │   ├── font-awesome.css
│   │   ├── jquery-ui.css
│   │   └── simplelightbox.min.css
│   │
│   ├── js/                          # JavaScript files
│   │   ├── bootstrap.js
│   │   ├── jquery-2.1.4.min.js
│   │   ├── notifications.js
│   │   ├── payment-reminders.js
│   │   └── ... (other JS files)
│   │
│   ├── images/                      # Image files
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   └── ... (all images)
│   │
│   └── fonts/                       # Font files
│       ├── fontawesome-webfont.woff
│       └── ... (all font files)
│
├── firebase.json                    # Firebase configuration
├── DEPLOYMENT_GUIDE.md              # Deployment instructions
├── FIREBASE_SETUP.md                # Firebase setup guide
└── ... (other documentation files)
```

## Important Notes:

1. **All HTML files** should be in the `public/` folder
2. **All CSS files** should be in `public/css/`
3. **All JS files** should be in `public/js/`
4. **All images** should be in `public/images/`
5. **All fonts** should be in `public/fonts/`

## Path References in HTML:

When referencing files in HTML, use relative paths from the HTML file location:

- CSS: `<link href="css/style.css" ...>` (looks in `public/css/`)
- JS: `<script src="js/script.js"></script>` (looks in `public/js/`)
- Images: `<img src="images/photo.jpg">` (looks in `public/images/`)

## Firebase Hosting Configuration:

Your `firebase.json` should have:
```json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

This tells Firebase to serve files from the `public/` folder.

## After Moving Files:

1. Make sure all assets (css, js, images, fonts) are in the `public/` folder
2. Test locally by opening `public/index.html` in a browser
3. Deploy with: `firebase deploy --only hosting`

