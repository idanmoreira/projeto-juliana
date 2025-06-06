
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SubscriptionsTab = () => {
  const { t } = useLanguage();

  const recentSubscriptions = [
    { user: 'John Doe', email: 'john@example.com', plan: 'Yearly', date: '2025-05-15' },
    { user: 'Sarah Johnson', email: 'sarah@example.com', plan: 'Monthly', date: '2025-05-12' },
    { user: 'Mike Wilson', email: 'mike@example.com', plan: 'Monthly', date: '2025-05-10' },
  ];

  return (
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
                {recentSubscriptions.map((sub, i) => (
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
  );
};

export default SubscriptionsTab;
