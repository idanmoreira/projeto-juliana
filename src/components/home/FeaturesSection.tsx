
import { Card, CardContent } from "@/components/ui/card";
import { Award, Shield, Clock, Calendar } from "lucide-react";
// Removed: import { useLanguage } from "@/context/LanguageContext";

const FeaturesSection = () => {
  // Removed: const { t } = useLanguage();

  const features = [
    {
      icon: <Award className="h-6 w-6 text-astral-purple" />,
      title: "Certified Professional",
      description: "Receive guidance from a certified astrologer with years of experience."
    },
    {
      icon: <Shield className="h-6 w-6 text-astral-purple" />,
      title: "Personalized Approach",
      description: "Unique recommendations tailored to your birth chart and life path."
    },
    {
      icon: <Clock className="h-6 w-6 text-astral-purple" />,
      title: "Tailored Sessions",
      description: "Each session is planned according to your current needs and goals."
    },
    {
      icon: <Calendar className="h-6 w-6 text-astral-purple" />,
      title: "Ongoing Support",
      description: "Continuous guidance to help you at every stage of your personal growth."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-astral-dark/70">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Juliana?</h2>
          <p className="text-muted-foreground max-w-2xl">
            Expertise, empathy, and genuine dedication to your astrological journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 border-astral-indigo/30 astro-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-astral-purple/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
