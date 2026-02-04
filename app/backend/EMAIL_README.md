# Email System Documentation

This document describes the email system implemented for the Pioneer API, including welcome emails and password reset functionality.

## Overview

The email system provides:
- **Welcome emails** sent automatically on user registration
- **Password reset emails** for account recovery
- **Mailchimp Transactional integration** with fallback when not configured
- **Developer testing endpoints** for email template verification

## Features

### ✅ Implemented Features

- **Welcome Email** - Sent automatically when users register
- **Password Reset Email** - For secure password recovery
- **Mailchimp Transactional Integration** - Professional email delivery service
- **HTML & Text Templates** - Rich HTML emails with plain text fallbacks
- **Developer Testing** - Test endpoints for email verification
- **Graceful Fallback** - System works even when Mailchimp Transactional isn't configured

## Configuration

### Environment Variables

Set these environment variables to enable email functionality:

```bash
# Mailchimp Transactional API Key (required for email sending)
MANDRILL_API_KEY=your-mandrill-api-key-here

# From email address (required)
FROM_EMAIL=noreply@pioneer.com

# From name (optional, defaults to "Pioneer Team")
FROM_NAME=Pioneer Team
```

### Mailchimp Transactional Setup

1. **Create Mailchimp Account**: Sign up at [mailchimp.com](https://mailchimp.com)
2. **Enable Transactional**: Add Mailchimp Transactional as an add-on to your account
3. **Generate API Key**: Create an API key in the Mailchimp Transactional dashboard
4. **Set Environment Variables**: Configure the variables above
5. **Domain Authentication**: **CRITICAL** - Set up domain authentication (see below)

### 🔐 Domain Authentication Setup (REQUIRED)

**⚠️ IMPORTANT**: Without domain authentication, emails will be rejected with "unsigned" error.

#### Step 1: Add Your Domain
1. Log in to your Mailchimp Transactional account
2. Navigate to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter your sending domain (e.g., `quome.com`, `pittsburghtomorrow.org`)
5. Follow verification instructions (usually adding a TXT record)

#### Step 2: Configure DKIM Authentication
Add these CNAME records to your domain's DNS:

```dns
# Replace 'yourdomain.com' with your actual domain
mte1._domainkey.yourdomain.com → dkim1.mandrillapp.com
mte2._domainkey.yourdomain.com → dkim2.mandrillapp.com
```

**Example for quome.com:**
```dns
mte1._domainkey.quome.com → dkim1.mandrillapp.com
mte2._domainkey.quome.com → dkim2.mandrillapp.com
```

#### Step 3: Set Up DMARC Policy
Add this TXT record to your domain's DNS:

```dns
# Replace 'yourdomain.com' with your actual domain
_dmarc.yourdomain.com → "v=DMARC1; p=none"
```

**Example for quome.com:**
```dns
_dmarc.quome.com → "v=DMARC1; p=none"
```

#### Step 4: Verify Configuration
1. Return to **Settings** → **Domains** in Mailchimp Transactional
2. Click **Test DNS Settings** next to your domain
3. Ensure all checks pass (may take up to 24 hours for DNS propagation)
4. Domain status should show as "Verified" and "Authenticated"

### DNS Configuration Examples

#### For Cloudflare Users:
```
Type: CNAME | Name: mte1._domainkey | Target: dkim1.mandrillapp.com
Type: CNAME | Name: mte2._domainkey | Target: dkim2.mandrillapp.com
Type: TXT   | Name: _dmarc         | Content: v=DMARC1; p=none
```

#### For AWS Route 53 Users:
```
Record Type: CNAME | Name: mte1._domainkey.yourdomain.com | Value: dkim1.mandrillapp.com
Record Type: CNAME | Name: mte2._domainkey.yourdomain.com | Value: dkim2.mandrillapp.com
Record Type: TXT   | Name: _dmarc.yourdomain.com          | Value: "v=DMARC1; p=none"
```

#### For GoDaddy Users:
```
Type: CNAME | Host: mte1._domainkey | Points to: dkim1.mandrillapp.com
Type: CNAME | Host: mte2._domainkey | Points to: dkim2.mandrillapp.com
Type: TXT   | Host: _dmarc          | TXT Value: v=DMARC1; p=none
```

## Email Templates

### Welcome Email
- **Trigger**: Sent automatically on user registration
- **Content**: Welcome message, feature overview, getting started guide
- **Design**: Modern, responsive HTML template with Pioneer branding

### Password Reset Email
- **Trigger**: When password reset is requested
- **Content**: Secure reset link, security information, expiration notice
- **Security**: 1-hour expiration, secure token generation

## API Endpoints

### Developer Testing Endpoints

**⚠️ Admin Authentication Required**

#### Test All Email Templates
```http
GET /api/developer/test/emails?test_email=test@example.com&user_name=Test User
```

Tests both welcome and password reset emails, returns:
- Email service configuration status
- Template generation results
- Email sending results (if configured)

#### Preview Email Template
```http
GET /api/developer/test/emails/preview/{email_type}?user_name=Test User
```

Available email types: `welcome`, `password_reset`

Returns the full HTML and text content for preview.

#### Check Email Configuration
```http
GET /api/developer/test/emails/config
```

Returns current email service configuration status.

#### Check Domain Authentication Status
```http
GET /api/developer/emails/domain-auth
```

Returns detailed domain authentication status including:
- Domain verification status
- DKIM configuration status  
- DMARC policy status
- Step-by-step fix recommendations
- Required DNS records

## Integration

### User Registration
Welcome emails are automatically sent when users register via:
```http
POST /api/auth/register
```

The system will:
1. Create the user account
2. Send welcome email (if SendGrid configured)
3. Log email status
4. Never fail registration due to email issues

### Password Reset Flow
```http
POST /api/auth/request-password-reset
```
*(To be implemented)*

## Error Handling

- **Mailchimp Transactional Not Configured**: System logs warning but continues normally
- **Email Send Failure**: Logged as error, doesn't affect user operations
- **Template Generation Error**: Logged and reported in test endpoints

## Development & Testing

### Local Development
1. Set environment variables in your `.env` file
2. Use the developer test endpoints to verify configuration
3. Check logs for email sending status

### Testing Email Templates
```bash
# Test with curl (requires admin authentication)
curl -X GET "http://localhost:8000/api/developer/test/emails?test_email=your-email@example.com" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Preview Templates
Visit `/docs` and use the developer endpoints to preview email templates without sending.

## Security Considerations

- **Admin Only**: Developer endpoints require admin authentication
- **Token Security**: Password reset tokens expire in 1 hour
- **Environment Variables**: Keep SendGrid API key secure
- **Rate Limiting**: Consider implementing rate limiting for password reset requests

## Troubleshooting

### Common Issues

1. **❌ "unsigned" Error (Most Common)**
   ```
   Status: rejected, Reason: unsigned
   ```
   **Cause**: Domain not authenticated with Mailchimp Transactional
   
   **Solution**:
   - Follow the Domain Authentication Setup above
   - Add your domain in Mailchimp Transactional Settings → Domains
   - Configure DKIM records (mte1._domainkey and mte2._domainkey)
   - Set up DMARC policy (_dmarc TXT record)
   - Wait up to 24 hours for DNS propagation
   - Test DNS settings in Mailchimp dashboard

2. **Emails not sending**
   - Check `MANDRILL_API_KEY` is set correctly
   - Verify sender email is verified in Mailchimp Transactional
   - Check application logs for error messages
   - Ensure domain authentication is complete

3. **Templates not rendering**
   - Use preview endpoints to check template generation
   - Verify user data is being passed correctly

4. **Mailchimp Transactional authentication errors**
   - Verify API key is valid and active
   - Check API key hasn't expired
   - Ensure sender email is verified
   - Complete domain authentication setup

5. **DNS Configuration Issues**
   - Verify CNAME records point to correct Mailchimp servers
   - Check DMARC policy is properly formatted
   - Use DNS lookup tools to verify records are propagated
   - Wait 24-48 hours for full DNS propagation

### Quick DNS Verification

Use these commands to verify your DNS records are properly configured:

```bash
# Check DKIM records
dig CNAME mte1._domainkey.yourdomain.com
dig CNAME mte2._domainkey.yourdomain.com

# Check DMARC policy
dig TXT _dmarc.yourdomain.com

# Example for quome.com
dig CNAME mte1._domainkey.quome.com
dig CNAME mte2._domainkey.quome.com
dig TXT _dmarc.quome.com
```

**Expected Results:**
- DKIM records should point to `dkim1.mandrillapp.com` and `dkim2.mandrillapp.com`
- DMARC record should return `"v=DMARC1; p=none"`

### Debug Mode

Enable debug logging to see detailed email operations:
```python
import logging
logging.getLogger('email_service').setLevel(logging.DEBUG)
```

## Future Enhancements

Potential improvements:
- Email verification workflow
- Email templates for other notifications
- Email preferences management
- Unsubscribe functionality
- Email analytics and tracking
- Multiple email providers support
- Email queue for high volume

