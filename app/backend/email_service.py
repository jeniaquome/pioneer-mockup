import os
import logging
from typing import Optional, Dict, Any
import mailchimp_transactional as MailchimpTransactional
from mailchimp_transactional.api_client import ApiClientError
from datetime import datetime

logger = logging.getLogger(__name__)
ENV = os.environ.get("ENV", "production")
BASE_URL = "https://www.pittsburghpioneer.com"

class EmailService:
    def __init__(self):
        self.api_key = os.environ.get("MANDRILL_API_KEY")
        self.from_email = os.environ.get("FROM_EMAIL", "noreply@pittsburghtomorrow.org")
        self.from_name = os.environ.get("FROM_NAME", "Pittsburgh Tomorrow Pittsburgh Tomorrow Pioneer")
        self.is_configured = bool(self.api_key and self.from_email)
        
        if self.is_configured:
            self.client = MailchimpTransactional.Client(self.api_key)
            logger.info("✅ Mailchimp Transactional email service initialized successfully")
        else:
            logger.warning("⚠️ Mailchimp Transactional not configured - missing MANDRILL_API_KEY or FROM_EMAIL")
    
    def is_email_enabled(self) -> bool:
        """Check if email service is properly configured"""
        return self.is_configured
    
    def check_domain_authentication(self) -> Dict[str, Any]:
        """Check domain authentication status for the sending domain"""
        if not self.is_configured:
            return {
                "authenticated": False,
                "error": "Mailchimp Transactional not configured",
                "domain": None,
                "recommendations": ["Configure MANDRILL_API_KEY and FROM_EMAIL environment variables"]
            }
        
        try:
            domain = self.from_email.split('@')[1] if '@' in self.from_email else None
            if not domain:
                return {
                    "authenticated": False,
                    "error": "Invalid FROM_EMAIL format",
                    "domain": None,
                    "recommendations": ["Set FROM_EMAIL to a valid email address format"]
                }
            
            # Try to get domain info from Mailchimp Transactional
            # Note: This requires the domains.info API call which may not be available in all plans
            try:
                domain_info = self.client.senders.domains()
                
                # Check if our domain is in the list and get detailed status
                domain_found = False
                domain_data = None
                
                for d in domain_info:
                    if d.get('domain') == domain:
                        domain_found = True
                        domain_data = d
                        break
                
                if not domain_found:
                    return {
                        "authenticated": False,
                        "domain": domain,
                        "domain_found": False,
                        "error": f"Domain '{domain}' not found in Mailchimp Transactional",
                        "recommendations": [
                            f"Add domain '{domain}' in Mailchimp Transactional Settings → Domains",
                            "Follow the domain verification process",
                            "Set up DKIM authentication (add CNAME records)",
                            "Configure DMARC policy (add TXT record)"
                        ]
                    }
                
                # Parse detailed domain status
                is_verified = domain_data.get('verified_at') is not None
                has_valid_signing = domain_data.get('valid_signing', False)
                
                # Check individual authentication components
                spf_status = domain_data.get('spf', {})
                dkim_status = domain_data.get('dkim', {})
                dkim2_status = domain_data.get('dkim2', {})
                dmarc_status = domain_data.get('dmarc', {})
                
                spf_valid = spf_status.get('valid', False)
                dkim_valid = dkim_status.get('valid', False)
                dkim2_valid = dkim2_status.get('valid', False)
                dmarc_valid = dmarc_status.get('valid', False)
                
                # Generate specific recommendations based on what's missing
                recommendations = []
                issues = []
                
                if not is_verified:
                    issues.append("Domain verification incomplete")
                    verify_txt_key = domain_data.get('verify_txt_key')
                    if verify_txt_key:
                        recommendations.extend([
                            f"🔑 COMPLETE DOMAIN VERIFICATION:",
                            f"   Add TXT record: {domain} → \"{verify_txt_key}\"",
                            f"   Then click 'Test DNS Settings' in Mailchimp dashboard"
                        ])
                    else:
                        recommendations.append(f"Complete domain verification for '{domain}' in Mailchimp dashboard")
                
                if not dkim_valid or not dkim2_valid:
                    issues.append("DKIM authentication not configured")
                    recommendations.extend([
                        f"🔐 SET UP DKIM AUTHENTICATION:",
                        f"   Add CNAME: mte1._domainkey.{domain} → dkim1.mandrillapp.com",
                        f"   Add CNAME: mte2._domainkey.{domain} → dkim2.mandrillapp.com"
                    ])
                
                if not dmarc_valid:
                    issues.append("DMARC policy not configured")
                    recommendations.extend([
                        f"📧 SET UP DMARC POLICY:",
                        f"   Add TXT: _dmarc.{domain} → \"v=DMARC1; p=none\""
                    ])
                
                if not spf_valid:
                    issues.append("SPF record not configured")
                    recommendations.extend([
                        f"📨 SET UP SPF RECORD:",
                        f"   Add TXT: {domain} → \"v=spf1 include:servers.mcsv.net ?all\""
                    ])
                
                if recommendations:
                    recommendations.extend([
                        "",
                        "⏱️  After adding DNS records:",
                        "   • Wait 5-10 minutes for DNS propagation",
                        "   • Click 'Test DNS Settings' in Mailchimp dashboard",
                        "   • May take up to 24 hours for full propagation"
                    ])
                
                # Determine overall authentication status
                authenticated = is_verified and has_valid_signing and dkim_valid and dkim2_valid
                
                return {
                    "authenticated": authenticated,
                    "domain": domain,
                    "domain_found": True,
                    "domain_verified": is_verified,
                    "valid_signing": has_valid_signing,
                    "verification_key": domain_data.get('verify_txt_key'),
                    "dns_status": {
                        "spf_valid": spf_valid,
                        "dkim_valid": dkim_valid,
                        "dkim2_valid": dkim2_valid,
                        "dmarc_valid": dmarc_valid
                    },
                    "issues": issues,
                    "recommendations": recommendations,
                    "last_tested": domain_data.get('last_tested_at'),
                    "raw_domain_data": domain_data  # For debugging
                }
                
            except Exception as api_error:
                # If we can't check domain status via API, provide general guidance
                return {
                    "authenticated": False,
                    "error": f"Could not check domain status: {str(api_error)}",
                    "domain": domain,
                    "recommendations": [
                        f"Manually verify that domain '{domain}' is added and authenticated in Mailchimp Transactional",
                        "Go to Settings > Domains in your Mailchimp Transactional dashboard",
                        "Set up DKIM authentication (add CNAME records)",
                        "Configure DMARC policy (add TXT record)",
                        "Test DNS settings in the dashboard"
                    ]
                }
                
        except Exception as e:
            return {
                "authenticated": False,
                "error": f"Error checking domain authentication: {str(e)}",
                "domain": None,
                "recommendations": ["Check email service configuration and try again"]
            }
    
    async def send_email(
        self, 
        to_email: str, 
        subject: str, 
        html_content: str, 
        text_content: Optional[str] = None
    ) -> bool:
        """Send an email using Mailchimp Transactional"""
        if not self.is_configured:
            logger.warning(f"📧 Email not sent to {to_email} - Mailchimp Transactional not configured")
            return False
        
        try:
            # Prepare the message
            message = {
                "html": html_content,
                "subject": subject,
                "from_email": self.from_email,
                "from_name": self.from_name,
                "to": [
                    {
                        "email": to_email,
                        "type": "to"
                    }
                ],
                "recipient_metadata": [
                    {
                        "rcpt": self.from_email,
                        "values": {
                            "domain": self.from_email.split('@')[1] 
                        }
                    }
                ],
            }
            
            # Add plain text version if provided
            if text_content:
                message["text"] = text_content
            
            # Send email using Mailchimp Transactional
            response = self.client.messages.send({"message": message})
            
            # Check if email was sent successfully
            if response and len(response) > 0:
                status = response[0].get("status", "")
                if status in ["sent", "queued", "scheduled"]:
                    logger.info(f"✅ Email sent successfully to {to_email} - Status: {status}")
                    return True
                else:
                    reject_reason = response[0].get("reject_reason", "unknown")
                    
                    # Provide specific guidance for common rejection reasons
                    if reject_reason == "unsigned":
                        logger.error(f"❌ Failed to send email to {to_email} - Status: {status}, Reason: {reject_reason}")
                        logger.error("🔧 DOMAIN AUTHENTICATION REQUIRED: Your sending domain needs to be authenticated in Mailchimp Transactional.")
                        
                        # Get specific domain status and provide targeted guidance
                        try:
                            domain_status = self.check_domain_authentication()
                            domain = domain_status.get('domain', 'unknown')
                            
                            if domain_status.get('domain_found'):
                                logger.error(f"📊 Domain '{domain}' found but not fully authenticated:")
                                
                                # Show specific issues
                                issues = domain_status.get('issues', [])
                                for issue in issues:
                                    logger.error(f"   ❌ {issue}")
                                
                                # Show specific recommendations
                                recommendations = domain_status.get('recommendations', [])
                                if recommendations:
                                    logger.error("🔧 SPECIFIC FIXES NEEDED:")
                                    for rec in recommendations:
                                        if rec.strip():  # Skip empty lines
                                            logger.error(f"   {rec}")
                                
                                # Show verification key if available
                                verify_key = domain_status.get('verification_key')
                                if verify_key:
                                    logger.error(f"🔑 Domain verification TXT record needed: {domain} → \"{verify_key}\"")
                            else:
                                logger.error(f"📋 Domain '{domain}' not found in Mailchimp Transactional")
                                logger.error("   1. Log in to your Mailchimp Transactional account")
                                logger.error("   2. Go to Settings → Domains")
                                logger.error(f"   3. Add domain: {domain}")
                                logger.error("   4. Follow the verification and authentication steps")
                        
                        except Exception as e:
                            # Fallback to generic guidance if domain check fails
                            logger.error("📋 General steps to fix:")
                            logger.error("   1. Log in to your Mailchimp Transactional account")
                            logger.error("   2. Go to Settings → Domains")
                            logger.error(f"   3. Add and verify your domain: {self.from_email.split('@')[1] if '@' in self.from_email else 'your-domain.com'}")
                            logger.error("   4. Set up DKIM authentication (add CNAME records)")
                            logger.error("   5. Configure DMARC policy (add TXT record)")
                        
                        logger.error("📖 See EMAIL_README.md for detailed instructions.")
                        logger.error("🔧 Use GET /api/developer/emails/domain-auth for detailed status")
                    elif reject_reason == "hard-bounce":
                        logger.error(f"❌ Failed to send email to {to_email} - Status: {status}, Reason: {reject_reason}")
                        logger.error("📧 The recipient email address is invalid or doesn't exist.")
                    elif reject_reason == "soft-bounce":
                        logger.error(f"❌ Failed to send email to {to_email} - Status: {status}, Reason: {reject_reason}")
                        logger.error("📧 Temporary delivery issue - recipient's mailbox may be full or server temporarily unavailable.")
                    elif reject_reason == "spam":
                        logger.error(f"❌ Failed to send email to {to_email} - Status: {status}, Reason: {reject_reason}")
                        logger.error("🚫 Email content flagged as spam. Review email content and sender reputation.")
                    else:
                        logger.error(f"❌ Failed to send email to {to_email} - Status: {status}, Reason: {reject_reason}")
                    
                    return False
            else:
                logger.error(f"❌ Failed to send email to {to_email} - No response from Mailchimp Transactional")
                return False
                
        except ApiClientError as e:
            logger.error(f"❌ Mailchimp Transactional API error sending email to {to_email}: {str(e)}")
            return False
        except Exception as e:
            logger.error(f"❌ Error sending email to {to_email}: {str(e)}")
            return False
    
    def get_welcome_email_template(self, user_name: str, user_email: str) -> Dict[str, str]:
        """Generate welcome email template with Pittsburgh Tomorrow branding"""
        subject = "Welcome to Pittsburgh Pittsburgh Tomorrow Pioneer! 🏠"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Pittsburgh Pittsburgh Tomorrow Pioneer</title>
            <style>
                body {{ font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; line-height: 1.6; color: #2E3192; margin: 0; padding: 0; background-color: #f8f9fa; }}
                .container {{ max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 0; border-radius: 16px; box-shadow: 0 8px 32px rgba(46, 49, 146, 0.1); border: 1px solid #e9ecef; }}
                .header {{ background: #2E3192; color: white; padding: 40px 30px; text-align: center; border-radius: 14px 14px 0 0; }}
                .header h1 {{ margin: 0; font-size: 32px; font-weight: 800; font-style: normal; }}
                .content {{ padding: 30px; background-color: white; }}
                .logo-section {{ text-align: center; padding: 20px 0; background-color: white; }}
                .logo-section img {{ height: 60px; width: auto; }}
                .greeting {{ color: #2E3192; font-size: 20px; font-weight: 700; margin-bottom: 20px; }}
                .main-message {{ background-color: white; padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #2E3192; }}
                .features {{ margin: 30px 0; }}
                .feature {{ display: flex; align-items: flex-start; margin: 20px 0; padding: 20px; background-color: white; border-radius: 12px; border: 2px solid #2E3192; }}
                .feature-icon {{ font-size: 24px; margin-right: 15px; width: 30px; text-align: center; color: #F4B33D; }}
                .feature-content {{ flex: 1; }}
                .cta-button {{ display: inline-block; background: #2E3192; color: white; padding: 18px 36px; text-decoration: none; border-radius: 12px; font-weight: 700; margin: 25px 0; text-align: center; font-size: 16px; box-shadow: 0 4px 12px rgba(46, 49, 146, 0.3); transition: all 0.3s ease; }}
                .cta-button:hover {{ background: #954D9E; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(149, 77, 158, 0.4); }}
                .footer {{ background-color: #2E3192; color: white; padding: 30px; text-align: center; border-radius: 0 0 14px 14px; }}
                .footer p {{ margin: 10px 0; }}
                .footer-links {{ margin: 20px 0; }}
                .footer-links a {{ color: white; text-decoration: none; margin: 0 15px; font-weight: 600; }}
                .footer-links a:hover {{ color: #F4B33D; }}
                .footer-small {{ font-size: 12px; color: white; margin-top: 25px; opacity: 0.8; }}
                .signature {{ margin-top: 30px; padding: 20px; background-color: white; border-radius: 12px; border: 2px solid #954D9E; }}
                .signature p {{ margin: 0; color: #2E3192; font-style: italic; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🏠 Welcome to Pittsburgh Pittsburgh Tomorrow Pioneer!</h1>
                </div>
                
                <div class="logo-section">
                    <img src="{BASE_URL}/branding/assets/logo-0.png" alt="Pittsburgh Tomorrow Pittsburgh Tomorrow Pioneer Logo" />
                </div>
                
                <div class="content">
                    <div class="greeting">Hello {user_name},</div>
                    
                    <div class="main-message">
                        <p>Thanks for signing up with Pittsburgh Pittsburgh Tomorrow Pioneer! Your account has been created with our secure single sign-on (SSO) system. That means your username and password are protected, and you can sign in with peace of mind any time.</p>
                        
                        <p>Pittsburgh Pittsburgh Tomorrow Pioneer is here to help you plan and navigate your move to Pittsburgh with ease. Inside, you'll find:</p>
                    </div>
                    
                    <div class="features">
                        <div class="feature">
                            <span class="feature-icon">🏠</span>
                            <div class="feature-content">
                                Step-by-step guides to finding and securing housing
                            </div>
                        </div>
                        <div class="feature">
                            <span class="feature-icon">💼</span>
                            <div class="feature-content">
                                Resources for job searching and employment opportunities
                            </div>
                        </div>
                        <div class="feature">
                            <span class="feature-icon">🎒</span>
                            <div class="feature-content">
                                Support for children's education and school enrollment
                            </div>
                        </div>
                        <div class="feature">
                            <span class="feature-icon">🤝</span>
                            <div class="feature-content">
                                Ways to connect socially—whether through hiking, faith-based groups, or other community networks
                            </div>
                        </div>
                    </div>
                    
                    <div class="main-message">
                        <p>Your personalized roadmap will grow as you explore, so take your time and start with what matters most to you.</p>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="{BASE_URL}" class="cta-button">👉 Log in to Your Account</a>
                    </div>
                    
                    <div class="signature">
                        <p><strong>Welcome aboard—we're excited to be part of your new life in Pittsburgh!</strong></p>
                        <br>
                        <p>Warmly,<br>The Pittsburgh Tomorrow Team</p>
                    </div>
                </div>
                
                <div class="footer">
                    <p><strong>Need help getting started?</strong> We're here for you!</p>
                    <div class="footer-links">
                        <a href="{BASE_URL}/about">📧 Contact Support</a>
                        <a href="{BASE_URL}/resources">📚 Browse Resources</a>
                        <a href="{BASE_URL}">🌐 Visit Pittsburgh Tomorrow Pioneer</a>
                    </div>
                    <div class="footer-small">
                        You're receiving this email because you created an account with Pittsburgh Tomorrow Pioneer.<br>
                        Pittsburgh Tomorrow • Helping newcomers thrive in Pittsburgh
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        Welcome to Pittsburgh Pittsburgh Tomorrow Pioneer, {user_name}!
        
        Thanks for signing up with Pittsburgh Pittsburgh Tomorrow Pioneer! Your account has been created with our secure single sign-on (SSO) system. That means your username and password are protected, and you can sign in with peace of mind any time.
        
        Pittsburgh Pittsburgh Tomorrow Pioneer is here to help you plan and navigate your move to Pittsburgh with ease. Inside, you'll find:
        
        🏠 Step-by-step guides to finding and securing housing
        💼 Resources for job searching and employment opportunities
        🎒 Support for children's education and school enrollment
        🤝 Ways to connect socially—whether through hiking, faith-based groups, or other community networks
        
        Your personalized roadmap will grow for you explore, so take your time and start with what matters most to you.
        
        👉 Log in to Your Account: {BASE_URL}
        
        Welcome aboard—we're excited to be part of your new life in Pittsburgh!
        
        Warmly,
        The Pittsburgh Tomorrow Team
        
        Need help getting started? Contact our support team anytime.
        Pittsburgh Tomorrow • Helping newcomers thrive in Pittsburgh
        """
        
        return {
            "subject": subject,
            "html_content": html_content,
            "text_content": text_content
        }
    
    def get_password_reset_email_template(self, user_name: str, reset_token: str, reset_url: str) -> Dict[str, str]:
        """Generate password reset email template with Pittsburgh Tomorrow branding"""
        subject = "Reset Your Pittsburgh Tomorrow Pioneer Password - Secure Your Pittsburgh Journey 🔐"
        
        # In a real implementation, you'd construct the full reset URL
        full_reset_url = f"{reset_url}?token={reset_token}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Pittsburgh Tomorrow Pioneer Password</title>
            <style>
                body {{ font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; line-height: 1.6; color: #2E3192; margin: 0; padding: 0; background-color: #f8f9fa; }}
                .container {{ max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 0; border-radius: 16px; box-shadow: 0 8px 32px rgba(46, 49, 146, 0.1); border: 1px solid #e9ecef; }}
                .header {{ background: #2E3192; color: white; padding: 40px 30px; text-align: center; border-radius: 14px 14px 0 0; }}
                .header h1 {{ margin: 0; font-size: 32px; font-weight: 800; font-style: italic; }}
                .header p {{ margin: 10px 0 0 0; font-size: 18px; opacity: 0.95; }}
                .logo-section {{ text-align: center; padding: 20px 0; background-color: white; }}
                .logo-section img {{ height: 60px; width: auto; }}
                .content {{ padding: 30px; background-color: white; }}
                .greeting {{ color: #2E3192; font-size: 20px; font-weight: 700; margin-bottom: 20px; }}
                .main-message {{ background-color: white; padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #2E3192; }}
                .bridgit-security {{ background: #F4B33D; padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #2E3192; text-align: center; }}
                .bridgit-avatar {{ width: 80px; height: 80px; border-radius: 50%; background-color: white; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; border: 3px solid #2E3192; box-shadow: 0 4px 12px rgba(46, 49, 146, 0.2); }}
                .bridgit-avatar img {{ width: 60px; height: 60px; object-fit: contain; }}
                .reset-button {{ display: inline-block; background: #2E3192; color: white; padding: 18px 36px; text-decoration: none; border-radius: 12px; font-weight: 700; margin: 25px 0; text-align: center; font-size: 16px; box-shadow: 0 4px 12px rgba(46, 49, 146, 0.3); transition: all 0.3s ease; }}
                .reset-button:hover {{ background: #954D9E; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(149, 77, 158, 0.4); }}
                .alert-box {{ background: #F4B33D; border: 2px solid #2E3192; color: #2E3192; padding: 20px; border-radius: 12px; margin: 25px 0; font-weight: 600; }}
                .security-info {{ background-color: white; padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #954D9E; }}
                .security-info h4 {{ color: #2E3192; margin-top: 0; font-size: 18px; font-weight: 700; }}
                .security-info ul {{ color: #2E3192; }}
                .security-info li {{ margin: 8px 0; }}
                .token-box {{ background-color: white; padding: 20px; border-radius: 12px; font-family: 'Courier New', monospace; word-break: break-all; margin: 20px 0; border: 2px solid #2E3192; color: #2E3192; font-size: 14px; }}
                .help-section {{ margin-top: 30px; padding: 25px; background-color: white; border-radius: 12px; text-align: center; border: 2px solid #2E3192; }}
                .help-section p {{ margin: 0; color: #2E3192; font-weight: 600; }}
                .footer {{ background-color: #2E3192; color: white; padding: 30px; text-align: center; border-radius: 0 0 14px 14px; }}
                .footer p {{ margin: 10px 0; }}
                .footer-links {{ margin: 20px 0; }}
                .footer-links a {{ color: white; text-decoration: none; margin: 0 15px; font-weight: 600; }}
                .footer-links a:hover {{ color: #F4B33D; }}
                .footer-small {{ font-size: 12px; color: white; margin-top: 25px; opacity: 0.8; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🔐 Password Reset</h1>
                    <p>Secure your Pittsburgh Tomorrow Pioneer account</p>
                </div>
                
                <div class="logo-section">
                    <img src="{BASE_URL}/branding/assets/logo-0.png" alt="Pittsburgh Tomorrow Pittsburgh Tomorrow Pioneer Logo" />
                </div>
                
                <div class="content">
                    <div class="greeting">Hello {user_name},</div>
                    
                    <div class="main-message">
                        <p>We received a request to reset the password for your Pittsburgh Tomorrow Pioneer account. If you made this request, click the button below to set a new password and continue your Pittsburgh journey securely.</p>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{full_reset_url}" class="reset-button">Reset My Password</a>
                    </div>
                    
                    <div class="alert-box">
                        <strong>⏰ Important:</strong> This password reset link will expire in 1 hour for your security.
                    </div>
                    
                    <div class="bridgit-security">
                        <div class="bridgit-avatar">
                            <img src="{BASE_URL}/branding/assets/new-bridgit.png" alt="Bridgit AI Assistant" />
                        </div>
                        <h3 style="color: #2E3192; margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">Bridgit's Security Reminder</h3>
                        <p style="color: #2E3192; margin: 0; font-size: 16px;">Keep your Pittsburgh Tomorrow Pioneer account safe! I'm here to help if you have any questions about account security.</p>
                    </div>
                    
                    <div class="security-info">
                        <h4>🛡️ Security Information</h4>
                        <ul style="margin-bottom: 0;">
                            <li>If you didn't request this password reset, please ignore this email</li>
                            <li>Your current password remains unchanged until you create a new one</li>
                            <li>Never share your password reset link with anyone</li>
                            <li>Always log out of shared computers after using Pittsburgh Tomorrow Pioneer</li>
                            <li>Use a strong, unique password for your Pittsburgh Tomorrow Pioneer account</li>
                        </ul>
                    </div>
                    
                    <h4 style="color: #2E3192; font-weight: 700;">Can't click the button? Copy and paste this link:</h4>
                    <div class="token-box">
                        {full_reset_url}
                    </div>
                    
                    <div class="help-section">
                        <p><strong>Need help?</strong> Contact our support team if you're having trouble resetting your password or have security concerns.</p>
                    </div>
                </div>
                
                <div class="footer">
                    <p><strong>This is an automated security email from Pittsburgh Tomorrow Pioneer</strong></p>
                    <div class="footer-links">
                        <a href="{BASE_URL}/about">📧 Contact Support</a>
                        <a href="{BASE_URL}/resources">📚 Security Help</a>
                        <a href="{BASE_URL}">🌐 Visit Pittsburgh Tomorrow Pioneer</a>
                    </div>
                    <div class="footer-small">
                        If you didn't request this password reset, please contact our support team immediately.<br>
                        Pittsburgh Tomorrow • Keeping your Pittsburgh journey secure
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        Password Reset Request - Pittsburgh Tomorrow Pioneer
        
        Hello {user_name},
        
        We received a request to reset the password for your Pittsburgh Tomorrow Pioneer account. If you made this request, use the link below to set a new password and continue your Pittsburgh journey securely.
        
        Reset Your Password: {full_reset_url}
        
        IMPORTANT: This link expires in 1 hour for your security.
        
        Bridgit's Security Reminder:
        Keep your Pittsburgh Tomorrow Pioneer account safe! I'm here to help if you have any questions about account security.
        
        Security Information:
        • If you didn't request this password reset, please ignore this email
        • Your current password remains unchanged until you create a new one
        • Never share your password reset link with anyone
        • Always log out of shared computers after using Pittsburgh Tomorrow Pioneer
        • Use a strong, unique password for your Pittsburgh Tomorrow Pioneer account
        
        Need help? Contact our support team if you're having trouble resetting your password or have security concerns.
        
        This is an automated security email from Pittsburgh Tomorrow Pioneer.
        If you didn't request this password reset, please contact our support team immediately.
        
        Pittsburgh Tomorrow • Keeping your Pittsburgh journey secure
        """
        
        return {
            "subject": subject,
            "html_content": html_content,
            "text_content": text_content
        }
    
    async def send_welcome_email(self, user_name: str, user_email: str) -> bool:
        """Send welcome email to new user"""
        if not self.is_configured:
            logger.info(f"📧 Welcome email not sent to {user_email} - Mailchimp Transactional not configured")
            return False
        
        template = self.get_welcome_email_template(user_name, user_email)
        return await self.send_email(
            to_email=user_email,
            subject=template["subject"],
            html_content=template["html_content"],
            text_content=template["text_content"]
        )
    
    async def send_password_reset_email(self, user_name: str, user_email: str, reset_token: str, reset_url: str = "https://pioneer.com/reset-password") -> bool:
        """Send password reset email"""
        if not self.is_configured:
            logger.info(f"📧 Password reset email not sent to {user_email} - Mailchimp Transactional not configured")
            return False
        
        template = self.get_password_reset_email_template(user_name, reset_token, reset_url)
        return await self.send_email(
            to_email=user_email,
            subject=template["subject"],
            html_content=template["html_content"],
            text_content=template["text_content"]
        )

# Global email service instance
email_service = EmailService()

