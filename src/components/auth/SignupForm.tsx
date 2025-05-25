
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from "@/components/ui/sonner";
import { useAuth } from '@/context/AuthContext';
import { signupSchema, SignupFormValues } from '@/context/auth/validation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

/**
 * Renders the user registration form.
 * This component utilizes `react-hook-form` for form management and `zod` for schema-based validation.
 * It uses the `useAuth` context hook to access the `signup` function and loading state for form submission.
 * Internationalization is handled via the `useLanguage` context hook.
 * Form fields include name, email, password, and password confirmation.
 * @returns {JSX.Element} The signup form component.
 */
const SignupForm = () => {
  const { t } = useLanguage();
  const { signup, isLoading } = useAuth();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  /**
   * Handles the form submission process.
   * It attempts to sign up the user using the `signup` function from `AuthContext`.
   * If the signup is successful, the user is typically redirected (handled by the `signup` function itself).
   * If an error occurs during signup, it logs the error and displays an error toast notification.
   * @param {SignupFormValues} data - The validated form data.
   */
  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signup(data);
    } catch (error) {
      console.error("Signup failed:", error);
      // TODO: Internationalize this string
      toast.error(t('signupErrorDefault', 'Signup failed. Please try again.'));
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fullName')}</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('confirmPassword')}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-astral-purple hover:bg-astral-purple/90"
          disabled={isLoading}
        >
          {isLoading ? t('creatingAccount') : t('signUp')}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
