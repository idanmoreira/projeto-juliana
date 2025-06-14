import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles, Star, BookOpen, ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      titleKey: 'birthChart',
      descriptionKey: 'birthChartDesc',
      price: "R$ 320",
      duration: "90 minutos",
      icon: <Sparkles size={24} className="text-astral-purple" />,
      title: "Mapa Natal",
      description: "Análise completa do mapa natal."
    },
    {
      titleKey: 'compatibility',
      descriptionKey: 'compatibilityDesc',
      price: "R$ 380",
      duration: "120 minutos",
      icon: <Star size={24} className="text-astral-purple" />,
      title: "Sinastria Amorosa",
      description: "Análise de compatibilidade entre casais."
    },
    {
      titleKey: 'astrologyCourse',
      descriptionKey: 'astrologyCourseDesc',
      price: "R$ 950",
      duration: "8 semanas",
      icon: <BookOpen size={24} className="text-astral-purple" />,
      title: "Curso de Astrologia",
      description: "Domine os conceitos astrológicos em oito semanas."
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-astral-midnight/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meus Serviços</h2>
          <p className="text-muted-foreground max-w-2xl">
            Agenda de consultas e cursos exclusivos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden bg-card/50 border-astral-indigo/30 hover:border-astral-purple transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-astral-purple/10 rounded-full flex items-center justify-center">
                    {service.icon}
                  </div>
                  <span className="text-xl font-bold text-astral-gold">{service.price}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{service.duration}</span>
                </div>
                <Button 
                  className="w-full bg-astral-indigo hover:bg-astral-indigo/90 text-white"
                  variant="default"
                >
                  Agendar agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="link" className="text-astral-purple">
            Ver todos <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
