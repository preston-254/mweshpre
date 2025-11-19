# EmailJS 422 Error Troubleshooting Guide

## Error 422: Unprocessable Entity

A 422 error from EmailJS means the template variables don't match what's in your EmailJS template.

## Common Causes

1. **Template Variable Mismatch**: The variable names in your code don't match the template
2. **Missing Required Variables**: Your template requires variables that aren't being sent
3. **Wrong Template ID**: Using the wrong template ID
4. **Template Not Saved**: Template changes not saved in EmailJS dashboard

## How to Fix

### Step 1: Check Your EmailJS Template

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click **"Email Templates"**
3. Open your template (ID: `template_tb8069k`)
4. Check what variables are used in the template

### Step 2: Match Variable Names

Your template should use these variables (or update the code to match your template):

**Required Variables:**
- `{{to_email}}` - Recipient email
- `{{to_name}}` - Recipient name
- `{{message}}` - Email message content
- `{{subject}}` - Email subject

**Optional Variables (if used in template):**
- `{{from_name}}` - Sender name
- `{{amount}}` - Payment amount
- `{{due_date}}` - Due date
- `{{days_until}}` - Days until due
- `{{urgency}}` - Urgency level

### Step 3: Update Your Template

**Recommended Template Structure:**

**Subject:**
```
{{subject}}
```

**Content:**
```
Dear {{to_name}},

{{message}}

Payment Details:
- Amount Due: Ksh {{amount}}
- Due Date: {{due_date}}
- Days Until Due: {{days_until}}
- Urgency: {{urgency}}

Thank you,
Mweshpra Apartments Management
```

### Step 4: Test Again

1. Save your template in EmailJS dashboard
2. Go to `setup-emailjs.html`
3. Click "Test Email"
4. Check the browser console (F12) for detailed error messages

## Quick Fix: Minimal Template

If you want a simple template that will definitely work:

**Subject:**
```
{{subject}}
```

**Content:**
```
{{message}}
```

This uses only the required variables and should work immediately.

## Verify Your Setup

1. **Service ID**: `service_byzmfbn` ✓
2. **Template ID**: `template_tb8069k` ✓
3. **Public Key**: `S28nx8TWnsKEpl8vV` ✓

## Still Having Issues?

1. Check EmailJS dashboard → **"Logs"** section to see detailed error messages
2. Verify your email service is connected and verified
3. Check if you've exceeded the free tier limit (200 emails/month)
4. Make sure your template is published (not in draft mode)

## Alternative: Use EmailJS Template Builder

1. Go to EmailJS → Email Templates
2. Click "Create New Template"
3. Use the template builder to create a template
4. Copy the exact variable names from the template
5. Update the code to match those variable names

