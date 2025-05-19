
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, BookOpen, Calendar, CheckCircle, Clock, CreditCard, FileText, Play, User, File } from 'lucide-react';
import BookingCalendar from '@/components/BookingCalendar';
import WhatsAppButton from '@/components/WhatsAppButton';
import UserFiles from '@/components/UserFiles';

// Sample user files for demonstration
const userFiles = [
  {
    id: "1",
    name: "Birth Chart Analysis.pdf",
    type: "document",
    size: "2.4 MB",
    date: "2025-04-18",
    url: "#",
    consultationId: "c1"
  },
  {
    id: "2",
    name: "Transit Forecast 2025.pdf",
    type: "document",
    size: "3.1 MB",
    date: "2025-05-10",
    url: "#",
    consultationId: "c2"
  },
  {
    id: "3",
    name: "Your Astral Map.jpg",
    type: "image",
    size: "1.2 MB",
    date: "2025-04-28",
    url: "#",
    consultationId: "c1"
  },
  {
    id: "4",
    name: "Venus Retrograde Effects.pptx",
    type: "presentation",
    size: "4.8 MB",
    date: "2025-05-15",
    url: "#",
    consultationId: "c3"
  }
];

// Sample consultation types
const consultationTypes = [
  { id: "type1", name: "Birth Chart", description: "Complete natal chart analysis" },
  { id: "type2", name: "Solar Return", description: "Your year ahead forecast" },
  { id: "type3", name: "Relationship Synastry", description: "Compatibility analysis" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedConsultationType, setSelectedConsultationType] = useState(consultationTypes[0].id);
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3">{t('accessDenied')}</h1>
          <p className="text-muted-foreground mb-4">{t('pleaseLogin')}</p>
          <Button asChild>
            <a href="/login">{t('login')}</a>
          </Button>
        </div>
      </div>
    );
  }

  const isPaid = user.role === 'paid' || user.role === 'admin';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{t('welcomeUser')}</h1>
          <p className="text-muted-foreground mt-2">
            {user.role === 'admin' 
              ? t('adminDashboardSubtitle') 
              : isPaid 
                ? t('paidDashboardSubtitle')
                : t('freeDashboardSubtitle')
            }
          </p>
          
          {user.role === 'paid' && (
            <div className="mt-4 p-3 bg-astral-purple/10 border border-astral-purple/30 rounded-md inline-block">
              <p className="text-sm font-medium text-astral-purple">
                {t('subscriptionValidUntil')}
              </p>
            </div>
          )}
        </div>
        
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('coursesEnrolled')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{isPaid ? "12" : "2"}</div>
              <p className="text-sm text-muted-foreground">
                {isPaid ? t('accessToAllCourses') : t('accessToBasicCourses')}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('upcomingConsultations')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{isPaid ? "1" : "0"}</div>
              <p className="text-sm text-muted-foreground">
                {isPaid ? t('nextConsultationTomorrow') : t('consultationsRequirePaidPlan')}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('accountType')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-xl font-bold mr-2">
                  {user.role === 'admin' 
                    ? t('adminAccount') 
                    : isPaid 
                      ? t('paidAccount') 
                      : t('freeAccount')
                  }
                </div>
                <Badge variant={isPaid ? "default" : "outline"} className={isPaid ? "bg-astral-gold" : ""}>
                  {isPaid ? "Premium" : "Free"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {isPaid ? t('fullAccessEnabled') : t('upgradeToPremiumForMoreAccess')}
              </p>
              {!isPaid && (
                <Button 
                  className="mt-4 w-full bg-astral-gold hover:bg-astral-gold/90 text-astral-dark"
                >
                  {t('upgradeToPremium')}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full max-w-xl" style={{ 
            gridTemplateColumns: isPaid ? 'repeat(5, 1fr)' : 'repeat(2, 1fr)' 
          }}>
            {isPaid && <TabsTrigger value="overview">{t('overview')}</TabsTrigger>}
            {isPaid && <TabsTrigger value="courses">{t('courses')}</TabsTrigger>}
            <TabsTrigger value="consultations">{t('consultations')}</TabsTrigger>
            <TabsTrigger value="resources">{t('resources')}</TabsTrigger>
            {isPaid && <TabsTrigger value="files">{t('myFiles')}</TabsTrigger>}
          </TabsList>
          
          {isPaid && (
            <TabsContent value="overview" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">{t('recentContent')}</h2>
              
              <div className="grid gap-4 md:grid-cols-2">
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
            </TabsContent>
          )}
          
          {isPaid && (
            <TabsContent value="courses">
              <h2 className="text-2xl font-semibold mb-4">{t('yourCourses')}</h2>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('astrology101')}</CardTitle>
                    <Badge className="w-max">75% {t('complete')}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="h-2 bg-secondary rounded-full mb-2">
                      <div className="h-full bg-astral-purple rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                      {t('continue')}
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{t('birthChartBasics')}</CardTitle>
                    <Badge className="w-max">100% {t('complete')}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="h-2 bg-secondary rounded-full mb-2">
                      <div className="h-full bg-astral-purple rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-astral-indigo/80 hover:bg-astral-indigo">
                      {t('viewCertificate')}
                    </Button>
                  </CardFooter>
                </Card>
                
                {isPaid && (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle>{t('planetaryInfluences')}</CardTitle>
                        <Badge className="w-max">40% {t('complete')}</Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="h-2 bg-secondary rounded-full mb-2">
                          <div className="h-full bg-astral-purple rounded-full" style={{width: '40%'}}></div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                          {t('continue')}
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>{t('transitInterpretation')}</CardTitle>
                        <Badge className="w-max">10% {t('complete')}</Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="h-2 bg-secondary rounded-full mb-2">
                          <div className="h-full bg-astral-purple rounded-full" style={{width: '10%'}}></div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                          {t('continue')}
                        </Button>
                      </CardFooter>
                    </Card>
                  </>
                )}
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="consultations">
            <h2 className="text-2xl font-semibold mb-4">{t('consultationTypes')}</h2>
            
            <ToggleGroup type="single" value={selectedConsultationType} onValueChange={(value) => {
              if (value) setSelectedConsultationType(value);
            }} className="mb-8">
              {consultationTypes.map((type) => (
                <ToggleGroupItem key={type.id} value={type.id} className="flex-1 py-2">
                  <div className="text-center">
                    <div className="font-medium">{type.name}</div>
                    <div className="text-xs text-muted-foreground">{type.description}</div>
                  </div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            
            <h3 className="text-xl font-semibold mb-4">{t('yourConsultations')}</h3>
            
            {isPaid ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <Badge className="w-max mb-2 bg-astral-gold">{t('upcomingConsultation')}</Badge>
                    <CardTitle>{t('personalChartReading')}</CardTitle>
                    <CardDescription>{t('personalChartReadingDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-astral-purple" />
                        <span>May 21, 2025</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-astral-purple" />
                        <span>15:00 - 16:30</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      {t('reschedule')}
                    </Button>
                    <Button className="flex-1 bg-astral-purple hover:bg-astral-purple/90">
                      {t('joinMeeting')}
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="opacity-80">
                  <CardHeader>
                    <Badge className="w-max mb-2" variant="outline">{t('pastConsultation')}</Badge>
                    <CardTitle>{t('introductorySession')}</CardTitle>
                    <CardDescription>{t('introductorySessionDesc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-astral-purple" />
                        <span>April 10, 2025</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      {t('viewNotes')}
                    </Button>
                    <Button className="flex-1 bg-astral-purple hover:bg-astral-purple/90">
                      {t('watchRecording')}
                    </Button>
                  </CardFooter>
                </Card>
                
                <BookingCalendar isPremium={true} />
              </div>
            ) : (
              <div>
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      <p className="text-muted-foreground mb-4">{t('scheduleConsultation')}</p>
                      <Button className="bg-astral-purple hover:bg-astral-purple/90 text-white">
                        {t('bookNow')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <BookingCalendar isPremium={false} />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources">
            <h2 className="text-2xl font-semibold mb-4">{t('learningResources')}</h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('basicResources')}</CardTitle>
                  <CardDescription>{t('freeContent')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-astral-purple" />
                      <span>{t('introToAstrology')}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Play className="mr-2 h-4 w-4 text-astral-purple" />
                      <span>{t('zodiacBasics')}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-astral-purple" />
                      <span>{t('planetaryMeanings')}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t('premiumResources')}</CardTitle>
                  <CardDescription>{t('paidContentOnly')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-astral-purple" />
                      <span>{t('advancedChartReading')}</span>
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
                      <span>{t('masterClass')}</span>
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
                      <span>{t('professionalTechniques')}</span>
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
                      {t('upgradeToAccess')}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </TabsContent>
          
          {isPaid && (
            <TabsContent value="files">
              <h2 className="text-2xl font-semibold mb-4">{t('myFiles')}</h2>
              <p className="text-muted-foreground mb-6">{t('filesDescription')}</p>
              
              <UserFiles files={userFiles} isPremium={isPaid} />
            </TabsContent>
          )}
        </Tabs>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Dashboard;
