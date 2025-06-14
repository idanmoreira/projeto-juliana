import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import BookingCalendar from '@/components/BookingCalendar';
import { UserConsultation } from '@/hooks/useUserData';
import { format } from 'date-fns';

interface ConsultationTypes {
  id: string;
  name: string;
  description: string;
}

interface DashboardConsultationsProps {
  isPaid: boolean;
  consultationTypes: ConsultationTypes[];
  consultations: UserConsultation[];
}

const DashboardConsultations = ({ isPaid, consultationTypes, consultations }: DashboardConsultationsProps) => {
  const [selectedConsultationType, setSelectedConsultationType] = useState(consultationTypes[0]?.id || '');

  const upcomingConsultations = consultations.filter(
    c => c.status === 'scheduled' && new Date(c.date) > new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastConsultations = consultations.filter(
    c => c.status === 'completed' || new Date(c.date) < new Date()
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Tipos de consulta</h2>

      {consultationTypes.length > 0 && (
        <ToggleGroup type="single" value={selectedConsultationType} onValueChange={(value) => {
          if (value) setSelectedConsultationType(value);
        }} className="mb-8">
          {consultationTypes.map((type) => (
            <ToggleGroupItem key={type.id} value={type.id} className="flex-1 py-2">
              <div className="text-center">
                <div className="font-medium">{type.name}</div>
                <div className="text-xs text-muted-foreground">{type.description}</div>
              </div>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}

      <h3 className="text-xl font-semibold mb-4">Suas consultas</h3>

      {isPaid ? (
        <div className="space-y-6">
          {upcomingConsultations.length > 0 ? (
            upcomingConsultations.map(consultation => (
              <Card key={consultation.id}>
                <CardHeader>
                  <Badge className="w-max mb-2 bg-astral-gold">Consulta agendada</Badge>
                  <CardTitle>{consultation.title}</CardTitle>
                  <CardDescription>{consultation.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-astral-purple" />
                      <span>{format(new Date(consultation.date), 'PPP')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-astral-purple" />
                      <span>{format(new Date(consultation.date), 'p')}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Reagendar
                  </Button>
                  <Button className="flex-1 bg-astral-purple hover:bg-astral-purple/90">
                    Entrar na reunião
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-center mb-4">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground mb-4">Agende sua próxima consulta com a Juliana Manduca.</p>
                  <Button className="bg-astral-purple hover:bg-astral-purple/90 text-white">
                    Agendar agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {pastConsultations.length > 0 && (
            <>
              <h4 className="text-lg font-medium mt-8 mb-4">Consultas anteriores</h4>
              {pastConsultations.slice(0, 2).map(consultation => (
                <Card key={consultation.id} className="opacity-80">
                  <CardHeader>
                    <Badge className="w-max mb-2" variant="outline">Consulta passada</Badge>
                    <CardTitle>{consultation.title}</CardTitle>
                    <CardDescription>{consultation.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-astral-purple" />
                        <span>{format(new Date(consultation.date), 'PPP')}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Ver anotações
                    </Button>
                    <Button className="flex-1 bg-astral-purple hover:bg-astral-purple/90">
                      Assistir gravação
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </>
          )}

          <BookingCalendar isPremium={true} />
        </div>
      ) : (
        <div>
          <Card className="mb-6">
            <CardContent className="pt-6 text-center">
              <div className="text-center mb-4">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-muted-foreground mb-4">Agende sua próxima consulta com a Juliana Manduca.</p>
                <Button className="bg-astral-purple hover:bg-astral-purple/90 text-white">
                  Agendar agora
                </Button>
              </div>
            </CardContent>
          </Card>

          <BookingCalendar isPremium={false} />
        </div>
      )}
    </div>
  );
};

export default DashboardConsultations;
