import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const FEEDBACK_URL = 'https://forms.gle/cNCY8nj7Ezw9qmX16'

export function FloatingFeedbackButton() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const EMBED_URL = FEEDBACK_URL + (FEEDBACK_URL.includes('?') ? '&' : '?') + 'embedded=true'

  return (
    <>
      {/* Desktop and tablet: vertical tab on the right side, centered */}
      <div 
        className="hidden sm:block fixed top-1/2 right-0 -translate-y-1/2 z-50" 
        style={{ 
          marginRight: 'env(safe-area-inset-right, 0px)'
        }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={t('common.feedback')}
          title={t('common.feedback')}
          className="interactive-element bg-brand-reflex-blue text-white font-brand-accent font-semibold text-lg shadow-xl hover:bg-brand-pms-285 transition-all duration-200 border-y-2 border-l-2 border-brand-pms-285 rounded-tl-lg rounded-bl-lg px-4 py-6"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            minWidth: '56px',
          }}
        >
          <span className="block rotate-180">{t('common.feedback')}</span>
        </button>
      </div>

      {/* Mobile: compact button on the left side (opposite of chat button) */}
      <div className="sm:hidden fixed bottom-6 left-4 z-50" style={{ marginLeft: 'max(16px, env(safe-area-inset-left))' }}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={t('common.feedback')}
          title={t('common.feedback')}
          className="touch-target interactive-element bg-brand-reflex-blue text-white font-brand-accent font-semibold text-sm shadow-lg hover:bg-brand-pms-285 transition-all duration-200 rounded-full px-4 py-2.5 flex items-center gap-2"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-5 h-5 flex-shrink-0"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="whitespace-nowrap">{t('common.feedback')}</span>
        </button>
      </div>

      {/* Simple modal dialog with embedded Google Form */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-2 sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl h-[90vh] bg-white rounded-xl border-2 border-brand-pms-285 shadow-2xl overflow-hidden grid grid-rows-[auto,1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-brand-pms-290 bg-brand-pms-290/20">
              <h2 className="brand-subheading text-lg">{t('common.feedback')}</h2>
              <div className="flex items-center gap-2">
                <a
                  href={FEEDBACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand-outline touch-target px-3 py-1 text-sm hidden sm:inline-flex items-center justify-center"
                >
                  {t('common.openInNewTab')}
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-brand-primary touch-target px-3 py-1 text-sm"
                  style={{ minHeight: '44px' }}
                >
                  {t('common.close')}
                </button>
              </div>
            </div>
            <div className="relative row-start-2 row-end-3 overflow-hidden">
              <iframe
                title="Feedback form"
                src={EMBED_URL}
                className="absolute left-[-12px] top-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}


