import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User } from 'lucide-react';
import { useAuth } from '@/contexts/Auth0Context';

interface NameDialogProps {
  open: boolean;
  onClose: () => void;
}

export const NameDialog: React.FC<NameDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { updateUserProfile, user } = useAuth();
  
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation - require at least first name
    if (!firstName.trim()) {
      toast({
        title: t('nameDialog.firstNameRequired', 'First name required'),
        description: t('nameDialog.firstNameRequiredDescription', 'Please enter your first name to continue.'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await updateUserProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      });

      toast({
        title: t('nameDialog.nameUpdated', 'Name updated'),
        description: t('nameDialog.nameUpdatedDescription', 'Your name has been saved successfully.'),
      });

      onClose();
    } catch (error) {
      toast({
        title: t('nameDialog.updateFailed', 'Update failed'),
        description: t('nameDialog.updateFailedDescription', 'Failed to update your name. Please try again.'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border-2" style={{ borderColor: '#4987C6' }}>
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#4987C6' }}
          >
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 
              className="text-xl font-bold font-brand-heading"
              style={{ color: '#2E3192' }}
            >
              {t('nameDialog.title', 'What should we call you?')}
            </h2>
          </div>
        </div>
        <p className="text-base mb-6 font-brand-body" style={{ color: '#4987C6' }}>
          {t('nameDialog.description', 'Help us personalize your experience by telling us your name.')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium font-brand-body">
              {t('nameDialog.firstName', 'First Name')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t('nameDialog.firstNamePlaceholder', 'Enter your first name')}
              disabled={isLoading}
              className="w-full font-brand-body"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium font-brand-body">
              {t('nameDialog.lastName', 'Last Name')}
            </Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t('nameDialog.lastNamePlaceholder', 'Enter your last name (optional)')}
              disabled={isLoading}
              className="w-full font-brand-body"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="font-brand-accent px-8 h-12 w-44 whitespace-nowrap"
            >
              {t('nameDialog.skip', 'Skip for now')}
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !firstName.trim()}
              className="bg-brand-reflex-blue hover:bg-brand-reflex-blue-dark text-white font-brand-accent font-semibold px-8 h-12 w-44 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('nameDialog.saving', 'Saving...')}
                </>
              ) : (
                t('nameDialog.save', 'Save Name')
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
