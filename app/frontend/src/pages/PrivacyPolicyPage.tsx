import { useTranslation } from 'react-i18next'
import { SEO } from '@/components/SEO'

export function PrivacyPolicyPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Learn how Pittsburgh Tomorrow protects your privacy. We explain what data we collect, why we ask for it, and how we keep your information secure."
        keywords="privacy policy, data protection, privacy, security, Pittsburgh Tomorrow, Pittsburgh Tomorrow Pioneer"
        url="https://www.pittsburghpioneer.com/privacy"
      />
      <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        
        {/* Page Title - Centered at Top */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-reflex-blue mb-8">
            {t('privacy.title')}
          </h1>
          <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed max-w-5xl mx-auto">
            {t('privacy.description')}
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          
          {/* Why We Ask These Questions */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-brand-reflex-blue mb-6">
              {t('privacy.whyWeAskTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed mb-6">
              {t('privacy.whyWeAskDescription')}
            </p>
            <ul className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed space-y-4 list-disc ml-6">
              <li>{t('privacy.whyWeAskBullet1')}</li>
              <li>{t('privacy.whyWeAskBullet2')}</li>
              <li>{t('privacy.whyWeAskBullet3')}</li>
              <li>{t('privacy.whyWeAskBullet4')}</li>
            </ul>
            <p className="text-lg sm:text-xl text-brand-reflex-blue font-medium mt-6">
              {t('privacy.weDoNotSell')}
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-brand-reflex-blue mb-6">
              {t('privacy.dataRetentionTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed">
              {t('privacy.dataRetentionDescription')}
            </p>
          </section>

          {/* Quome Usage */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-brand-reflex-blue mb-6">
              {t('privacy.quomeTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed">
              {t('privacy.quomeDescription')}{' '}
              <a 
                href="https://quome.com/legal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-brand-pms-285"
              >
                {t('privacy.privacyPolicyLink')}
              </a>.
            </p>
          </section>

          {/* Skill Builder Usage */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-brand-reflex-blue mb-6">
              {t('privacy.skillBuilderTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed">
              {t('privacy.skillBuilderDescription')}{' '}
              <a 
                href="https://www.skillbuilder.io/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-brand-pms-285"
              >
                {t('privacy.privacyPolicyLink')}
              </a>.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed font-bold">
              {t('privacy.contactDescription')}
            </p>
          </section>

        </div>
      </div>
      </main>
    </>
  )
}
