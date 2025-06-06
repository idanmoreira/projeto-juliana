import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import ContentManager from '@/components/admin/ContentManager';

const AdminPanel: React.FC = () => {
  const { user, isAuthenticated, hasAccess, isLoading } = useAuth();
  const { t } = useLanguage();
  
  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated || !hasAccess('admin')) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 container px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('adminPanel')}</h1>
            <p className="text-muted-foreground mt-2">{t('adminPanelSubtitle')}</p>
          </div>
          <div className="flex gap-2">
            <Input 
              placeholder={t('searchUsers')} 
              className="w-full md:w-64" 
            />
            <Button className="bg-astral-purple hover:bg-astral-purple/90">
              {t('newUser')}
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="overflow-x-auto">
            <TabsTrigger value="users">{t('users')}</TabsTrigger>
            <TabsTrigger value="content">{t('content')}</TabsTrigger>
            <TabsTrigger value="cms">CMS</TabsTrigger>
            <TabsTrigger value="subscriptions">{t('subscriptions')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('analytics')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{t('allUsers')}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      {t('export')}
                    </Button>
                    <Button className="bg-astral-purple hover:bg-astral-purple/90" size="sm">
                      {t('addUser')}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>{t('name')}</TableHead>
                        <TableHead>{t('email')}</TableHead>
                        <TableHead>{t('role')}</TableHead>
                        <TableHead>{t('status')}</TableHead>
                        <TableHead>{t('joined')}</TableHead>
                        <TableHead className="text-right">{t('actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active', date: '2025-01-01' },
                        { id: '2', name: 'Premium User', email: 'paid@example.com', role: 'Paid', status: 'Active', date: '2025-03-15' },
                        { id: '3', name: 'Free User', email: 'free@example.com', role: 'Free', status: 'Active', date: '2025-04-22' },
                        { id: '4', name: 'Jane Smith', email: 'jane@example.com', role: 'Free', status: 'Inactive', date: '2025-02-12' },
                        { id: '5', name: 'John Doe', email: 'john@example.com', role: 'Paid', status: 'Active', date: '2025-05-01' },
                      ].map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <span 
                              className={`px-2 py-1 rounded-full text-xs ${
                                user.role === 'Admin' 
                                  ? 'bg-purple-100 text-purple-800'
                                  : user.role === 'Paid' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {user.role}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span 
                              className={`px-2 py-1 rounded-full text-xs ${
                                user.status === 'Active' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell>{user.date}</TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button variant="ghost" size="sm">
                              {t('edit')}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                              {t('delete')}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    {t('showingUsers')}
                  </p>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      {t('previous')}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t('next')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>{t('contentManagement')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">CMS Manager</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">Manage all content across your application</p>
                      <Button className="w-full bg-astral-purple hover:bg-astral-purple/90" asChild>
                        <Link to="/admin/cms">Manage Content</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('courses')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">{t('totalCourses')}</p>
                      <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                        {t('manageCourses')}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('videos')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">{t('totalVideos')}</p>
                      <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                        {t('manageVideos')}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('documents')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">{t('totalDocuments')}</p>
                      <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                        {t('manageDocuments')}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('astrologyTools')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">Configure astrology API integrations</p>
                      <Button className="w-full bg-astral-purple hover:bg-astral-purple/90" asChild>
                        <Link to="/admin/api-manager">{t('manageAstrologyTools')}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('testimonials')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">Manage client testimonials for homepage</p>
                      <Button className="w-full bg-astral-purple hover:bg-astral-purple/90" asChild>
                        <Link to="/admin/testimonials">{t('manageTestimonials')}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cms">
            <ContentManager />
          </TabsContent>
          
          <TabsContent value="subscriptions">
            <Card>
              <CardHeader>
                <CardTitle>{t('subscriptions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('plans')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-3">
                          <div>
                            <p className="font-medium">{t('freePlan')}</p>
                            <p className="text-sm text-muted-foreground">{t('freePlanDesc')}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            {t('edit')}
                          </Button>
                        </div>
                        <div className="flex justify-between items-center border-b pb-3">
                          <div>
                            <p className="font-medium">{t('monthlyPlan')}</p>
                            <p className="text-sm text-muted-foreground">$19.99/month</p>
                          </div>
                          <Button variant="outline" size="sm">
                            {t('edit')}
                          </Button>
                        </div>
                        <div className="flex justify-between items-center pb-3">
                          <div>
                            <p className="font-medium">{t('yearlyPlan')}</p>
                            <p className="text-sm text-muted-foreground">$199.99/year</p>
                          </div>
                          <Button variant="outline" size="sm">
                            {t('edit')}
                          </Button>
                        </div>
                        <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                          {t('addPlan')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('recentSubscriptions')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { user: 'John Doe', email: 'john@example.com', plan: 'Yearly', date: '2025-05-15' },
                          { user: 'Sarah Johnson', email: 'sarah@example.com', plan: 'Monthly', date: '2025-05-12' },
                          { user: 'Mike Wilson', email: 'mike@example.com', plan: 'Monthly', date: '2025-05-10' },
                        ].map((sub, i) => (
                          <div key={i} className="flex justify-between items-center border-b last:border-0 pb-3 last:pb-0">
                            <div>
                              <p className="font-medium">{sub.user}</p>
                              <p className="text-sm text-muted-foreground">{sub.email}</p>
                              <p className="text-xs text-astral-purple mt-1">{sub.plan} • {sub.date}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              {t('view')}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{t('analytics')}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      {t('lastMonth')}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t('last3Months')}
                    </Button>
                    <Button variant="outline" size="sm" className="bg-muted">
                      {t('lastYear')}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center mb-4">
                  <p className="text-muted-foreground">{t('analyticsChart')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-muted-foreground mb-1">{t('visitors')}</p>
                      <p className="text-2xl font-bold">14.2K</p>
                      <p className="text-xs text-green-500 font-medium mt-1">+12%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-muted-foreground mb-1">{t('newUsers')}</p>
                      <p className="text-2xl font-bold">1.2K</p>
                      <p className="text-xs text-green-500 font-medium mt-1">+8%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-muted-foreground mb-1">{t('conversions')}</p>
                      <p className="text-2xl font-bold">8.7%</p>
                      <p className="text-xs text-green-500 font-medium mt-1">+2.3%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-muted-foreground mb-1">{t('revenue')}</p>
                      <p className="text-2xl font-bold">$12.4K</p>
                      <p className="text-xs text-green-500 font-medium mt-1">+23%</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
