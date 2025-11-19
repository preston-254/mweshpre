# EmailJS Setup Guide for Payment Reminders

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email
5. Note your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **"Email Templates"** in EmailJS dashboard
2. Click **"Create New Template"**
3. Use this template:

**Template Name:** Payment Reminder

**Subject:** `{{subject}}`

**IMPORTANT:** In your EmailJS service settings, make sure the "To Email" field is set to use a template variable. Common variable names are:
- `{{to_email}}` (most common)
- `{{user_email}}`
- `{{email}}`
- `{{recipient_email}}`

**Content:**
```
Dear {{to_name}},

{{message}}

Payment Details:
- Amount Due: Ksh {{amount}}
- Due Date: {{due_date}}
- Days Until Due: {{days_until}}

Please ensure payment is made on time to avoid any inconvenience.

Thank you,
Mweshpra Apartments Management
```

4. Save the template and note your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Find your **Public Key** (e.g., `abcdefghijklmnop`)

## Step 5: Update Configuration

1. Open `js/payment-reminders.js`
2. Update these constants at the top of the file:

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key
```

3. Save the file

## Step 6: Test the System

1. Log into the tenant portal
2. The system will automatically check for payment reminders
3. If a reminder should be sent (based on due dates), an email will be sent
4. Check your email inbox to verify the reminder was received

## How It Works

- **Automatic Checking:** Reminders are checked every time a tenant logs into the portal
- **Reminder Schedule:** 
  - 7 days before due date
  - 3 days before due date
  - 1 day before due date
  - On the due date
- **No Duplicates:** The system tracks which reminders have been sent to avoid duplicates
- **User Preferences:** Tenants can customize which reminders they want to receive in the Notifications page

## Troubleshooting

### Emails Not Sending

1. **Check EmailJS Configuration:**
   - Verify Service ID, Template ID, and Public Key are correct
   - Make sure EmailJS service is connected and verified

2. **Check Browser Console:**
   - Open browser console (F12)
   - Look for EmailJS errors
   - Common issues:
     - Invalid service ID
     - Template variables not matching
     - Public key not initialized

3. **EmailJS Limits:**
   - Free tier: 200 emails/month
   - Check your usage in EmailJS dashboard
   - Upgrade if needed

### Reminders Not Triggering

1. **Check Due Dates:**
   - Ensure rent due date and water bill date are set in admin panel
   - Dates should be in format: `YYYY-MM-DD`

2. **Check Reminder Settings:**
   - Go to Notifications page in tenant portal
   - Verify reminder checkboxes are enabled

3. **Check Console Logs:**
   - Open browser console (F12)
   - Look for "Checking payment reminders" messages
   - Check for any errors

## Customization

### Change Reminder Days

Edit `REMINDER_DAYS` in `js/payment-reminders.js`:

```javascript
const REMINDER_DAYS = [14, 7, 3, 1, 0]; // Add 14 days before
```

### Customize Email Template

1. Go to EmailJS dashboard → Email Templates
2. Edit your template
3. Available variables:
   - `{{to_email}}` - Tenant's email
   - `{{to_name}}` - Tenant's name
   - `{{amount}}` - Payment amount
   - `{{due_date}}` - Due date (formatted)
   - `{{days_until}}` - Days until due
   - `{{urgency}}` - URGENT, HIGH, MEDIUM, or LOW
   - `{{message}}` - Pre-formatted message
   - `{{subject}}` - Email subject

## Security Notes

- Public Key is safe to expose in client-side code
- Service ID and Template ID are also safe for client-side use
- EmailJS handles email sending securely
- Never share your EmailJS account password

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

