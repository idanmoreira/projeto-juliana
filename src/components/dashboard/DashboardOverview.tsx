
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { UserCourse } from '@/hooks/useUserData';

interface DashboardOverviewProps {
  isPaid: boolean;
  courses: UserCourse[];
}

const DashboardOverview = ({ isPaid, courses = [] }: DashboardOverviewProps) => {
  const { t } = useLanguage();

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
        title: t('introductionToAstrology'),
        description: t('introductionToAstrologyDesc'),
        progress: 75,
        completed: false
      },
      {
        id: "default2",
        course_id: "advanced",
        title: t('advancedPlanetaryTransits'),
        description: t('advancedPlanetaryTransitsDesc'),
        progress: 30,
        completed: false
      }
    ].slice(0, 2 - recentCourses.length)
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">{t('recentContent')}</h2>
      
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
                  <Play className="mr-2 h-4 w-4" /> {t('continue')}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>{t('introductionToAstrology')}</CardTitle>
                <CardDescription>{t('introductionToAstrologyDesc')}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                  <Play className="mr-2 h-4 w-4" /> {t('continue')}
                </Button>
              </CardFooter>
            </Card>
            
            {isPaid ? (
              <Card>
                <CardHeader>
                  <CardTitle>{t('advancedPlanetaryTransits')}</CardTitle>
                  <CardDescription>{t('advancedPlanetaryTransitsDesc')}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                    <Play className="mr-2 h-4 w-4" /> {t('continue')}
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{t('professionalChartReading')}</CardTitle>
                  <CardDescription>{t('professionalChartReadingDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-astral-gold mb-2">{t('premiumContent')}</Badge>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled>
                    <Play className="mr-2 h-4 w-4" /> {t('premiumOnly')}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </>
        )}
      </div>
      
      {!isPaid && (
        <div className="p-4 rounded-lg bg-astral-gold/10 border border-astral-gold/30">
          <h3 className="font-semibold text-lg mb-2">{t('unlockPremiumContent')}</h3>
          <p className="text-muted-foreground mb-3">{t('premiumContentDesc')}</p>
          <Button className="bg-astral-gold hover:bg-astral-gold/90 text-astral-dark">
            {t('upgradeToPremium')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
