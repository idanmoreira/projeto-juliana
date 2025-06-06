
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ContentTab = () => {
  const { t } = useLanguage();

  return (
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
  );
};

export default ContentTab;
