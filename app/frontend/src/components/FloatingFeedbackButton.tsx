import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { MessageSquare, X, ExternalLink } from 'lucide-react'

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
          className="interactive-element bg-brand-pms-129 text-brand-reflex-blue font-black text-[11px] uppercase tracking-[0.15em] shadow-xl hover:bg-brand-pms-179 transition-all duration-300 rounded-tl-lg rounded-bl-lg px-3 py-8 hover:shadow-[0_0_30px_rgba(244,179,61,0.5)]"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            minWidth: '44px',
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
          className="touch-target interactive-element bg-brand-pms-129 text-brand-reflex-blue font-black text-[10px] uppercase tracking-[0.1em] shadow-lg hover:bg-brand-pms-179 transition-all duration-300 rounded-full px-4 py-3 flex items-center gap-2 hover:shadow-[0_0_30px_rgba(244,179,61,0.5)]"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          <MessageSquare className="w-4 h-4 flex-shrink-0" />
          <span className="whitespace-nowrap">{t('common.feedback')}</span>
        </button>
      </div>

      {/* Modal dialog with embedded Google Form */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-rows-[auto,1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-brand-reflex-blue">
              <h2 className="text-white text-lg font-black uppercase tracking-[0.15em]">
                {t('common.feedback')}
              </h2>
              <div className="flex items-center gap-3">
                <a
                  href={FEEDBACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-[0.1em] text-white/80 hover:text-white border border-white/30 rounded-sm hover:border-white/60 transition-all duration-300"
                >
                  <ExternalLink className="w-3 h-3" />
                  {t('common.openInNewTab')}
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="touch-target p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                  aria-label={t('common.close')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form Container */}
            <div className="relative row-start-2 row-end-3 overflow-hidden bg-gray-50">
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
