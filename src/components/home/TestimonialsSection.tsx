
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const TestimonialsSection = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Maria Silva",
      text: "Juliana's astrological reading was incredibly insightful. She provided guidance that helped me make important life decisions with confidence.",
      stars: 5,
      position: "Marketing Director",
    },
    {
      name: "Carlos Mendes",
      text: "I was skeptical at first, but after my session with Juliana, I understood myself better. Her therapeutic approach combines modern psychology with astrological wisdom.",
      stars: 5,
      position: "Software Engineer",
    },
    {
      name: "Ana Costa",
      text: "The birth chart analysis was spot on. Juliana has a gift for translating complex astrological concepts into practical advice.",
      stars: 5,
      position: "Yoga Instructor",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-astral-dark/70 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('testimonials')}</h2>
          <p className="text-muted-foreground max-w-2xl">
            {t('testimonialsDesc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/50 border-astral-indigo/30 astro-border">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-astral-gold fill-astral-gold" />
                  ))}
                </div>
                <p className="mb-4 italic text-muted-foreground">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-astral-purple/30 flex items-center justify-center text-lg font-semibold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
