
import { Card, CardContent } from "@/components/ui/card";
import { Award, Shield, Clock, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Award className="h-6 w-6 text-astral-purple" />,
      titleKey: 'certifiedPro',
      descriptionKey: 'certifiedProDesc'
    },
    {
      icon: <Shield className="h-6 w-6 text-astral-purple" />,
      titleKey: 'approach',
      descriptionKey: 'approachDesc'
    },
    {
      icon: <Clock className="h-6 w-6 text-astral-purple" />,
      titleKey: 'tailoredSessions',
      descriptionKey: 'tailoredSessionsDesc'
    },
    {
      icon: <Calendar className="h-6 w-6 text-astral-purple" />,
      titleKey: 'ongoingSupport',
      descriptionKey: 'ongoingSupportDesc'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-astral-dark/70">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('whyChoose')}</h2>
          <p className="text-muted-foreground max-w-2xl">
            {t('certifiedDesc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 border-astral-indigo/30 astro-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-astral-purple/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(feature.titleKey)}</h3>
                <p className="text-muted-foreground">{t(feature.descriptionKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
