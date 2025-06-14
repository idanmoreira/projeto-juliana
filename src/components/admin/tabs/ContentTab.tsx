
// Removed: import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ContentTab = () => {
  // Removed: const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Conteúdo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CMS Manager</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Gerencie todo o conteúdo do site</p>
              <Button className="w-full bg-astral-purple hover:bg-astral-purple/90" asChild>
                <Link to="/admin/cms">Gerenciar Conteúdo</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cursos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Total de cursos cadastrados</p>
              <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                Gerenciar Cursos
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vídeos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Total de vídeos cadastrados</p>
              <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                Gerenciar Vídeos
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documentos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Total de documentos cadastrados</p>
              <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                Gerenciar Documentos
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ferramentas de Astrologia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Configure integrações de APIs de astrologia</p>
              <Button className="w-full bg-astral-purple hover:bg-astral-purple/90" asChild>
                <Link to="/admin/api-manager">Gerenciar Ferramentas</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Depoimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Gerencie depoimentos de clientes exibidos na home</p>
              <Button className="w-full bg-astral-purple hover:bg-astral-purple/90" asChild>
                <Link to="/admin/testimonials">Gerenciar Depoimentos</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentTab;
