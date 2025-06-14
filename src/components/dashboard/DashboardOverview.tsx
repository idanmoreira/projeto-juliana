
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DashboardOverviewProps {
  isPaid: boolean;
  courses: any[];
}

const DashboardOverview = ({ isPaid, courses = [] }: DashboardOverviewProps) => {
  // Find most recent courses that are in progress
  const recentCourses = courses
    .filter(course => course.progress > 0 && course.progress < 100)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 2);
  
  // If we don't have enough from DB, add default ones
  const displayCourses = recentCourses.length >= 2 ? recentCourses : [
    ...recentCourses,
    ...[
      {
        id: "default1",
        course_id: "intro",
        title: "Introdução à Astrologia",
        description: "Curso básico para começar a interpretar mapas natais.",
        progress: 75,
        completed: false
      },
      {
        id: "default2",
        course_id: "advanced",
        title: "Trânsitos Planetários Avançados",
        description: "Aprofunde seus conhecimentos sobre os movimentos planetários.",
        progress: 30,
        completed: false
      }
    ].slice(0, 2 - recentCourses.length)
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Conteúdo Recente</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {displayCourses.length > 0 ? (
          displayCourses.map((course, index) => (
            <Card key={course.id || index}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                  <Play className="mr-2 h-4 w-4" /> Continuar
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Introdução à Astrologia</CardTitle>
                <CardDescription>Curso básico para começar a interpretar mapas natais.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                  <Play className="mr-2 h-4 w-4" /> Continuar
                </Button>
              </CardFooter>
            </Card>
            {isPaid ? (
              <Card>
                <CardHeader>
                  <CardTitle>Trânsitos Planetários Avançados</CardTitle>
                  <CardDescription>
                    Aprofunde seus conhecimentos sobre os movimentos planetários.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                    <Play className="mr-2 h-4 w-4" /> Continuar
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Leitura Profissional de Mapas</CardTitle>
                  <CardDescription>
                    Conteúdo exclusivo para assinantes premium.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-astral-gold mb-2">Conteúdo Premium</Badge>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled>
                    <Play className="mr-2 h-4 w-4" /> Apenas para Premium
                  </Button>
                </CardFooter>
              </Card>
            )}
          </>
        )}
      </div>
      
      {!isPaid && (
        <div className="p-4 rounded-lg bg-astral-gold/10 border border-astral-gold/30">
          <h3 className="font-semibold text-lg mb-2">Desbloqueie Conteúdo Premium</h3>
          <p className="text-muted-foreground mb-3">
            Faça upgrade para acessar todo o conteúdo exclusivo dos assinantes.
          </p>
          <Button className="bg-astral-gold hover:bg-astral-gold/90 text-astral-dark">
            Upgrade para Premium
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
