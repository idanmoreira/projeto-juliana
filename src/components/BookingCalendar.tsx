
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/auth/SupabaseAuthProvider';
import { CalendarCheck, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BookingCalendarProps {
  isPremium: boolean;
}

interface ConsultationType {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  is_premium: boolean;
}

interface TimeSlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  datetime_display: string;
}

const BookingCalendar = ({ isPremium }: BookingCalendarProps) => {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [consultationType, setConsultationType] = useState<string>("");
  const [consultationTypes, setConsultationTypes] = useState<ConsultationType[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch consultation types on component mount
  useEffect(() => {
    const fetchConsultationTypes = async () => {
      try {
        const { data, error } = await supabase
          .from('consultation_types')
          .select('*')
          .eq('is_active', true)
          .order('price');

        if (error) {
          console.error('Error fetching consultation types:', error);
          return;
        }

        // Map and fix null descriptions to empty string
        setConsultationTypes((data || []).map((type) => ({
          ...type,
          description: type.description ?? "",
        })));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchConsultationTypes();
  }, []);

  // Fetch available slots when date is selected
  useEffect(() => {
    if (date) {
      const fetchAvailableSlots = async () => {
        try {
          const { data, error } = await supabase
            .rpc('get_available_slots', {
              consultation_date: date.toISOString().split('T')[0]
            });

          if (error) {
            console.error('Error fetching slots:', error);
            return;
          }

          setAvailableSlots(data || []);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchAvailableSlots();
    } else {
      setAvailableSlots([]);
    }
    setTimeSlot(""); // Reset selected time slot when date changes
  }, [date]);

  // Filter consultation types based on user plan
  const availableConsultations = isPremium || (user && (user.role === 'paid' || user.role === 'admin'))
    ? consultationTypes 
    : consultationTypes.filter(type => !type.is_premium);

  const selectedSlot = availableSlots.find(slot => slot.id === timeSlot);
  const selectedConsultation = consultationTypes.find(type => type.id === consultationType);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error(t('loginRequired'), {
        description: t('pleaseLoginToBook'),
      });
      return;
    }

    if (!date || !timeSlot || !consultationType) {
      toast.error(t('incompleteBooking'), {
        description: t('pleaseCompleteAllFields'),
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .rpc('book_consultation', {
          consultation_type_id: consultationType,
          appointment_slot_id: timeSlot,
          consultation_title: selectedConsultation?.name,
          consultation_description: selectedConsultation?.description
        });

      if (error) {
        console.error('Booking error:', error);
        toast.error(t('bookingFailed'), {
          description: error.message,
        });
        return;
      }

      // Success - show confirmation
      const formattedDate = date.toLocaleDateString();
      const message = `${t('consultationScheduled')} ${formattedDate}, ${selectedSlot?.start_time}`;
      
      toast.success(t('bookingSuccessful'), {
        description: message,
      });
      
      // Reset the form
      setDate(undefined);
      setTimeSlot("");
      setConsultationType("");
      setAvailableSlots([]);
      
    } catch (error) {
      console.error('Error booking consultation:', error);
      toast.error(t('bookingFailed'), {
        description: t('unexpectedError'),
      });
    } finally {
      setIsLoading(false);
    }
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
                // Disable dates in the past and weekends
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
                    <SelectItem key={type.id} value={type.id}>
                      {type.name} - ${type.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedConsultation && (
                <div className="text-sm text-muted-foreground">
                  <p>{selectedConsultation.description}</p>
                  <p className="mt-1">Duration: {selectedConsultation.duration_minutes} minutes</p>
                </div>
              )}
              
              {!isPremium && !(user && (user.role === 'paid' || user.role === 'admin')) && (
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
                availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={timeSlot === slot.id ? "default" : "outline"}
                        className={timeSlot === slot.id ? "bg-astral-purple hover:bg-astral-purple/90" : ""}
                        onClick={() => setTimeSlot(slot.id)}
                      >
                        {slot.start_time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">{t('noSlotsAvailable')}</p>
                )
              ) : (
                <p className="text-sm text-muted-foreground">{t('selectDateFirst')}</p>
              )}
            </div>

            <Button
              onClick={handleBooking}
              className="w-full bg-astral-purple hover:bg-astral-purple/90"
              disabled={!date || !timeSlot || !consultationType || isLoading}
            >
              {isLoading ? t('booking') : t('confirmBooking')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
