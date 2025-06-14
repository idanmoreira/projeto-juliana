import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GoogleSignupButton from './GoogleSignupButton';
import SignupForm from './SignupForm';

const SignupCard = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Criar conta</CardTitle>
        <CardDescription>Bem-vindo! Crie sua conta abaixo.</CardDescription>
      </CardHeader>
      
      <CardContent className="grid gap-4">
        <GoogleSignupButton />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
          </div>
        </div>
        
        <SignupForm />
      </CardContent>
      
      <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-sm text-muted-foreground">
        <div>Já possui conta?</div>
        <Link to="/login" className="text-astral-purple hover:underline">
          Entrar
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignupCard;
