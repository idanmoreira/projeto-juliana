import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DashboardCoursesProps {
  isPaid: boolean;
  courses: any[]; // UserCourse[]
}

const DashboardCourses = ({ courses }: DashboardCoursesProps) => {
  
  const defaultCourses = [
    {
      id: "default1",
      course_id: "course1",
      title: "Astrologia 101",
      description: "Introdução à astrologia",
      progress: 75,
      completed: false
    },
    {
      id: "default2",
      course_id: "course2",  
      title: "Fundamentos do Mapa Natal",
      description: "Aprenda a ler mapas natais",
      progress: 100,
      completed: true
    }
  ];
  
  // If we have real courses, use them, otherwise fall back to defaults
  const displayCourses = courses.length > 0 ? courses : defaultCourses;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Seus Cursos</h2>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayCourses.map(course => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <Badge className="w-max">{course.progress}% completo</Badge>
            </CardHeader>
            <CardContent>
              <div className="h-2 bg-secondary rounded-full mb-2">
                <div 
                  className="h-full bg-astral-purple rounded-full" 
                  style={{width: `${course.progress}%`}}
                ></div>
              </div>
            </CardContent>
            <CardFooter>
              {course.completed ? (
                <Button className="w-full bg-astral-indigo/80 hover:bg-astral-indigo">
                  Ver Certificado
                </Button>
              ) : (
                <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                  Continuar
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardCourses;
