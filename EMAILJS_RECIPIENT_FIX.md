# Fix: "The recipients address is empty" Error

## Problem
EmailJS error: "The recipients address is empty" (422 error)

## Solution

The recipient email must be configured in your **EmailJS Service Settings**, not just in the template.

### Step 1: Configure Email Service

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click **"Email Services"** in the left sidebar
3. Click on your service (`service_byzmfbn`)
4. Look for the **"To Email"** field in the service settings
5. Set it to use a template variable, for example:
   - `{{to_email}}` (recommended)
   - `{{user_email}}`
   - `{{email}}`
   - `{{recipient_email}}`

### Step 2: Update Your Template

Make sure your template uses the same variable name you set in the service settings.

**Example Template:**

**Subject:**
```
{{subject}}
```

**Content:**
```
Dear {{to_name}},

{{message}}

Thank you,
Mweshpra Apartments Management
```

### Step 3: Verify Variable Names Match

The code sends these variables:
- `to_email` - Recipient email (must match service setting)
- `to_name` - Recipient name
- `from_name` - Sender name
- `message` - Email message
- `subject` - Email subject

### Common EmailJS Service Configurations

**Gmail Service:**
- "To Email" field: `{{to_email}}`
- "From Name" field: `{{from_name}}` or "Mweshpra Apartments"
- "Reply To" field: (your email)

**Outlook Service:**
- "To Email" field: `{{to_email}}`
- "From Name" field: `{{from_name}}` or "Mweshpra Apartments"

**Custom SMTP:**
- "To Email" field: `{{to_email}}`
- "From Email" field: (your email address)

### Quick Test

After configuring the service:

1. Go to `setup-emailjs.html`
2. Click "Test Email"
3. Enter your email address
4. The email should send successfully

### Still Not Working?

1. **Check Service Settings:**
   - Make sure "To Email" is set to `{{to_email}}` (or your chosen variable)
   - Don't use a hardcoded email address

2. **Check Template Variables:**
   - Make sure your template uses `{{to_email}}` (or matches your service setting)
   - Variable names are case-sensitive

3. **Check EmailJS Logs:**
   - Go to EmailJS Dashboard → "Logs"
   - See detailed error messages

4. **Verify Service Connection:**
   - Make sure your email service (Gmail/Outlook) is connected
   - Test the connection in EmailJS dashboard

