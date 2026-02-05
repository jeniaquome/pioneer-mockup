import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/Auth0Context'

interface LanguageOption {
  code: string
  name: string
  nativeName: string
}

const languages: LanguageOption[] = [
  // Primary and major US languages
  { code: 'en', name: 'English', nativeName: 'English' },
  
  // Major European languages
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  
  // Middle Eastern and North African languages
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  
  // Afghan/Iranian region languages (grouped culturally)
  { code: 'fa', name: 'Farsi', nativeName: 'فارسی' },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو' },
  
  // South Asian languages
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  
  // Central Asian languages
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbekcha' },
  
  // East African languages
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  
  // East Asian languages
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
]

export function LanguageSelector() {
  const { i18n, t } = useTranslation()
  const { isAuthenticated, user } = useAuth()

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const changeLanguage = async (languageCode: string) => {
    // Change the UI language immediately
    i18n.changeLanguage(languageCode)
    
    // Store temporary language override in sessionStorage (for UI only)
    // This persists during the session but doesn't modify the user's profile
    if (isAuthenticated && user) {
      // Format: "userId:languageCode" to track per-user session language
      sessionStorage.setItem('session_language_override', `${user.id}:${languageCode}`)
    } else {
      // For non-authenticated users, just store the language code
      sessionStorage.setItem('session_language_override', languageCode)
    }
    
    // Note: We do NOT update the user's profile here
    // Profile language should only be updated when user explicitly saves their profile settings
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-white hover:text-brand-pms-129 hover:bg-white/10 interactive-element transition-all duration-300 touch-target px-3 py-2 rounded-full border border-white/20 hover:border-brand-pms-129/50"
          style={{ minHeight: '40px' }}
          aria-label={t('common.selectLanguage')}
        >
          <Globe className="h-4 w-4" />
          <span className="text-[11px] font-bold uppercase tracking-wide hidden lg:inline">{currentLanguage.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-48 border-0 shadow-2xl bg-brand-reflex-blue/95 backdrop-blur-md max-h-[70vh] overflow-y-auto rounded-xl p-2"
        sideOffset={8}
        avoidCollisions={true}
        collisionPadding={8}
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`interactive-element transition-all duration-200 cursor-pointer rounded-lg mb-1 last:mb-0 ${
              i18n.language === language.code
                ? 'bg-brand-pms-129 text-brand-reflex-blue'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
            style={{ minHeight: '44px' }}
          >
            <div className="flex items-center justify-between w-full py-1 px-2">
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight">{language.nativeName}</span>
                <span className={`text-[10px] leading-tight ${i18n.language === language.code ? 'text-brand-reflex-blue/70' : 'text-white/50'}`}>{language.name}</span>
              </div>
              {i18n.language === language.code && (
                <div className="w-2 h-2 rounded-full bg-brand-reflex-blue" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
