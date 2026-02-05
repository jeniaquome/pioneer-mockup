import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-brand-reflex-blue text-white mt-auto" data-nosnippet>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/branding/assets/logo-0.svg"
                alt="Pittsburgh Tomorrow Pioneer Logo"
                className="h-8 md:h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>

            {/* Simple Links */}
            <nav className="flex flex-wrap gap-6 text-sm">
              <Link to="/resources" className="text-white/70 hover:text-brand-pms-129 transition-colors">
                {t('footer.resources', 'Resources')}
              </Link>
              <Link to="/screening" className="text-white/70 hover:text-brand-pms-129 transition-colors">
                {t('footer.getStarted', 'Get Started')}
              </Link>
              <Link to="/privacy" className="text-white/70 hover:text-brand-pms-129 transition-colors">
                {t('footer.privacy', 'Privacy')}
              </Link>
              <a
                href="mailto:Hello@pittsburghtomorrow.org"
                className="text-white/70 hover:text-brand-pms-129 transition-colors"
              >
                {t('footer.contact', 'Contact')}
              </a>
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-[11px] text-white/40">
            <p>
              &copy; {new Date().getFullYear()} Pittsburgh Tomorrow Pioneer
            </p>
            <p>
              An initiative of{' '}
              <a
                href="https://pittsburghtomorrow.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-pms-129 transition-colors"
              >
                Pittsburgh Tomorrow
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
