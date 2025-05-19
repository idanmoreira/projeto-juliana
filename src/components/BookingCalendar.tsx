
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { CalendarCheck, Clock } from 'lucide-react';

interface BookingCalendarProps {
  isPremium: boolean;
}

const BookingCalendar = ({ isPremium }: BookingCalendarProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [consultationType, setConsultationType] = useState<string>("");

  // Mock available time slots
  const timeSlots = ['10:00', '11:30', '14:00', '15:30', '17:00'];
  
  // Mock consultation types with availability based on user plan
  const consultationTypes = [
    { id: "intro", label: t('introductorySession'), availableForFree: true },
    { id: "birth_chart", label: t('birthChartReading'), availableForFree: false },
    { id: "relationship", label: t('relationshipReading'), availableForFree: false },
    { id: "career", label: t('careerReading'), availableForFree: false },
  ];

  // Filter consultation types based on user plan
  const availableConsultations = isPremium 
    ? consultationTypes 
    : consultationTypes.filter(type => type.availableForFree);

  const handleBooking = () => {
    if (!date || !timeSlot || !consultationType) {
      toast({
        title: t('incompleteBooking'),
        description: t('pleaseCompleteAllFields'),
        variant: "destructive",
      });
      return;
    }

    // Here you would typically make an API call to save the booking
    // Create the message with string concatenation instead of using an object parameter
    const formattedDate = date.toLocaleDateString();
    const message = `${t('consultationScheduled')} ${formattedDate}, ${timeSlot}`;
    
    toast({
      title: t('bookingSuccessful'),
      description: message,
    });
    
    // Reset the form
    setDate(undefined);
    setTimeSlot("");
    setConsultationType("");
  };

  return (
    <Card className="border-astral-indigo/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-astral-purple" />
          {t('bookingConsultation')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">{t('selectDate')}</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md"
              disabled={(date) => {
                // Disable dates in the past and weekends in this example
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                const day = date.getDay();
                return date < now || day === 0 || day === 6;
              }}
            />
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t('selectConsultationType')}</h3>
              <Select value={consultationType} onValueChange={setConsultationType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('chooseConsultationType')} />
                </SelectTrigger>
                <SelectContent>
                  {availableConsultations.map((type) => (
                    <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {!isPremium && (
                <div className="text-sm text-muted-foreground">
                  <p>{t('premiumConsultationsLocked')}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {t('selectTime')}
              </h3>
              
              {date ? (
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={timeSlot === time ? "default" : "outline"}
                      className={timeSlot === time ? "bg-astral-purple hover:bg-astral-purple/90" : ""}
                      onClick={() => setTimeSlot(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t('selectDateFirst')}</p>
              )}
            </div>

            <Button
              onClick={handleBooking}
              className="w-full bg-astral-purple hover:bg-astral-purple/90"
              disabled={!date || !timeSlot || !consultationType}
            >
              {t('confirmBooking')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
