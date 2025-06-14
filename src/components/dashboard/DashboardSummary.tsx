
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DashboardSummaryProps {
  isPaid: boolean;
  user: {
    name?: string;
    email?: string;
    role?: string;
  } | null;
}

const DashboardSummary = ({ isPaid, user }: DashboardSummaryProps) => {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Cursos Inscritos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{isPaid ? "12" : "2"}</div>
          <p className="text-sm text-muted-foreground">
            {isPaid
              ? "Acesso total a todos os cursos."
              : "Acesso somente aos cursos básicos."}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Próximas Consultas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{isPaid ? "1" : "0"}</div>
          <p className="text-sm text-muted-foreground">
            {isPaid
              ? "Sua próxima consulta é amanhã."
              : "Consultas liberadas apenas no plano pago."}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Tipo de Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="text-xl font-bold mr-2">
              {user?.role === 'admin'
                ? "Administrador"
                : isPaid
                  ? "Premium"
                  : "Gratuita"}
            </div>
            <Badge variant={isPaid ? "default" : "outline"} className={isPaid ? "bg-astral-gold" : ""}>
              {isPaid ? "Premium" : "Free"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {isPaid
              ? "Acesso total liberado."
              : "Faça upgrade para ter mais acesso aos recursos."}
          </p>
          {!isPaid && (
            <Button 
              className="mt-4 w-full bg-astral-gold hover:bg-astral-gold/90 text-astral-dark"
            >
              Upgrade para Premium
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
