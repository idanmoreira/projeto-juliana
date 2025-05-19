import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Video, 
  Calendar, 
  FileText, 
  Lock 
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, hasAccess, isLoading } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{t('welcomeUser')}</h1>
          <p className="text-muted-foreground mt-2">
            {user?.role === 'admin' 
              ? t('adminDashboardSubtitle') 
              : user?.role === 'paid' 
              ? t('paidDashboardSubtitle') 
              : t('freeDashboardSubtitle')}
          </p>
          
          {user?.role === 'paid' && (
            <div className="mt-4 p-3 bg-astral-purple/10 border border-astral-purple/30 rounded-md inline-block">
              <p className="text-sm font-medium text-astral-purple">
                {t('subscriptionValidUntil')}
              </p>
            </div>
          )}
          
          {user?.role === 'free' && (
            <div className="mt-4">
              <Button className="bg-astral-purple hover:bg-astral-purple/90">
                {t('upgradeToPremium')}
              </Button>
            </div>
          )}
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="overflow-x-auto">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="courses">{t('courses')}</TabsTrigger>
            <TabsTrigger value="consultations">{t('consultations')}</TabsTrigger>
            <TabsTrigger value="resources">{t('resources')}</TabsTrigger>
            {user?.role === 'admin' && (
              <TabsTrigger value="admin">{t('adminPanel')}</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('coursesEnrolled')}
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user?.role === 'free' ? '1' : '7'}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {user?.role === 'free' 
                      ? t('accessToBasicCourses') 
                      : t('accessToAllCourses')}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('upcomingConsultations')}
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user?.role === 'free' ? '0' : '2'}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {user?.role === 'free' 
                      ? t('consultationsRequirePaidPlan') 
                      : t('nextConsultationTomorrow')}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t('accountType')}
                  </CardTitle>
                  <div className={`h-4 w-4 rounded-full ${
                    user?.role === 'admin' 
                      ? 'bg-purple-500' 
                      : user?.role === 'paid' 
                      ? 'bg-green-500' 
                      : 'bg-gray-500'
                  }`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {user?.role === 'admin' 
                      ? t('adminAccount') 
                      : user?.role === 'paid' 
                      ? t('paidAccount') 
                      : t('freeAccount')}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {user?.role === 'free' 
                      ? t('upgradeToPremiumForMoreAccess') 
                      : t('fullAccessEnabled')}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">{t('recentContent')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    {(!hasAccess('paid') && item !== 1) && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <div className="text-center p-4">
                          <Lock className="h-10 w-10 mx-auto text-muted-foreground/60" />
                          <p className="mt-2 font-medium">{t('premiumContent')}</p>
                          <Button size="sm" className="mt-2 bg-astral-purple hover:bg-astral-purple/90">
                            {t('upgradeToPremium')}
                          </Button>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                      12:34
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-medium mb-2">
                      {item === 1 
                        ? t('introductionToAstrology') 
                        : item === 2 
                        ? t('advancedPlanetaryTransits') 
                        : t('professionalChartReading')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item === 1 
                        ? t('introductionToAstrologyDesc') 
                        : item === 2 
                        ? t('advancedPlanetaryTransitsDesc') 
                        : t('professionalChartReadingDesc')}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">{t('yourCourses')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((course) => (
                <Card key={course} className={
                  (!hasAccess('paid') && course !== 1) 
                    ? "opacity-70" 
                    : ""
                }>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>
                        {course === 1 
                          ? t('astrology101') 
                          : course === 2 
                          ? t('birthChartBasics') 
                          : course === 3 
                          ? t('planetaryInfluences') 
                          : course === 4 
                          ? t('transitInterpretation') 
                          : t('professionalReading')}
                      </span>
                      {(!hasAccess('paid') && course !== 1) && (
                        <Lock size={16} className="text-muted-foreground" />
                      )}
                    </CardTitle>
                    <CardDescription>
                      {course === 1 
                        ? '8 modules • Free' 
                        : `${10 + course} modules • Premium`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-astral-purple ${
                          course === 1 ? 'w-3/4' : 'w-1/4'
                        }`}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>
                        {course === 1 ? '75%' : '25%'} {t('complete')}
                      </span>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-astral-purple"
                        disabled={!hasAccess('paid') && course !== 1}
                      >
                        {t('continue')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="consultations">
            {hasAccess('paid') ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">{t('yourConsultations')}</h2>
                <div className="grid grid-cols-1 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('upcomingConsultation')}</CardTitle>
                      <CardDescription>May 22, 2025 • 3:00 PM</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div>
                          <p className="font-medium">{t('personalChartReading')}</p>
                          <p className="text-muted-foreground text-sm mt-1">
                            {t('personalChartReadingDesc')}
                          </p>
                        </div>
                        <div className="flex gap-2 md:flex-col md:items-end">
                          <Button variant="outline" size="sm">
                            {t('reschedule')}
                          </Button>
                          <Button className="bg-astral-purple hover:bg-astral-purple/90" size="sm">
                            {t('joinMeeting')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('pastConsultation')}</CardTitle>
                      <CardDescription>April 15, 2025 • 2:00 PM</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div>
                          <p className="font-medium">{t('introductorySession')}</p>
                          <p className="text-muted-foreground text-sm mt-1">
                            {t('introductorySessionDesc')}
                          </p>
                        </div>
                        <div className="flex gap-2 md:flex-col md:items-end">
                          <Button variant="outline" size="sm">
                            {t('watchRecording')}
                          </Button>
                          <Button variant="outline" size="sm">
                            {t('viewNotes')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Lock className="h-12 w-12 mx-auto text-muted-foreground/60" />
                <h2 className="text-xl font-medium mt-4">{t('consultationsRequirePaidPlan')}</h2>
                <p className="text-muted-foreground max-w-md mx-auto mt-2">
                  {t('upgradeForConsultations')}
                </p>
                <Button className="bg-astral-purple hover:bg-astral-purple/90 mt-6">
                  {t('upgradeToPremium')}
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t('learningResources')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-start space-y-0">
                    <div>
                      <CardTitle>{t('basicResources')}</CardTitle>
                      <CardDescription>{t('freeContent')}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <FileText size={16} />
                        <span>{t('introToAstrology')}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Video size={16} />
                        <span>{t('zodiacBasics')}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText size={16} />
                        <span>{t('planetaryMeanings')}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className={!hasAccess('paid') ? "opacity-70" : ""}>
                  <CardHeader className="flex flex-row items-start space-y-0">
                    <div className="flex-1">
                      <CardTitle>{t('premiumResources')}</CardTitle>
                      <CardDescription>{t('paidContentOnly')}</CardDescription>
                    </div>
                    {!hasAccess('paid') && (
                      <Lock size={16} className="text-muted-foreground mt-1" />
                    )}
                  </CardHeader>
                  <CardContent>
                    {hasAccess('paid') ? (
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <FileText size={16} />
                          <span>{t('advancedChartReading')}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Video size={16} />
                          <span>{t('masterClass')}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText size={16} />
                          <span>{t('professionalTechniques')}</span>
                        </li>
                      </ul>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground mb-3">
                          {t('upgradeToAccess')}
                        </p>
                        <Button 
                          size="sm" 
                          className="bg-astral-purple hover:bg-astral-purple/90"
                        >
                          {t('upgradeToPremium')}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {user?.role === 'admin' && (
            <TabsContent value="admin">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">{t('adminDashboard')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('totalUsers')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">247</div>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="text-green-500 font-medium">+12%</span>
                        <span className="text-muted-foreground ml-1">{t('lastMonth')}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('premiumUsers')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">89</div>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="text-green-500 font-medium">+8%</span>
                        <span className="text-muted-foreground ml-1">{t('lastMonth')}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('totalRevenue')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">$12,450</div>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="text-green-500 font-medium">+23%</span>
                        <span className="text-muted-foreground ml-1">{t('lastMonth')}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{t('recentUsers')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium p-2 pl-0">{t('name')}</th>
                            <th className="text-left font-medium p-2">{t('email')}</th>
                            <th className="text-left font-medium p-2">{t('plan')}</th>
                            <th className="text-left font-medium p-2">{t('joined')}</th>
                            <th className="text-right font-medium p-2 pr-0">{t('actions')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: 'John Smith', email: 'john@example.com', plan: 'Premium', date: '2025-05-18' },
                            { name: 'Jane Doe', email: 'jane@example.com', plan: 'Free', date: '2025-05-17' },
                            { name: 'Robert Johnson', email: 'robert@example.com', plan: 'Premium', date: '2025-05-15' },
                            { name: 'Sarah Williams', email: 'sarah@example.com', plan: 'Free', date: '2025-05-14' },
                          ].map((user, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="py-3 pl-0">{user.name}</td>
                              <td className="py-3 p-2">{user.email}</td>
                              <td className="py-3 p-2">
                                <span 
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    user.plan === 'Premium' 
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {user.plan}
                                </span>
                              </td>
                              <td className="py-3 p-2">{user.date}</td>
                              <td className="py-3 pr-0 text-right">
                                <Button variant="ghost" size="sm">
                                  {t('view')}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
