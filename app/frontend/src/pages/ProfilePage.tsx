import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/Auth0Context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { Save, User, ArrowLeft } from 'lucide-react';
import { API_BASE_URL } from '../lib/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { buildOptions, mapSurveyResponsesToCodes, QUESTION_IDS, isMultiSelect } from '@/lib/survey';
import { OnboardingLoadingScreen } from '@/components/OnboardingLoadingScreen';
import { SEO } from '@/components/SEO';
import { generateSectionId } from '@/lib/geo-utils';


const questionIds = [...QUESTION_IDS];

function normalizeAnswersToSnakeCase(answers: Record<string, string | string[]>): Record<string, string | string[]> {
  const snakeCase: Record<string, string | string[]> = {};
  for (const [key, value] of Object.entries(answers)) {
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    snakeCase[snakeKey] = value;
  }
  return snakeCase;
}

function normalizeAnswersToCamelCase(answers: Record<string, string | string[]>): Record<string, string | string[]> {
  const camelCase: Record<string, string | string[]> = {};
  for (const [key, value] of Object.entries(answers)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    camelCase[camelKey] = value;
  }
  return camelCase;
}

interface AccountData {
  first_name: string;
  last_name: string;
}

const ProfilePage: React.FC = () => {
  const { user, updateOnboardingResponses, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if admin user came from personalized dashboard
  const fromPersonalizedDashboard = location.state?.fromPersonalizedDashboard || false;

  const [isLoading, setIsLoading] = useState(false);
  const [accountData, setAccountData] = useState<AccountData>({
    first_name: '',
    last_name: ''
  });
  const [originalAccountData, setOriginalAccountData] = useState<AccountData>({
    first_name: '',
    last_name: ''
  });
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string | string[]>>({});
  const [originalSurveyAnswers, setOriginalSurveyAnswers] = useState<Record<string, string | string[]>>({});

  // Load account data and survey responses from user data.
  // If the local user cache lacks survey_responses (e.g., after re-login), refetch /auth/me once.
  useEffect(() => {
    // Do not rehydrate from user while a save is in progress; keep showing local edits
    if (isLoading) {
      return
    }
    let cancelled = false
    async function hydrateFromServerIfNeeded() {
      if (user) {
        const userData = {
          first_name: user.first_name || '',
          last_name: user.last_name || ''
        };
        setAccountData(userData);
        setOriginalAccountData(userData);
      }

      const hasLocalResponses = !!user?.survey_responses && Object.keys(user?.survey_responses || {}).length > 0
      if (hasLocalResponses) {
        // Handle legacy malformed keys (e.g., "housingneed" → "housing_need") 
        const legacyKeyMapping: Record<string, string> = {
          'primarylanguage': 'primary_language',
          'culturalbackground': 'cultural_background', 
          'professionalstatus': 'professional_status',
          'housingneed': 'housing_need',
          'languagesupport': 'language_support',
          'communitypriorities': 'community_priorities',
          'immediateneeds': 'immediate_needs',
          'techcomfort': 'tech_comfort',
        };
        
        const responses = user!.survey_responses as Record<string, any>;
        const fixedResponses: Record<string, any> = {};
        
        // Fix malformed keys first
        Object.entries(responses).forEach(([key, value]) => {
          const correctedKey = legacyKeyMapping[key] || key;
          fixedResponses[correctedKey] = value;
        });
        
        const camel = normalizeAnswersToCamelCase(fixedResponses);
        const coded = mapSurveyResponsesToCodes(camel as any);
        if (!cancelled) {
          setSurveyAnswers(coded);
          setOriginalSurveyAnswers(coded);
        }
        return
      }

      // Try a fresh fetch for the current user to populate missing responses
      try {
        const token = localStorage.getItem('access_token')
        if (!token) return
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
        if (res.ok) {
          const fresh = await res.json()
          if (fresh?.survey_responses) {
            // Apply same legacy key fix for fresh data
            const legacyKeyMapping: Record<string, string> = {
              'primarylanguage': 'primary_language',
              'culturalbackground': 'cultural_background', 
              'professionalstatus': 'professional_status',
              'housingneed': 'housing_need',
              'languagesupport': 'language_support',
              'communitypriorities': 'community_priorities',
              'immediateneeds': 'immediate_needs',
              'techcomfort': 'tech_comfort',
            };
            
            const freshResponses = fresh.survey_responses as Record<string, any>;
            const fixedFreshResponses: Record<string, any> = {};
            
            Object.entries(freshResponses).forEach(([key, value]) => {
              const correctedKey = legacyKeyMapping[key] || key;
              fixedFreshResponses[correctedKey] = value;
            });
            
            const camel = normalizeAnswersToCamelCase(fixedFreshResponses as any)
            const coded = mapSurveyResponsesToCodes(camel as any)
            if (!cancelled) {
              setSurveyAnswers(coded);
              setOriginalSurveyAnswers(coded);
            }
          }
        }
      } catch (_) {
        // ignore; UI will remain editable and submit will still work
      }
    }

    hydrateFromServerIfNeeded()
    return () => { cancelled = true }
  }, [user, isLoading]);

  const getSurveyQuestions = () => {
    return questionIds.map(id => {
      const questionKey = `screening.questions.${id}`;
      const question = t(`${questionKey}.question`);

      const options = buildOptions(id as any, t);

      return {
        id,
        question,
        options,
        multiple: isMultiSelect(id as any)
      };
    });
  };

  // Helper function to get display label for selected value
  const getSelectedLabel = (selectedValue: string, options: any[]) => {
    if (!selectedValue) return null;
    const selectedOption = (Array.isArray(options) ? options : [])
      .find(option => {
        const optionValue = typeof option === 'string' ? option : option.value;
        return optionValue === selectedValue;
      });
    if (selectedOption) {
      const optionLabel = typeof selectedOption === 'string' ? selectedOption : selectedOption.label;
      return optionLabel;
    }
    return selectedValue;
  };

  // Account data handler
  const handleAccountInputChange = (field: keyof AccountData, value: string) => {
    setAccountData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Survey answer handlers
  const handleSurveyAnswerChange = (questionId: string, value: string) => {
    setSurveyAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMultipleSurveyAnswerChange = (questionId: string, value: string, checked: boolean) => {
    setSurveyAnswers(prev => {
      const currentValues = Array.isArray(prev[questionId]) ? prev[questionId] as string[] : [];
      
      // Check if the selected value is "None of these" (using the code 'none')
      const isNoneOption = value === 'none';
      
      if (checked) {
        if (isNoneOption) {
          // If selecting "None of these", clear all other options and only keep this one
          return { ...prev, [questionId]: [value] };
        } else {
          // If selecting any other option, remove "None of these" if it exists and add the new option
          const filteredValues = currentValues.filter(v => v !== 'none');
          return { ...prev, [questionId]: [...filteredValues, value] };
        }
      } else {
        // Unchecking - remove the value
        const newValues = currentValues.filter(v => v !== value);
        
        // Validation: Ensure at least one option is selected for multi-select questions
        // If unchecking would result in no selections, prevent the uncheck
        if (newValues.length === 0) {
          // Don't allow unchecking if it would leave no options selected
          return prev;
        }
        
        return { ...prev, [questionId]: newValues };
      }
    });
  };

  // Function to check if a multi-select question has at least one option selected
  const hasValidMultiSelectAnswer = (questionId: string) => {
    const values = surveyAnswers[questionId];
    return Array.isArray(values) && values.length > 0;
  };

  // Function to check if there are any changes
  const hasChanges = () => {
    // Check account data changes
    const accountChanged = JSON.stringify(accountData) !== JSON.stringify(originalAccountData);
    
    // Check survey answers changes (only if user is onboarded)
    const surveyChanged = user?.is_onboarded && 
      JSON.stringify(surveyAnswers) !== JSON.stringify(originalSurveyAnswers);
    
    return accountChanged || surveyChanged;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Step 1: Update account information (name, etc.) in database
      
      const result = await updateUserProfile(accountData);
      
      if (!result.success) {
        toast({
          title: t('profile.updateFailed'),
          description: result.error || t('profile.updateFailedDescription'),
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Only update survey responses if user is onboarded and answers changed
      const surveyChanged = user?.is_onboarded && (
        JSON.stringify(surveyAnswers) !== JSON.stringify(originalSurveyAnswers)
      );

      if (user?.is_onboarded && surveyChanged) {
        // Step 2: Update survey responses (this will trigger recommendation calculations)
        
        const normalizedAnswers = normalizeAnswersToSnakeCase(surveyAnswers);
        const surveyResult = await updateOnboardingResponses(normalizedAnswers);
        
        if (!surveyResult.success) {
          toast({
            title: t('profile.updateFailed'),
            description: surveyResult.error || t('profile.updateFailedDescription'),
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
    
        // Step 3: Wait a moment for all database operations to fully commit
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Step 4: Fetch fresh user data from database to ensure we have the latest
        
        const token = localStorage.getItem('access_token');
        if (token) {
          const freshUserResponse = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
            },
          });
          
          if (freshUserResponse.ok) {
            const freshUserData = await freshUserResponse.json();      
            // Step 5: Update localStorage with fresh data
            localStorage.setItem('user_data', JSON.stringify(freshUserData));
            
            // Dispatch event to notify all components
            window.dispatchEvent(new CustomEvent('userDataChanged', { 
              detail: { userData: freshUserData } 
            }));
      
          }
        }
        
        // Update the original state to reflect the successful save
        setOriginalAccountData(accountData);
        setOriginalSurveyAnswers(surveyAnswers);
        
        toast({
          title: t('profile.profileUpdated', 'Profile updated'),
          description: t('profile.profileUpdatedDescription', 'Your profile and survey responses have been updated successfully.'),
        });
        
        // Step 6: Redirect to dashboard - all calculations are complete
        // Preserve personalized dashboard view for admin users if they came from there
        const returnToPersonalized = user?.role === 'admin' && fromPersonalizedDashboard
        navigate(returnToPersonalized ? '/dashboard?view=personalized' : '/dashboard');
      } else if (user?.is_onboarded && !surveyChanged) {
        // Account-only update for onboarded user: no recompute needed
        setOriginalAccountData(accountData);
        toast({
          title: t('profile.profileUpdated', 'Profile updated'),
          description: t('profile.accountOnlyUpdatedDescription', 'Your account information has been updated.'),
        });
        // Preserve personalized dashboard view for admin users if they came from there
        const returnToPersonalized = user?.role === 'admin' && fromPersonalizedDashboard
        navigate(returnToPersonalized ? '/dashboard?view=personalized' : '/dashboard');
      } else {
        // Non-onboarded user: only account fields are saved
        toast({
          title: t('profile.accountUpdated', 'Account updated'),
          description: t('profile.accountUpdatedDescription', 'Your account information has been updated successfully. Complete the survey to save your preferences.'),
        });
        setOriginalAccountData(accountData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('[ProfilePage] Error during profile update:', error);
      toast({
        title: t('profile.updateFailed'),
        description: t('profile.updateFailedDescription'),
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        <SEO 
          title="Profile Settings"
          description="Sign in to manage your profile settings and preferences."
          noindex={true}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>{t('profile.pleaseLogIn')}</p>
          </div>
        </div>
      </>
    );
  }

  // Show loading screen when submitting
  if (isLoading) {
    return <OnboardingLoadingScreen />
  }

  const questions = getSurveyQuestions();

  return (
    <>
      <SEO 
        title="Profile Settings"
        description="Manage your personal information, account settings, and survey preferences for your Pittsburgh settlement journey."
        keywords="profile settings, account management, survey preferences, Pittsburgh newcomer profile"
        noindex={true}
      />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <User className="h-6 w-6" />
          <h1 id={generateSectionId(t('profile.title', 'Profile Settings'))} className="text-2xl font-bold">{t('profile.title', 'Profile Settings')}</h1>
        </div>
        <p className="text-muted-foreground">
          {t('profile.subtitle', 'Manage your personal information and preferences')}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.accountInformation', 'Account Information')}</CardTitle>
            <CardDescription>
              {t('profile.accountInformationDescription', 'Update your basic account details')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">{t('profile.firstName', 'First Name')}</Label>
                <Input
                  id="first_name"
                  value={accountData.first_name}
                  onChange={(e) => handleAccountInputChange('first_name', e.target.value)}
                  placeholder={t('profile.enterFirstName', 'Enter your first name')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">{t('profile.lastName', 'Last Name')}</Label>
                <Input
                  id="last_name"
                  value={accountData.last_name}
                  onChange={(e) => handleAccountInputChange('last_name', e.target.value)}
                  placeholder={t('profile.enterLastName', 'Enter your last name')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('profile.email', 'Email')}</Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground">
                {t('profile.emailChangeNote', 'Email cannot be changed. Contact support if you need to update your email.')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Survey Required Notice */}
        {!user?.is_onboarded && (
          <Card>
            <CardContent className="pt-6">
              <div 
                className="p-8 border-3 border-dashed rounded-2xl text-center"
                style={{ 
                  borderColor: '#4987C6',
                  backgroundColor: '#D2EDF6'
                }}
              >
                <h2
                  id={generateSectionId(t('profile.surveyRequired', 'Complete Your Survey First'))}
                  className="font-bold mb-3"
                  style={{
                    color: '#2E3192',
                    fontSize: '1.25rem'
                  }}
                >
                  {t('profile.surveyRequired', 'Complete Your Survey First')}
                </h2>
                <p 
                  className="mb-6 max-w-xl mx-auto"
                  style={{ 
                    color: '#2E3192',
                    opacity: '0.8'
                  }}
                >
                  {t('profile.surveyRequiredDescription', 'To get personalized recommendations and edit your survey responses, you need to complete the initial assessment survey first.')}
                </p>
                <Button
                  type="button"
                  onClick={() => navigate('/screening')}
                  className="bg-brand-reflex-blue hover:bg-brand-reflex-blue-dark text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ minHeight: '48px' }}
                >
                  {t('profile.takeSurvey', 'Take the Survey')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Survey Questions Section 1: Basic Information */}
        {user?.is_onboarded && (
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.basicQuestions', 'Basic Information')}</CardTitle>
              <CardDescription>
                {t('profile.basicQuestionsDescription', 'Tell us about yourself and your situation to get personalized recommendations')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.slice(0, 3).map((question, index) => (
              <div key={question.id} className="space-y-2">
                <Label htmlFor={question.id} className="text-sm font-medium">
                  {index + 1}. {question.question}
                </Label>
                {question.multiple ? (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      {t('profile.selectPrimary', 'Select your primary preference:')}
                    </p>
                    <Select
                      value={Array.isArray(surveyAnswers[question.id]) 
                        ? (surveyAnswers[question.id] as string[])[0] || ''
                        : surveyAnswers[question.id] as string || ''
                      }
                      onValueChange={(value) => handleSurveyAnswerChange(question.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('profile.selectOption', 'Select an option...')}>
                          {(() => {
                            const selectedValue = Array.isArray(surveyAnswers[question.id]) 
                              ? (surveyAnswers[question.id] as string[])[0] || ''
                              : surveyAnswers[question.id] as string || '';
                            return getSelectedLabel(selectedValue, question.options);
                          })()}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {(Array.isArray(question.options) ? question.options : []).map((option, optionIndex) => {
                          const optionValue = typeof option === 'string' ? option : option.value;
                          const optionLabel = typeof option === 'string' ? option : option.label;
                          
                          return (
                            <SelectItem key={optionIndex} value={optionValue}>
                              {optionLabel}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <Select
                    value={surveyAnswers[question.id] as string || ''}
                    onValueChange={(value) => handleSurveyAnswerChange(question.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('profile.selectOption', 'Select an option...')}>
                        {(() => {
                          const selectedValue = surveyAnswers[question.id] as string || '';
                          return getSelectedLabel(selectedValue, question.options);
                        })()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {(Array.isArray(question.options) ? question.options : []).map((option, optionIndex) => {
                        const optionValue = typeof option === 'string' ? option : option.value;
                        const optionLabel = typeof option === 'string' ? option : option.label;
                        
                        return (
                          <SelectItem key={optionIndex} value={optionValue}>
                            {optionLabel}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
            </CardContent>
          </Card>
        )}

        {/* Survey Questions Section 2: Support & Needs */}
        {user?.is_onboarded && (
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.supportNeeds', 'Support & Needs')}</CardTitle>
              <CardDescription>
                {t('profile.supportNeedsDescription', 'What kind of support and services do you need?')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.slice(3, 10).map((question, index) => (
              <div key={question.id} className="space-y-2">
                <Label htmlFor={question.id} className="text-sm font-medium">
                  {index + 4}. {question.question}
                </Label>
                {question.multiple ? (
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      {t('profile.selectMultiple', 'Select all that apply:')} <span className="text-red-500">*</span>
                    </p>
                    <div className="space-y-2">
                      {(Array.isArray(question.options) ? question.options : []).map((option, optionIndex) => {
                        const optionValue = typeof option === 'string' ? option : option.value;
                        const optionLabel = typeof option === 'string' ? option : option.label;
                        const isChecked = Array.isArray(surveyAnswers[question.id]) 
                          ? (surveyAnswers[question.id] as string[]).includes(optionValue)
                          : false;
                        const currentValues = Array.isArray(surveyAnswers[question.id]) ? surveyAnswers[question.id] as string[] : [];
                        const isLastSelected = isChecked && currentValues.length === 1;
                        
                        return (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`${question.id}-${optionIndex}`}
                              checked={isChecked}
                              onChange={(e) => 
                                handleMultipleSurveyAnswerChange(question.id, optionValue, e.target.checked)
                              }
                              className="w-4 h-4 text-brand-pms-285 border-gray-300 rounded focus:ring-brand-pms-285 focus:ring-2"
                            />
                            <Label 
                              htmlFor={`${question.id}-${optionIndex}`} 
                              className="text-sm font-normal cursor-pointer"
                              title={isLastSelected ? 'At least one option must be selected' : ''}
                            >
                              {optionLabel}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                    {!hasValidMultiSelectAnswer(question.id) && (
                      <p className="text-xs text-red-500 mt-1">
                        {t('profile.selectAtLeastOne', 'Please select at least one option.')}
                      </p>
                    )}
                  </div>
                ) : (
                  <Select
                    value={surveyAnswers[question.id] as string || ''}
                    onValueChange={(value) => handleSurveyAnswerChange(question.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('profile.selectOption', 'Select an option...')}>
                        {(() => {
                          const selectedValue = surveyAnswers[question.id] as string || '';
                          return getSelectedLabel(selectedValue, question.options);
                        })()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {(Array.isArray(question.options) ? question.options : []).map((option, optionIndex) => {
                        const optionValue = typeof option === 'string' ? option : option.value;
                        const optionLabel = typeof option === 'string' ? option : option.label;
                        
                        return (
                          <SelectItem key={optionIndex} value={optionValue}>
                            {optionLabel}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard')}
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('profile.backToDashboard', 'Back to Dashboard')}
          </Button>
          <Button type="submit" disabled={isLoading || !hasChanges()} className="min-w-32">
            <Save className="mr-2 h-4 w-4" />
            {t('profile.saveChanges', 'Save Changes')}
          </Button>
        </div>
      </form>
    </main>
    </>
  );
};

export default ProfilePage;