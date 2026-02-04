import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, EyeOff, User, GraduationCap, Briefcase, Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { API_BASE_URL } from '@/lib/api'

interface DemoUser {
  email: string
  password: string
  role: string
  description: string
  characteristics: string[]
}

interface DemoCredentialsProps {
  onSelectUser: (email: string, password: string) => void
}

export function DemoCredentials({ onSelectUser }: DemoCredentialsProps) {
  const [demoUsers, setDemoUsers] = useState<DemoUser[]>([])
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    fetchDemoUsers()
  }, [])

  const fetchDemoUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/demo-users`)
      if (response.ok) {
        const data = await response.json()
        setDemoUsers(data.demo_users)
      }
    } catch (error) {
      console.error('Failed to fetch demo users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = (email: string) => {
    setShowPasswords(prev => ({ ...prev, [email]: !prev[email] }))
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'immigrant':
        return <Heart className="h-4 w-4" />
      case 'student':
        return <GraduationCap className="h-4 w-4" />
      case 'professional':
        return <Briefcase className="h-4 w-4" />
      case 'local':
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'immigrant':
        return 'category-education'
      case 'student':
        return 'category-employment'
      case 'professional':
        return 'category-social'
      case 'local':
        return 'category-default'
      default:
        return 'category-default'
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'immigrant':
        return 'bg-brand-pms-354/20 text-brand-pms-354 border-brand-pms-354/30'
      case 'student':
        return 'bg-brand-reflex-blue/20 text-brand-reflex-blue border-brand-reflex-blue/30'
      case 'professional':
        return 'bg-brand-pms-267/20 text-brand-pms-267 border-brand-pms-267/30'
      case 'local':
        return 'bg-brand-pms-285/20 text-brand-pms-285 border-brand-pms-285/30'
      default:
        return 'bg-brand-pms-290 text-brand-reflex-blue border-brand-pms-285/30'
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-brand-pms-290/50 rounded-xl"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="brand-subheading text-brand-reflex-blue mb-2">{t('demo.tryDemoAccounts')}</h3>
        <p className="text-sm text-brand-pms-285 brand-accent">
          {t('demo.experienceDifferentPerspectives')}
        </p>
      </div>

      <div className="space-y-3">
        {demoUsers.map((user) => (
          <Card 
            key={user.email} 
            className="border-2 border-brand-pms-285/20 hover:border-brand-pms-285 transition-all duration-300 hover:shadow-lg"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-pms-290 rounded-full flex items-center justify-center">
                    <div className="text-brand-reflex-blue">
                      {getRoleIcon(user.role)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="brand-accent font-semibold text-brand-reflex-blue capitalize">
                        {user.role} User
                      </span>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-xs text-brand-reflex-blue/80 brand-accent leading-relaxed">
                      {user.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Compact characteristics */}
              <div className="flex flex-wrap gap-1 mb-3">
                {user.characteristics.slice(0, 3).map((char, index) => (
                  <span 
                    key={index} 
                    className="text-xs px-2 py-1 bg-brand-pms-290 text-brand-reflex-blue rounded-md brand-accent"
                  >
                    {char}
                  </span>
                ))}
                {user.characteristics.length > 3 && (
                  <span className="text-xs text-brand-pms-285 brand-accent">
                    +{user.characteristics.length - 3} more
                  </span>
                )}
              </div>

              {/* Compact credentials */}
              <div className="bg-brand-pms-290/30 p-3 rounded-lg mb-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-medium text-brand-reflex-blue brand-accent">Email:</span>
                    <div className="mt-1 font-mono text-brand-reflex-blue/80 truncate">
                      {user.email}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-brand-reflex-blue brand-accent">Password:</span>
                      <button
                        onClick={() => togglePasswordVisibility(user.email)}
                        className="interactive-element text-brand-pms-285 hover:text-brand-reflex-blue"
                      >
                        {showPasswords[user.email] ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                    <div className="mt-1 font-mono text-brand-reflex-blue/80">
                      {showPasswords[user.email] ? user.password : '••••••••••'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Login button */}
              <Button
                onClick={() => onSelectUser(user.email, user.password)}
                className="w-full text-sm brand-accent"
                style={{ 
                  minHeight: '40px',
                  backgroundColor: user.role === 'immigrant' ? '#F4B33D' :
                                   user.role === 'student' ? '#4987C6' :
                                   user.role === 'professional' ? '#954D9E' :
                                   user.role === 'local' ? '#08A576' : '#F4B33D'
                }}
              >
                Login as {user.role} user
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-xs text-brand-pms-285 bg-brand-pms-290/30 p-3 rounded-lg brand-accent">
                    💡 {t('demo.demoTip')}
      </div>
    </div>
  )
} 