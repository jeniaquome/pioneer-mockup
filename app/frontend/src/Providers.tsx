import {TooltipProvider} from '@/components/ui/tooltip'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from './components/theme-provider'
import { Auth0ProviderWithNavigate } from './contexts/Auth0ProviderWithNavigate'
import { Auth0AuthProvider } from './contexts/Auth0Context'
import { BrowserRouter as Router } from 'react-router-dom'

/**
 * Wraps app with various React Context Providers. Used in main.tsx
 */
export const Providers = ({children}: PropsWithChildren) => (
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Router>
      <Auth0ProviderWithNavigate>
        <Auth0AuthProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </Auth0AuthProvider>
      </Auth0ProviderWithNavigate>
    </Router>
  </ThemeProvider>
)
