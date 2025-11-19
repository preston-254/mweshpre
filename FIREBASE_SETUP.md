# Firebase Realtime Database Setup Guide

## Step 1: Enable Realtime Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **mweshpra-apartments**
3. In the left sidebar, click **"Realtime Database"**
4. If you see "Get started" or "Create Database", click it
5. Choose a location (e.g., `us-central1` or closest to Kenya)
6. Choose **"Start in test mode"** (we'll update rules next)
7. Click **"Enable"**

## Step 2: Update Database Rules

1. In Realtime Database, go to the **"Rules"** tab
2. Replace the rules with this:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    ".indexOn": ["date"],
    "allowedEmails": {
      ".read": true,
      ".write": "auth != null && root.child('tenants').child(auth.uid).child('info').child('email').val() == 'preston.mwendwa@riarauniversity.ac.ke'"
    },
    "tenants": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$uid": {
        ".read": "auth != null && (auth.uid == $uid || (auth.token.email != null && auth.token.email.toLowerCase() == 'preston.mwendwa@riarauniversity.ac.ke'))",
        ".write": "auth != null && (auth.uid == $uid || (auth.token.email != null && auth.token.email.toLowerCase() == 'preston.mwendwa@riarauniversity.ac.ke'))"
      }
    },
    "pendingTenants": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "inquiries": {
      ".read": "auth != null",
      ".write": true
    },
    "announcements": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["date"]
    },
    "maintenanceRequests": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["tenantId", "status", "submittedAt"]
    },
    "checkoutRequests": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "communityPosts": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["timestamp"]
    },
    "ticTacToeWins": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "snakeHighScores": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "ticTacToeGames": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["status", "player1", "player2"]
    },
    "ticTacToeInvites": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["to", "status"]
    },
    "presence": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "visitorRequests": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["tenantId", "status", "visitDate"]
    },
    "notifications": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
```

3. Click **"Publish"**

## Step 3: Verify Database URL

1. In Realtime Database, check the URL at the top
2. It should be: `https://mweshpra-apartments-default-rtdb.firebaseio.com/`
3. If it's different, update the `databaseURL` in all HTML files

## Step 4: Test Connection

1. Refresh your admin page
2. Open browser console (F12)
3. You should see: "✓ Firebase Realtime Database connected successfully"
4. Try adding an email to the allowed list

## Step 5: Add Database Indexes (Performance Optimization)

The database indexes help Firebase query data faster. The rules above include `.indexOn` directives for:
- **announcements**: Indexed on `date` field (for sorting announcements by date)
- **maintenanceRequests**: Indexed on `tenantId`, `status`, and `submittedAt` (for filtering requests)
- **communityPosts**: Indexed on `timestamp` (for sorting posts)

These indexes are already included in the rules above. After publishing the rules, Firebase will automatically create these indexes.

**Note:** You may see a warning in the console about missing indexes. This is normal and will disappear once the indexes are created (usually within a few minutes after publishing the rules).

## Troubleshooting

- **"Permission denied"**: Check database rules are published
- **"Database unavailable"**: Make sure Realtime Database is enabled (not just Firestore)
- **"URL incorrect"**: Verify the database URL in Firebase Console matches your code
- **"Using an unspecified index" warning**: This is a performance warning. Add `.indexOn` to your rules as shown above and publish them. The warning will disappear once indexes are created.

