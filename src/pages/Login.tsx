
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth/SupabaseAuthProvider';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { loginSchema, LoginFormValues } from '@/context/auth/validation';

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const { t } = useLanguage();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await login(data);
  };

  const handleGoogleLogin = () => {
    // This would be implemented with a real authentication provider
    console.log('Google login clicked');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">{t('login')}</h1>
            <p className="mt-2 text-muted-foreground">
              {t('loginSubtitle')}
            </p>
            <div className="mt-4 p-4 bg-muted rounded-md text-sm">
              <p className="mb-2 font-medium">Demo Accounts:</p>
              <div className="text-left space-y-1">
                <p>Admin: admin@example.com / admin123</p>
                <p>Paid user: paid@example.com / paid123</p>
                <p>Free user: free@example.com / free123</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Google Login Button */}
            <Button 
              type="button" 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 186.69 190.5">
                <path fill="#4285f4" d="M95.25 77.932v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"/>
                <path fill="#34a853" d="M41.869 113.38l-6.972 5.337-24.679 19.223c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"/>
                <path fill="#fbbc05" d="M41.869 76.124c-3.009 8.812-4.704 18.226-4.704 28.011 0 9.92 1.724 19.428 4.776 28.343l31.65-24.56c-2.215-6.405-3.415-13.271-3.415-20.398 0-3.604.379-7.126 1.077-10.52z"/>
                <path fill="#ea4335" d="M95.25 44.077c14.105 0 26.738 4.847 36.721 14.364l27.247-27.247C142.331 15.656 120.162 4.58 95.25 4.58 57.577 4.58 25.132 26.484 9.665 57.897l31.652 24.56c7.534-22.514 28.575-39.226 53.933-38.38z"/>
              </svg>
              {t('loginWithGoogle')}
            </Button>
          
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">{t('orContinueWith')}</span>
              </div>
            </div>
          
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('email')}</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
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
                        <Input type="password" placeholder="••••••••" {...field} />
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
                  {isLoading ? t('loggingIn') : t('login')}
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="text-center mt-4">
            <p>
              {t('noAccount')}{' '}
              <Link to="/signup" className="text-astral-purple hover:underline">
                {t('signUp')}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
