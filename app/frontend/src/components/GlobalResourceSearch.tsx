import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface GlobalResourceSearchProps {
  className?: string
}

export function GlobalResourceSearch({ className = '' }: GlobalResourceSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    
    // Encode the current path to pass as 'from' parameter for back navigation
    const fromPath = encodeURIComponent(location.pathname)
    // Pass current UI language for multilingual search
    const lang = i18n.language
    navigate(`/resources/search?q=${encodeURIComponent(searchQuery.trim())}&from=${fromPath}&lang=${lang}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        <Input
          type="text"
          placeholder={t('resources.globalSearch.placeholder', 'Search all resources...')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-4 py-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full"
          aria-label={t('resources.globalSearch.placeholder', 'Search all resources...')}
        />
      </div>
      <Button
        onClick={handleSearch}
        disabled={!searchQuery.trim()}
        className="bg-brand-reflex-blue hover:bg-brand-pms-285 text-white font-medium px-6 py-2 touch-target whitespace-nowrap"
      >
        <Search className="w-4 h-4 mr-2" />
        {t('resources.globalSearch.button', 'Search')}
      </Button>
    </div>
  )
}

