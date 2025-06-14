import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      text: "A leitura astrológica da Juliana foi incrivelmente reveladora. Recebi orientações que me ajudaram a tomar decisões importantes.",
      stars: 5,
      position: "Diretora de Marketing",
    },
    {
      name: "Carlos Mendes",
      text: "Fiquei cético, mas após a consulta me compreendi muito melhor. O método da Juliana alia psicologia moderna ao saber astrológico.",
      stars: 5,
      position: "Engenheiro de Software",
    },
    {
      name: "Ana Costa",
      text: "A análise do mapa natal foi precisa. Juliana tem o dom de traduzir conceitos complexos de forma prática.",
      stars: 5,
      position: "Instrutora de Yoga",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-astral-dark/70 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Depoimentos</h2>
          <p className="text-muted-foreground max-w-2xl">
            Veja o que clientes têm dito sobre o trabalho de Juliana Manduca.
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
