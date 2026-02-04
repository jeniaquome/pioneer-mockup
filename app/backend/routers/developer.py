from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse
from typing import Dict, Any, List
import secrets
import os

from email_service import email_service

router = APIRouter()

def check_dev_environment():
    """Check if we're in development environment"""
    env = os.environ.get("ENV", "PROD")
    if env != "DEV":
        raise HTTPException(
            status_code=404,
            detail="Developer endpoints are only available in DEV environment"
        )

@router.get("/emails", summary="View all email templates")
def get_all_emails(
    user_name: str = "Test User",
    user_email: str = "test@example.com"
):
    """
    Developer endpoint to view all email templates
    
    Shows all available email templates with their content.
    Only available when ENV=DEV environment variable is set.
    """
    check_dev_environment()
    
    emails = []
    
    # Welcome Email Template
    try:
        welcome_template = email_service.get_welcome_email_template(user_name, user_email)
        emails.append({
            "type": "welcome",
            "subject": welcome_template["subject"],
            "html_content": welcome_template["html_content"],
            "text_content": welcome_template["text_content"],
            "description": "Sent automatically when users register"
        })
    except Exception as e:
        emails.append({
            "type": "welcome",
            "error": str(e),
            "description": "Sent automatically when users register"
        })
    
    # Password Reset Email Template
    try:
        test_reset_token = secrets.token_urlsafe(32)
        test_reset_url = "https://pioneer.com/reset-password"
        
        reset_template = email_service.get_password_reset_email_template(
            user_name, test_reset_token, test_reset_url
        )
        emails.append({
            "type": "password_reset",
            "subject": reset_template["subject"],
            "html_content": reset_template["html_content"],
            "text_content": reset_template["text_content"],
            "description": "Sent when users request password reset",
            "sample_reset_token": test_reset_token,
            "sample_reset_url": f"{test_reset_url}?token={test_reset_token}"
        })
    except Exception as e:
        emails.append({
            "type": "password_reset",
            "error": str(e),
            "description": "Sent when users request password reset"
        })
    
    # Get domain authentication status
    domain_status = email_service.check_domain_authentication()
    
    return {
        "total_templates": len(emails),
        "mailchimp_transactional_configured": email_service.is_email_enabled(),
        "domain_authentication": domain_status,
        "templates": emails,
        "usage": {
            "welcome_email": "Automatically sent on user registration via POST /api/auth/register",
            "password_reset": "To be implemented - will be sent via password reset endpoint"
        }
    }

