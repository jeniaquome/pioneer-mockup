import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-white border-t-2 border-brand-pms-285 mt-auto" data-nosnippet>
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 max-w-6xl mx-auto">
          
          {/* Left Section - Contact and Quick Links aligned horizontally */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16">
            {/* Contact Info */}
            <div className="text-center sm:text-left">
              <h3 className="brand-subheading text-brand-reflex-blue mb-2 h-8 flex items-center">
                {t('footer.contact')}
              </h3>
              <div className="space-y-0">
                <p className="text-sm text-gray-700 brand-accent h-11 flex items-center">{t('footer.location')}</p>
                <a 
                  href="mailto:Hello@pittsburghtomorrow.org" 
                  className="text-sm text-brand-reflex-blue brand-accent interactive-element hover:underline transition-all duration-200 touch-target flex items-center"
                >
                  Hello@pittsburghtomorrow.org
                </a>
              </div>
            </div>

            {/* Quick Links - Simple links */}
            <div className="text-center sm:text-left">
              <h3 className="brand-subheading text-brand-reflex-blue mb-2 h-8 flex items-center">
                {t('footer.quickLinks')}
              </h3>
              <div className="space-y-0">
                <Link 
                  to="/about" 
                  className="text-sm text-brand-reflex-blue brand-accent interactive-element hover:underline transition-all duration-200 touch-target flex items-center"
                >
                  {t('footer.about')}
                </Link>
                <Link 
                  to="/resources" 
                  className="text-sm text-brand-reflex-blue brand-accent interactive-element hover:underline transition-all duration-200 touch-target flex items-center"
                >
                  {t('footer.resources')}
                </Link>
                <Link 
                  to="/privacy" 
                  className="text-sm text-brand-reflex-blue brand-accent interactive-element hover:underline transition-all duration-200 touch-target flex items-center"
                >
                  {t('footer.privacyPolicy')}
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section - Copyright */}
          <div className="text-center md:text-right border-t md:border-t-0 md:border-l-2 border-brand-pms-290 pt-4 md:pt-0 md:pl-6">
            <p className="text-sm text-gray-600 brand-accent">
              &copy; {new Date().getFullYear()} Pittsburgh Tomorrow Pioneer. {t('common.allRightsReserved')}
            </p>
            <p className="text-xs text-gray-500 brand-accent mt-1">
              {t('common.initiativeOfPittsburghTomorrow')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
