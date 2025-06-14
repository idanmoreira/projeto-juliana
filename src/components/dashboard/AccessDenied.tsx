import { Button } from '@/components/ui/button';

const AccessDenied = () => {
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-3">Acesso negado</h1>
        <p className="text-muted-foreground mb-4">Por favor, faça login para acessar esta página.</p>
        <Button asChild>
          <a href="/login">Entrar</a>
        </Button>
      </div>
    </div>
  );
};

export default AccessDenied;
