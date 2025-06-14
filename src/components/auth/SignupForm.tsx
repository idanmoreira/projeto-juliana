import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "@/components/ui/sonner";
import { useAuth } from '@/context/auth/SupabaseAuthProvider';
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
      toast.error("Erro ao cadastrar. Tente novamente.");
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
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="João da Silva" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="joao@email.com" {...field} />
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
              <FormLabel>Senha</FormLabel>
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
              <FormLabel>Confirmar senha</FormLabel>
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
          {isLoading ? "Criando conta..." : "Cadastrar"}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
