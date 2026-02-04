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
          className="flex items-center gap-2 text-brand-reflex-blue hover:text-white hover:bg-brand-pms-285 interactive-element transition-all duration-200 touch-target p-2"
          style={{ minHeight: '44px', minWidth: '44px' }}
          aria-label={t('common.selectLanguage')}
        >
          <Globe className="h-5 w-5" />
          <span className="text-sm brand-accent hidden lg:inline">{currentLanguage.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="center" 
        side="bottom"
        className="w-36 sm:w-32 border-brand-pms-285/20 shadow-lg bg-white/95 backdrop-blur-sm max-h-[70vh] overflow-y-auto"
        sideOffset={4}
        avoidCollisions={true}
        collisionPadding={8}
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`interactive-element transition-colors duration-200 cursor-pointer ${
              i18n.language === language.code 
                ? 'bg-brand-pms-290 text-brand-reflex-blue font-medium' 
                : 'hover:bg-brand-pms-290 hover:text-brand-reflex-blue'
            }`}
            style={{ minHeight: '48px' }}
          >
            <div className="flex flex-col py-1 px-1">
              <span className="text-sm font-medium brand-accent leading-tight">{language.nativeName}</span>
              <span className="text-xs text-brand-pms-285/80 brand-accent leading-tight">{language.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
