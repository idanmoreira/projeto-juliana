
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 gradient-bg star-field">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('beginJourney')}</h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t('journeyDesc')}
          </p>
          <Tabs defaultValue="consultation" className="w-full max-w-md mx-auto">
            <TabsList className="grid grid-cols-2 mb-8 bg-card/30 border border-border">
              <TabsTrigger value="consultation">{t('consultation')}</TabsTrigger>
              <TabsTrigger value="membership">{t('membership')}</TabsTrigger>
            </TabsList>
            <TabsContent value="consultation" className="space-y-4">
              <Button className="w-full bg-astral-purple hover:bg-astral-purple/90 text-white py-6 text-lg">
                {t('bookSession')}
              </Button>
              <p className="text-sm text-muted-foreground">
                {t('individualConsultations')}
              </p>
            </TabsContent>
            <TabsContent value="membership" className="space-y-4">
              <Button className="w-full bg-astral-gold hover:bg-astral-gold/90 text-astral-dark py-6 text-lg">
                {t('joinPremium')}
              </Button>
              <p className="text-sm text-muted-foreground">
                {t('accessAll')}
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
