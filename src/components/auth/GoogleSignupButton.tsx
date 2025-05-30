
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { useLanguage } from '@/context/LanguageContext';

const GoogleSignupButton = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      // Mock Google signup for now
      setTimeout(() => {
        toast.success("Success", {
          description: "Signed up with Google successfully",
        });
        navigate('/dashboard');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Google signup error:', error);
      toast.error("Error", {
        description: "Failed to sign up with Google. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      type="button" 
      className="w-full"
      onClick={handleGoogleSignup}
      disabled={isLoading}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 488 512"
        className="h-5 w-5 mr-2"
        fill="currentColor"
      >
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
      </svg>
      {t('signUpWithGoogle')}
    </Button>
  );
};

export default GoogleSignupButton;
