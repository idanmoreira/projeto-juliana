
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, FileText, Play } from 'lucide-react';

interface DashboardResourcesProps {
  isPaid: boolean;
}

const DashboardResources = ({ isPaid }: DashboardResourcesProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Materiais de Estudo</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Básico</CardTitle>
            <CardDescription>Conteúdo gratuito</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-astral-purple" />
                <span>Introdução à Astrologia</span>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Play className="mr-2 h-4 w-4 text-astral-purple" />
                <span>Noções de Zodíaco</span>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-astral-purple" />
                <span>Significados dos Planetas</span>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Premium</CardTitle>
            <CardDescription>Apenas para assinantes pagos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-astral-purple" />
                <span>Leitura Avançada de Mapas</span>
              </div>
              {isPaid ? (
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" disabled>
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Play className="mr-2 h-4 w-4 text-astral-purple" />
                <span>Masterclass Astrológica</span>
              </div>
              {isPaid ? (
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" disabled>
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-astral-purple" />
                <span>Técnicas Profissionais</span>
              </div>
              {isPaid ? (
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" disabled>
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
          {!isPaid && (
            <CardFooter>
              <Button className="w-full bg-astral-gold hover:bg-astral-gold/90 text-astral-dark">
                Assine para acessar
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardResources;