@router.get("/emails/html", response_class=HTMLResponse, summary="View all email templates as HTML")
def get_all_emails_html(
    user_name: str = "Test User",
    user_email: str = "test@example.com"
):
    """
    Developer endpoint to view all email templates as rendered HTML
    
    Shows all available email templates in a nice HTML format for easy viewing.
    Only available when ENV=DEV environment variable is set.
    """
    check_dev_environment()
    
    # Get welcome email template
    try:
        welcome_template = email_service.get_welcome_email_template(user_name, user_email)
        welcome_html = welcome_template["html_content"]
        welcome_subject = welcome_template["subject"]
    except Exception as e:
        welcome_html = f"<p>Error generating welcome email: {str(e)}</p>"
        welcome_subject = "Error"
    
    # Get password reset email template
    try:
        test_reset_token = secrets.token_urlsafe(32)
        test_reset_url = "https://pioneer.com/reset-password"
        
        reset_template = email_service.get_password_reset_email_template(
            user_name, test_reset_token, test_reset_url
        )
        reset_html = reset_template["html_content"]
        reset_subject = reset_template["subject"]
    except Exception as e:
        reset_html = f"<p>Error generating password reset email: {str(e)}</p>"
        reset_subject = "Error"
    
    # Create a combined HTML page showing both templates
    combined_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pittsburgh Tomorrow Pioneer Email Templates - Developer Preview</title>
        <style>
            body {{ 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                margin: 0; 
                padding: 20px; 
                background-color: #f5f5f5; 
            }}
            .header {{ 
                text-align: center; 
                margin-bottom: 40px; 
                padding: 20px; 
                background: white; 
                border-radius: 10px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
            }}
            .template-section {{ 
                margin-bottom: 40px; 
                background: white; 
                border-radius: 10px; 
                overflow: hidden; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
            }}
            .template-header {{ 
                background: #667eea; 
                color: white; 
                padding: 15px 20px; 
                font-size: 18px; 
                font-weight: bold; 
            }}
            .template-content {{ 
                padding: 0; 
            }}
            .config-info {{ 
                background: #e8f4fd; 
                padding: 15px; 
                margin-bottom: 20px; 
                border-radius: 5px; 
                border-left: 4px solid #2c5aa0; 
            }}
            .nav-links {{ 
                margin: 20px 0; 
                text-align: center; 
            }}
            .nav-links a {{ 
                display: inline-block; 
                margin: 0 10px; 
                padding: 10px 20px; 
                background: #667eea; 
                color: white; 
                text-decoration: none; 
                border-radius: 5px; 
            }}
            .nav-links a:hover {{ 
                background: #5a6fd8; 
            }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>📧 Pittsburgh Tomorrow Pioneer Email Templates</h1>
            <p>Developer Preview - All Email Templates</p>
            <div class="config-info">
                <strong>Mailchimp Transactional Status:</strong> {'✅ Configured' if email_service.is_email_enabled() else '❌ Not Configured'}<br>
                <strong>Test User:</strong> {user_name} ({user_email})
            </div>
            <div class="nav-links">
                <a href="/api/developer/emails">JSON API</a>
                <a href="/docs#/developer/get_all_emails_html_api_developer_emails_html_get">API Docs</a>
            </div>
        </div>
        
        <div class="template-section">
            <div class="template-header">
                🌟 Welcome Email: {welcome_subject}
            </div>
            <div class="template-content">
                {welcome_html}
            </div>
        </div>
        
        <div class="template-section">
            <div class="template-header">
                🔐 Password Reset Email: {reset_subject}
            </div>
            <div class="template-content">
                {reset_html}
            </div>
        </div>
        
        <div class="header">
            <p><strong>Usage:</strong></p>
            <ul style="text-align: left; display: inline-block;">
                <li><strong>Welcome Email:</strong> Automatically sent on user registration via <code>POST /api/auth/register</code></li>
                <li><strong>Password Reset:</strong> To be implemented - will be sent via password reset endpoint</li>
            </ul>
        </div>
    </body>
    </html>
    """
    
    return combined_html

@router.get("/emails/domain-auth", summary="Check domain authentication status")
def check_domain_authentication():
    """
    Developer endpoint to check domain authentication status
    
    Returns detailed information about domain authentication setup
    for Mailchimp Transactional, including recommendations for fixing
    any issues.
    
    Only available when ENV=DEV environment variable is set.
    """
    check_dev_environment()
    
    domain_status = email_service.check_domain_authentication()
    
    return {
        "timestamp": "2024-01-01T00:00:00Z",  # In a real app, use datetime.utcnow().isoformat()
        "service": "Mailchimp Transactional",
        "mailchimp_configured": email_service.is_email_enabled(),
        "domain_authentication": domain_status,
        "quick_fix_guide": {
            "if_unsigned_error": [
                "1. Log in to Mailchimp Transactional dashboard",
                "2. Go to Settings → Domains",
                f"3. Add domain: {domain_status.get('domain', 'your-domain.com')}",
                "4. Add DKIM CNAME records: mte1._domainkey and mte2._domainkey",
                "5. Add DMARC TXT record: _dmarc",
                "6. Test DNS settings in dashboard",
                "7. Wait up to 24 hours for DNS propagation"
            ],
            "dns_records_needed": {
                "dkim_cname_1": f"mte1._domainkey.{domain_status.get('domain', 'your-domain.com')} → dkim1.mandrillapp.com",
                "dkim_cname_2": f"mte2._domainkey.{domain_status.get('domain', 'your-domain.com')} → dkim2.mandrillapp.com",
                "dmarc_txt": f"_dmarc.{domain_status.get('domain', 'your-domain.com')} → \"v=DMARC1; p=none\""
            }
        }
    }
