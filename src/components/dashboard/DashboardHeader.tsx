
interface DashboardHeaderProps {
  user: {
    name?: string;
    email?: string;
    role?: string;
  } | null;
  isPaid: boolean;
}

const DashboardHeader = ({ user, isPaid }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight">
        Bem-vindo(a){user?.name ? `, ${user.name}` : ''}!
      </h1>
      <p className="text-muted-foreground mt-2">
        {user?.role === 'admin'
          ? 'Você está no painel de administração.'
          : isPaid
            ? 'Aproveite todos os recursos premium do seu plano!'
            : 'Acesse conteúdos gratuitos e faça upgrade para desbloquear mais.'}
      </p>
      {user?.role === 'paid' && (
        <div className="mt-4 p-3 bg-astral-purple/10 border border-astral-purple/30 rounded-md inline-block">
          <p className="text-sm font-medium text-astral-purple">
            Assinatura válida até o próximo ciclo.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
