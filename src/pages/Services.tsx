
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'Leitura de Mapa Natal',
      description: 'Análise completa do seu mapa natal revelando sua personalidade, forças, desafios e propósito de vida.',
      duration: '90 min',
      price: 'R$320',
      image: '/placeholder.svg'
    },
    {
      title: 'Compatibilidade de Relacionamento',
      description: 'Descubra a dinâmica do seu relacionamento através da análise de sinastria e mapa composto.',
      duration: '120 min',
      price: 'R$450',
      image: '/placeholder.svg'
    },
    {
      title: 'Leitura de Carreira',
      description: 'Orientação profissional baseada no seu mapa astral para auxiliar em decisões e crescimento na carreira.',
      duration: '60 min',
      price: 'R$280',
      image: '/placeholder.svg'
    },
    {
      title: 'Curso de Astrologia',
      description: 'Aprenda os fundamentos da astrologia neste curso abrangente para iniciantes.',
      duration: '8 semanas',
      price: 'R$1200',
      image: '/placeholder.svg'
    }
  ];

  return (
    <PageLayout>
      <PageHeader
        badge="Atendimentos"
        title="Descubra como os insights astrológicos podem guiá-lo através dos desafios e oportunidades da vida."
        description="Descubra como os insights astrológicos podem guiá-lo através dos desafios e oportunidades da vida."
      />

      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg border-astral-indigo/30 hover:border-astral-purple">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-astral-indigo/10 dark:from-purple-900/20 dark:to-astral-dark/50 relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-full opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl text-astral-purple dark:text-purple-300">✧</div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-astral-indigo dark:text-white">{service.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{service.duration} • {service.price}</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-foreground/80">{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-astral-purple hover:bg-astral-purple/90">
                  Agende Agora
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="relative gradient-bg star-field overflow-hidden py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-astral-purple via-white to-astral-gold">
              Comece Sua Jornada Astrológica Hoje
            </h2>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              Dê o primeiro passo em direção ao autoconhecimento e alinhamento cósmico com uma consulta astrológica personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button className="bg-astral-purple hover:bg-astral-purple/90" size="lg" asChild>
                <Link to="/booking">Agendar Consulta</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Services;
